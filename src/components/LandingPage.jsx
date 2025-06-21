import React from 'react';
import { useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const navigate = useNavigate();

    const changeTo = () =>{
         navigate("/login")
    }

  return (
    <div
      className="h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://marjon-journalism.shorthandstories.com/tinder-how-they-keep-you-swiping/assets/SgbRM44jay/tinder-gradient-750x422.png')", // Replace with your actual image path or URL
      }}
    >
      <div className="absolute top-3 left-5 text-white text-4xl font-dev">
        DevTinder
      </div>
      
      <div className="absolute top-5 right-5">
        <button className="btn btn-primary" onClick={changeTo}>Login</button>
      </div>
    </div>
  );
};

export default LandingPage;
