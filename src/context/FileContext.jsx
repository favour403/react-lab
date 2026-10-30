 
  import { createContext,useContext,useEffect,useState } from "react";
  import toast from "react-hot-toast";
  import { uploadSingleFile,uploadMultipleFile,getAllFiles,deleteFile, downloadFile,chunkUpload } from "../services/api";
   import { useAuth } from "./AuthContext";

  const FileContext = createContext();
  export function FileProvider ({children}){
         const {token} = useAuth();
      // DECLARING STATES
      const [loading,setLoading] = useState(false);
      const [files,setFiles] = useState([]);
      const [error,setError] = useState(null);
      const [onUploadProgress,setOnUploadProgress] =  useState(0);
        
        //  GET ALL FILES FUNCTION 
      async function fetchFiles() {
        setLoading (true)
        try {
          const file = await getAllFiles();
          setFiles(file.files);
        }catch (error){
          toast.success(error.message);
          setError(error.message)
        }finally {
          setLoading(false)
        }
      };
        //  USING USEEFECT TO CALL FETCH FILES
        useEffect(() => {
          if(token) {
            fetchFiles()
          }
        },[]);
        // UPLOAD SINGLE FILE
      async function uploadFile (formData) {
        setLoading(true);
        try {
          const data = await uploadSingleFile(formData,(progressEvent) => {
            if (!progressEvent.total)return;
            const percent = Math.round((progressEvent.loaded * 100) /  progressEvent.total);
            setOnUploadProgress(percent)
          });
          toast.success(data.message);
          fetchFiles()
        }catch (error) {
          if (error.respone?.status === 409) {
            toast.success(error.message || 'Duplicate file uploaded')
          }else {
            toast.error(error.message || 'Failed to upload file');
            setError(error.message)
          }
        }finally {
          setLoading(false);
          setTimeout(() => {
            setOnUploadProgress(0)
          },500)
        }
      };
        //  UPLOAD MULTIPLE FILES
         async function uploadMultiple (formData) {
        setLoading(true);
        try {
          const data = await uploadMultiple(formData,(progressEvent) => {
            if (!progressEvent.total)return;
            const percent = Math.round((progressEvent.limit / 100) * progressEvent.total);
            setOnUploadProgress(percent)
          });
          toast.success(data.message);
          fetchFiles()
        }catch (error) {
          if (error.respone?.status === 409) {
            toast.success(error.message || 'Duplicate file uploaded')
          }else {
            toast.error(error.message || 'Failed to upload file');
            setError(error.message)
          }
        }finally {
          setLoading(false);
          setTimeout(() => {
            setOnUploadProgress(0)
          },500)
        }
      };

        //  DOWNLOAD FILE FUNCTION
      async function download (id,filename) {
        setLoading (true);
        try {
          const blob = await downloadFile(id);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url
          link.download = filename
          document.body.appendChild(link);
          link.click ()
          link.remove()
          window.URL.revokeObjectURL(rul);
          toast.success('File downloaded successfully...')
        }catch (error){
          throw error
        }finally {
          setLoading(false)
        }
      };

          //  DELETE FILE FUNCTION 
      async function removeFile (id) {
        setLoading(true);
        try {
          const file = await deleteFile(id);
          toast.success(file.message);
          fetchFiles()
        }catch (error) {
          toast.error(error.message);
          setError(error.message)
        }finally{
          setLoading(false)
        };
      }
      













    return (
      <FileContext.Provider value={{uploadMultiple,uploadFile,removeFile,download,fetchFiles,loading,error,files}}>{children} </FileContext.Provider>
    )
  }
   export function useFile () {
    return useContext(FileContext)
   }