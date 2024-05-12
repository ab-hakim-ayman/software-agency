import React, { useState, useEffect } from 'react'
import TextareaTag from '../../Component/CustomTags/TextareaTag'
import PhoneNumber from '../../Component/CustomTags/PhoneNumber'
import InputType from '../../Component/CustomTags/InputType'
import SelectType from '../../Component/CustomTags/SelectType'
import axios from 'axios';
import { Base_URL } from './../../Constant';
import { toast } from 'react-hot-toast';
import { UnAuth } from '../../Auth_Middleware/UnAuth'

export default function Company_and_Contact() {
    const CompanyTypeData = [
        {
            "val": "Pr",
            "title": "Private"
        },
        {
            "val": "Pu",
            "title": "Public"
        },
        {
            "val": "O",
            "title": "Others"
        },
    ]
    const [IsLoading, setIsLoading] = useState(false)
    const [CompanyData, setCompanyData] = useState({
        Company_same: "",
        Company_type: "",
        Company_location: "",
        Company_website_url: "",
        Company_phone_dial_code: "880",
        Company_phone_number: "",
        Company_email: "",
        Company_details: "",
    })
    const [ContactData, setContactData] = useState({
        personal_phone_dial_code: "880",
        personal_phone_number: "",
        home_phone_dial_code: "880",
        home_phone_number: "",
        contact_email: "",
        contact_address: "",
    })
    const [userToken] = useState(localStorage.getItem('DTCUserToken'));
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.get(Base_URL + '/api/user/self/', {
                    headers: {
                        Authorization: "Bearer " + userToken,
                    },
                })
                  .then(response => {
                      setContactData(response.data.ContactInfo[0]);
                      setCompanyData(response.data.CompanyDetail[0]);
                  }).catch((e) => {
                      UnAuth(e)
                  })
            } catch (e) {
                toast.error('Network error When user data fetching ')
            }
        };
        if (userToken) {
            fetchData();
        }
    }, [userToken]);

    function checkObjectValuesNotEmpty(obj){
        return Object.values(obj).every(value => value !== null && value !== undefined && value !== '');
      }

    const handleCompanySubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        if(checkObjectValuesNotEmpty(CompanyData) === true){
            try {
                axios.post(Base_URL + '/api/user/update-company/', CompanyData, {
                    headers: {
                        Authorization: 'Bearer ' + userToken,
                    },
                })
                .then((res) => {
                    if (res.data.type === "success") {
                        toast.success(res.data.msg);
                        setIsLoading(false)
                    } else {
                        // toast.error(res.data.msg);
                        toast.error("Something wrong! make sure you filled all data");
                        setIsLoading(false)
                    }
                })
                .catch((e) => {
                    UnAuth(e);
                    setIsLoading(false)
                })
            } catch (error) {
                console.error(' Network Error');
                setIsLoading(false)
            }
        }else{
            toast.error("Something wrong! make sure you filled all data");
            setIsLoading(false)
        }
        
    };
    const handleContactSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        if(checkObjectValuesNotEmpty(ContactData) === true){
            try {
                axios.post(Base_URL + '/api/user/update-contact/', ContactData, {
                    headers: {
                        Authorization: 'Bearer ' + userToken,
                    },
                })
                .then((res) => {
                    if (res.data.type === "success") {
                        setIsLoading(false)
                        toast.success(res.data.msg);
                    } else {
                        // toast.error(res.data.msg);
                        setIsLoading(false)
                        toast.error("Something wrong! make sure you filled all data");
                    }
                })
                .catch((e) => {
                    UnAuth(e);
                    setIsLoading(false)
                })
            } catch (error) {
                setIsLoading(false)
                toast.error('Network Error');
            }
        }else{
            setIsLoading(false)
            toast.error("Something wrong! make sure you filled all data");
        }
    };
    const handleCompanyData = (e) => {
        setCompanyData({
            ...CompanyData,
            [e.target.name]: e.target.value
        });
    };
    const handleContactData = (e) => {
        setContactData({
            ...ContactData,
            [e.target.name]: e.target.value
        });
    };
    return (
        <>
            <div className='flex justify-center items-center pt-4 pb-4 w-full'>
                {/* Company Info */}
                <div className="mx-8 my-8 w-full">
                    <form onSubmit={handleCompanySubmit} className="mt-5 border-gray-900/10 pb-4">
                        <h2 className="text-center  text-3xl  font-bold leading-7 text-gray-900">Company </h2>
                        <div className="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                            <div className="sm:col-span-3 my-1">
                                <InputType  required={true} label="Company Name" type="text" name="Company_same" value={CompanyData?.Company_same} onChange={handleCompanyData} />
                            </div>
                            <div className="sm:col-span-3 my-1">
                                <SelectType  required={true} OptionsData={CompanyTypeData} label="Company Type" name="Company_type" value={CompanyData?.Company_type} onChange={handleCompanyData} />
                            </div>
                            <div className="sm:col-span-3 my-1">
                                <InputType  required={true} label="Company Location" type="text" name="Company_location" value={CompanyData?.Company_location} onChange={handleCompanyData} />
                            </div>
                            <div className="sm:col-span-3 my-1">
                                <InputType  required={true} label="Company Website URL" type="url" name="Company_website_url" value={CompanyData?.Company_website_url} onChange={handleCompanyData} />
                            </div>
                            <div className="sm:col-span-3 my-1 w-full">
                                <PhoneNumber  required={true} label="Company Phone Number" type="number" name="Company_phone_number" value={CompanyData?.Company_phone_number} onChange={handleCompanyData}
                                    code_field_value={CompanyData?.Company_phone_dial_code} obj={CompanyData} setState={setCompanyData} code_field_name='Company_phone_dial_code' />
                            </div>
                            <div className="sm:col-span-3 my-1">
                                <InputType  required={true} label="Company Email" type="email" name="Company_email" value={CompanyData?.Company_email} onChange={handleCompanyData} />
                            </div>
                        </div>
                        <div className="mt-5 ">
                            <div className="sm:col-span-3 my-1 w-full">
                                <TextareaTag  required={true}
                                    label="Company Details"
                                    name="Company_details"
                                    value={CompanyData?.Company_details}
                                    onChange={handleCompanyData}
                                    className="w-full ps-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        <div className=" flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                disabled={IsLoading}
                                className="md:w-[25%] rounded-md mt-3 bg-blue-950 p-3 font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-none "
                            >
                                {IsLoading ? "Loading..." :"Update data"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='flex justify-center items-center pb-4 w-full'>
                {/* Contact Info */}
                <div className="mx-8 mb-8 w-full">
                    <form onSubmit={handleContactSubmit} className="mt-5 border-gray-900/10 pb-5">
                        <h2 className="text-center  text-3xl  font-bold leading-7 text-gray-900">Contact </h2>
                        <div className="mt-5 grid grid-cols-1 gap-x-6 sm:grid-cols-6">
                            <div className="sm:col-span-3 my-1 w-full">
                                <PhoneNumber required={true}  label="Personal Contact" type="number" name="personal_phone_number" value={ContactData?.personal_phone_number} onChange={handleContactData}
                                    code_field_value={ContactData?.personal_phone_dial_code} obj={ContactData} setState={setContactData} code_field_name='personal_phone_dial_code' />
                            </div>
                            <div className="sm:col-span-3 my-1 w-full">
                                <PhoneNumber required={true}  label="Home Phone Number" type="number" name="home_phone_number" value={ContactData?.home_phone_number} onChange={handleContactData}
                                    code_field_value={ContactData?.home_phone_dial_code} obj={ContactData} setState={setContactData} code_field_name='home_phone_dial_code' />
                            </div>
                            <div className="sm:col-span-3 my-1">
                                <InputType required={true}  label="contact Email" type="email" name="contact_email" value={ContactData?.contact_email} onChange={handleContactData} />
                            </div>
                        </div>
                        <div className="mt-1 ">
                            <div className="sm:col-span-3 my-1 w-full">
                                <TextareaTag
                                    required={true} 
                                    label="Contact Address"
                                    name="contact_address"
                                    value={ContactData?.contact_address}
                                    onChange={handleContactData}
                                    autoComplete="contact_address"
                                    className="w-full ps-2 block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-gray-300 placeholder:text-gray-400"
                                />
                            </div>
                        </div>
                        <div className=" flex items-center justify-end gap-x-6">
                            <button
                                type="submit"
                                disabled={IsLoading}
                                className="md:w-[25%] rounded-md mt-3 bg-blue-950 p-3 font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-none "
                            >
                                {IsLoading? "Loading..." : "Update Contact"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}