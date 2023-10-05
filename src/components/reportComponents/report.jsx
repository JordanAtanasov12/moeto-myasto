import React from "react";
import reportData from "../../data/reportData";
import './styles/reports.css'
function Report(params) {
  const deleteReport = (title) => {
    try {
      reportData.deleteReport(title);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="report">
      <h1>{params.title}</h1>
      <p>{params.description}</p>
      {params.status == "emergency" && <p className="isEmergency">СПЕШНОСТ</p>}
      {params.status == "warning" && (
        <p className="isEmergency">ПРЕДУПРЕЖДЕНИЕ</p>
      )}
      {params.status == "announcement" && (
        <p className="isEmergency">СЪОБЩЕНИЕ</p>
      )}
      {
        params.mediaUrl  &&
        <iframe src={params.mediaUrl}></iframe>
      }
      <hr />
    </div>
  );
}
export default Report;
