import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // return (
  //   <>
  //     <h1>Welcome to Comunication_LTD's Dashboard</h1>
  //     <h2>Please choose one of the options below:</h2>
  //     <Link to="/createclient">Create a new Client</Link>
  //     <br />
  //     <Link to="/clients">View Clients</Link>
  //   </>
  // );
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Welcome to Comunication_LTD's Dashboard</h1>
      <h2 className="dashboard-subheading">Please choose one of the options below:</h2>
      
      <div className="dashboard-links">
        <Link to="/createclient" className="dashboard-link">
          Create a new Client
        </Link>
        <br />
        <Link to="/clients" className="dashboard-link">
          View Clients
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
