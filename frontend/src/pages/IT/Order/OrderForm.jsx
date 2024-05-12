
import React, { useState, useEffect } from 'react';
import InputType from './../../../Component/CustomTags/InputType';
import SelectType from './../../../Component/CustomTags/SelectType';
import TextareaTag from './../../../Component/CustomTags/TextareaTag';
import PhoneNumber from './../../../Component/CustomTags/PhoneNumber';
import { GoXCircle } from "react-icons/go";
import CurrencyFilter from '../../../Component/AllFilter/CurrencyFilter';
import { toast } from 'react-hot-toast';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Base_URL } from '../../../Constant';
import { UnAuth } from '../../../Auth_Middleware/UnAuth';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import loaderGf from '../../../assets/Loader/Infinity.gif'


const OrderForm = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [personal_info, setpersonal_info] = useState({
    is_same: true,
    gender: "",
    title: "",
    date_of_birth: "",
    occupation: "",
    first_name: "",
    last_name: ""
  });
  const [present_address, setpresent_address] = useState({
    is_same: true,
    country: "",
    State: "",
    city: "",
    houseRoad: "",
    zipCode: ""
  });
  const [permanent_address, setpermanent_address] = useState({
    is_same: true,
    address: ""
  });
  const [company_details, setcompany_details] = useState({
    is_same: true,
    Company_same: "",
    Company_type: "",
    Company_location: "",
    Company_website_url: "",
    Company_phone_dial_code: "880",
    Company_phone_number: "",
    Company_email: "",
    Company_details: ""
  });
  const [contact_info, setcontact_info] = useState({
    is_same: true,
    personal_phone_dial_code: "880",
    personal_phone_number: "",
    home_phone_dial_code: "880",
    home_phone_number: "",
    contact_email: "",
    contact_address: ""
  });

  const [Obj_social_media, setObj_social_media] = useState({ name: "",link: ""}); 
  const [social_media, setsocial_media] = useState([])

  const [order_pdf, setorder_pdf] = useState([])
  const [order_pdfOne, setorder_pdfOne] = useState('')
  const [order_pdfTwo, setorder_pdfTwo] = useState('')
  const [order_pdfThree, setorder_pdfThree] = useState('')

  const [other_pdf, setother_pdf] = useState([])
  const [other_pdfOne, setother_pdfOne] = useState('')
  const [other_pdfTwo, setother_pdfTwo] = useState('')
  const [other_pdfThree, setother_pdfThree] = useState('')

  const [FinalAllData, setFinalAllData] = useState({
    user: 0,
    ProductIT: id,
    currency: "BDT",
    project_description: "",
    personal_info: personal_info,
    present_address: present_address,
    permanent_address: permanent_address,
    company_details: company_details,
    contact_info: contact_info,
    social_media: [],
  })


  // disabledPermanetADD
  const [ModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageOthers, seterrorMessageOthers] = useState('');
  const [userToken] = useState(localStorage.getItem('DTCUserToken'));

  useEffect(() => {
    if (isNaN(id)) {
      window.history.back(); 
    }
    setFinalAllData({...FinalAllData , ProductIT: id})
  }, [id])
  
  
  // Fetching user data
  useEffect(() => {
      const fetchData = async () => {
          try {
              await axios.get(Base_URL + '/api/user/self/', {
                  headers: {
                      Authorization: "Bearer " + userToken,
                  },
              })
              .then((response) => {
                    const allD = response?.data;
                    const pre_add = allD?.PresentAddress?.[0];
                    const per_add = allD?.PermanentAddress?.[0];
                    if (per_add?.houseRoad && per_add?.State && per_add?.city && per_add?.country && per_add?.zipCode) {
                      const full_add = "House/Road: "+ (per_add?.houseRoad || ' ') +", State: "+ (per_add?.State || ' ') +", City: "+ (per_add?.city || ' ') +", Country: "+ (per_add?.country || ' ') +", Zip Code"+ (per_add?.zipCode || ' ')
                      setpermanent_address({...permanent_address, address:  full_add })
                    }else{
                      const full_add = ''
                      setpermanent_address({...permanent_address, address:  full_add })
                    }
                    const com_detail =  allD?.CompanyDetail?.[0];
                    const con_info =  allD?.ContactInfo?.[0]
                    const soc_med = allD?.SocialMediaLink

                    setFinalAllData({...FinalAllData, user:allD?.id})

                    setpersonal_info({...personal_info, gender: allD?.gender || "", title: allD?.title || "", date_of_birth: allD?.date_of_birth || "", occupation: allD?.occupation || "", first_name: allD?.first_name || "", last_name: allD?.last_name || "" })
                    setpresent_address({...present_address, country: pre_add?.country || "", State: pre_add?.State || "", city: pre_add?.city || "", houseRoad: pre_add?.houseRoad || "", zipCode: pre_add?.zipCode || ""})
                    
                    setcompany_details({...company_details, Company_same: com_detail?.Company_same || "", Company_type: com_detail?.Company_type || "", Company_location: com_detail?.Company_location || "", Company_website_url: com_detail?.Company_website_url || "", Company_phone_dial_code: com_detail?.Company_phone_dial_code || "880", Company_phone_number: com_detail?.Company_phone_number || "", Company_email: com_detail?.Company_email || "", Company_details: com_detail?.Company_details || ""})
                    setcontact_info({...contact_info, personal_phone_dial_code: con_info?.personal_phone_dial_code || "880", personal_phone_number: con_info?.personal_phone_number || "", home_phone_dial_code: con_info?.home_phone_dial_code || "880", home_phone_number: con_info?.home_phone_number || "", contact_email: con_info?.contact_email || "", contact_address: con_info?.contact_address || "" })
                    setsocial_media(soc_med)
                    
                }).catch((e) => {
                    UnAuth(e)
                })
          } catch (e) {
              toast.error('Network error while fetching data!')
          }
      };
      if (userToken) {
          fetchData();
      }
  }, [userToken]);
  
  useEffect(() => {
    setFinalAllData({...FinalAllData,personal_info:personal_info})
  }, [personal_info])

  useEffect(() => {
    setFinalAllData({...FinalAllData,present_address:present_address})
  }, [present_address])

  useEffect(() => {
    setFinalAllData({...FinalAllData,permanent_address:permanent_address})
  }, [permanent_address])

  useEffect(() => {
    setFinalAllData({...FinalAllData,company_details:company_details})
  }, [company_details])
 


  // data change function start
  // ====================================================================
// ==================================   For All Sub Object     =================

  const handleAllDataChange = (e,myObj,setObg) => {
    setObg({
      ...myObj,
      [e.target.name]: e.target.value
    });

  };

  // console.log("======================")
  // console.log(company_details)
  // console.log(FinalAllData)


  function FunCheckChanged(e,obj,setobj){
    if (e.target.checked) {
      setobj({ ...obj, [e.target.name]: true}); 
    }
    else{
      setobj({ ...obj, [e.target.name]: false}); 
    }
  }

  useEffect(() => {
    setFinalAllData({...FinalAllData,contact_info:contact_info})
  }, [contact_info])


  useEffect(() => {
    setFinalAllData({...FinalAllData, social_media : social_media})
  }, [social_media])
  

  

  // =======================  Check Empty value of object
  function checkObjectValuesNotEmpty(obj){
    return Object.values(obj).every(value => value !== null && value !== undefined && value !== '');
  }

  // ======================================== Regex for checking URL
  const regex = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // IP address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator


  function checkLinkValuesValidation() {
     const url =  Obj_social_media.link
    return regex.test(url)
  }
  


  // ======================  add Link in Array Function
  function AddLinkInSubArraY()  {
    if(checkObjectValuesNotEmpty(Obj_social_media) === false){
      toast.error("Name or URL is empty")
      
    }else if (checkLinkValuesValidation() === false){
       toast.error("Please Enter valid URL")
    }
    else{
      const ArrayLink = [...social_media];
      setTimeout(() => {
        ArrayLink.push(Obj_social_media)
        setTimeout(() => {
          setsocial_media(ArrayLink)
          toast.success("New item Added Successfully")
        }, 300);
      }, 300);
    }
  }

  // delete Link from array
  function DeleteLinkFrom_SubArraY(id){
    const copyArray = [...social_media]
    copyArray.splice(id, 1);

    setTimeout(() => {
      setsocial_media(copyArray)
      toast.success(" Link Deleted Successfully ")
    }, 300);
 }

  

// data change function End
// =====================================================================
     
  const OrderPDFhandleChange = ({ file, fileList }) => {
    const files =  Array.from(fileList);
    if(fileList.length > 3 ){
      setErrorMessage('Maximum fie upload');
    }else{
      const selectedFilesWithSize = files.map((file) => ({
        file, size: file.size / 1024 / 1024, // Convert to MB
      }));

      const invalidFiles = selectedFilesWithSize.filter(
        (file) => file.size > 5
      );

      if (invalidFiles.length > 0) {
        setErrorMessage(
          `The following files exceed the maximum size of 5MB. : ${invalidFiles
            .map((file) => file.file.name)
            .join(', ')}.`
        );
      } else {
        setErrorMessage('');
        
        const arr = fileList.map((data)=>{ return data.originFileObj})
        setorder_pdf(fileList)
        if(arr[0]){
          setorder_pdfOne(arr[0])
        }
        if(arr[1]){
          setorder_pdfTwo(arr[1])
        }
        if(arr[2]){
          setorder_pdfThree(arr[2])
        }

        toast.success(" Queue updated")
        // setSelectedFiles(files);
      }
    }

  };

  
  const OthersFilehandleChange = ({ file, fileList }) => {
    const files =  Array.from(fileList);
    if(fileList.length > 3 ){
      seterrorMessageOthers('Maximum fie upload');
    }else{
      const selectedFilesWithSize = files.map((file) => ({
      file, size: file.size / 1024 / 1024, // Convert to MB
      }));

      const invalidFiles = selectedFilesWithSize.filter(
        (file) => file.size > 5
      );

      if (invalidFiles.length > 0) {
        seterrorMessageOthers(
          `The following files exceed the maximum size of 5MB. : ${invalidFiles
            .map((file) => file.file.name)
            .join(', ')}.`
        );
      } else {
        seterrorMessageOthers('');
        const arr = fileList.map((data)=>{ return data.originFileObj})
        setother_pdf(fileList);
        if(arr[0]){
          setother_pdfOne(arr[0])
        }
        if(arr[1]){
          setother_pdfTwo(arr[1])
        }
        if(arr[2]){
          setother_pdfThree(arr[2])
        }
        toast.success(" Queue updated");
        // setSelectedFiles(files);
      }
    }

  };


  // =====================   Submit =====================
  const [IsLoading, setIsLoading] = useState(false)
  const handleSubmit = (e) => {
    let OrderData = {
      order : 0,
      order_pdfOne : order_pdfOne ,
      order_pdfTwo : order_pdfTwo ,
      order_pdfThree : order_pdfThree ,
      other_pdfOne : other_pdfOne ,
      other_pdfTwo : other_pdfTwo ,
      other_pdfThree : other_pdfThree ,
    }
    e.preventDefault();
    setIsLoading(true)
    if(FinalAllData.user === 0 || FinalAllData.ProductIT === "" || FinalAllData.currency === ""){
      setIsLoading(false)
      return toast.error('user or product not found')
    }else if(FinalAllData.personal_info.is_same === false && checkObjectValuesNotEmpty(FinalAllData.personal_info) === false){
      setIsLoading(false)
      return toast.error('Please check no need to modify or Fill in all Personal data')
    }else if(FinalAllData.present_address.is_same === false && checkObjectValuesNotEmpty(FinalAllData.present_address) === false){
      setIsLoading(false)
      return toast.error('Please check no need to modify or Fill in all Present Address data')
    }else if(FinalAllData.permanent_address.is_same === false && checkObjectValuesNotEmpty(FinalAllData.permanent_address) === false){
      setIsLoading(false)
      return toast.error('Please check no need to modify or Fill in all Permanent Address data')
    }else if(FinalAllData.company_details.is_same === false && checkObjectValuesNotEmpty(FinalAllData.company_details) === false){
      setIsLoading(false)
      return toast.error('Please check no need to modify or Fill in all Company Details data')
    }else if(FinalAllData.contact_info.is_same === false && checkObjectValuesNotEmpty(FinalAllData.contact_info) === false){
      setIsLoading(false)
      return toast.error('Please check no need to modify or Fill in all Contact Info data')
    }else if(order_pdf.length < 1){
      setIsLoading(false)
      return toast.error('Please Upload atleast one Order pdf')
    }else{
      try{
        axios.post(`${Base_URL}/api/it/create-order/`, FinalAllData,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            "Authorization": "Bearer " + userToken,
          },
        })
        .then((resp) => {
          // console.log(resp)
          if (resp.data.type === "success" && resp.data.order) {
            OrderData['order'] = resp.data.order;

            setTimeout(() => {
              axios.post(`${Base_URL}/api/it/save-pdf-order-other/`, OrderData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  "Authorization": "Bearer " + userToken,
                },
              })
              .then((res) => {
                if(res.data.type= "success"){
                  setIsLoading(false);
                  toast.success(" Order creation completed "); 
                  navigate("/it/profile/Order", { replace: true });
                }else{
                  setIsLoading(false);
                  toast.error("Pdf Upload failed but order created");
                }
              })
              .catch((e) => {
                setIsLoading(false);
                UnAuth(e);
              })
            }, 400);
          } else {
            setIsLoading(false);
            toast.error("Sorry, Order creation failed");
          }
        }).catch((e) => {
          // console.log(e)
          setIsLoading(false);
          UnAuth(e);
        });
      }
      catch{
        setIsLoading(false);
        toast.error("Network Error");
      }
    }
  };

  const genderData = [
    {
      "val":"M",
      "title":"Male"
    },
    {
      "val":"F",
      "title":"Female"
    },
    {
      "val":"O",
      "title":"Others"
    },
  ]

  const CompanyTypeData = [
    {
      "val":"Pr",
      "title":"Private"
    },
    {
      "val":"Pu",
      "title":"Public"
    },
    {
      "val":"O",
      "title":"Others"
    },
  ]

  
  return (
    <div className="container mx-auto py-5" >
      { IsLoading && <div className='fixed z-[2000] top-0 bottom-0 left-0 right-0 w-[100%] h-screen bg-white flex justify-center items-center align-middle'> <img src={loaderGf} alt='loader' />  </div>}

      <h1 className="text-4xl font-bold mb-4 px-2 text-center pt-20 ">ORDER FORM</h1>
      <p className='text-xl font-semibold mb-4 px-2 text-center pb-20 '>Please fill up the form carefully</p>
      <form onSubmit={(e)=>handleSubmit(e)} className='pb-20' method="POST" type="form" encType="multipart/form-data">
      
      {/* Personal Information  */}
        <div className='block md:flex justify-between px-2'>
          <h2 className="text-xl font-bold mb-2 ">Personal Information </h2>
          <div className="flex items-center">
            <input name='is_same' checked={personal_info.is_same} onChange={(e)=>{FunCheckChanged(e,personal_info,setpersonal_info)}} id="perinfo" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="perinfo" className="ml-2 text-md  text-slate-950 ">No need to modify  my personal data change</label>
        </div>
        </div>
        <div className="block md:grid grid-cols-2 gap-1 gap-x-20 px-2 py-4">
          <InputType required={true} disabledPermanetADD={personal_info.is_same} label="Title" type="text"  name="title" value={personal_info.title} onChange={(e)=>handleAllDataChange(e,personal_info,setpersonal_info)}/>
          <InputType required={true} disabledPermanetADD={personal_info.is_same} label="First Name" type="text"  name="first_name" value={personal_info.first_name} onChange={(e)=>handleAllDataChange(e,personal_info,setpersonal_info)}/>
          <InputType required={true} disabledPermanetADD={personal_info.is_same} label="Last Name" type="text"  name="last_name" value={personal_info.last_name} onChange={(e)=>handleAllDataChange(e,personal_info,setpersonal_info)}/>
          <SelectType  disabledPermanetADD={personal_info.is_same} label="Gender" name="gender" value={personal_info.gender} onChange={(e)=>handleAllDataChange(e,personal_info,setpersonal_info)} OptionsData={genderData}/>

          <InputType required={true} disabledPermanetADD={personal_info.is_same} label="Date of Birth" type="date"  name="date_of_birth" value={personal_info.date_of_birth} onChange={(e)=>handleAllDataChange(e,personal_info,setpersonal_info)}/>
          <InputType required={true} disabledPermanetADD={personal_info.is_same} label="Occupation" type="text"  name="occupation" value={personal_info.occupation} onChange={(e)=>handleAllDataChange(e,personal_info,setpersonal_info)}/>
        </div>
        
        {/* Present Address */}
        <div className='block md:flex justify-between '>
          <h2 className="text-xl font-bold mb-2 px-2">Present Address </h2>
          <div className="flex items-center">
            <input name='is_same' checked={present_address.is_same} onChange={(e)=>{FunCheckChanged(e,present_address,setpresent_address)}} id="preinfo" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="preinfo" className="ml-2 text-md  text-slate-950 ">No need to modify  my Present Address change</label>
          </div>
        </div>
        <div className="block md:grid grid-cols-2 gap-1 gap-x-20 px-2 py-4"> 
          <InputType required={true} disabledPermanetADD={present_address.is_same} label="House/Road" type="text"  name="houseRoad" value={present_address.houseRoad} onChange={(e)=>handleAllDataChange(e,present_address,setpresent_address)} />
          <InputType required={true} disabledPermanetADD={present_address.is_same} label="Country" type="text"  name="country" value={present_address.country} onChange={(e)=>handleAllDataChange(e,present_address,setpresent_address)} />
          <InputType required={true} disabledPermanetADD={present_address.is_same} label="State/Province" type="text"  name="State" value={present_address.State} onChange={(e)=>handleAllDataChange(e,present_address,setpresent_address)} />
          
          <InputType required={true} disabledPermanetADD={present_address.is_same} label="City" type="text"  name="city" value={present_address.city} onChange={(e)=>handleAllDataChange(e,present_address,setpresent_address)} />
          <InputType required={true} disabledPermanetADD={present_address.is_same} label="Zip Code" type="text"  name="zipCode" value={present_address.zipCode} onChange={(e)=>handleAllDataChange(e,present_address,setpresent_address)} />
          
        </div>
        <div className='flex justify-start py-1 px-2'>
          <input name='is_same' checked={permanent_address.is_same} onChange={(e)=>{FunCheckChanged(e,permanent_address,setpermanent_address)}} type="checkbox" className='mr-2' id='sameAsPermanent' />
          <label className='mr-1 flex items-center' htmlFor="sameAsPermanent">Click Ok, if your present and permanent address are same.</label>
        </div>
        <div className='px-2'>
          <div className='flex justify-between py-1 ' >
            <label className='mr-1 flex items-center w-[30%] md:w-[20%]'>Full Permanent Address</label>
              <textarea required={true} disabled={permanent_address.is_same} readOnly={permanent_address.is_same}  rows={4} name="address" value={permanent_address.address} 
              onChange={(e)=>handleAllDataChange(e,permanent_address,setpermanent_address)}
            className={`border border-gray-400 p-2 rounded w-[70%] md:w-[50%] lg:w-[40%] mr-auto focus:outline-none  focus:shadow-md  ${permanent_address.is_same === true ?  " bg-gray-100": " "} `} placeholder='Full Permanent Address'
            ></textarea>
          </div>
        </div>

        {/* Company Details */}
        <div className='block md:flex justify-between '>
          <h2 className="text-xl font-bold mb-2 px-2">Company Details </h2>
          <div className="flex items-center">
            <input name='is_same' checked={company_details.is_same} onChange={(e)=>{FunCheckChanged(e,company_details,setcompany_details)}} type="checkbox" id="comDetinfo" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="comDetinfo" className="ml-2 text-md  text-slate-950 ">No need to modify  my Company Details change</label>
          </div>
        </div>
        <div className="block md:grid grid-cols-2 gap-1 gap-x-24 px-2 py-4">
          <InputType required={true} disabledPermanetADD={company_details.is_same} label="Company Name" type="text"  name="Company_same" value={company_details.Company_same} onChange={(e)=>handleAllDataChange(e,company_details,setcompany_details)}/>
          <SelectType disabledPermanetADD={company_details.is_same}  label="Company Type" name="Company_type" value={company_details.Company_type} onChange={(e)=>handleAllDataChange(e,company_details,setcompany_details)} OptionsData={CompanyTypeData}/>

          <InputType required={true} disabledPermanetADD={company_details.is_same}  label="Company Location" type="text"  name="Company_location" value={company_details.Company_location} onChange={(e)=>handleAllDataChange(e,company_details,setcompany_details)}/>
          <InputType required={true} disabledPermanetADD={company_details.is_same}  label="Company Website URL" type="url"  name="Company_website_url" value={company_details.Company_website_url} onChange={(e)=>handleAllDataChange(e,company_details,setcompany_details)}/>
          
          <PhoneNumber disabledPermanetADD={company_details.is_same}  label="Company Mob Number" type="number" name="Company_phone_number" value={company_details.Company_phone_number} onChange={(e)=>handleAllDataChange(e,company_details,setcompany_details)} 
                       code_field_value={company_details.Company_phone_dial_code} obj={company_details} setState={setcompany_details} code_field_name='Company_phone_dial_code' />
          
          
          <InputType required={true} disabledPermanetADD={company_details.is_same}  label="Company Email" type="email"  name="Company_email" value={company_details.Company_email} onChange={(e)=>handleAllDataChange(e,company_details,setcompany_details)}/>


        </div>
        
        <TextareaTag required={false} disabledPermanetADD={company_details.is_same} rows={4} label="Company Details" name="Company_details" value={company_details.Company_details} onChange={(e)=>handleAllDataChange(e,company_details,setcompany_details)} />

        
        {/* Contact Information */}

        <div className='block md:flex justify-between '>
          <h2 className="text-xl font-bold mb-2 px-2">Contact Information </h2>
          <div className="flex items-center">
            <input name='is_same' checked={contact_info.is_same} onChange={(e)=>{FunCheckChanged(e,contact_info,setcontact_info)}} id="continfo" type="checkbox" 
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="continfo" className="ml-2 text-md  text-slate-950 ">No need to modify  my Contact Information change</label>
          </div>
        </div>
        
        <div className="block md:grid grid-cols-2 gap-1 gap-x-24 px-2 py-4">
          <PhoneNumber disabledPermanetADD={contact_info.is_same} label="Personal Contact No" type="number" name="personal_phone_number" value={contact_info.personal_phone_number} 
                        onChange={(e)=>handleAllDataChange(e,contact_info,setcontact_info)}
                       code_field_value={contact_info.personal_phone_dial_code} obj={contact_info} setState={setcontact_info} code_field_name='personal_phone_dial_code' />

          <PhoneNumber  disabledPermanetADD={contact_info.is_same} label="Home contact No" type="number" name="home_phone_number" value={contact_info.home_phone_number} 
                        onChange={(e)=>handleAllDataChange(e,contact_info,setcontact_info)} 
                       code_field_value={contact_info.home_phone_dial_code} obj={contact_info} setState={setcontact_info} code_field_name='home_phone_dial_code' />

          
          <InputType required={true} disabledPermanetADD={contact_info.is_same} label="Email" type="email"  name="contact_email"  value={contact_info.contact_email}
          onChange={(e)=>handleAllDataChange(e,contact_info,setcontact_info)} />
          <InputType required={true} disabledPermanetADD={contact_info.is_same} label="Contact Address" type="text"  name="contact_address"  value={contact_info.contact_address}
           onChange={(e)=>handleAllDataChange(e,contact_info,setcontact_info)} />
        </div>

        {/* <SocialMediaLink/> */}
        <div className="mt-5 border-gray-900/10 pb-4  px-2">
            <h1 className="text-center  text-3xl  font-bold leading-7 text-gray-900">Social Links</h1>

            <div className="mt-5 block sm:flex items-end md:w-[80%] lg:w-[48%]">
              <div className="mr-0">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <select defaultValue={Obj_social_media.name} onChange={(e)=>handleAllDataChange(e,Obj_social_media,setObj_social_media)} id="name" name="name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none ">
                    <option value="">Select</option>
                    <option value="utube">Youtube </option>
                    <option value="facebook">Facebook</option>
                    <option value="twitter">Twitter</option>
                    <option value="linkedin">Linkedin</option>
                    <option value="instagram">Instagram</option>
                    <option value="liner">Liner</option>
                    <option value="skype">Skype</option>
                </select>
              </div>
              <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700">Add Link</label>
                <input onChange={(e)=>handleAllDataChange(e,Obj_social_media,setObj_social_media)} value={Obj_social_media.link}  type="url" name="link"  placeholder='http://google.com' id="name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none " />
              </div>
              <button type="button" className="btn cursor-pointer mt-1 block px-4 py-2 rounded-md bg-blue-950 font-semibold text-white shadow-sm hover:bg-slate-950 focus-visible:outline focus-visible:outline-none "
               onClick={AddLinkInSubArraY} >   Add 
              </button>
            </div>
        </div>
        {social_media?.length === 0 && <div className='w-full flex font-semibold text-slate-950 px-2'> No Social site added </div>}
        {social_media?.map((obj, i) => {
          return (
          <div key={i} className='w-full md:w-[80%] lg:min-w-[50%] mb-1 px-2'>
            <div className='w-full flex font-semibold text-slate-950 '>
                <span className='px-4 py-2 border border-r-0 border-blue-950 hover:text-slate-700'>{obj.name} :</span>
                <span className='px-4 py-2 border border-l-0 border-blue-950 hover:text-slate-700'>{obj.link}</span>
                <span onClick={() => DeleteLinkFrom_SubArraY(i)} className='px-4 py-2 flex items-center border border-l-0 text-xl border-blue-950 hover:bg-blue-950 hover:text-white'><GoXCircle /></span>
            </div>
          </div>
          );
        })}
        


        <h2 className="text-xl font-bold mt-8 mb-2 px-2">Project Document</h2>
        <div className="block">
        <div className='flex justify-between py-1 relative px-2 '>
            <label className='mr-1 w-[30%] md:w-[20%]'>Which currency will you pay in?</label>
            <input
              type="text"
              name="currency"
              placeholder='Currency'
              onClick={()=>setModalOpen(true)}
              value={FinalAllData.currency} readOnly required
              className="border border-gray-400 p-2 rounded w-[70%] md:w-[40%] mr-auto  focus:outline-none  focus:shadow-md"
            />
            {ModalOpen &&<CurrencyFilter setModalOpen={setModalOpen} name="currency" projectDocument={FinalAllData} setProjectDocument={setFinalAllData} />}
          </div>
          <div className='flex justify-between py-1 px-2' >
            <label className='mr-1 w-[30%] md:w-[20%]'>Upload all order PDF</label>
            <div className='  w-[70%] mr-auto  '>
              <Upload
                multiple
                fileList={order_pdf}
                accept="application/pdf"
                onChange={OrderPDFhandleChange}
                beforeUpload={() => false}
                className="upload-list-inline"
              >
                <Button className='btn-md border-gray-400 focus:outline-none   focus:shadow-md focus:text-gray-400 focus:border-gray-400 w-[100%]' icon={<UploadOutlined />}>Select PDF Files</Button>
              </Upload>
            </div>
          </div>
          {errorMessage && <p className='text-red-600'>{errorMessage}</p>}
          <div className='flex justify-between py-1 px-2'>
            <label className='w-[30%] md:w-[20%] mr-1'>Other documents</label>
            <div className='  w-[70%] mr-auto  '>
              <Upload
                multiple
                fileList={other_pdf}
                beforeUpload={() => false}
                onChange={OthersFilehandleChange}
                className="upload-list-inline "
              >
                <Button className='btn-md border-gray-400 focus:outline-none  focus:shadow-md focus:text-gray-400 focus:border-gray-400 w-[100%]' icon={<UploadOutlined />}>Select Other Files</Button>
              </Upload>
            </div>
          </div>
          {errorMessageOthers && <p className='text-red-600'>{errorMessageOthers}</p>}
          
          <div className='flex justify-between py-1 px-2'>
            <label className='mr-1 w-[30%] md:w-[20%]'>Project Description</label>
            <textarea
              rows={6}
              name="project_description"
              value={FinalAllData.project_description}
              placeholder='Project Description'
              onChange={(e)=>handleAllDataChange(e,FinalAllData,setFinalAllData)}
              className="border border-gray-400 p-2 rounded w-[70%] md:w-[40%] mr-auto  focus:outline-none  focus:shadow-md"
            ></textarea>
          </div>
        </div>

        <button
          disabled={IsLoading}
          type="submit"
          className="bg-white hover:bg-gray-800 border border-spacing-2 border-black text-black hover:text-slate-100 font-bold py-2 px-4 rounded my-24 w-[95%] md:float md:w-[30%] mx-auto md:mx-0  block "
        >
          {IsLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;