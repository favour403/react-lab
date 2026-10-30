

   const axisoInstance = axios.create({
    baseURL: 'http://localhost:4000'
   });

    //  REQUEST AXIOS
    axisoInstance.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem('token');
        if(token) {
          config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
      },
      async function(error) {
        return Promise.reject(error)
      }
    );

      //  RESPONSE INTECEPTORS
       let failedQueue = [];
       let isRefereshing = false;
       const processQueue = (error,token = null)=> {
        failedQueue.forEach(prom => {
          if(error){
            prom.reject(error)
          }else {
            prom.resolve(token)
          }
        })
        failedQueue = [];
       };
       axisoInstance.interceptors.response.use(
        (response) =>  response,
        async function (error) {
          const originalRequest = error.config;
          const status = error.response?.status;
           if (!status || status !== 401) {
            return Promise.reject(error)
           }
            if (originalRequest._retry) {
              localStorage.clear();
              window.location.href = '/login';
              return Promise.reject(error)
            }
            originalRequest._retry = true;
            if (isRefereshing) {
              return new Promise((resolve,reject) => {
                failedQueue.push({resolve,reject})
              }).then (token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                 return axisoInstance(originalRequest)
              }).catch (error => Promise.reject(error))
            }
             isRefereshing = true;
          try {
            const refreshToken = localStorage.getItem('refresh');
             if (!refreshToken) {
              throw new Error('No refresh token stored in localstorage')
             }
             const res = await axios.post ('http://localhost:4000/auth/refresh',{refreshToken});
             localStorage.setItem('token',res.data.token);
             processQueue(null,res.data.token);
             originalRequest.headers.Authorization = `Bearer ${data.token}`
             return axisoInstance(originalRequest);
          }catch (error){
            processQueue(error,null);
            localStorage.clear();
            console.log(error.message)
          }finally {
            isRefereshing = false
          }
        }
       );
       export default axisoInstance

