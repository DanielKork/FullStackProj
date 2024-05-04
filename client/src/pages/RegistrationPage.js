import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function RegistrationPage() {
  const initialValues = {
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(60).required(),
    password: Yup.string().min(4).max(20).required(),
    email: Yup.string().email().required(),
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/auth", data)
      .then((response) => {
        if (response.data === "Registration complete!") {
          setRegistrationSuccess(true);
        } else {
          alert(response.data);
        }
      })
      .catch((error) => {
        alert("Registration failed:", error);
      });
  };

  return (
    <div className="container">
      <div className="registration-container">
        <h2>Registration Form</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="formContainer">
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <ErrorMessage
                  name="username"
                  component="span"
                  className="error-message"
                />
                <Field
                  id="username"
                  name="username"
                  placeholder="(Ex. John123...)"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <ErrorMessage
                  name="password"
                  component="span"
                  className="error-message"
                />
                <Field
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your Password..."
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <ErrorMessage
                  name="email"
                  component="span"
                  className="error-message"
                />
                <Field
                  id="email"
                  name="email"
                  placeholder="Your email..."
                  className="form-control"
                />
              </div>
              <button type="submit" className="submit-button">
                Create User
              </button>
            </Form>
          )}
        </Formik>
        {registrationSuccess && (
          <div className="success-message">
            <p>You have been registered successfully.</p>
            <p>
              Return to the <Link to="/">Sign In Page</Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegistrationPage;
