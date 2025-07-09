import React, {useState} from "react";
import Login from "../components/Login";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
const LoginPage = () => {

  const [isModelOpen, setIsModelOpen] = useState(true);
  const navigate = useNavigate();


  const loginMutation = useMutation({
    mutationFn: (loginData) => {
      return axiosInstance.post("api/auth/login", loginData);
    },
    onSuccess: (res) => navigate("/"),
  });

  const handleClose = ()=>{
    setIsModelOpen(false);
    navigate('/');
  }
  return (
    <div>
      {
        (isModelOpen) && <Login loginMutation={loginMutation} onClose = {handleClose}/> 
      }
    </div>
  );
};

export default LoginPage;
