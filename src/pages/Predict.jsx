import { motion } from 'framer-motion';
import { useState } from 'react';

const Predict = () => {
  const [predictionData, setPredictionData] = useState({
    currentPF: 0.75,
    predictedPF: 0.82,
    confidence: 0.89,
    nextWeekTrend: 'improving',
    alerts: [
      { type: 'warning', message: 'Power factor dropped below threshold', time: '2 hours ago' },
      { type: 'info', message: 'Maintenance scheduled for next week', time: '1 day ago' }
    ]
  });

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-8"
    >
      <motion.h1 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="text-4xl font-bold text-white mb-6"
      >
        Power Factor Prediction
      </motion.h1>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Current Power Factor Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
          }}
          className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg border-l-4 border-[#e43721]"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Current Power Factor</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-white">{predictionData.currentPF}</span>
            <span className="text-gray-400">Measured value</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${predictionData.currentPF * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-[#e43721]"
            ></motion.div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Last updated: Today, 14:30</p>
        </motion.div>
        
        {/* Predicted Power Factor Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
          }}
          className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg border-l-4 border-black"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Predicted Power Factor</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-white">{predictionData.predictedPF}</span>
            <span className="text-gray-400">ML model prediction</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${predictionData.predictedPF * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-[#e43721]"
            ></motion.div>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500 mr-2">Confidence:</span>
            <span className="text-sm text-[#e43721] font-medium">{Math.round(predictionData.confidence * 100)}%</span>
          </div>
        </motion.div>
        
        {/* Trend Analysis Card */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
          }}
          className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg border-l-4 border-[#e43721]"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Trend Analysis</h2>
          <div className="h-32 bg-gray-900 rounded-lg flex items-center justify-center mb-4">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-[#e43721] text-4xl"
            >
              📈
            </motion.div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Next week trend:</span>
            <span className={`text-sm font-medium ${predictionData.nextWeekTrend === 'improving' ? 'text-green-400' : 'text-red-400'}`}>
              {predictionData.nextWeekTrend === 'improving' ? 'Improving' : 'Declining'}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Alerts Section */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Alerts & Notifications</h2>
        <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg border border-gray-800">
          <div className="space-y-3">
            {predictionData.alerts.map((alert, index) => (
              <motion.div 
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + (index * 0.2) }}
                className={`p-3 ${
                  alert.type === 'warning' 
                    ? 'bg-red-900/30 text-red-300' 
                    : 'bg-yellow-900/30 text-yellow-300'
                } rounded-md flex items-center justify-between`}
              >
                <div className="flex items-center">
                  <span className="mr-2">⚠️</span>
                  <span>{alert.message}</span>
                </div>
                <span className="text-xs opacity-70">{alert.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ML Model Info */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Machine Learning Model</h2>
        <div className="bg-[#1e1e1e] p-6 rounded-lg shadow-lg border border-gray-800">
          <p className="text-gray-300 mb-4">
            Our machine learning model analyzes historical power factor data, load patterns, and environmental factors to predict future power factor values.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Input Features</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Historical power factor data</li>
                <li>• Time of day patterns</li>
                <li>• Seasonal variations</li>
                <li>• Load characteristics</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Model Architecture</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• LSTM neural network</li>
                <li>• 3 hidden layers</li>
                <li>• Dropout for regularization</li>
                <li>• Adam optimizer</li>
              </ul>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">Performance Metrics</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Mean Absolute Error: 0.03</li>
                <li>• R² Score: 0.92</li>
                <li>• Training time: 45 minutes</li>
                <li>• Last updated: 2 days ago</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Predict; 