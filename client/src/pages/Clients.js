import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Clients = () => {
  const [firstName, setFirstName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:3001/clients?",
        params: { firstName: firstName },
      });
      if (Array.isArray(response.data)) {
        setErrorOccurred(false);
        setErrorMessage("");
        setSearchResults(response.data);
      } else {
        setErrorOccurred(true);
        setErrorMessage(response.data);
      }
      console.log("Checking response's type:" + Array.isArray(response.data));
    } catch (error) {
      alert("Error searching:" + error.toString());
    }
  };

  // return (
  //   <div className="container">
  //     <Link to="/dashboard" className="link">
  //       Back to dashboard
  //     </Link>
  //     <br />
  //     <Link to="/createclient" className="link">
  //       Create a new Client
  //     </Link>
  //     <h1 className="title">Search for a client's first name:</h1>

  //     <div className="search-container">
  //       <input
  //         type="text"
  //         value={firstName}
  //         onChange={(e) => setFirstName(e.target.value)}
  //         placeholder="Enter first name"
  //         className="input"
  //       />
  //       <button onClick={handleSearch} className="button">
  //         Search
  //       </button>

  //       <table className="table">
  //         <thead>
  //           <tr>
  //             <th>First Name</th>
  //             <th>Last Name</th>
  //             <th>City</th>
  //             {/* Add more table headers as needed */}
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {searchResults.map((result, index) => (
  //             <tr key={index}>
  //               <td>{result.firstName}</td>
  //               <td>{result.lastName}</td>
  //               <td>{result.city}</td>
  //               {/* Add more table cells for additional data */}
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //       {errorOccurred && (
  //         <div className="error-message">
  //           <p>Error:</p>
  //           <p>{errorMessage}</p>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="container">
      <h1 className="title">Search for a client's first name:</h1>

      <div className="search-container">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
          className="input"
        />
        <button onClick={handleSearch} className="submit-button">
          Search
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {searchResults.map((result, index) => (
              <tr key={index}>
                <td>{result.firstName}</td>
                <td>{result.lastName}</td>
                <td>{result.city}</td>
                {/* Add more table cells for additional data */}
              </tr>
            ))}
          </tbody>
        </table>
      <Link to="/dashboard" className="link">Back to dashboard</Link>
      <Link to="/createclient" className="link">Create a new Client</Link>
        {errorOccurred && (
          <div className="error-message">
            <p>Error:</p>
            <p>{errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
