import { Link, useNavigate } from "react-router-dom";

interface NavbarLink {
  label: string;
  to: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const userAuth = localStorage.getItem("userAuth");
  const token = userAuth ? JSON.parse(userAuth).data.token : null;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("userAuth"); // Remove userAuth from localStorage
      navigate("/login"); // Redirect to the login page
    }
  };

  const navbarLinks: NavbarLink[] = token
    ? [
        { label: "Dashboard", to: "/dashboard" },
        { label: "Tasks", to: "/tasks" },
      ]
    : [
        { label: "Login", to: "/login" },
        { label: "Signup", to: "/register" },
      ];

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">Logo</Link>
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navbarLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-gray-700 hover:text-blue-500 transition"
            >
              {link.label}
            </Link>
          ))}
          {token && (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-blue-500 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-gray-700 hover:text-blue-500 transition focus:outline-none"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu?.classList.toggle("hidden");
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className="md:hidden hidden flex-col space-y-2 px-4 pb-4 bg-white shadow-lg"
      >
        {navbarLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="block text-gray-700 hover:text-blue-500 transition"
          >
            {link.label}
          </Link>
        ))}
        {token && (
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-blue-500 transition text-left"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
