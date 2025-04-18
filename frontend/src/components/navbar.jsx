import { useContext, useState } from 'react';
import { assets } from '../assets/assets'; 
import { Link, NavLink } from 'react-router-dom'; 
import { ShopContext } from '../context/shopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }

    return (
        <div className="flex items-center justify-between py-5 font-medium relative">
           <Link to={'/'}><img src={assets.logo} className='w-36' alt="" /></Link>

            {/* Desktop Navigation */}
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
                <NavLink to='/collection' className="flex flex-col items-center gap-1">
                    <p>COLLECTION</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
                <NavLink to='/about' className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
                <NavLink to='/contact' className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden'/>
                </NavLink>
            </ul>

            {/* Right Icons */}
            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(true)} className='w-5 cursor-pointer' src={assets.search_icon}  alt="" />

                <div className='group relative'>
                    <img onClick={()=>token ? null : navigate('/login')} className='w-5 cursor-pointer' src={assets.profile_icon} alt="" />
                    {/* Dropdown */}
                    {token && 
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-gray-100 text-gray-500 rounded shadow-md'>
                            <p className='cursor-pointer hover:text-black'>My Profile</p>
                            <p onClick={()=> navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                        </div>
                        </div>
                        }
                    
                </div>

                <Link to={'/cart'} className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt=""/>
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>

                {/* Sidebar Menu Icon */}
                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
            </div>

            {/* Sidebar menu for small screens */}
            {visible && (
                <div className="fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg transition-transform transform translate-x-0 z-50">
                    <div className="flex flex-col text-gray-600">
                        <div onClick={() => setVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
                            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt=""/>
                            <p>Back</p>
                        </div>
                        <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to={'/'}>Home</NavLink>
                        <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to={'/Collection'}>COLLECTION</NavLink>
                        <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to={'/About'}>ABOUT</NavLink>
                        <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to={'/Contact'}>CONTACT</NavLink>
                    </div>
                </div>
            )}

            {/* Overlay to close sidebar when clicking outside */}
            {visible && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" onClick={() => setVisible(false)}></div>
            )}
        </div>
    );
}

export default Navbar;
