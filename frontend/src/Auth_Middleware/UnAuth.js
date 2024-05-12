import toast from "react-hot-toast";

export const UnAuth = (e) => {
  const value = e.response;

  if (value.status) {
    if (value.status === 401) {
    localStorage.removeItem("DTCUserToken");
    localStorage.removeItem("DTCUserRefresh");
    localStorage.removeItem("DTCUsername");
    localStorage.removeItem("DTCEmail");
    localStorage.removeItem("DTCUserID");
    toast.error(value.statusText ? value.statusText : "Network Error");
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
    }else{
      toast.error(value.statusText ? value.statusText : "Network Error");  
    }
  } else {
    toast.error("Network Error");
  }
};



export const AdminUnAuth = (e) => {
  const value = e.response;

  if (value.status === 401) {
    localStorage.removeItem("DTCAdminToken");
    localStorage.removeItem("DTCAdminRefresh");
    localStorage.removeItem("DTCAdminname");
    localStorage.removeItem("DTCAdminEmail");
    localStorage.removeItem('DTCAdminID');
    toast.error(value.statusText ? value.statusText : "Network Error");
    setTimeout(() => {
      window.location.reload(true);
    }, 500);
  } else {
    toast.error(value.statusText ? value.statusText : "Network Error");
  }
};
