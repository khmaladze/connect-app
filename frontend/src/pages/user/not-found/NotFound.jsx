import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const [time, setTime] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    if (time - 1 > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (time - 1 === 0) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [time]);

  return "";
};

export default NotFound;
