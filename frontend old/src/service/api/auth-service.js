import  api from '../api/axios';

export const login = async( credential )=>{
    return  await api.post("/auth/login",credential);  
}

export const signup= async(formData)=>{
    return await api.post("auth/signup",formData);
}