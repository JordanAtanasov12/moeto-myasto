import { React, useState } from "react";
import TopNavBar from "../components/navbarTop";
import MainScreenContent from "../components/welcomeScreenContent";
function WelcomeScreen() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  return (
    <div>
      <TopNavBar setShowWelcomeScreen={setShowWelcomeScreen} />

      {showWelcomeScreen && (
        <div>
          <MainScreenContent />;
        </div>
      )}
    </div>
  );
}
export default WelcomeScreen; 
