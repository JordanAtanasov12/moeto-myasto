import React from 'react';
import MessageReport from './messageReport'; // Adjust the path to your MessageReport component

const OpenReportButton = () => {
  const openReportWindow = () => {
    const newWindow = window.open('', '_blank', 'width=600,height=600');
    newWindow.document.body.innerHTML = '<div id="report-container"></div>';

    const container = newWindow.document.getElementById('report-container');
    React.render(<MessageReport />, container);
  };

  return (
    <button onClick={openReportWindow}>Open Message Report</button>
  );
};

export default OpenReportButton;
