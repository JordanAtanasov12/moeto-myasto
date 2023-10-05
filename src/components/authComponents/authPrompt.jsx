// AuthPrompt.js
import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function AuthPrompt({ confirmationResult, userDisplayName }) {
  const navigate = useNavigate();
  const [codeInput, setCodeInput] = useState("");
  const handleChange = (event) => {
    setCodeInput(event.target.value);
  };

  const handleConfirm = () => {
    console.log(userDisplayName);
    confirmationResult
      .confirm(codeInput)
      .then((result) => {
        const user = result.user;
        // You can add further logic here, such as navigating to a new page.
        return updateProfile(user, { displayName: userDisplayName }).then(
          () => {
            console.log(user);
            navigate("/welcome", { replace: true }).th;
          }
        );
      })
      .catch((ex) => {
        throw ex;
      });
  };

  return (
    <div>
      <p>Enter the verification code:</p>
      <input
        type="tel"
        maxLength={6}
        value={codeInput}
        onChange={handleChange}
        placeholder="Verification code"
      />
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
}

export default AuthPrompt;
