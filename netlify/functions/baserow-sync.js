// netlify/functions/baserow-sync.js
//
// Netlify Forms -> Baserow bridge.
//
// Netlify calls this function as an "outgoing webhook" the moment someone
// submits the relocation-lead (index.html) or packages-lead (packages.html)
// form. We translate the submitted fields into a new row in the Baserow
// "Leads" table.
//
// Required environment variables (set in Netlify: Site configuration ->
// Environment variables):
//   BASEROW_API_TOKEN  - a Baserow database token with write access
//   BASEROW_TABLE_ID    - the Leads table id (1185283)

const BASEROW_API_URL = "https://api.baserow.io/api/database/rows/table";

// Map the raw values our HTML <select>/<input> elements send to the exact
// option text configured on each Baserow single/multiple-select field.
const PACKAGE_MAP = {
  "Strategy Call": "Strategy Call",
  "Soft Landing": "Soft Landing",
  "Full Concierge": "Full Migration",
  "Not sure yet": "Not Sure",
};

const TIMELINE_MAP = {
  "just exploring": "Just Exploring",
  "within a year": "Moving within a year",
  "within 3 months": "Moving within 3 months",
  "already there": "Already in Spain",
};

const BUDGET_MAP = {
  "under 1k": "Under €1k",
  "1k-5k": "€1k–5k",
  "5k-15k": "€5k–15k",
  "15k+": "€15k+",
  "prefer not to say": "Prefer not to say",
};

const FORM_SOURCE_MAP = {
  "relocation-lead": "Homepage",
  "packages-lead": "Packages",
};

function buildRow(formName, data) {
  const row = {
    Name: data.name || "",
    Email: data.email || "",
    "Phone Number": data.phone || "",
    "Destination City": data.city || "",
    Notes: data.message || "",
    "Source Form": [FORM_SOURCE_MAP[formName] || "Homepage"],
    Status: ["New"],
    "Submitted at": new Date().toISOString(),
  };

  const pkg = PACKAGE_MAP[data.package];
  row["Package Interest"] = [pkg || "N/A"];

  const timeline = TIMELINE_MAP[data.timeline];
  if (timeline) row["Timeline"] = [timeline];

  const budget = BUDGET_MAP[data.budget];
  row["Budget options"] = [budget || "N/A"];

  return row;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method not allowed" };
  }

  const token = process.env.BASEROW_API_TOKEN;
  const tableId = process.env.BASEROW_TABLE_ID;

  if (!token || !tableId) {
    console.error("Missing BASEROW_API_TOKEN or BASEROW_TABLE_ID env vars");
    return { statusCode: 500, body: "Server not configured" };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch (err) {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  // Netlify's outgoing webhook body is the submission object itself; some
  // setups wrap it in { payload: {...} }. Handle both shapes.
  const submission = payload.payload || payload;
  const formName = submission.form_name || submission.formName;
  const data = submission.data || {};

  if (!formName || !FORM_SOURCE_MAP[formName]) {
    // Not one of our known forms - ignore rather than error, so Netlify
    // doesn't retry forever.
    return { statusCode: 200, body: "Ignored (unrecognized form)" };
  }

  const row = buildRow(formName, data);

  try {
    const res = await fetch(
      `${BASEROW_API_URL}/${tableId}/?user_field_names=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(row),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Baserow error", res.status, errText);
      return { statusCode: 502, body: `Baserow error: ${errText}` };
    }

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("Failed to reach Baserow", err);
    return { statusCode: 502, body: "Failed to reach Baserow" };
  }
};
