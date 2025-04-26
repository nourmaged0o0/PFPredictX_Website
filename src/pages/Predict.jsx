import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Predict = () => {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatTime = (index) => {
    const hours = Math.floor(index * 15 / 60);
    const minutes = (index * 15) % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a CSV file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);
      setPredictions(response.data.prediction);
    } catch (err) {
      console.error("Error details:", err.response?.data);
      setError(err.response?.data?.error || err.response?.data?.message || 'An error occurred while making predictions');
    } finally {
      setLoading(false);
    }
  };

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
          Power Factor <span className="text-[#e43721]">Prediction</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl mb-8 text-gray-300 text-center"
        >
          Upload your CSV file to get power factor predictions for the next 24 hours
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg border border-gray-800 mb-8"
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-300 text-lg font-medium mb-4">
                Upload CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="block w-full text-gray-300
                  file:mr-4 file:py-3 file:px-6
                  file:rounded-lg file:border-0
                  file:text-lg file:font-medium
                  file:bg-[#e43721] file:text-white
                  hover:file:bg-[#c62e1c]
                  cursor-pointer"
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-[#e43721] text-white py-3 px-6 rounded-lg text-lg font-medium
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-[#c62e1c] transition-colors"
            >
              {loading ? 'Processing...' : 'Get Predictions'}
            </motion.button>
          </form>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </motion.div>

        {predictions && (
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg border border-gray-800"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Prediction Results</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-[#2a2a2a]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Predicted PF
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {predictions.map((value, index) => (
                    <tr key={index} className="hover:bg-[#2a2a2a] transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatTime(index)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {typeof value === 'number' ? value.toFixed(3) : value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Predict;