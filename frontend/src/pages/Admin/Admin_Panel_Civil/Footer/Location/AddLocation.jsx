import React from 'react';

const AddLocation = () => {
    return (
        <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Add Location
        </h1>{" "}
        <div className=" mt-8">
        
          <div>
          <label className="label my-2">
            <span className="label-text text-white text-lg font-semibold tracking-wider">
            Country
            </span>
          </label>
          <input
            type="text"
            className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
          />
          </div>
          <div>
          <label className="label my-2">
            <span className="label-text text-white text-lg font-semibold tracking-wider">
         Email</span>
          </label>
          <input
            type="text"
            className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
          />
          </div>
          <div>
          <label className="label my-2">
            <span className="label-text text-white text-lg font-semibold tracking-wider">
          Phone</span>
          </label>
          <input
            type="text"
            className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
          />
          </div>
      
          <div>
          <label className="label my-2">
            <span className="label-text text-white text-lg font-semibold tracking-wider">
           Address</span>
          </label>
          <input
            type="text"
            className="h-20 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 "
          />
          </div>
        </div>
        {/* Seo */}
     
        <div className="flex items-center justify-center">
          <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600">
            Create
          </button>
        </div>
      </div>
    );
};

export default AddLocation;