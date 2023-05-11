import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { baseUrl } from "../../constant";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("user-token");
  const [validation, setValidation] = useState("pending");
  const config = {
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios
      .post(`${baseUrl}/validateToken`, {}, config)
      .then((res) => {
        setValidation("success");
      })
      .catch((err) => {
        setValidation("failed");
      });
  }, []);
  let location = useLocation();

  if (validation === "pending") return <div>Loading....</div>;
  else if (validation === "success") {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
