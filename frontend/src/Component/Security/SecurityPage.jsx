import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Base_URL } from '../../Constant';

const SecurityPage = () => {
    const [security, setSecurity] = useState([]);

    useEffect(() => {
        axios.get(Base_URL+'/api/it/all-active-security/') 
        .then(response => {
            setSecurity(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);
    return (
        <>
        {
            security.map((item,i) =>(
                <div key={i} className='p-20 text-xl'>
                <h1 className='text-center mb-5 font-bold text-md lg:text-3xl'>{item.title}</h1>
                <hr />
                <p className='mt-5'>{item.description}</p>
                </div>
            ))
        }
        </>
        
    );
};

export default SecurityPage;