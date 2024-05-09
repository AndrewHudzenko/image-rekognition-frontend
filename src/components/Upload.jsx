import "../styles/Upload.css";
import React, { useState } from "react";
import axios from "axios";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [labelMessage, setLabelMessage] = useState("Choose a file");

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setLabelMessage("1 image selected");
    } else {
      setLabelMessage(labelMessage);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSelectedFile(null);
      setLabelMessage("Choose File");
      setUploadMessage("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      setUploadMessage("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="upload-container">
      <h4 className="upload-topic">Image</h4>
      <input
        type="file"
        name="file"
        id="file"
        className="inputfile"
        onChange={onFileChange}
      />
      <label for="file">{labelMessage || "Choose a file"}</label>
      <button onClick={handleUpload} className="upload-button">
        Upload
      </button>
      <p className="upload-message">{uploadMessage}</p>
    </div>
  );
};

export default Upload;
