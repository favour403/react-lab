  
  import { useState } from "react";
  import { useForm } from "react-hook-form";
  import  {z} from 'zod'
  import { useFile } from "../context/FileContext";
  import {zodResolver} from '@hookform/resolvers/zod'



 function ChunkController () {
   const {onUploadProgress,uploadChunk} = useForm();
    //   DECLARING STATES
     const [error,setError] = useState(null);
     const [loading,setLoading] = useState(false);

     const schema = z.object({
      files: z.any().refine(file => file.length > 0,'Please select atleast 1 file')
     });
     const {register,handleSubmit,formState:{errors},reset} = useForm({
      resolver: zodResolver(schema)
     });
      // ONSUBMIT FUNCTION
     async function onSubmit(data) {
      setLoading(true);
      setError(null);
      try {
       const file = data.files[0];
       const chunkSize = 1024 * 1024;
       const totalChunk  = Math.ceil(file.size / chunkSize)
        for (let chunkNumber = 0; chunkNumber < totalChunk; chunkNumber++) {
         const start = chunkNumber * chunkSize;
         const end = Math.min (start + chunkSize,file.size);
         const chunk = file.slice(start,end);
         const formData = new FormData ();
         formData.append('chunk',chunk);
         formData
        }
      reset()
      }catch (error){
         setError(error.message)
      }finally{
         setLoading(false)
      }
     }


    return (
        <div> 
            <h1>Upload chunk</h1>
         <form >
            <input type="file" {...register('files')} />
            {errors.files && <p>{errors.files.message} </p>}
            <button type="submit" disabled={loading}>{loading ? 'Uploading...': 'Upload chunk'} </button>
         </form>
        </div>
    )
 }
  export default ChunkController;