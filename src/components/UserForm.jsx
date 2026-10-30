 import { useState,useEffect } from "react";
 import { useUser } from "../context/userContext";
 import {z} from 'zod';
 import { useForm } from "react-hook-form";
 import {zodResolver} from '@hookform/resolvers';


 function UserForm () {
    const {selectedUser,createNewUser,editUser} = useUser();
      // DECLARING STATES
      const [loading,setLoading] = useState(false);
      const [error,setError] = useState(null);
      const [toggle,setToggle] = useState(false);
    // DECLARING SCHEMA RULES
    const schema = z.object({
      name: z.string().min (3,'Name length must be atleast 3'),
      email: z.string().email('Please provide a valid email'),
      password: z.string().min (6,'Password length must be atleast 6'),
      role: z.string().nonempty('Role must be provided')
    });
       
      // VALIDATING SCHEMA
      const {register,handleSubmit,formState:{errors},reset} = useForm({
        resolver: zodResolver(schema)
      });

      // ONSUBMIT FUNCTION 
      async function onSubmit(id,userData) {
        setLoading(true)
        try {
           if (selectedUser) {
            await editUser(selectedUser.id,userData)
           }else {
            await createNewUser(userData)
           }
           reset();
        }catch (error) {
          setError(error.message)
        }finally {
          setLoading(false)
        }
      }
    
          //  USING USEEFFECT TO AUTO REFIL
         useEffect(() => {
          if (selectedUser) {
            reset({
              name: selectedUser.name,
              email: selectedUser.email,
              role: selectedUser.role
            })
          }else {
            reset({
              name: '',
              email: '',
              role: ''
            })
          }
         },[selectedUser,reset]);







    return (
      <div>
         <form onSubmit={handleSubmit(onSubmit)}>
            {/* NAME INPUT */}
            <label>Name:</label>
            <input type="text" {...register('name')} placeholder="Enter Fullname" />
            {errors.name && <p>{errors.name.message} </p>}

             {/* EMAIL INPUT */}
            <label>Email:</label>
            <input type="email" {...register('email')} placeholder="Enter valid email" />
            {errors.email && <p>{errors.email.message} </p>}

             {/* PASSWORD INPUT */}
            <label>Password:</label>
            <input type={toggle ? 'text': 'password'} {...register('password')} placeholder="Enter Fullname" />
             <button type="button" onClick={() => setToggle(!toggle)}>{toggle ? 'Hide' : 'Show'} </button>
            {errors.password && <p>{errors.password.message} </p>}

              {/* ROLE INPUT */}
              <select name="" id="" {...register('role')}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="officer">Officer</option>
              </select>
              {errors.role && <p>{errors.role.message} </p>}
              <button type="submit" disabled={loading}>{loading} </button>
         </form>

      </div>
    )
 }
 export default UserForm