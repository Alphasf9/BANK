import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {

const accessToken= localStorage.getItem('accessToken');
const refreshToken= localStorage.getItem('refreshToken');
const navigate = useNavigate();
    console.log('access token:', accessToken);
    console.log('refresh token:', refreshToken);


    if (!accessToken || !refreshToken) {
        console.log('No tokens found, logging out')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/login')
        return null
    }
    


axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/logout`,{},{
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'x-refresh-token': refreshToken
    }
}).then(response=>{
    if(response.status===200){
        console.log(response);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login')
    }
}).catch(err=>{
    console.log(err);
    console.log(err.response?err.response.data:err);
})


  return (
    <div>UserLogout</div>
  )
}

export default UserLogout