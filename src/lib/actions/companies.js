"use server";

import { serverMutation } from "../core/server";

export const createCompany = async (newCompanyData) => {
  return serverMutation("/api/companies", newCompanyData);
};

// export const createCompany = async (newCompanyData) => {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";
  
//   console.log("baseUrl:", baseUrl);


//   const res = await fetch(`${baseUrl}/api/companies`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newCompanyData),
//     }); 

//     return res.json();
  
  // try {
  //   const res = await fetch(`${baseUrl}/api/companies`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newCompanyData),
  //   });

  //   if (!res.ok) {
  //     const text = await res.text();
  //     throw new Error(`Server responded with status ${res.status}: ${text}`);
  //   }

  //   const contentType = res.headers.get("content-type");
  //   if (!contentType || !contentType.includes("application/json")) {
  //     const text = await res.text();
  //     throw new Error(`Expected JSON response, but got: ${text}`);
  //   }

  //   return await res.json();
  // } catch (error) {
  //   console.error("Error inside createCompany server action:", error);
  //   throw error;
  // }
// };