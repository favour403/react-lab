
    import { useSelector,useDispatch } from "react-redux"
    import { deleteTask,toggleTask } from "../redux/taskSlice"
     import { useQuery } from "@tanstack/react-query";
  function TaskList () {
        // FETCHING API DATA
      async function fetchUser () {
        try {
            const res = await fetch ('https://jsonplaceholder.typicode.com/users');
            if (!res.ok) {
                throw new Error (`HTTP FAILED: ${res.status}`)
            }
            const data = await res.json ();
             return data;
        }catch (err) {
          console.log ('Check your internet connections:',err.message);
        }
      }
       const {data,error,isLoading} = useQuery ({
        queryKey: ['users'],
        queryFn: fetchUser
       })

     const tasks = useSelector (state => state.tasks.tasks)
        const dispatch = useDispatch ();
        //  DELETE FUNCTION
        function handleDelete (id) {
            dispatch (deleteTask (id))
        }
        //  TOGGLE FUNCTION
        function handleToggle (id) {
            dispatch (toggleTask(id));
        }
         if (isLoading) {
            return <p>Loading...</p>
         }else if (error) {
            return <div>ERROR:{error.message} </div>
         }
    return (
        <div>
        {data?.map (prev => (
            <ul key={prev.id}>
                <li>{prev.name} </li>
                <li>{prev.phone} </li>
                <li>{prev.email} </li>
                <li>{prev.completed ? 'Completed': 'Pending'} </li>
                 <button onClick={() => handleDelete(prev.id)}>Delete task</button>
                 <button onClick={() => handleToggle(prev.id)}>Toggle tasks</button>
            </ul>
        
        ))}
        </div>
    )
  }
  export default TaskList