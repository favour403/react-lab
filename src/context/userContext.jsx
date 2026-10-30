 import { createContext,useContext,useEffect,useState } from "react";
 import { getAllUsers,createUser,deleteUser,updateUser } from "../services/api";
 import { useAuth } from "./AuthContext";
 import toast from "react-hot-toast";

  //  CREATING GLOBAL CONTEXT
  const UserContext = createContext();
  export function AuthProvider ({children}) {
             const {token} = useAuth();
            // CREATING STATES
          const [loading,setLoading] = useState(false);
          const [user,setUsers] = useState([]);
           const [error,setError] = useState(null);
            const [selectedUser,setSelectedUser] = useState(null);
          //  GETALLUSER FUNCTION
          async function fetchUsers() {
            setLoading(true);
            try {
              const data = await getAllUsers();
              setUsers(data.users);
            }catch (error) {
              toast.error(error.message);
              setError(error.message)
            }finally{
              setLoading(false)
            }
          };

          //  USING USEEFFECT TO CALL FETCHUSERS
            useEffect(() => {
              if(token) {
                 fetchUsers()
              }
            },[token]);
            // CREATE NEW USER FUNCTION 
          async function createNewUser (userData) {
            setLoading(true);
            try {
              const data = await createUser(userData);
              toast.success(data.message);
              fetchUsers();
            }catch (error) {
              toast.error(error.message);
              setError(error.message)
            }finally{
              setLoading(false)
            }
          };

            // UPDATE USER FUNCTION 
          async function editUser(id,userData) {
            setLoading(true);
            const previousData = user
             setUsers(prev => prev.map (user => user.id === id ? {...user,...userData}: user))
            try {
             const data =  await updateUser(id,userData);
             toast.success(data.message);
             fetchUsers();
             setSelectedUser(null)
            }catch (error) {
              setUsers(previousData);
              toast.error(error.message);
              setError(error.message)
            }finally {
              setLoading(false)
            }
          };

          //  DELETE USER FUNCTION
          async function removeUser (id) {
            setLoading(true);
            const previousData = user
            setUsers(prev => prev.filter(user => user.id !== id))
            try {
              const data = await deleteUser(id);
              toast.success(data.message);
              fetchUsers()
            }catch(error){
              setError(error.message);
              setUsers(previousData);
              toast.error(error.message);
            }finally{
              setLoading(false)
            }
          }










    return (
      <UserContext.Provider value={{fetchUsers,user,createNewUser,editUser,loading,error,removeUser,selectedUser,setSelectedUser}}>{children} </UserContext.Provider>
    )
  }
    // REUASBLE FUNCTION
   export function useUser() {
    return useContext(UserContext)
   }