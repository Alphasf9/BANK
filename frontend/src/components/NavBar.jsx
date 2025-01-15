import { useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate();

    return (
        <div className='bg-blue-500 text-white flex justify-around h-[70px] items-center'>
            <div className='flex gap-4 items-center'>
                {/* for logo */}
                <img className='w-9 h-9' src="https://png.pngtree.com/png-vector/20190227/ourmid/pngtree-vector-bank-icon-png-image_708538.jpg" alt="" />
                <p>BANK</p>
            </div>

            <div className='flex items-center'>
                {/* for navlinks */}
                <ul className='flex gap-9'>
                    <div className='flex flex-col items-center'>
                        <i className="fa-solid fa-house"></i>
                        <li><a href="">Home</a></li>
                    </div>
                    <div className='flex flex-col items-center'>
                        <i className="fa-solid fa-user"></i>
                        <li><a href="">Personal</a></li>
                    </div>
                    <div className='flex flex-col items-center'>
                        <i className="fa-solid fa-file-invoice"></i>
                        <li><a href="">Account</a></li>
                    </div>
                    <div className='flex flex-col items-center'>
                        <i className="fa-regular fa-address-card"></i>
                        <li><a href="">About us</a></li>
                    </div>
                    <div className='flex flex-col items-center'>
                        <i className="fa-solid fa-phone"></i>
                        <li><a href="">Contact us</a></li>
                    </div>
                </ul>
            </div>

            <div className='flex gap-7 items-center'>
                {/* for login button */}
                <i className="fa-solid fa-magnifying-glass"></i>
                <i className="fa-solid fa-location-dot"></i>
                <button onClick={()=>navigate('/register')} className='bg-white text-black border rounded w-40 h-8'>Create Account</button>
            </div>
        </div>
    )
}

export default NavBar