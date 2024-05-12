import React from 'react';
import axios from 'axios';
import { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-hot-toast';
import { Base_URL } from '../../../Constant';

const ContackUs = ({bgColor, textColor, hoverBGColor, hoverTextColor, borderColor}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone_number: '',
        Company_name: '',
        subject: '',
        comment: '',
        website_url:''
    });

    const [IsLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(false)
        try {
            const response = await axios.post(Base_URL+'/api/it/contact-msg-send/', formData);
            const res = response.data;
            if(res.type === "success" ){
                setIsLoading(false)
                toast.success(res.msg)
            }else{
                setIsLoading(false)
                toast.error(res.msg)
            }
        } catch (error) {
            setIsLoading(false)
            toast.error('Network Error !');
        }
    };
    return (

        <div className={` ${textColor?textColor:' text-blue-950 '} ${bgColor?bgColor:' bg-slate-100 '}  px-2 `}>
            <div className='block lg:flex justify-around py-16 lg:pb-16 lg:mx-0'>

                <div className='hidden text-center lg:flex flex-col my-auto px-0 pb-14 lg:w-[45%] '>

                    <div className=' block'>
                        <FontAwesomeIcon className='fa-2xl mb-3 text-gray-900' icon={faLocationDot} />
                        <h1 className='text-xl font-bold mb-2'>Address</h1>
                        <h1 className='text-md font-bold mb-2'>Surkhet,NP12</h1>
                        <h1 className='text-md font-bold mb-2'>Birendranath 06</h1>
                    </div>

                    <div className=' mt-3'>
                        <FontAwesomeIcon className='fa-2xl mt-2 mb-3 text-gray-900' icon={faPhone}></FontAwesomeIcon>
                        <h1 className='text-xl font-bold'>Phone</h1>
                        <h1 className='text-md font-bold'>+006 124 536 436</h1>
                        <h1 className='text-md font-bold'>+006 124 536 436</h1>
                    </div>

                    <div className=' mt-3 text-center'>
                        <FontAwesomeIcon className='fa-2xl mt-2 mb-3 text-gray-900' icon={faEnvelope}></FontAwesomeIcon>
                        <p className='text-xl font-bold'>Email </p>
                        <p className='text-md font-bold'>codinglab@gmail.com </p>
                        <p className='text-md font-bold'>info.codinglab@gmail.com </p>
                    </div>
                </div>


                <form className=' w-[100%] lg:w-[55%]  pb-2 px-4'>
                    <h1 className='font-bold text-3xl mb-3  '>Send us a message<span className='text-lg'>🚀</span></h1>
                    <div className='text-black w-[100%] lg:w-[90%] xl:w-[80%] block '>
                        <input required name='fullName' type="text" placeholder="Enter your Name" className={` input ps-5 mb-3 input-bordered input-md w-full max-w-s ${borderColor ? borderColor : " border border-blue-950 "} `}
                         value={formData.fullName}
                         onChange={handleInputChange}
                        />
                        <input required name='email' type="email" placeholder="Enter your Email" className={` input ps-5 mb-3 input-bordered input-md w-full max-w-s ${borderColor ? borderColor : " border border-blue-950 "} `}
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        <input required name='phone_number' type="number" placeholder="Phone Number" className={` input ps-5 mb-3 input-bordered input-md w-full max-w-s ${borderColor ? borderColor : " border border-blue-950 "} `}
                         value={formData.phone_number}
                         onChange={handleInputChange}
                        />
                        <input name='Company_name' type="text" placeholder="Company Name" className={` input ps-5 mb-3 input-bordered input-md w-full max-w-s ${borderColor ? borderColor : " border border-blue-950 "} `}
                        value={formData.Company_name}
                        onChange={handleInputChange}
                        />
                        <input name='website_url' type="url" placeholder="Website URL" className={` input ps-5 mb-3 input-bordered input-md w-full max-w-s0 ${borderColor ? borderColor : " border border-blue-950 "} `}
                         value={formData.website_url}
                         onChange={handleInputChange}
                        />
                        <input name='subject' type="text" placeholder="Subject" className={` input ps-5 mb-3 input-bordered input-md w-full max-w-s0 ${borderColor ? borderColor : " border border-blue-950 "} `}
                         value={formData.subject}
                         onChange={handleInputChange}
                        />
                        <textarea name='comment' placeholder="Enter your Message" className={`  " mt-1  textarea  textarea-bordered textarea-md pb-8 w-full max-w-s " ${borderColor ? borderColor : " border border-blue-950 "} `}
                        value={formData.comment}
                        onChange={handleInputChange}
                        ></textarea>
                        <br />
                    <div className=''>
                        <button className={` min-w-[25%] w-[45%] float-right btn ${bgColor ? bgColor : ' bg-white '} ${textColor ? textColor : ' text-blue-950 '} ${hoverTextColor ? hoverTextColor : ' hover:text-white '} ${hoverBGColor ? hoverBGColor : '  hover:bg-blue-900  '} ${borderColor ? borderColor : ' border border-blue-900  '}  mt-2 bg-white  `} onClick={(e) => { handleSubmit(e) }}>
                            {IsLoading? "Loading...":"Send Message"}
                        </button>
                    </div>
                    </div>
                </form>
            </div>

            {/* <Paginatio></Paginatio> */}
        </div>

    );
};

export default ContackUs;