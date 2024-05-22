import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Redirect = () => {
  const code = window.location.search;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(process.env.REACT_APP_URL);
    axios.post(`${process.env.REACT_APP_URL}kakaoLogin${code}`).then((r) => {
      console.log(r.data);

      localStorage.setItem('name', r.data.user_name);
      
      navigate('/loginSuccess');
    });
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default Redirect;