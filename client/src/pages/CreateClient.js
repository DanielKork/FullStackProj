import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../App.css";
import axios from "axios";

const CreateClient = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    city: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(1).max(60).required(),
    lastname: Yup.string().min(1).max(30).required(),
    city: Yup.string().min(1).max(30).required(),
  });

  const [creationSuccess, setCreationSuccess] = useState(false);
  // const [helloFirstName, setHelloFirstName] = useState();

  const onSubmit = (data) => {
    // console.log(data);
    // setHelloFirstName(data.firstname);
    axios
      .post("http://localhost:3001/clients", data)
      .then((response) => {
        if (response.data === "Creation complete!") {
          setCreationSuccess(true);
        } else {
          alert(response.data);
        }
      })
      .catch((error) => {
        alert("Registration failed:", error);
      });
  };

  // return (
  //   <>
  //     <Link to="/dashboard">Back to dashboard</Link>
  //     <br />
  //     <Link to="/clients">View Clients</Link>
  //     <div className="registration-container">
  //       <h2>Create a new Client</h2>
  //       <Formik
  //         initialValues={initialValues}
  //         onSubmit={onSubmit}
  //         validationSchema={validationSchema}
  //       >
  //         {(formikProps) => (
  //           <Form className="formContainer">
  //             <div className="form-group">
  //               <label htmlFor="firstname">Firstname:</label>
  //               <ErrorMessage
  //                 name="firstname"
  //                 component="span"
  //                 className="error-message"
  //               />
  //               <Field
  //                 id="firstname"
  //                 name="firstname"
  //                 placeholder="(Ex. John...)"
  //               />
  //             </div>
  //             <div className="form-group">
  //               <label htmlFor="lastname">Lastname:</label>
  //               <ErrorMessage
  //                 name="lastname"
  //                 component="span"
  //                 className="error-message"
  //               />
  //               <Field
  //                 id="lastname"
  //                 name="lastname"
  //                 placeholder="(Ex. Cohen...)"
  //               />
  //             </div>
  //             <div className="form-group">
  //               <label htmlFor="city">City:</label>
  //               <ErrorMessage
  //                 name="city"
  //                 component="span"
  //                 className="error-message"
  //               />
  //               <Field id="city" name="city" placeholder="(Ex. Holon...)" />
  //             </div>
  //             <button type="submit" className="submit-button">
  //               Create Client
  //             </button>
  //           </Form>
  //         )}
  //       </Formik>
  //       {creationSuccess && (
  //         <div className="success-message">
  //           <p>New client have been created.</p>
  //           <p>
  //             You can view all clients <Link to="/clients">Here</Link>.
  //           </p>
  //           {/* <p>Hello {helloFirstName}</p> */}
  //         </div>
  //       )}
  //     </div>
  //   </>
  // );
  return (
    <>
      <div className="container">
        <div className="registration-container">
          <h2>Create a new Client</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formikProps) => (
              <Form className="formContainer">
                <div className="form-group">
                  <label htmlFor="firstname">Firstname:</label>
                  <ErrorMessage
                    name="firstname"
                    component="span"
                    className="error-message"
                  />
                  <Field
                    id="firstname"
                    name="firstname"
                    placeholder="(Ex. John...)"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname">Lastname:</label>
                  <ErrorMessage
                    name="lastname"
                    component="span"
                    className="error-message"
                  />
                  <Field
                    id="lastname"
                    name="lastname"
                    placeholder="(Ex. Cohen...)"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">City:</label>
                  <ErrorMessage
                    name="city"
                    component="span"
                    className="error-message"
                  />
                  <Field
                    id="city"
                    name="city"
                    placeholder="(Ex. Holon...)"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="submit-button">
                  Create Client
                </button>
                <Link className="link" to="/dashboard">Back to dashboard</Link>
                <Link className="link" to="/clients">View Clients</Link>
              </Form>
            )}
          </Formik>
          {creationSuccess && (
            <div className="success-message">
              <p>New client have been created.</p>
              <p>
                You can view all clients <Link to="/clients">Here</Link>.
              </p>
              {/* <p>Hello {helloFirstName}</p> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateClient;
