import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto p-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-5xl font-bold text-white mb-6 text-center"
        >
          Welcome to <span className="text-[#e43721]">PF PredictX</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl mb-8 text-gray-300 text-center"
        >
          Advanced electricity power factor forecasting and analysis platform.
        </motion.p>
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-center mb-16"
        >
          <Link 
            to="/predict" 
            className="inline-block bg-[#e43721] text-white px-8 py-4 rounded-lg text-lg font-medium shadow-lg"
          >
            Start Predicting
          </Link>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">What is Power Factor?</h2>
          <p className="text-gray-300 mb-4">
            Power factor is a measure of how effectively electrical power is being used. It's the ratio between the real power (watts) and the apparent power (volt-amperes) in an electrical system.
          </p>
          <p className="text-gray-300 mb-4">
            A power factor of 1.0 means that 100% of the power is being used effectively, while a lower power factor indicates inefficiency in the electrical system.
          </p>
          <p className="text-gray-300">
            Poor power factor can lead to increased energy costs, reduced system capacity, and potential equipment damage.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Our Machine Learning Solution</h2>
          <p className="text-gray-300 mb-4">
            PF PredictX uses advanced machine learning algorithms to predict power factor values based on historical data and real-time measurements.
          </p>
          <p className="text-gray-300 mb-4">
            Our model analyzes patterns in your electrical consumption to forecast future power factor trends, helping you optimize your energy usage and reduce costs.
          </p>
          <p className="text-gray-300">
            By identifying potential power factor issues before they occur, you can take proactive measures to maintain optimal electrical efficiency.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <motion.div 
            className="bg-[#1e1e1e] p-6 rounded-lg shadow-md border border-gray-800"
            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">Real-time Monitoring</h3>
            <p className="text-gray-400">Track power factor metrics in real-time with advanced analytics.</p>
          </motion.div>
          
          <motion.div 
            className="bg-[#1e1e1e] p-6 rounded-lg shadow-md border border-gray-800"
            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">ML-Powered Forecasting</h3>
            <p className="text-gray-400">Forecast future power factor trends using our advanced machine learning model.</p>
          </motion.div>
          
          <motion.div 
            className="bg-[#1e1e1e] p-6 rounded-lg shadow-md border border-gray-800"
            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">Optimization Tools</h3>
            <p className="text-gray-400">Optimize your power factor with actionable recommendations.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;