import React, { useState, useEffect } from "react";
import Report from "./report";
import MessageReport from "./messageReport.jsx";
import { onValue, ref, getDatabase } from "firebase/database";
import './styles/reports.css';

function ShowReports() {
  const [writeReport, setWriteReport] = useState(false);
  const [reports, setReports] = useState([]); // Store reports in component state

  const toggleMessageScreen = () => {
    setWriteReport((current) => !current);
  };

  useEffect(() => {
    // Fetch reports from the database when the component mounts
    const db = getDatabase();
    const reportsRef = ref(db, "reports");

    // Use onValue to listen for changes and update the state
    onValue(reportsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const reportsArray = Object.values(data);
        setReports(reportsArray);
      } else {
        setReports([]); // No data in the database
      }
    });
  }, []);

  return (
    <div className="report-container">
      {!writeReport ? (
        <div className="report">
          <div className="report-stats">
            {reports.map((data, index) => (
              <div key={index}>
                <div className="report-card">
                  <Report
                    title={data.title}
                    description={data.description}
                    status={data.status}
                    mediaUrl={data.mediaUrl}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <MessageReport />
      )}
      <div>
        <button
          onClick={() => {
            toggleMessageScreen();
          }}
          className="circle-button"
        >
          {writeReport ? "+" : "+"}
        </button>
      </div>
    </div>
  );
}

export default ShowReports;
