
 import axiosInstance from "./axisoInstance";

//    REGISTER FUNCTION
  async function register (userData) {
    try {
        const res = await axiosInstance.post('/auth/register',userData);
        return res.data
    }catch (error) {
        throw error
    }
  };

//    LOGIN FUNCTION 
   async function login (userData) {
    try {
        const res = await axiosInstance.post('/auth/login',userData);
        return res.data
    }catch (error) {
        throw error
    }
  };
    //  REFRESH FUNCTION
    async function refreshToken () {
        try {
            const res = await axiosInstance.post('/auth/refresh');
            return res.data
        }catch (error) {
            throw error
        }
    };

    //    USER MANAGEMENT SYSTEM FEATURE
  async function getAllUsers() {
    try {
        const res = await axiosInstance.get('/users');
        return res.data
    }catch (error){
        throw error
    }
  };
    //   CREATE USER FUNCTION 
      async function createUser(userData) {
    try {
        const res = await axiosInstance.post('/users',userData);
        return res.data
    }catch (error){
        throw error
    }
  };
    //   UPDATE USER FUNCTION
      async function updateUser(id,userData) {
    try {
        const res = await axiosInstance.patch(`/users/${id}`,userData);
        return res.data
    }catch (error){
        throw error
    }
  };
    //  DELETE USER FUNCTION 
      async function deleteUser(id) {
    try {
        const res = await axiosInstance.delete(`/users/${id}`);
        return res.data
    }catch (error){
        throw error
    }
  };

    // FILES FUNCTION 
    export async function getAllFiles (page = 1,limit= 10) {
      try {
        const res = await axiosInstance.get (`/upload?page=${page}&limit${limit}`);
        return res.data
      }catch (error){
        throw error
      }
     };

      // UPLOAD SINGLE FILE FUNCTION
    export async function uploadSingleFile (formData,onUploadProgress) {
      try {
         const res = await axiosInstance.post ('/upload',formData,{
          headers: {
             'Content-Type': 'multipart-formData'
          }
         })
         return res.data
      }catch (error) {
        throw
      }
    }
          // UPLOAD MULTIPLE FILES FUNCTION 
      export async function uploadMultipleFile (formData,onUploadProgress) {
      try {
        const res = await axisoInstance.post('/upload/multiple',formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress
        })
        return res.data
      }catch (error) {
        throw
      }
    };
      // DOWNLOAD FILE FUNCTION
      export async function downloadFile () {
      try {
        const res = await axisoInstance.get ('/upload/download',{
          responseType: 'blob'
         })
        return res.data
      }catch (error) {
        throw
      }
    };

      // DELETE FILE FUNCTION 
    export async function deleteFile(id) {
      try {
        const res = await axiosInstance.delete (`/upload/${id}`);
        return res.status
      }catch (error) {
        throw error
      }
    };