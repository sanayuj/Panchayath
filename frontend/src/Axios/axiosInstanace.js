import axios from "axios"

const userInstance=axios.create({
    baseURL:"http://localhost:4000",
})

const adminInstance=axios.create({
    baseURL:`${process.env.REACT_APP_BASE_URL}/admin`,
})


userInstance.interceptors.request.use((request)=>{
    const token=localStorage.getItem("jwt")
    request.headers.Authorization=`Bearer ${token}`
    return request
})
adminInstance.interceptors.request.use((request)=>{
    const token=localStorage.getItem("adminJWT")
    request.headers.Authorization=`Bearer ${token}`
    return request
})


export { userInstance,adminInstance };