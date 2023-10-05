// UserAuth.js
import React, { useState, useEffect } from "react";
import { auth } from "../../fireBase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import AuthPrompt from "./authPrompt"; // Assuming the correct path
import './styles/forms.css'
function UserAuth() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submit, setSubmit] = useState(false);
  const [promptCode, setPromptCode] = useState(false);
  const [smsCodeValue, setSmsCodeValue] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userDisplayName, setUserDisplayName] = useState("");
  const handleFirstName = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastName = (event) => {
    setLastName(event.target.value);
  };
  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, "captcha-container", {
      size: "invisible",
      callback: () => {},
      defaultCountry: "+359",
    });

    window.recaptchaVerifier = recaptchaVerifier;
  }, []);

  const handleSubmit = () => {
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log(firstName + " " + lastName);

        window.confirmationResult = confirmationResult;
        setConfirmationResult(confirmationResult); // Store the confirmation result
        toggleMessageScreen();
        console.log("Code sent!");
      })
      .catch((error) => {
        console.error("Error sending verification code:", error);
      });
  };

  const toggleMessageScreen = () => {
    setPromptCode((current) => !current);
  };

  const handleInputChange = (event) => {
    if (!submit) {
      setPhoneNumber(event.target.value);
    }
  };
  console.log(userDisplayName);

  return (
    <div>
      {!promptCode ? (
        <div className="input-form">
          <div id="captcha-container"></div>
          <p>+359 888768911</p>
          <p >
            <input
            className="input"
              type="tel"
              value={phoneNumber}
              onChange={handleInputChange}
              disabled={submit}
              pattern="^\+359\d{9}$"
              placeholder="+359888768911"
            />
          </p>
          <p className="input">
            <input
              type="text"
              placeholder="Първо Име"
              value={firstName}
              onChange={handleFirstName}
            />
            <input
              type="text"
              placeholder="Фамилия"
              value={lastName}
              onChange={handleLastName}
            />
          </p>
          <button
          className="input-form"
            onClick={(event) => {
              const displayName = firstName + " " + lastName;
              setUserDisplayName(displayName);
              handleFirstName(event);
              handleLastName(event);
              handleSubmit();
            }}
            id="submitButton"
          >
            Submit
          </button>
        </div>
      ) : (
        <AuthPrompt
          confirmationResult={confirmationResult}
          userDisplayName={userDisplayName}
        />
      )}
    </div>
  );
}

export default UserAuth;
