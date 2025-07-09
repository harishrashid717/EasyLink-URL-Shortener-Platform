import React from 'react'
import Register from '../components/Register'
import {useMutation} from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useState } from 'react'
const RegisterPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn : (registerData) => axiosInstance.post('api/auth/register', registerData),
    onSuccess : (res) => navigate('/login')
  })

  
  const handleModalClose = () => {
    setIsModalOpen(false);  
    navigate('/')
  };

  return (
    <div>
      {
        (isModalOpen) && <Register registerMutation={registerMutation} onClose={handleModalClose}/> 
      }
    </div>
  )
}

export default RegisterPage
