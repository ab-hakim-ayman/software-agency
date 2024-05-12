import React, { useEffect, useState } from "react";
import  Education from './Education';
import { Base_URL } from "../../../Constant";
import { toast } from "react-hot-toast";
import axios from "axios";
import PersonalProfile from "./PersonalProfile";
// import Header from './../../../Component/IT/header/Header';

const Profile = () => {
    const [userData, setUserData] = useState([])
    
      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(Base_URL+'/api/user/self/', {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('DTCUserToken')}`,
              },
            });
            // console.log(response);
            if (response.ok) {
              const user_data = await response.json();
              setUserData(user_data)
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);

    return (
        <>
        <Education  info={userData?.Education} />
        <PersonalProfile  info={userData} />
        </>
    );
};

export default Profile;





// import React from 'react';

// const Profile = () => {
//     return (
//         <div>
//             profile
//         </div>
//     );
// };

// export default Profile;

