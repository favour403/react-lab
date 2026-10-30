  import { useNavigate } from "react-router-dom";

 function Home () {
   const navigate = useNavigate ();
     function handleNavigate () {
        navigate ('/tasks');
     }

    return (
        <div>
            <h1>Tash Manager Dashboard</h1>
            <p>Manage your daily tasks efficiently</p>
             <button onClick={handleNavigate}>View Tasks</button>
        </div>
    )
 };
  export default Home