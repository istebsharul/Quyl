import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Assuming Sidebar is a separate component
import Content from "./Content"; // Assuming Content is a separate component

const Layout = () => {
  const [selected, setSelected] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false); // Track sidebar visibility

  const handleNavigation = () => {
    setSidebarOpen(!sidebarOpen); // Toggle sidebar visibility
    console.log("hello");
  };

  return (
    <div className="flex h-screen">
      {/* Hamburger Menu Icon for Mobile */}


      {/* Sidebar */}
      <Sidebar
        selected={selected}
        setSelected={setSelected}
        sidebarOpen={sidebarOpen}
        handleNavigation={handleNavigation}
      />
      
      {/* Content */}
      <Content selected={selected} handleNavigation={handleNavigation} />
    </div>
  );
};

export default Layout;
