import { serverFetch } from "../core/server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async ()=>{
  return serverFetch('/api/jobs');
}


export const getJobById = async (jobId) => {
  return serverFetch(`/api/jobs/${jobId}`);
};


export const getCompanyJobs = async (companyId, status) => {
  const url = status
    ? `${baseURL}/api/jobs?companyId=${companyId}&status=${status}`
    : `${baseURL}/api/jobs?companyId=${companyId}`;
  const res = await fetch(url);
  return res.json();
};
