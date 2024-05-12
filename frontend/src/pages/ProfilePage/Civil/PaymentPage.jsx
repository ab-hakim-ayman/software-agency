import { useEffect, useState, useMemo } from "react";
import bank from "../../../assets/image/bank.png";
import qr_code from "../../../assets/image/qr.png";
import { Button, Input, Upload, Space, Modal, Tooltip } from "antd";
import { useLocation,useNavigate } from 'react-router-dom';
import { UploadOutlined, UserOutlined, BankOutlined, WalletOutlined } from "@ant-design/icons";
import loaderGf from '../../../assets/Loader/Infinity.gif'

import {AiFillMoneyCollect, AiFillPhone, AiOutlineMail} from "react-icons/ai"
import toast from "react-hot-toast";
import { UnAuth } from "../../../Auth_Middleware/UnAuth";
import { Base_URL } from "../../../Constant";
import axios from "axios";


// Select Component creator.... a function which create select tag dynamicly
const CustomDropdown = (name, options, onSelect, selectedOption ) => {
  return (
    <div key={Math.random()} className="mt-4 flex items-center">
      <button className=" h-full py-3 btn-sm md:mr-2 mr-1 px-3 bg-gradient-to-r from-pink-600 to-violet-600 text-white border-[0.3px] rounded-md  font-semibold" > 
        Select {name}
      </button>
      <div className="flex">
        <select defaultValue={selectedOption || ''} onChange={(e)=>onSelect(e.target.value)} className=" h-full py-3 btn-sm md:mr-2 mr-1 px-3 bg-gray-100 text-slate-600 border-[0.3px] border-slate-400 rounded-md  font-semibold focus:outline-none" >
          <option  >Select {name}</option>
          {options.map((option, index) => {
            return <option key={index} value={option}>
              {option}
            </option>
          })}
        </select>
      </div>
    </div>
  );
};

const PaymentPage = () => {
 
  const location = useLocation();
  const navigate = useNavigate()
  const data = location.state;
  const [AllOrderData, setAllOrderData] = useState(data?.item);
  
  const [userToken] = useState(localStorage.getItem('DTCUserToken'));
  const [PAymentData, setPAymentData] = useState([]);
  
  const [PayementMethod, setPayementMethod] = useState([]);
  const [BankComponent, setBankComponent] = useState('');
  const [CountryComponent, setCountryComponent] = useState('');
  const [SelectBank, setSelectBank] = useState('');
  const [SelectCountry, setSelectCountry] = useState('');
  const [SpecificBank, setSpecificBank] = useState('');

  
  const [open, setOpen] = useState(false)
  const [IsLoading, setIsLoading] = useState(false);
  
  
  const [FormData, setFormData] = useState({
    order : '',
    bank  : '',
    amount  : AllOrderData?.total_price - (AllOrderData?.total_online_paid + AllOrderData?.total_offline_paid),
    Transaction_id  : '',
    account_Info  : '',
    acc_holder_mail  : '',
    acc_holder_phone  : '',
    pay_receipt_doc  : '',
  });

  // All data from Order
  useMemo(() => {
    if (!data || data === '' || data === null || Object.values(data).length === 0 || data === 'null' ) {
      navigate('/it/profile/Order', { replace: true });
    } else {
      setAllOrderData(data.item);
      setFormData({...FormData , amount : Number(AllOrderData.total_price - (AllOrderData?.total_online_paid + AllOrderData?.total_offline_paid))});
      setFormData({...FormData , order : data.item.id});
    }
  }, [data]);


  // fetch account Data
  useMemo(() => {
    const fetchData = async () => {
        try {
            await axios.get(Base_URL+'/api/civil/account-view-all/', {
                headers: {
                    Authorization: "Bearer " + userToken,
                },
            })
            .then((res) => {
              setPAymentData(res.data)
              const methodsList = res.data.map((data)=>{
                return data.method_name
              })
              const meth =  new Set(methodsList)

            }).catch((e) => {
                UnAuth(e)
            })
        } catch (e) {
            toast.error('Network error when bank data fetching !')
        }
    };
    if (userToken) {
        fetchData();
    }
}, [userToken]);


// if payment method change
  useEffect(() => {
    setSpecificBank('')
    setFormData({...FormData , bank : ''});
    if(PayementMethod === 'Bank'){
      setCountryComponent('')
      setSelectBank('')
      const arr = []
      PAymentData.map((data)=>{
        return data.method_name === 'Bank' && arr.push(data.bank_name);  
      })
      const setCount = new Set(arr)
      const NewAttay =  [...setCount]
      setBankComponent(CustomDropdown('Bank', NewAttay, setSelectBank, SelectBank))
    }else if (PayementMethod === 'Mobile-E-Wallet') {
      const arr = []
      PAymentData.map((data)=>{
        return data.method_name !== 'Bank' && arr.push(data.country);  
      })
      const setCount = new Set(arr)
      const NewAttay =  [...setCount]
      setCountryComponent(CustomDropdown('Country', NewAttay, setSelectCountry, SelectCountry))
      setBankComponent('')
      setSelectBank('')
      
    }else{
      setBankComponent('')
      setSelectBank('')
      setCountryComponent('')
      setSelectCountry('')
    }
  }, [PayementMethod])

  
// id country change then this happen
  useEffect(() => {
    setSpecificBank('')
    setFormData({...FormData , bank : ''});
    setBankComponent('')
    setSelectBank('')
    if (SelectCountry !== '') {
      setSelectBank('')
      const arr = []
      PAymentData.map((data)=>{
        return data.method_name !== 'Bank' && data.country === SelectCountry && arr.push(data.bank_name);  
      })
      const setCount = new Set(arr)
      const NewAttay =  [...setCount]
      setBankComponent(CustomDropdown('Mobile E-Wallet', NewAttay, setSelectBank, SelectBank))
    }else{
      setSelectBank('') 
    }
  }, [SelectCountry])

// if Bank select or change then this happen
  useEffect(() => {
    if (SelectBank) {
      if (PayementMethod === 'Bank') {
        const arr = []
        PAymentData.map((data)=>{
          return data.method_name === 'Bank' && data.bank_name === SelectBank && arr.push(data);  
        })
        setSpecificBank(arr[0])
        setFormData({...FormData , bank : arr[0].id});
      }else if (SelectCountry) {
        const arr = []
        PAymentData.map((data)=>{
          return data.country === SelectCountry && data.bank_name === SelectBank && arr.push(data);  
        })
        setSpecificBank(arr[0]) 
        setFormData({...FormData , bank : arr[0].id});
      }else{
        setSpecificBank('') 
        setFormData({...FormData , bank : ''});
      }
    }else{
      setSpecificBank('')
      setFormData({...FormData , bank : ''});
    }
  }, [SelectBank])
  

// Change Payment Amount
function changePayAmount(e){
  const total = AllOrderData.total_price - (AllOrderData?.total_online_paid + AllOrderData?.total_offline_paid)
  if (total < e) {
    toast.error('your value is greater than Total payable price')
  }else{
    setFormData({...FormData , amount : Number(e)});
  }
}

// Change Payment Receipt file
const handleFileChange = (file) => {
  setFormData({...FormData ,pay_receipt_doc:file.fileList[0].originFileObj});
};

// Submit Payment 
const handleSubmit = async(e) => {
  e.preventDefault();
    setIsLoading(true)
  if (FormData.bank === '') {
    setIsLoading(false)
    return toast.error('Please select a bank account')
  }else if (FormData.order === '') {
    setIsLoading(false)
    return toast.error('Something wrong ! Order not found')
    
  }else if (FormData.amount === '') {
    setIsLoading(false)
    return toast.error('Amount can not be empty')
    
  }else if (FormData.Transaction_id === '') {
    setIsLoading(false)
    return toast.error('Transaction ID empty')
    
  }else if (FormData.account_Info === '') {
    setIsLoading(false)
    return toast.error('Account Info Empty')
    
  }else if (FormData.acc_holder_mail === '') {
    setIsLoading(false)
    return toast.error('Please, provide account holder Email')
    
  }else if (FormData.acc_holder_phone === '') {
    setIsLoading(false)
    return toast.error('Please, provide account holder Phone Number')
    
  }else if (FormData.pay_receipt_doc === '') {
    setIsLoading(false)
    return toast.error('Please, provide Document/ Receipt')
    
  }else{
    try{
      await axios.post(Base_URL+'/api/civil/make-payment/', FormData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + userToken,
        },
      })
      .then((res) => {
        if (res.data.type === 'success') {
          setIsLoading(false)
          toast.success("Payment Success")
          navigate('/civil/profile/Order', { replace: true });
        }else{
          setIsLoading(false)
          toast.error(res.data.message)
          toast.success("Payment failed")
        }
      }).catch((e) => {
        UnAuth(e)
        setIsLoading(false);
      })
    }
    catch{
      setIsLoading(false);
      toast.error("Network Error");
    }
  } 

};

console.log(FormData)

  return (
    <div className="md:p-5 flex flex-col  justify-center items-center bg-white">
      { IsLoading && <div className='fixed z-[2000] top-0 bottom-0 left-0 right-0 w-[100%] h-screen bg-white flex justify-center items-center align-middle'> <img src={loaderGf} alt='loader' />  </div>}
      <h1 className="w-full text-3xl text-center mt-4 mb-8 font-semibold"> Payment form for Civil Products </h1>
      <div className="flex flex-col  justify-center">
        {/* payment change start */}
        <Space className="my-2 flex">
          <button 
            className=" h-full py-3 btn-sm md:mr-2 mr-1 px-3 bg-gradient-to-r from-pink-600 to-violet-600 text-white  border-[0.3px] rounded-md  font-semibold"
            icon={<WalletOutlined />}
          >
            Total Payment <span className="text-lg px-2"> { AllOrderData?.total_price - (AllOrderData?.total_online_paid + AllOrderData?.total_offline_paid) } <span className="mx-1" >{AllOrderData?.currency}</span> </span> 
          </button>
          {
            AllOrderData?.payment_left > 0 &&
            <input
            type="number"
            placeholder="Total Pay Amount"
            value={FormData?.amount}
            disabled={AllOrderData?.payment_left === 0}
            readOnly={AllOrderData?.payment_left === 0}
            onChange={(e)=>changePayAmount(e.target.value)}
            className=" h-full w-full max-w-xs p-3 bg-white border-[0.3px] border-slate-950 rounded-md focus:outline-none"
            />
          }
          {
            AllOrderData?.payment_left === 0 &&
            <button
              className=" h-full w-full max-w-xs p-3 bg-white border-[0.3px] border-slate-950 rounded-md focus:outline-none"
              icon={<WalletOutlined />}
            >
              {FormData?.amount}
            </button>
          }
          <button
            className="h-full py-3 btn-sm md:mr-2 mr-1 px-3 bg-gradient-to-r  from-pink-600 to-violet-600 text-white  border-[0.3px] rounded-md  font-semibold"
          > {AllOrderData?.currency} </button>
        </Space>
        {/* payment change end */}

        <div className="mt-4 flex justify-start">
          <button disabled className=" h-full py-3 btn-sm md:mr-2 mr-1 px-3 bg-gradient-to-r from-pink-600 to-violet-600 text-white  border-[0.3px] rounded-md  font-semibold"
          >
            Select Payment Method
          </button>
          <div className="flex flex-col-reverse">
            <select
              className=" h-full py-3 btn-sm md:mr-2 mr-1 px-3 bg-gray-100 text-slate-600 border-[0.3px] border-slate-400 rounded-md  font-semibold focus:outline-none"
              onChange={(e) => setPayementMethod(e.target.value)}
              defaultValue={PayementMethod}
            >
              <option value="">Select One</option>
              <option value="Bank">Bank</option>
              <option value="Mobile-E-Wallet">Mobile E-Wallet</option>
            </select>
          </div>
        </div>

        
        {/* Country Select Component */}
        {CountryComponent}

        {/* Bank Select Component */}
        {BankComponent}

      </div>
      <div className="mt-8  items-center">
        {
          SpecificBank  && <div className="flex flex-col md:flex-row pb-2">

          <div className="md:mx-8 mt-5">
            <img className="w-24 md:w-32 lg:w-36 mx-auto" src={SpecificBank?.bank_img || bank} alt={SpecificBank?.bank_img || "bank logo"} />
          </div>

          <div className="md:mx-8 mt-5">
            <h1 className="text-lg font-semibold text-center pb-4">Company Account {PayementMethod}</h1>
            <pre className="text-left"> {SpecificBank?.account_details}  </pre>
          </div>
          <div className="md:mx-8 mt-5 mb-3 items-start p-2">
            
            <Tooltip title="Click To Zoom">
              <img
                onClick={() => setOpen(true)}
                className="w-[160px] h-[170px] block mx-auto cursor-pointer border-[0.3px] shadow-md"
                src={SpecificBank?.bar_code || qr_code}
                alt="qr-code"
              />
            </Tooltip>
            <Modal
              title="Scan Qr Code Address"
              centered
              open={open}
              onCancel={() => setOpen(false)}
              width={500}
            >
              <img className="w-auto h-auto mx-auto" src={SpecificBank?.bar_code || qr_code} alt="qrcode" />
            </Modal>
          </div>
        </div>
        }
        
      </div>

      <button disabled className="w-full md:w-[50vw] md:mr-2 mr-1 mb-3 p-2 py-4 px-10  bg-gradient-to-r from-pink-400 to-violet-400 h-full text-black  border-[0.3px] rounded-md  font-semibold"
        
      >
        Your Transfer Account details
      </button>
      <div className="flex flex-col w-full md:w-[60%] lg:w-[50%] px-2">
        <div className="flex items-center justify-center ">
          <button
            className="w-full btn-sm md:mr-2 mr-1  py-3 px-5  bg-gradient-to-r from-pink-600 to-violet-600 h-full text-white  border-[0.3px] rounded-md  font-semibold"
          >
            Transaction Id
          </button>
          <Input
            placeholder="Transaction Id"
            onChange={(e)=>setFormData({...FormData, Transaction_id: e.target.value})} 
            value={FormData.Transaction_id} required
            className=" w-full max-w-xs input-primary p-2 my-2"
            prefix={<AiFillMoneyCollect className="text-primary" />}
          />
        </div>
        <div className="flex items-center justify-center ">
          <button
            className="w-full btn-sm md:mr-2 mr-1 py-3 px-5  bg-gradient-to-r from-pink-600 to-violet-600 h-full text-white   border-[0.3px] rounded-md  font-semibold"
            icon={<BankOutlined />}
          >
            Account Info
          </button>
          <textarea 
            onChange={(e)=>setFormData({...FormData, account_Info: e.target.value})} 
            value={FormData.account_Info} required
           placeholder="Account Info" className={`w-full max-w-xs input-primary p-2 my-2  bg-white border border-violet-500 overflow-hidden rounded-lg `} prefix={<UserOutlined className="text-primary" />}
          />
        </div>
        <div className="flex items-center justify-center ">
          <button
            className="w-full btn-sm md:mr-2 mr-1 py-3 px-5  bg-gradient-to-r from-pink-600 to-violet-600 h-full text-white   border-[0.3px] rounded-md  font-semibold"
            icon={<BankOutlined />}
          >
            Account Holder Gmail
          </button>
          <Input
            type="email" required
            onChange={(e)=>setFormData({...FormData, acc_holder_mail: e.target.value})}
            value={FormData.acc_holder_mail}
            placeholder="Account Holder Gmail"
            className=" w-full max-w-xs input-primary p-2 my-2"
            prefix={<AiOutlineMail className="text-primary" />}
          />
        </div>
        <div className="flex items-center justify-center ">
          <button
            className="w-full btn-sm md:mr-2 mr-1 py-3 px-5  bg-gradient-to-r from-pink-600 to-violet-600 h-full text-white   border-[0.3px] rounded-md  font-semibold"
            icon={<AiFillPhone />}
          >
            Account Holder Phone Number
          </button>
          <Input
            type="number" required
            onChange={(e)=>setFormData({...FormData, acc_holder_phone: e.target.value})} 
            value={FormData.acc_holder_phone}
            placeholder="Account Holder Phone No"
            className=" w-full max-w-xs input-primary p-2 my-2"
            prefix={<UserOutlined className="text-primary" />}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            className="w-full btn-sm md:mr-2 mr-1 py-3 px-5  bg-gradient-to-r from-pink-600 to-violet-600 h-full text-white   border-[0.3px] rounded-md  font-semibold"
            icon={<BankOutlined />}
          >
            Payment Receipt document
          </button>

          <Upload
            className=" w-full max-w-xs rounded-md p-2 my-2 text-black"
            onChange={handleFileChange}
            maxCount={1}
            accept="image/png, image/jpeg, image/jpg"
            beforeUpload={() => false}
            >
            <Button icon={<UploadOutlined />} className="border-black w-full" >
              Upload Image
            </Button>
          </Upload>
        </div>
      </div>

      <div className="mt-5">
        <button title="Check before submit "
          className="md:mr-2 mr-1 mb-3 p-2 py-4 px-10 w-[50vw] bg-gradient-to-r from-pink-400 to-violet-400 h-full text-black  border-[0.3px]  rounded-md font-semibold"
          onClick={(e)=>handleSubmit(e)}
        >
          Submit
        </button>
      </div>

      
      
    </div>
  );
};

export default PaymentPage;
