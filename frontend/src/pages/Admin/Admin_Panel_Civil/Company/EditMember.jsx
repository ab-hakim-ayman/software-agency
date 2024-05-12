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
    const [description, setDescription] = useState("")
    const [photo, setPhoto] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [home, setHome] = useState("")
    const [photoName, setPhotoName] = useState("")


    const config = {
      headers: {
        "Content-type": "application/json",
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${adminToken}`,
      },
    };

    useEffect(() => {
      axios.get(Base_URL+`/api/civil-admin/company/${id}/`, config)
        .then(res => {
          // console.log("34 res.data", res.data);
          setData(res.data)
          setName(res.data.full_Name)
          setDescription(res.data.staff_title)
          setEmail(res.data.email)
          setPhone(res.data.mobileNumber)
          setHome(res.data.home_address)
        })
        .catch(err => console.log(err));
    },[])
  

    const UpdateCompanyMember = (e) => {
      e.preventDefault()

      var data1 = {}
      if (photo) {
        data1 = {
          'full_Name': name, 
          'staff_title': description, 
          'staff_img': photo, 
          'email': email, 
          'mobileNumber': phone, 
          'home_address': home, 
        } 
      } else {
        data1 = {
          'full_Name': name, 
          'staff_title': description, 
          'email': email, 
          'mobileNumber': phone, 
          'home_address': home, 
        } 
      }

      

      axios.patch(Base_URL+`/api/civil-admin/company/${id}/`, data1, config)
        .then(response => {
          // console.log(response.data)
          toast.success('Company Member Edited Successfully')
          setTimeout(() => {
            navigate('/admin/civil/company')
          }, 1000);
          })
        .catch(err => console.log(err));
    }


    

    return (
      <div className=" bg-slate-950  px-10 w-full h-full mt-12 text-white">

        {/* <div className="flex items-center justify-between">
          <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
          Detail Member
          </h1>{" "}
        </div>

        <div className="flex justify-between items-center mt-4 ml-1 mb-10 uppercase text-lg tracking-wide">
        <div>
          <p>ID: { data?.id}</p>
          <p>Full Name: { data?.full_Name}</p>
          <p>staff title: { data?.staff_title}</p>
          <p>email: { data?.email}</p>
          <p>Phone: { data?.mobileNumber}</p>
          <p>Image: <img src={data?.staff_img}e alt="" class="h-auto max-w-full rounded-lg w-60 h-70" /></p>
          <p>status: { data?.active?"Active":"Deactive"}</p>
          <p>created_at: { data?.created_at}</p>
          <p>last_update_at: { data?.last_update_at}</p>
        </div>
      </div> */}


        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Edit Member
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
          <span className="label-text text-white text-lg font-semibold tracking-wider">Staff Title</span>
        </label>
        <input type="text" className="h-12 pl-4 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Staff Title"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        
        <label className="label">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Photo</span>
        </label>
        <div className="h-52 border-2 border-dotted border-neutral-500 flex space-y-10 flex-col items-center justify-center">
            <p className=" text-2xl font-semibold tracking-wide">Drag and drop file here or click to upload</p>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex h-10 w-64 flex-col items-center justify-center rounded cursor-pointer bg-green-800 dark:hover:bg-bray-800 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className=" tracking-wider">Choose File</p>
                    </div>
              <input id="dropzone-file" type="file" className="hidden"
               onChange={(e) => {
                setPhoto(e.target.files[0])
                setPhotoName(e.target.files[0]?.name)
              }}
              />
                </label>
            </div> 
            <span className="text-1xl font-semibold tracking-wide mb-2">{ photoName ? photoName : ""}</span>
        </div>


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
          <span className="label-text text-white text-lg font-semibold tracking-wider">Home Address</span>
        </label>
        <textarea className="h-32 px-4 py-2 w-full  bg-slate-950  border rounded border-neutral-500 " placeholder="Enter Home Address"
        value={home}
        onChange={(e) => setHome(e.target.value)}
        ></textarea>

        </div>
        {/* Seo */}
     
        <div className="flex items-center justify-center mb-10">
          <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e)=>{UpdateCompanyMember(e)}}>
            Update
          </button>
        </div>
      </div>
    );
};

export default EditContact;