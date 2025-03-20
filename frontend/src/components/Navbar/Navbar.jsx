import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import { Readly } from "../../assets";
import { NavBarLinks } from ".";

function Navbar() {
    const [active, setActive] = useState("/");
    const [toggle, setToggle] = useState(false);
    const [libraryOpen, setLibraryOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const token = localStorage.getItem("token");

    useEffect(() => {
        setActive(location.pathname);
        // Close mobile menu when navigating
        setToggle(false);
    }, [location.pathname]);

    const handleToggleClick = () => setToggle((prev) => !prev);
    
    const toggleLibraryMenu = (e) => {
        e.stopPropagation();
        setLibraryOpen((prev) => !prev);
    };

    // Close library dropdown when clicking outside
    useEffect(() => {
        const closeDropdown = () => setLibraryOpen(false);
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, []);

    const libraryCategories = [
        { title: "Islamic", path: "/category/islamic" },
        { title: "Urdu", path: "/category/urdu" },
        { title: "History", path: "/category/history" },
        { title: "Law", path: "/category/law" },
        { title: "Information Technology", path: "/category/technology" },
        { title: "Business", path: "/category/business" },
        { title: "Science", path: "/category/science" },
        { title: "Mathematics", path: "/category/mathematics" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Filter links based on authentication status
    const filteredLinks = NavBarLinks.filter(link => !link.isPrivate || token);

    return (
        <nav className="sticky top-0 z-50 w-full px-6 py-3 bg-blue-600 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <NavLink to="/" className="flex items-center">
                    <img src={Readly} className="h-12" alt="Readly Logo" />
                </NavLink>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8 font-medium">
                    {filteredLinks.map((link) => (
                        <div key={link.id} className="relative" onClick={(e) => link.title === "Library" && e.stopPropagation()}>
                            {link.title === "Library" ? (
                                <button 
                                    onClick={toggleLibraryMenu} 
                                    className="flex items-center text-white hover:text-blue-100 transition-colors"
                                >
                                    {link.icon && <link.icon size={16} />}
                                    <span className={link.icon ? "ml-1" : ""}>{link.title}</span>
                                    <ChevronDown size={16} className={`ml-1 transition-transform ${libraryOpen ? 'rotate-180' : ''}`} />
                                </button>
                            ) : (
                                <NavLink 
                                    to={link.id} 
                                    className={({ isActive }) => 
                                        `flex items-center ${isActive 
                                            ? "text-white font-bold border-b-2 border-white pb-1" 
                                            : "text-white hover:text-blue-100 transition-colors"}`
                                    }
                                >
                                    {link.icon && <link.icon size={16} />}
                                    <span className={link.icon ? "ml-1" : ""}>{link.title}</span>
                                </NavLink>
                            )}
                            
                            {libraryOpen && link.title === "Library" && (
                                <div className="absolute left-0 mt-2 w-56 bg-white shadow-xl rounded-md overflow-hidden z-20">
                                    <div className="p-2 bg-blue-50 text-blue-700 font-medium">Categories</div>
                                    {libraryCategories.map((category) => (
                                        <Link
                                            key={category.title}
                                            to={category.path}
                                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 transition-colors"
                                            onClick={() => setLibraryOpen(false)}
                                        >
                                            {category.title}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    
                    <div className="ml-2 pl-2 border-l border-blue-400">
                        {token ? (
                            <button 
                                onClick={handleLogout} 
                                className="flex items-center gap-1 text-white hover:text-blue-100 transition-colors"
                            >
                                <LogOut size={16} />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <Link 
                                to="/login" 
                                className="flex items-center gap-1 text-white hover:text-blue-100 transition-colors"
                            >
                                <User size={16} />
                                <span>Login</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Toggle */}
                <button 
                    onClick={handleToggleClick} 
                    className="lg:hidden text-white hover:text-blue-100 focus:outline-none transition-colors"
                >
                    {toggle ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {toggle && (
                <div className="lg:hidden fixed top-16 right-0 left-0 bg-blue-600 shadow-lg z-40 animate-slideDown">
                    <div className="flex flex-col p-4 space-y-3">
                        {filteredLinks.map((link) => (
                            <div key={link.id} className="relative">
                                {link.title === "Library" ? (
                                    <button 
                                        onClick={toggleLibraryMenu} 
                                        className="flex justify-between items-center w-full text-white py-2"
                                    >
                                        <div className="flex items-center">
                                            {link.icon && <link.icon size={16} />}
                                            <span className={link.icon ? "ml-2" : ""}>{link.title}</span>
                                        </div>
                                        <ChevronDown size={16} className={`transition-transform ${libraryOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                ) : (
                                    <NavLink 
                                        to={link.id} 
                                        className={({ isActive }) => 
                                            `flex items-center ${isActive 
                                                ? "block text-white font-bold py-2" 
                                                : "block text-white py-2"}`
                                        }
                                    >
                                        {link.icon && <link.icon size={16} />}
                                        <span className={link.icon ? "ml-2" : ""}>{link.title}</span>
                                    </NavLink>
                                )}
                                
                                {libraryOpen && link.title === "Library" && (
                                    <div className="bg-blue-700 rounded-md mt-1 mb-2">
                                        {libraryCategories.map((category) => (
                                            <Link
                                                key={category.title}
                                                to={category.path}
                                                className="block px-4 py-2 text-blue-100 hover:bg-blue-800 transition-colors"
                                                onClick={() => {
                                                    setActive(category.path);
                                                    setToggle(false);
                                                }}
                                            >
                                                {category.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="pt-2 mt-2 border-t border-blue-400">
                            {token ? (
                                <button 
                                    onClick={handleLogout} 
                                    className="flex items-center gap-2 text-white py-2"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="flex items-center gap-2 text-white py-2"
                                >
                                    <User size={16} />
                                    <span>Login</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;