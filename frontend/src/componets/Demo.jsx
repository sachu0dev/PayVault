import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Demo = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  });
};

export default Demo;
