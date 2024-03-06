import { userInstance } from "../Axios/axiosInstanace";

//POST METHODS

export const userSignup = (values) => {
  return userInstance.post("/signup", { ...values });
};

export const userLogin = (values) => {
  return userInstance.post("/login", { ...values });
};

export const sendComplaint = (values, userId) => {
  return userInstance.post(
    "/sendcomplaint",
    { ...values, userId },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};

export const applyCertificate = (values, userId) => {
  return userInstance.post(
    "/applycertificate",
    { ...values, userId },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};

export const uploadMarriageCertDetails = (values,userId) => {
  return userInstance.post(
    "/sendMarriageCertDetails",
    { ...values, userId },
    { headers: { "Content-Type": "multipart/form-data" } }
  );
};

//GET METHODS

export const userHeader = () => {
  return userInstance.get("/userheader");
};

export const fetchAllCertificate = () => {
  return userInstance.get("/fetchAllCertificate");
};

export const getCertificateDetails = (certId) => {
  return userInstance.get(`/fetchCertRequiredDetails/${certId}`);
};

export const getUserAppliedCert = (userId) => {
  return userInstance.get(`/fetchUserAppliedCert/${userId}`);
};

export const ViewBrithCertDetails = (certId) => {
  return userInstance.get(`/fetchBrithCert/${certId}`);
};

export const ViewComplaintStatus = (Id) => {
  return userInstance.get(`/viewcomplantStatus/${Id}`);
};

export const getAllProjects = () => {
  return userInstance.get("/fetchprojectDetails");
};

export const getAllMarriageCert=(userId)=>{
  return userInstance.get(`/fetchmarriageCert/${userId}`)
}

export const getMarriageCert=(certId,userId)=>{
  return userInstance.get(`/fetchspecificmarriagecert/${certId}/${userId}`)
}