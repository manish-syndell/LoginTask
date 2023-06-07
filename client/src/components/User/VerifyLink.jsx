import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { verifyLink } from "../../action";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyLink = () => {
  const { isVerified, user } = useSelector((state) => state.user);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const token = queryParams.get("token");
  const navigate = useNavigate();
  const disptch = useDispatch();

  const btnStyle = {
    padding:'10px 30px',
    fontSize:'1.3rem',
    backgroundColor:'#E5007D',
    border:'none',
    color:'#FFFFFF',
    borderRadius:'5px',
    cursor:'pointer'
  }

  const verify = () => {
    console.log(token);
    disptch(verifyLink(token));
  };

  useEffect(() => {
    if (isVerified && user) {
      navigate(`/`);
    }
  }, [navigate, isVerified]);

  return (
    <div>
      <button onClick={verify} style={btnStyle}>Verify Me</button>
    </div>
  );
};

export default VerifyLink;
