
import styled, { keyframes } from "styled-components";

import ContadorEterno from "../counter"
import { SignOutnBtn } from "../auth/signOutButton"
import { useEffect, useState } from "react"
import { FaFacebook, FaInstagram, FaLinkedin, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa6'
interface Links {
  data: listArray[]
}
interface PropsTemplate {
  name?: string;
  description?: string;
  links: Links;
  buttonColor?: string
}
interface listArray {
  id: string;
  url: string;
  active: boolean;
  userId?: string;
  order: number;
}

export default function TemplateCloud({ name, description, links, buttonColor }: PropsTemplate) {
  const [isDarkOrWhite, setIsDarkOrWhite] = useState("")

  const handleVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(90); // Vibra por 100ms
    }
  };


  const moveClouds = keyframes`
  0% { margin-left: 1000px; }
  100% { margin-left: -1000px; }
`;

  // Container principal das nuvens
  const CloudsContainer = styled.div`
  padding: 100px 0;
  background: linear-gradient(to bottom, #c9dbe9 0%, #fff 100%);
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  overflow-y:scroll;
  list-style: none;
`;

  // Estilo base das nuvens
  const Cloud = styled.div`
  width: 200px;
  height: 60px;
  background: #fff;
  border-radius: 200px;
  position: absolute;
  top: 120px;
  &:before,
  &:after {
    content: "";
    position: absolute;
    background: #fff;
    border-radius: 100px;
    transform: rotate(30deg);
  }

  &:before {
    width: 100px;
    height: 80px;
    top: -15px;
    left: 10px;
  }

  &:after {
    width: 120px;
    height: 120px;
    top: -55px;
    right: 15px;
  }
`;

  // Variantes das nuvens com animações diferentes
  const CloudX1 = styled(Cloud)`
  animation: ${moveClouds} 15s linear infinite;
`;

  const CloudX2 = styled(Cloud)`
  left: 200px;
  transform: scale(0.6);
  opacity: 0.6;
  animation: ${moveClouds} 25s linear infinite;
`;

  const CloudX3 = styled(Cloud)`
  left: -250px;
  top: -200px;
  transform: scale(0.8);
  opacity: 0.8;
  animation: ${moveClouds} 20s linear infinite;
`;

  const CloudX4 = styled(Cloud)`
  left: 470px;
  top: -250px;
  transform: scale(0.75);
  opacity: 0.75;
  animation: ${moveClouds} 18s linear infinite;
`;

  const CloudX5 = styled(Cloud)`
  left: -150px;
  top: -150px;
  transform: scale(0.8);
  opacity: 0.8;
  animation: ${moveClouds} 20s linear infinite;
`;



  return (
    <CloudsContainer>
      <CloudX1 />
      <CloudX2 />
      <CloudX3 />
      <CloudX4 />
      <CloudX5 />
      <div className={`flex flex-col relative z-[9999] py-10 items-center overflow-hidden w-full rounded-3xl  px-4`}>

        <div className="flex flex-col  items-center">
          <div className="relative border shadow-md rounded-full overflow-hidden bg-cover text-transparent bg-no-repeat bg-center p-4" >
            {/* <Image
            src={profileImage}
            alt="Profile"
            className=" w-20 h-20 object-cover "
          /> */}
          </div>
          <h1 className={`text-white text-xl font-semibold`}>a{name}</h1>
          <p className={`text-white text-sm mt-2 `}>{description}</p>
          <div className="my-10">
            <ContadorEterno initialDate="2025-01-20" initialHour="19:00" typeColor={isDarkOrWhite} />
          </div>
        </div>

        <div className="flex items-end flex-row gap-5 mb-4">
          <div className={`text-gray-600 duration-700 flex flex-row items-center gap-4  text-3xl`}>
            <FaFacebook /> <FaInstagram /> <FaYoutube /> <FaTiktok /> <FaSpotify /> <FaLinkedin />
          </div>
        </div>

        <div className=" w-full flex flex-col items-center  space-y-4">
          {
            links &&
            links?.data?.map((link, index: number) => (
              <div onClick={handleVibration} key={index} className={` cursor-pointer bg-white text-black active:translate-x-4 flex flex-row items-center customShadow gap-3 max-w-[700px] py-4 px-3 w-full  duration-200 text-center rounded-lg shadow `}>
                <a

                  className={` customShaow gap-3 max-w-[1000px] w-full  duration-200 text-center rounded-lg `}
                >
                  {link?.url}

                </a>
                <div className="flex flex-col items-start gap-1">
                  <div className={` bg-gray-500 rounded-full h-1 w-1`}></div>
                  <div className={` bg-gray-500 rounded-full h-1 w-1`}></div>
                  <div className={` bg-gray-500 rounded-full h-1 w-1`}></div>
                </div>
              </div>
            ))}
        </div>


      </div>

    </CloudsContainer>
  );
};