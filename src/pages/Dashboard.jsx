import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <iframe
        src="https://pfpredictx-backend.onrender.com/dashboard/"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Dash Dashboard"
      />
    </div>
  );
};

export default Dashboard;
