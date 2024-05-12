import React, { useEffect, useState } from 'react';
import { GoXCircle } from "react-icons/go";
import InputType from '../../Component/CustomTags/InputType';
import PhoneNumber from '../../Component/CustomTags/PhoneNumber';
import SelectType from '../../Component/CustomTags/SelectType';
import img from '../../assets/image/avatar.jpg'
import axios from 'axios';

// ant design
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { Base_URL } from './../../Constant';
import { UnAuth } from '../../Auth_Middleware/UnAuth';
import { toast } from 'react-hot-toast';
import loaderGf from '../../assets/Loader/Infinity.gif'




const PersonalProfile = () => {
    const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    const [AllData, setAllData] = useState({})
    const [IsLoadingProfileB, setIsLoadingProfileB] = useState(false)
    const [Social_links, setSocial_links] = useState({name:'',link:''})
    const [IsLoading, setIsLoading] = useState(false)
    const [DTCUserToken,setDTCUserToken] = useState(localStorage.getItem('DTCUserToken'));
    const [SocialMediaLinkArray, setSocialMediaLinkArray] = useState([])

    useEffect(() => {
        setDTCUserToken(localStorage.getItem('DTCUserToken'))
    }, [localStorage.getItem('DTCUserToken')])
    

    const [userData, setUserData] = useState({
        title: "",
        first_name: "",
        last_name: "",
        father_name: "",
        mother_name: "",
        date_of_birth: "",
        gender: "",
        marital_status: "",
        blood_group: "",
        occupation: "",
        countryName: "",
        phoneNumber: "",
        PhoneDialCode : ""
    })

    const fetchData = async () => {
        try {
            await axios.get(Base_URL+'/api/user/self/', {
            headers: {
                Authorization: "Bearer " + DTCUserToken,
            },
            })
            .then(response =>{
                setAllData(response.data);
                setSocialMediaLinkArray(response.data.SocialMediaLink)
            }).catch((e)=>{
                UnAuth(e)
            })
        } catch (e) {
            toast.error('Network Error ')
        }
    };

    useEffect(() => {
        if(DTCUserToken){
            fetchData();
        }
    }, [DTCUserToken]);
    
    useEffect(() => {
        setUserData({...userData, 
            title : AllData.title || "",
            first_name : AllData.first_name || "",
            last_name: AllData.last_name || "",
            username: AllData.username || "",
            father_name: AllData.father_name || "",
            mother_name: AllData.mother_name || "",
            date_of_birth: AllData.date_of_birth || "",
            gender: AllData.gender || "",
            marital_status: AllData.marital_status || "",
            blood_group: AllData.blood_group || "",
            occupation: AllData.occupation || "",
            countryName: AllData.countryName || "",
            phoneNumber: AllData.phoneNumber || "",
            PhoneDialCode : AllData.PhoneDialCode || "",
        })
    }, [AllData])

    
    

    const handleProfileChange = (e) => {
        setUserData({
          ...userData,
          [e.target.name]: e.target.value
        });
      };


    // Profile data update
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoadingProfileB(true)
        try {
          axios.patch(`${Base_URL}/api/user/profile-update/${AllData.id}/`, userData, {
            headers: {
              Authorization: 'Bearer ' + DTCUserToken,
            },
          })
          .then((response)=>{
            setIsLoadingProfileB(false)
            if(response.data.type === 'success'){
                toast.success(response.data.msg)
            }else{
                toast.error(response.data.msg)
            }
          }).catch((e)=>{
                setIsLoadingProfileB(false)
                toast.error('Sorry, try again!');
          })
        } catch (error) {
            setIsLoadingProfileB(false)
            toast.error('Network Error');
        }
      };
    
    const SocialMediaLinkDelete = async (id) => {
        if(DTCUserToken && id){
            try {
                const response = await axios.post(Base_URL+'/api/user/social-link-delete/'+id+'/', {}, {
                    headers: {
                        Authorization: 'Bearer ' + DTCUserToken,
                    }
                });
                
                setIsLoading(false);
    
                if(response.data.type === 'success'){
                    fetchData();
                    toast.success(response.data.msg);
                } else {
                    toast.error(response.data.msg);
                }
            } catch (error) {
                setIsLoading(false);
                if (error.response && error.response.status === 401) {
                    toast.error('401 error');
                    UnAuth(error)
                } else if (error.response) {
                    toast.error('Request failed with status ' + error.response.status);
                } else if (error.request) {
                    toast.error('No response received');
                } else {
                    toast.error('Error setting up the request');
                }
            }
        }
    };

    function SocialMediaLinkAdd(e){
        e.preventDefault()
        setIsLoading(true)
        if(Social_links.name && Social_links.link){
            try {
                axios.post(`${Base_URL}/api/user/social-link-create/`, Social_links, {
                  headers: {
                    Authorization: 'Bearer ' + DTCUserToken,
                  },
                })
                .then((response)=>{
                  setIsLoading(false)
                  if(response.data.type === 'success'){
                      fetchData();
                      toast.success(response.data.msg)
                  }else{
                      toast.error(response.data.msg)
                  }
                }).catch((e)=>{
                      setIsLoading(false)
                      toast.error('Sorry, try again!');
                      UnAuth(e)
                })
              } catch (error) {
                  setIsLoading(false)
                  toast.error('Network Error');
              }
        }else{
            setIsLoading(false)
            toast.error('name or link empty');
        }
        
    }

    // ant design
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([
        {
        uid: AllData?.id || '123456',
        name: AllData?.username ||"profile",
        status: 'done',
        url:  Base_URL+AllData?.profile_picture || img,
        },
    ]);

    useEffect(() => {
        const array = []
        const obj = {
            ...fileList,
            uid: AllData?.id || "123",
            name: AllData?.username ||"profile",
            status: 'done',
            url:  Base_URL+AllData?.profile_picture || img,
        }
        array.push(obj)
        setFileList(array)
    }, [AllData])
    

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    
    const uploadButton = (
        <div className=''>
            <PlusOutlined />
            <div className='mt-0' > Upload </div>
        </div>
    );
    //   ant design

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
    
    function profilePictureUpdate(e){
        e.preventDefault()
        setIsLoading(true)
        if(fileList[0]?.originFileObj && DTCUserToken){
            const profile_picture = {'profile_picture' : fileList[0].originFileObj}
            try {
                axios.post(`${Base_URL}/api/user/profile-pic-update/`, profile_picture , {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + DTCUserToken,
                  },
                })
                .then((response)=>{
                  setIsLoading(false)
                  if(response.data.type === 'success'){
                      fetchData();
                      toast.success(response.data.msg)
                  }else{
                      toast.error(response.data.msg)
                  }
                }).catch((e)=>{
                      setIsLoading(false)
                      toast.error('Sorry, try again!');
                      UnAuth(e)
                })
              } catch (error) {
                  setIsLoading(false)
                  toast.error('Network Error');
              }
        }else{
            setIsLoading(false)
            toast.error('name or link empty');
        }

    }

    return (
        <div className=" ">
                
                { IsLoading && <div className='fixed z-[2000] top-0 bottom-0 left-0 right-0 w-[100%] h-screen bg-white flex justify-center items-center align-middle'> <img src={loaderGf} alt='loader' />  </div>}
                <div className="">
                    <div className=" border-gray-900/10 pb-3">
                        <h2 className="text-center text-3xl mt-4 mb-2 font-bold leading-7 text-gray-900">Personal Infomation</h2>
                        
                        <form onSubmit={profilePictureUpdate} className="m-3 flex flex-col justify-center py-5 text-center text-blue-950"  type="form" encType="multipart/form-data">
                            {/* photo upload */}
                            <div className="px-4 sm:px-0">
                                <div className="flex my-2 mx-auto ">
                                    <Upload
                                        listType="picture-circle"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                        className='my-auto'
                                        maxCount={1}
                                        accept="image/png, image/jpeg, image/jpg"
                                        beforeUpload={() => false}
                                    >
                                        {fileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                                        <img
                                        alt="example"
                                        className='w-full  border border-blue-950'
                                        src={previewImage}
                                        />
                                    </Modal>
                                </div>
                                <button type='submit' className='w-full md:w-[40%] lg:w-[30%] py-2 bg-white hover:bg-blue-950 text-blue-950 hover:text-white border border-blue-950 text-xl text-center mx-auto '>Save</button>
                            </div>
                        </form>
                        <form onSubmit={handleSubmit} className="m-3 grid grid-cols-1 gap-x-6  sm:grid-cols-6"  type="POST" >
                            
                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} label="Title" type="text" name="title" value={userData.title || ""} onChange={handleProfileChange} />
                            </div>  
                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} label="First name" type="text" name="first_name" value={userData.first_name || ""} onChange={handleProfileChange} />
                            </div>  
                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} label="Last name" type="text" name="last_name" value={userData.last_name || ""} onChange={handleProfileChange} />
                            </div>  
                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} label="Username" disabledPermanetADD={true} type="text" name="username" value={AllData.username} />
                            </div>  
                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} label="Father's name" type="text" name="father_name" value={userData.father_name || ""} onChange={handleProfileChange} />
                            </div>  
                            
                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} label="Mother's name" type="text" name="mother_name" value={userData.mother_name || ""} onChange={handleProfileChange} />
                            </div>  

                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} label="Date of Birth" type="date" name="date_of_birth" value={userData.date_of_birth  || ""} onChange={handleProfileChange} />
                            </div>  

                            <div className="sm:col-span-3 my-1">
                                <SelectType required={true} OptionsData={genderData} label="Gender" type="text" name="gender" value={userData.gender || ""} onChange={handleProfileChange} />
                            </div>

                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} label="Maritial Status" type="text" name="marital_status" value={userData.marital_status || ""} onChange={handleProfileChange} />
                            </div>  

                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} label="Blood Group" type="text" name="blood_group" value={userData.blood_group || ""} onChange={handleProfileChange} />
                            </div>

                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} label="Occupation" type="text" name="occupation" value={userData.occupation || ""} onChange={handleProfileChange} />
                            </div>

                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} label="Country" type="text" name="countryName" value={userData.countryName || ""} onChange={handleProfileChange} />
                            </div>  

                            <div className="sm:col-span-3 my-1 w-full">
                                <PhoneNumber required={true} label="Phone Number" type="number" name="phoneNumber" value={userData.phoneNumber || ""} onChange={handleProfileChange} 
                                code_field_value={userData.PhoneDialCode} obj={userData} setState={setUserData} code_field_name='PhoneDialCode' />
                            </div>

                            <div className="sm:col-span-3 my-1">
                                <InputType required={true} disabledPermanetADD={true} label="Email" type="email" name="email" value={AllData.email}  />
                            </div>  
                            <div className="">
                                <button disabled={IsLoadingProfileB} type="submit" className=" m-3 rounded-md mt-3 bg-blue-950 p-3 font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-none "
                                >
                                    { IsLoadingProfileB ? "Loading..." : "Update data"}
                                </button>
                            </div>                          
                        </form>
                    </div>

                </div>

                

                <form className="m-3 border-gray-900/10 pb-5">
                    <h1 className="text-center  text-3xl  font-bold leading-7 text-gray-900">Social Links</h1>

                    <div className="mt-5 block sm:flex items-end md:w-[80%] lg:w-[48%]">
                        <div className="mr-0">
                            <label className="block text-sm font-medium text-gray-700">Type</label>
                            <select onChange={(e)=>{setSocial_links({...Social_links,name:e.target.value})}} id="type" name="name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="">Select</option>
                                <option value="youtube">Youtube </option>
                                <option value="fb">Facebook</option>
                                <option value="twitter">Twitter</option>
                                <option value="linkedin">Linkedin</option>
                                <option value="instagram">Instagram</option>
                                <option value="liner">Liner</option>
                                <option value="others">Other</option>
                            </select>
                        </div>
                        <div className='w-full'>
                            <label className="block text-sm font-medium text-gray-700">Add Link</label>
                            <input  onChange={(e)=>{setSocial_links({...Social_links,link:e.target.value})}} 
                             type="url" name="link" required placeholder='Add Link' id="input" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <button onClick={(e)=>SocialMediaLinkAdd(e)} type="submit" className="mt-1 block px-4 py-2 rounded-md bg-blue-950 font-semibold text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-none "> Add 
                        </button>
                    </div>
                </form>

                <div className='m-3 pb-8'>
                    {
                        SocialMediaLinkArray && SocialMediaLinkArray.map((data, i)=>{
                            return <div key={i} className='w-full md:w-[90%] lg:w-[60%] mb-1'>
                                <div className='w-full flex font-semibold text-slate-950 '>
                                    <span className='px-4 py-2 border border-r-0 border-blue-950 hover:text-slate-700'>{data.name} :</span>
                                    <span className='px-4 py-2 border border-l-0 border-blue-950 hover:text-slate-700'>{data.link}</span>
                                    <span onClick={()=>SocialMediaLinkDelete(data.id)} className='px-4 py-2 flex items-center border border-l-0 text-xl border-blue-950 hover:bg-blue-950 hover:text-white'><GoXCircle /></span>
                                </div>
                            </div>
                        })
                    }
                </div>
        </div>
    );
};

export default PersonalProfile;