import React from 'react';
import Card from '../../../Component/Card/Card';

const Reviews = () => {
    return (
        <div className='px-2 my-24 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-16 md:container md:mx-auto'>
            <Card text="Total users" number="3800+ " textColor="text-white" BgColor="bg-blue-950 " />
            <Card text="Pending project" number="2300+ " textColor="text-white" BgColor="bg-blue-950 " />
            <Card text="Ongoing project" number="3030+ " textColor="text-white" BgColor="bg-blue-950  " />
            <Card text="Project Completed" number="2200+ " textColor="text-white" BgColor="bg-blue-950 " />
            <Card text="Delivery project" number="2800+ " textColor="text-white" BgColor="bg-blue-950 " />
            <Card text="Total Subscribe" number="4030+ " textColor="text-white" BgColor="bg-blue-950 " />
        </div>
    );
};

export default Reviews;