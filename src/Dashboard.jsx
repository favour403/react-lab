
 import { useEffect } from "react"
 import socket from "./socket/socket"


function Dashboard () {

    useEffect (() => {
      socket.on ('everybody',(data) => {
        console.log (data.message)
      });
      return ()=> {
        socket.off('everybody')
      }
    },[]);

  return (
    <div>
   
    </div>
  )
 }
 export default Dashboard