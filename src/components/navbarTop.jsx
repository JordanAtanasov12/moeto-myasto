import React, { useState } from "react";
import "./topNavBar.css";
import ReportScreen from "../screens/reportScreen";
function TopNavBar({ setShowWelcomeScreen }) {
  const [showReports, setShowReports] = useState(false);

  function handleClick() {
    setShowReports(!showReports);
    setShowWelcomeScreen(showReports);
  }
  return (
    <nav>
      <ul className="topNavBar">
        <li>
          <button onClick={handleClick} className="navBarButton"></button>
          {showReports && (
            <div>
              <ReportScreen />
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
export default TopNavBar;
