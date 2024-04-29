import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const ForgotPasswordEmail = ({ setInsertEmailSuccess, setClientEmail }) => {
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/reset-password", data)
      .then((response) => {
        if (response.data === "Verification code sent successfully") {
          setInsertEmailSuccess(true);
          setClientEmail(data);
        } else {
          alert("Failed to send verification code");
          setInsertEmailSuccess(false);
          setClientEmail("");
        }
      })
      .catch((error) => {
        alert("Error occurred:", error);
      });
  };

  return (
    <div className="container">
      <div className="registration-container">
        <h2>Forgot your password?</h2>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="formContainer">
              <div className="form-group">
                <label htmlFor="email">Enter your email:</label>
                <ErrorMessage
                  name="email"
                  component="span"
                  className="error-message"
                />
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="(Ex. John123@gmail.com...)"
                />
              </div>
              <button type="submit" className="submit-button">
                Send Code
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

const ForgotPasswordCode = ({
  emailAndCodeToVerify,
  setVerificationSuccess,
}) => {
  const initialValuesCode = {
    code: "",
  };

  const validationSchemaCode = Yup.object().shape({
    code: Yup.string().required(),
  });

  const onSubmitCode = (data) => {
    emailAndCodeToVerify.code = data["code"];
    console.log(emailAndCodeToVerify);
    axios
      .post(
        "http://localhost:3001/reset-password/verification-code",
        emailAndCodeToVerify
      )
      .then((response) => {
        if (response.data === "Verification complete!") {
          setVerificationSuccess(true);
        } else {
          alert("Verification failed!");
          setVerificationSuccess(false);
        }
      })
      .catch((error) => {
        alert("Verification failed:", error);
      });
  };

  return (
    <div className="success-message">
      <p>A verification code has been sent to that email address.</p>
      <p>Please enter the code:</p>
      <Formik
        initialValues={initialValuesCode}
        onSubmit={onSubmitCode}
        validationSchema={validationSchemaCode}
      >
        {(formikProps) => (
          <Form className="formContainer">
            <div className="form-group">
              <label htmlFor="verification-code">Enter the code:</label>
              <ErrorMessage
                name="verification-code"
                component="span"
                className="error-message"
              />
              <Field
                id="verification-code"
                name="code"
                placeholder="Enter the code here.."
              />
            </div>
            <button type="submit" className="submit-button">
              Reset your password
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const ForgotPassword = () => {
  const [insertEmailSuccess, setInsertEmailSuccess] = useState(false);
  const [clientEmail, setClientEmail] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  return (
    <>
      <div>
        <ForgotPasswordEmail
          setInsertEmailSuccess={setInsertEmailSuccess}
          setClientEmail={setClientEmail}
        />
        {insertEmailSuccess && (
          <ForgotPasswordCode
            emailAndCodeToVerify={clientEmail}
            setVerificationSuccess={setVerificationSuccess}
          />
        )}
        {verificationSuccess && (
          <div className="success-message">
            <p>Verification complete!</p>
            <p>
              You can now change your password
              <Link to="/reset-password/change-password"> Here</Link>.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
