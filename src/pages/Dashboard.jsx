import React from "react";

const Dashboard = () => {
  return (
    <div>
      <iframe
        src="http://127.0.0.1:5000/dashboard/"
        width="100%"
        height="530"
        style={{ border: "none" }}
        title="Dash Dashboard"
      />
    </div>
  );
};

export default Dashboard;
