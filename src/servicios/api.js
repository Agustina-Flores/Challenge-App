const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export const getCandidate = async (email) => {
  const response = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${email}`
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error fetching candidate");
  }

  return response.json();
};


export const getJobs = async () => {
  const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!response.ok) {
    throw new Error("Error fetching jobs");
  }

  return response.json();
};

export const applyJobs = async (datos) => {
  const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    }
  );

  const data = await response.json();

  console.log("STATUS:", response.status);
  console.log("RESPONSE DATA:", data);

  return data;
};