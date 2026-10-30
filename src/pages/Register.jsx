 
  import { useState,useEffect } from "react";
  import z, { ZodSchema } from "zod";
  import {zodResolver}  from '@hookform/resolvers';
  import { useForm } from "react-hook-form";
  import toast from "react-hot-toast";
  import { register } from "../services/api";


  function Register() {
        // DECLAING STATES
        const [toggle,setToggle] = useState(false);
        const [error,setError] = useState(null);
        const [user,setUser] = useState([]);
        const [loading,setLoading] = useState(false)

        //   VALIDATING DATA WITH ZOD
      const schema = z.object({
        name: z.string().min (6,'Name length must be atleast 6'),
        email: z.string().email('Please enter a valid email'),
        password: z.string().min (6,'Password length must be atleast 6')
      });
       const {register,handleSubmit,formState:{errors},reset} = useForm({
        resolver: zodResolver(schema)
       });
        //  SUBMIT FUNCTION 
        async function onSubmit(userData) {
            setLoading(true)
            try {
             const data = await register(userData);
             setUser(data.user);
             toast.success(data.message)
            }catch (error) {
                toast.error(error.message);
                setError(error.message)
            }finally{
                setLoading(false)
            }
        };




      return (
        <div>
        <form onSubmit={handleSubmit(onSubmit)}>
             {/* NAME INPUT */}
             <input type="text" {...register('name')} placeholder="Enter Fullname" />
             {errors.name && <p>{errors.name.message} </p>}
               {/* EMAIL INPUT */}
               <input type="email" {...register('email')} placeholder="Enter valid email" />
             {errors.email && <p>{errors.email.message} </p>}
               {/* PASSWORD INPUT */}
               <input type={toggle ? 'password' : 'text'} />
               <button type="button" onClick={() => setToggle(!toggle)}>{toggle ? 'Hide': 'Show'} </button>
               {errors.password && <p>{errors.password.message} </p>};
            <button type="submit" >{loading ? 'Submitting...': 'Submit'} </button>
        </form>

        </div>
      )
  }
  export default Register