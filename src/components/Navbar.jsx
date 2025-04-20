import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../index.css';
import Logo from '../assets/logos/logo.png';
const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-black text-white p-4 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="text-2xl font-bold flex items-center">
            <span className="text-[#e43721] mr-0"><img src={Logo} alt="Logo" className="w-full h-8" /></span>
            <span>PF PredictX</span>
          </Link>
        </motion.div>
        <div className="space-x-6">
          <motion.span whileHover={{ scale: 1.1 }}>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "text-[#e43721] transition-colors" : "hover:text-[#e43721] transition-colors"
              }
            >
              Home
            </NavLink>
          </motion.span>
          <motion.span whileHover={{ scale: 1.1 }}>
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => 
                isActive ? "text-[#e43721] transition-colors" : "hover:text-[#e43721] transition-colors"
              }
            >
              Dashboard
            </NavLink>
          </motion.span>
          <motion.span whileHover={{ scale: 1.1 }}>
            <NavLink 
              to="/predict" 
              className={({ isActive }) => 
                isActive ? "text-[#e43721] transition-colors" : "hover:text-[#e43721] transition-colors"
              }
            >
              Predict
            </NavLink>
          </motion.span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 