import axios from "axios";

export const adduser = async(model)=>{
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/adduser`
    return axios.post(url , model)
               .then((res)=>{
                   return res.data;
               })
}

export const getusers = async()=>{
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/userlist`
    return axios.get(url)
               .then((res)=>{
                   return res.data;
               })
}

export const getGenders = async()=>{
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/genders`
    return axios.get(url)
               .then((res)=>{
                   return res.data;
               })
}

export const getQualifications = async()=>{
    const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/qualifications`
    return axios.get(url)
               .then((res)=>{
                   return res.data;
               })
}