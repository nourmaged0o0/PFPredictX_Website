import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

const Predict = () => {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const formatTime = (index) => {
    const hours = Math.floor(index * 15 / 60);
    const minutes = (index * 15) % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a CSV file');
      return;
    }

    // Create FormData object (would be used with actual API)
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError(null);

    // Mock API call for demonstration purposes
    // setTimeout(() => {
    //   // Mock prediction data - 96 values for 24 hours in 15-minute intervals
    //   const mockPredictions = Array.from({ length: 96 }, () => 
    //     parseFloat((0.85 + Math.random() * 0.10).toFixed(3))
    //   );
    //   setPredictions(mockPredictions);
    //   setCurrentPage(0);
    //   setLoading(false);
    // }, 1500);
    
    // For actual API implementation (commented out):
    try {
      const response = await axios.post('https://pfpredictx-backend.onrender.com/predict', formData);
      setPredictions(response.data.prediction);
    } catch (err) {
      console.error("Error details:", err.response?.data);
      setError(err.response?.data?.error || err.response?.data?.message || 'An error occurred while making predictions');
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (predictions && currentPage < Math.ceil(predictions.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getCurrentPageData = () => {
    if (!predictions) return [];
    const startIndex = currentPage * itemsPerPage;
    return predictions.slice(startIndex, startIndex + itemsPerPage);
  };

  const prepareChartData = () => {
    if (!predictions) return [];
    return predictions.map((value, index) => ({
      time: formatTime(index),
      pf: value
    }));
  };

  const totalPages = predictions ? Math.ceil(predictions.length / itemsPerPage) : 0;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 text-center">
          Power Factor <span className="text-[#e43721]">Prediction</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-6 md:mb-8 text-gray-300 text-center">
          Upload your CSV file to get power factor predictions for the next 24 hours
        </p>

        <div className="bg-gray-800 p-4 md:p-8 rounded-lg shadow-lg border border-gray-700 mb-6 md:mb-8">
          <div onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-300 text-lg font-medium mb-4">
                Upload CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="block w-full text-gray-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-lg file:font-medium
                  file:bg-[#e43721] file:text-white
                  file:cursor-pointer file:hover:bg-[#c02f1d]"
              />
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
            className="w-full bg-[#e43721] text-white py-3 px-6 rounded-lg text-lg font-medium
                disabled:opacity-50 cursor-pointer
                hover:bg-[#c02f1d] transition-colors"
            >
              {loading ? 'Processing...' : 'Get Predictions'}
            </button>
          </div>

          {error && (
            <div className="mt-4 bg-red-900/50 border border-[#e43721] text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
        </div>

        {predictions && (
          <>
            <div className="bg-gray-800 p-4 md:p-8 rounded-lg shadow-lg border border-gray-700 mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 text-center">Prediction Results</h2>
              
              {/* Graph section */}
              <div className="mb-8 bg-gray-900 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-200 mb-4">Power Factor Trend</h3>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={prepareChartData()}
                      margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis 
                        dataKey="time" 
                        stroke="#aaa"
                        tick={{ fill: '#aaa' }} 
                        tickFormatter={(value, index) => {
                          return index % 8 === 0 ? value : '';
                        }}
                      />
                      <YAxis 
                        stroke="#aaa" 
                        tick={{ fill: '#aaa' }}
                        domain={[
                          (dataMin) => Math.floor(dataMin * 10) / 10, 
                          (dataMax) => Math.ceil(dataMax * 10) / 10
                        ]}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#333', 
                          borderColor: '#555',
                          color: '#fff'
                        }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pf" 
                        stroke="#e43721" 
                        strokeWidth={2}
                        dot={{ r: 2 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Table section */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                        Predicted PF
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {getCurrentPageData().map((value, index) => {
                      const actualIndex = currentPage * itemsPerPage + index;
                      return (
                        <tr key={actualIndex} className="hover:bg-gray-700 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {formatTime(actualIndex)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                            {typeof value === 'number' ? value.toFixed(3) : value}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-400">
                  Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, predictions.length)} of {predictions.length} entries
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className="px-3 py-2 bg-gray-700 rounded-md text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <ChevronLeft size={16} className="mr-1" /> Prev
                  </button>
                  <div className="px-3 py-2 bg-gray-700 rounded-md text-gray-300">
                    Page {currentPage + 1} of {totalPages}
                  </div>
                  <button
                    onClick={nextPage}
                    disabled={currentPage >= totalPages - 1}
                    className="px-3 py-2 bg-gray-700 rounded-md text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    Next <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Predict;