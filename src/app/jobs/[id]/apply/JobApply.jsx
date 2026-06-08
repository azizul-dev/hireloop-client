import { Button } from '@heroui/react';
import React from 'react';

const JobApply = ({ job }) => {
    return (
        <div>
            <h2> Apply with info: {job.title}</h2>
            <Button>Apply Now</Button>
        </div>
    );
};

export default JobApply;