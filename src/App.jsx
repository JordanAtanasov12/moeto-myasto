import WelcomeScreen from "./screens/welcomeScreen.jsx";
import { useState } from "react";
import AuthScreen from "./screens/authScreen.jsx";
import ReportScreen from "./screens/reportScreen";
import { Routes, Route } from "react-router-dom";
import './App.css';
//import background from "./images/backgorund_koshara.jpg";

function App() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  return (
    <div className="background">
      <Routes>
        <Route exact path="/" render={() => (
          <Redirect to="/welcome" />
        )} />
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/reports" element={<ReportScreen />} />
        {/* Define other routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
