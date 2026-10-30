   import { useDispatch } from "react-redux"
   import { addTask, } from "../redux/taskSlice"
    import {z} from 'zod';
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
  function TaskForm () {
        //  DECLARING INPUT FOR ADD TASK
        const schema = z.object ({
            name: z.string ().nonempty('Add new task is required')
        });
         const {register,handleSubmit,formState: {errors}} = useForm ({
            resolver: zodResolver (schema)
         })
     const dispatch = useDispatch ();
        function onSubmit () {
            dispatch (addTask({id: 1,name:'Praying',completed: true}));
        }
    return (
        <div>
           <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="">Name:</label>
            <input type="text" {...register ('name')} placeholder="Enter new task" />
             {errors.name && <p>{errors.name.message} </p>}
              <button type="submit">Submit</button>
           </form>
        </div>
    )
  }
  export default TaskForm