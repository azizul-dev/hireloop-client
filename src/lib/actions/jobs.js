"use server";

import { serverMutation } from "../core/server";


export const createJob = async (newJobData) => {
  return serverMutation("/api/jobs", newJobData);
};

// export const createJob = async (newJobData) => {
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

//   const res = await fetch(`${baseUrl}/api/jobs`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newJobData),
//   });
//   return res.json();

  // try {
  //   const res = await fetch(`${baseUrl}/api/jobs`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newJobData),
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
  //   console.error("Error inside createJob server action:", error);
  //   throw error;
  // }
// };
