import MainLayout from "@/components/mainlayout";
import { error } from "console";
import { useState } from "react";

function index() {
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      fetch("http://localhost:4005/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("File Uploaded Successfully;", data);
          alert("this");
        })
        .catch((error) => {
          console.error("error uploading file", error);
        });
    }
  };
  return (
    <MainLayout>
      <div>
        <h1>File Upload Example</h1>
        <input type="file" onChange={handleFileChange} />
        <button className="border" onClick={handleUpload}>
          Upload File
        </button>
      </div>
    </MainLayout>
  );
}

export default index;
