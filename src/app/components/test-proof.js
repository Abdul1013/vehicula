"use client"; // For Next.js 13+ app directory

import { useState, useEffect } from "react";

export default function FileManager() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [message, setMessage] = useState("");

  const correctPassword = "blc4ckc4t"; // For demo only; replace with secure auth in production

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setLoggedIn(true);
      fetchFiles();
    } else {
      setLoginError("Invalid password. Please try again.");
    }
  };

  // Fetch file list from API
  const fetchFiles = async () => {
    const res = await fetch("/api/files");
    const data = await res.json();
    setFiles(data.files);
  };

  // Select a file to edit
  const handleSelectFile = async (filename) => {
    setSelectedFile(filename);
    const res = await fetch(`/api/files?file=${filename}`);
    const data = await res.json();
    setFileContent(data.content);
  };

  // Save file edits
  const handleSave = async () => {
    const res = await fetch("/api/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "edit", filename: selectedFile, content: fileContent }),
    });
    const data = await res.json();
    setMessage(data.message);
    fetchFiles();
  };

  // Delete file
  const handleDelete = async () => {
    const res = await fetch("/api/files", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", filename: selectedFile }),
    });
    const data = await res.json();
    setMessage(data.message);
    setSelectedFile(null);
    setFileContent("");
    fetchFiles();
  };

  // Upload file
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!fileUpload) return;
    const formData = new FormData();
    formData.append("file", fileUpload);
    formData.append("action", "upload");

    const res = await fetch("/api/files", { method: "POST", body: formData });
    const data = await res.json();
    setMessage(data.message);
    setFileUpload(null);
    fetchFiles();
  };

  if (!loggedIn) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <form className="bg-white p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleLogin}>
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          {loginError && <p className="text-red-500 mb-3">{loginError}</p>}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">File Manager</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      {/* File list */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Files in directory:</h2>
        <div className="flex flex-col space-y-1">
          {files.map((file) => (
            <button
              key={file}
              className="text-left px-4 py-2 bg-white border rounded hover:bg-gray-100"
              onClick={() => handleSelectFile(file)}
            >
              {file}
            </button>
          ))}
        </div>
      </div>

      {/* File upload */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Upload File:</h2>
        <form onSubmit={handleUpload} className="flex space-x-2">
          <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
          <button type="submit" className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
            Upload
          </button>
        </form>
      </div>

      {/* File editor */}
      {selectedFile && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Edit File: {selectedFile}</h2>
          <textarea
            className="w-full h-64 p-2 border rounded mb-2"
            value={fileContent}
            onChange={(e) => setFileContent(e.target.value)}
          />
          <div className="flex space-x-2">
            <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Save
            </button>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
