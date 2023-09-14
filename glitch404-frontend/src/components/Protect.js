import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protect = ({ children }) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });
  return <div>{children}</div>;
};

export default Protect;
