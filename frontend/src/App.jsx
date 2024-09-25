import React from "react";
import FileUpload from "./pages/FileUpload";
import FileList from "./pages/FileList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <ThemeSwitcher />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/upload" />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/files" element={<FileList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
