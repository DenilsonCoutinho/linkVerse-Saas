import Image from "next/image"
import facebook from "../../assets/logo-black/facebook.svg"
import instagram from "../../assets/logo-black/instagram.svg"
import linkedin from "../../assets/logo-black/linkedin.svg"
import play from "../../assets/logo-black/play.svg"
import spotify from "../../assets/logo-black/spotify.svg"
import tiktok from "../../assets/logo-black/tiktok.svg"
import styled, { keyframes } from "styled-components";

import facebookWhite from "../../assets/logo-white/white/facebookwhite.svg"
import instagramWhite from "../../assets/logo-white/white/instagramwhite.svg"
import linkedinWhite from "../../assets/logo-white/white/linkedinwhite.svg"
import playWhite from "../../assets/logo-white/white/playwhite.svg"
import spotifyWhite from "../../assets/logo-white/white/spotify-white.svg"
import tiktokWhite from "../../assets/logo-white/white/tiktok.svg"
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

export default function TemplateUserCounter({ name, description, links, buttonColor }: PropsTemplate) {
  const [isDarkOrWhite, setIsDarkOrWhite] = useState("")

  const handleVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(90); // Vibra por 100ms
    }
  };


  const cubeAnimation = keyframes`
  from {
    transform: scale(0) rotate(0deg) translate(-50%, -50%);
    opacity: 1;
  }
  to {
    transform: scale(20) rotate(960deg) translate(-50%, -50%);
    opacity: 0;
  }
`;


  // Background animado
  const Background = styled.ul`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  background: #0040c1;
  overflow: hidden;
  overflow-y:scroll;
  list-style: none;
`;

  const Cube = styled.li<{ delay: string; left: string; top: string; }>`
  position: fixed;
  border: solid 1px #0039ad;
  width: 10px;
  height: 10px;
  z-index: -1;
  color: transparent;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: ${cubeAnimation} 7s ease-in forwards infinite;
  animation-delay: ${(props) => props.delay};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
`;

  const cubes = [
    { delay: "0s", left: "24vw", top: "70vh", borderColor: "#0046d4" },
    { delay: "1s", left: "34vw", top: "40vh", borderColor: "#0046d4" },
    { delay: "2s", left: "62vw", top: "86vh" },
    { delay: "4s", left: "79vw", top: "38vh", borderColor: "#0046d4" },
    { delay: "2s", left: "39vw", top: "58vh", borderColor: "#0046d4" },
    { delay: "6s", left: "98vw", top: "2vh" },
    { delay: "8s", left: "38vw", top: "21vh", borderColor: "#0046d4" },
    { delay: "10s", left: "15vw", top: "50vh" },
  ];



  return (
    <Background>

      <div className={`flex flex-col relative z-[9999] py-10 items-center overflow-hidden w-full rounded-3xl  px-4`}>
        {cubes.map((cube, index) => (
          <Cube key={index} {...cube} />
        ))}
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
          <div className={`text-white duration-700 flex flex-row items-center gap-4  text-3xl`}>
            <FaFacebook /> <FaInstagram /> <FaYoutube /> <FaTiktok /> <FaSpotify /> <FaLinkedin />
          </div>
        </div>

        <div className=" w-full flex flex-col items-center  space-y-4">
          {
            links &&
            links?.data?.map((link, index: number) => (
              <div onClick={handleVibration} key={index} className={` cursor-pointer bg-white text-black active:translate-x-4 flex flex-row items-center customShadow gap-3 max-w-[700px] py-4 px-3 w-full  duration-200 text-center rounded-lg shadow bg-[${buttonColor}]`}>
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

    </Background>
  );
};