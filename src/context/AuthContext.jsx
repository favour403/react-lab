 import { createContext,useContext,useState,useEffect } from "react";
 import { register,login } from "../services/api";
 import toast from "react-hot-toast";
  const AuthContext = createContext();

 export function AuthProvider ({children}) {
   //   DECLARING STATES
     const [user,setUser] = useState([]);
     const [loading,setLoading] = useState(false);
     const [error,setError] = useState(null);
      const [token,setToken] = useState(localStorage.getItem('token'));

      // REGISTER FUNCTION
      async function registerUser(userData) {
         setLoading(true);
         try {
           const res = await register(userData);
           toast.success(res.message)
           return res
         }catch (error) {
            toast.error(error.message);
            setError(error.message)
            console.log (error.message)
         }finally{
            setLoading(false)
         }
      };

      //   LOGIN FUNCTION 
      async function loginUser (userData) {
         setLoading(true);
         try {
          const data = await login (userData);
          localStorage.setItem('token',data.accessToken);
          localStorage.setItem('referesh',data.refreshToken);
          localStorage.setItem('user',JSON.stringify(data.user));
          setUser(data.user);
          setToken(data.accessToken);
          toast.success(res.data.message)
          return data
         }catch (error) {
            toast.error(error.message);
            setError(error.message)
            console.log (error.message)
         }finally{
            setLoading(false)
         }
      };

      //   SESSION RESTORATION
      useEffect(() => {
          const storedToken = localStorage.getItem('token');
          const storedUser = localStorage.getItem('user');
          if (storedToken && storedUser) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken)
          }
      },[]);

      //   LOGOUT FUNCTION
     function logout () {
      setUser(null)
      setToken(null)
      setError(null)
      localStorage.clear('token');
      localStorage.clear('user')
     };










     return (
      <AuthContext.Provider value={{loading,registerUser,loginUser,user,token,logout,error}}>{children} </AuthContext.Provider>
     )
  }
   export function useAuth () {
      return useContext(AuthContext)
   }