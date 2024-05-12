import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios'
import { Base_URL } from "../../../../Constant";


const EditContact = () => {

    const [adminToken] = useState(localStorage.getItem('DTCAdminToken'));
    const { id } = useParams();
    const navigate = useNavigate();
  
    const [data, setData] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [companyname, setCompanyName] = useState("")
    const [websiteurl, setWebsiteUrl] = useState("")
    const [subject, setSubject] = useState("")
    const [comment, setComment] = useState("")


    const config = {
      headers: {
        "Content-type": "application/json",
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`,
      },
    };

    useEffect(() => {
      axios.get(Base_URL+`/api/civil-admin/contact/${id}/`, config)
        .then(res => {
          // console.log("34 res.data", res.data);
          setData(res.data)
          setName(res.data.fullName)
          setEmail(res.data.email)
          setPhone(res.data.phone_number)
          setCompanyName(res.data.Company_name)
          setWebsiteUrl(res.data.website_url)
          setSubject(res.data.subject)
          setComment(res.data.comment)

        })
        .catch(err => console.log(err));
    },[])
  

    const UpdateContact = (e) => {
      e.preventDefault()
      const data = {
        'fullName': name, 
        'email': email, 
        'phone_number': phone, 
        'Company_name': companyname, 
        'website_url': websiteurl, 
        'subject': subject, 
        'comment': comment, 
      } 

      

      axios.patch(Base_URL+`/api/civil-admin/contact/${id}/`, data, config)
        .then(response => {
          // console.log(response.data)
          toast.success('Contact Edited Successfully')
          setTimeout(() => {
            navigate('/admin/civil/contact')
          }, 1000);
          })
        .catch(err => console.log(err));
    }


    

    return (
      <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">
        
        {/* <div className="flex items-center justify-between">
          <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
          Detail Contact
          </h1>{" "}
        </div>
        <div className="flex justify-between items-center mt-4 ml-1 mb-4 uppercase text-lg tracking-wide">
          <div>
            <p>ID: { data?.id}</p>
            <p>Full Name: { data?.fullName}</p>
            <p>email: { data?.email}</p>
            <p>Phone: { data?.phone_number}</p>
            <p>subject: { data?.subject}</p>
            <p>comment: { data?.comment}</p>
            <p>status: { data?.active?"Active":"Deactive"}</p>
            <p>created_at: { data?.created_at}</p>
            <p>last_update_at: { data?.last_update_at}</p>
          </div>
        </div> */}

        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-10">
          Contact Detail
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
        <textarea className="h-32 px-4 py-2 w-full  bg-slate-950  border rounded border-neutral-500  mb-10" placeholder="Enter Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        ></textarea>

      </div>
        {/* Seo */}
     
        {/* <div className="flex items-center justify-center mb-10">
          <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{UpdateContact(e)}}>
            Update
          </button>
        </div> */}
      </div>
    );
};

export default EditContact;