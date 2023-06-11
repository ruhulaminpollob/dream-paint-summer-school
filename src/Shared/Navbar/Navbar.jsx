import { Link } from "react-router-dom";


const Navbar = () => {

    const navLink = <>
        <li className="hover:text-cyan-400"><Link>Home</Link></li>
        <li className="hover:text-cyan-400"><Link>Instructors</Link></li>
        <li className="hover:text-cyan-400"><Link>Classes</Link></li>
        <li className="hover:text-cyan-400"><Link>Dashboard</Link></li>
        {/* <li className="hover:text-cyan-400"><Link>User Profile</Link></li> */}
    </>

    return (
        <div className="navbar max-w-7xl mx-auto  text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className=" menu-sm text-black dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navLink}
                    </ul>
                </div>
                <Link className='text-center w-fit' to="/">
                    <img className='h-10 w-auto mx-auto rounded-full' src="https://i.ibb.co/34S9JsD/dream-paint-logo.png" alt="brand logo" />
                    <h2 className='text-2xl font-bold text-cyan-400'>Dream<span className='text-red-400'>Paint</span></h2>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-3  menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            {/* <div className="navbar-end">
                {
                    user ?
                        <div className='flex gap-3'>
                            <div className='border-2 border-cyan-400 h-10 w-10 rounded-full overflow-hidden'>
                                <img className='' src={user?.photoURL ? user?.photoURL : unknownUser} title={user?.displayName ? user?.displayName : unknownName} alt="" />
                            </div>
                            <button onClick={handleLogOut}><ArrowRightOnRectangleIcon className='text-yellow-400 h-6 w-6'></ArrowRightOnRectangleIcon></button>
                        </div> :
                        <Link className='hover:text-cyan-400' to='/login'>Login</Link>
                }
            </div> */}
        </div>
    );
};

export default Navbar;