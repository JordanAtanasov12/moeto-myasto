import React, { useState } from "react";
import reports from "../../data/reportData";
import { getDatabase, set } from "firebase/database";
import { storage } from "../../fireBase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import { ref, uploadBytes } from "firebase";
import { v4 } from "uuid";
//import './styles/reportForm.css'

const MessageReport = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("warning"); // Default status
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaURL, setMediaURL] = useState("");
  const reportID = 0;
  const db = getDatabase();

  const onFileChange = event => {

    // Update the state
    setSelectedFile({ selectedFile: event.target.files[0] });

  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here you can perform actions like sending the report to a server
    // or displaying a confirmation message to the user.
    try {
      reports.addReport(title, description, status, mediaURL);
    } catch (ex) {
      alert(ex);
    }
    reports.getReports().forEach((element) => {
      console.log(element);
    });

    // Reset the form fields
    setTitle("");
    setDescription("");
    setStatus("warning");
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {

    const fileRef = ref(storage, `media/${selectedFile.selectedFile?.name + v4()}`);

    uploadBytes(fileRef, selectedFile.selectedFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setMediaURL(url);
      })
    });
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {

    if (selectedFile) {

      return (
        <div>
          <h2 className="p-title">Детайли за медията:</h2>
          <p className="p-title" >Име:   {selectedFile.selectedFile.name ? selectedFile.selectedFile.name : ""}</p>

          <p className="p-title">Тип:   {selectedFile.selectedFile.type ? selectedFile.selectedFile.type : ""}</p>

          <p className="p-title">
            Последна актуализация:{" "}
            {selectedFile.selectedFile.lastModifiedDate ? selectedFile.selectedFile.lastModifiedDate.toDateString() : ""}
          </p>

        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div className="message-report">
      <h2 className="title"> Сподели с Кошарица</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-title" >Заглавие:</label>
          <input 
            className="text-input"
            type="text"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <div>
            <label for="files" className="form-title">Избери Медия</label>
            <input id="files" type="file" onChange={onFileChange} />
            <button className="btn-style" onClick={onFileUpload}>
              КАЧИ
            </button>
          </div>
          {fileData()}
        </div>
        <div className="form-group">
          <label className="form-title">Описание:</label>
          <textarea
            className="description-area"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="form-group">
          <div className="status-buttons">
            <label className="form-title">
              <input
                type="radio"
                value="warning"
                checked={status === "warning"}
                onChange={handleStatusChange}
              />
              Предупреждение
            </label>
            <label className="form-title">
              <input
                type="radio"
                value="emergency"
                checked={status === "emergency"}
                onChange={handleStatusChange}
              />
              Спешен случай
            </label>
            <label className="form-title">
              <input
                type="radio"
                value="announcement"
                checked={status === "announcement"}
                onChange={handleStatusChange}
              />
              Съобщение
            </label>
          </div>
        </div>
        <button className="report-btn" type="submit">СПОДЕЛИ</button>
      </form>
    </div>
  );
};

export default MessageReport;
