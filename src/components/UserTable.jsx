
import { useUser } from "../context/userContext";
  


   function UserTable () {
   const {setSelectedUser,removeUser,user,loading,error} = useUser();
    //  ONSUBMIT FUNCTION 
   async function onSubit(id) {
    const confirmDelete = window.confirm('Are you sure you want to deleted this user?');
    if (confirmDelete) {
      await removeUser(id)
    }
    };

    //   SETTING UP TABLE
     


         if(loading) {
         return <p>Loading...</p>
         }
         if(error) {
            return <p>{error} </p>
         }



    return (
     <div>
         {/* BUILDING THE USER DASHBOARD */}
         <h1>User Table</h1>
          <table>
        <thead>
            <tr>
                <th>Name:</th>
                <th>Email:</th>
                <th>Role:</th>
                 <th>Edit:</th>
                 <th>Delete:</th>
            </tr>
        </thead>
         <tbody>
              {user.map ((user => 
                <tr key={user.id}>
                 <td>{user.name} </td>
                 <td>{user.email} </td>
                 <td>{user.role} </td>
                   <button onClick={() => setSelectedUser(user)}><td>Edit</td> </button>
                   <button onClick={() => onSubit(user.id)}> </button>
                </tr>
              ))}
         </tbody>
      </table>
     </div>
    )
   }
   export default UserTable;