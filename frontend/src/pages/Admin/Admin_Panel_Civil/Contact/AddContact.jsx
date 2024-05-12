import React, { useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios'
import { Base_URL } from "../../../../Constant";


const AddContact = () => {
  
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [companyname, setCompanyName] = useState("")
    const [websiteurl, setWebsiteUrl] = useState("")
    const [subject, setSubject] = useState("")
    const [comment, setComment] = useState("")
    
    const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));



    const CreateContact = (e) => {
      e.preventDefault()
      const data = {
        'fullName': name, 
        'email': email, 
        'phone_number': phone, 
        'Company_name': companyname, 
        'website_url': websiteurl, 
        'subject': subject, 
        'comment': comment, 
        'active': true,
      } 

      const config = {
        headers: {
          "Content-type": "application/json",
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${adminToken}`,
        },
      };

      axios.post(Base_URL+"/api/civil-admin/contact/", data, config)
        .then(response => {
          console.log(response.data)
          toast.success('Contact created Successfully')
          })
        .catch(err => console.log(err));
    }


  return (
    <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
        Add Contact
      </h1>{" "}
      <div className="mt-8">
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Full Name</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Email</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Phone Number</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        />

        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Company Name</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Company Name"
        value={companyname}
        onChange={(e) => setCompanyName(e.target.value)}
        />

        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Website Url</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Website Url"
        value={websiteurl}
        onChange={(e) => setWebsiteUrl(e.target.value)}
        />

        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Subject</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        />

        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Comment</span>
        </label>
        <textarea  className="h-32 px-4 py-2 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        ></textarea>

      </div>
      <div className="flex items-center justify-center">
      <button type="submit" className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{CreateContact(e)}}>Create</button>
      </div>
    </div>
  );
};

export default AddContact;
