import React from "react";

const LogoutButton = ({ handleLogout }) => {
  return (
    <button onClick={handleLogout} className="border rounded px-2 py-1 font-bold mt-2 bg-red-500 text-white">
      Logout
    </button>
  );
};

export default LogoutButton;
