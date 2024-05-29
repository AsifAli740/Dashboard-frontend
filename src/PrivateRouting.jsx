import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const PrivateRouting = () =>{

    const navigate = useNavigate()
    const location = useLocation();
    
    useEffect(()=>{
        
        let auth = localStorage.getItem("token");
        let privateRoutes = ["/dashboard", "dashboard/profile"]
        let user = localStorage.getItem("user")
        user = JSON.parse(user)
        if(!auth){
            navigate("/")
        }else{
            if(user.role === "user" && !privateRoutes.includes(location.pathname)){
                navigate("/")
            }
        }
    },[])

    return <Outlet />
}

export default PrivateRouting;  