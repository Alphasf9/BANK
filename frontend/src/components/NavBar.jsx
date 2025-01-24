import { useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    return (
        <div className='bg-blue-500 text-white flex justify-around h-[70px] items-center'>
            <div className='flex gap-4 items-center'>
                {/* for logo */}
                <img className='w-9 h-9' src="https://png.pngtree.com/png-vector/20190227/ourmid/pngtree-vector-bank-icon-png-image_708538.jpg" alt="" />
                <p>BANK</p>
            </div>

            <div className='flex items-center'>
                {/* for navlinks */}
                <div className='flex gap-9'>
                    <div className='flex flex-col items-center'>
                        <i className="fa-solid fa-house"></i>
                        <p>Home</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <i className="fa-solid fa-user"></i>
                        <p>Personal</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <i className="fa-solid fa-file-invoice"></i>
                        <p>Account</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <i className="fa-regular fa-address-card"></i>
                        <p>About us</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <i className="fa-solid fa-phone"></i>
                        <p>Contact us</p>
                    </div>
                </div>
            </div>

            {
                (accessToken && refreshToken) ? (

                    <div className='flex gap-7 items-center'>
                        <p>Welcome</p>
                    </div>
                ) : (
                    <div className='flex gap-7 items-center'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <i className="fa-solid fa-location-dot"></i>
                        <button onClick={() => navigate('/register')} className='bg-white text-black border rounded w-40 h-8'>Create Account</button>
                    </div>
                )
            }
        </div>
    )
}

export default NavBar