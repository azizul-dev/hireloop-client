import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import JobApply from './JobApply';

const JobApplyPage = async ({params}) => {
    const { id } = await params;
    const user = await getUserSession();
    if (!user) {
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }

    if (user.role !== 'seeker') {
        return (
            <div>
                <h1>Access Denied</h1>
                <p>
                    You do not have permission to access this page. Only job seekers can apply for jobs.
                </p>
            </div>
        );
    }

    const job = await getJobById(id);
    return (
        <div>
            
            <JobApply applicant={user} job={job} />
        </div>
    );
};

export default JobApplyPage;