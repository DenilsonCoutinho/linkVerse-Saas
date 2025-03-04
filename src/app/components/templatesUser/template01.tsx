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
  profileImage?: any;
  name?: string;
  description?: string;
  links: Links;
  bgColor?: string;
  textColor?: string;
  buttonColor?: string
}
interface listArray {
  id: string;
  url: string;
  active: boolean;
  userId?: string;
  order: number;
}

export default function TemplateUserCounter({ profileImage, name, description, links, bgColor, textColor, buttonColor }: PropsTemplate) {
  const [isDarkOrWhite, setIsDarkOrWhite] = useState("")

  const linkLogoWhite = [
    {
      imageLink: facebookWhite
    },
    {
      imageLink: instagramWhite
    },
    {
      imageLink: linkedinWhite
    },
    {
      imageLink: playWhite
    },
    {
      imageLink: spotifyWhite
    },
    {
      imageLink: tiktokWhite
    }
  ]

  const linkLogo = [
    {
      imageLink: facebook
    },
    {
      imageLink: instagram
    },
    {
      imageLink: linkedin
    },
    {
      imageLink: play
    },
    {
      imageLink: spotify
    },
    {
      imageLink: tiktok
    }
  ]


  function isColorLightOrDark(hexColor: string) {
    hexColor = hexColor.replace("#", "");
    const r = parseInt(hexColor.substring(0, 2), 16) / 255;
    const g = parseInt(hexColor.substring(2, 4), 16) / 255;
    const b = parseInt(hexColor.substring(4, 6), 16) / 255;

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    luminance > 0.6 ? setIsDarkOrWhite("light") : setIsDarkOrWhite("dark");
  }

  useEffect(() => {

  }, [])


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

  // Botão estilizado
  const Button = styled.button<{ $primary?: boolean }>`
  background: ${(props) => (props.$primary ? "#BF4F74" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#BF4F74")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #BF4F74;
  border-radius: 3px;
`;

  // Background animado
  const Background = styled.ul`
  background: #0040c1;
  overflow: hidden;
  list-style: none;
`;

  const Cube = styled.li<{ delay: string; left: string; top: string; borderColor?: string }>`
  position: absolute;
  z-index:-1;
  width: 10px;
  height: 10px;
  border: solid 1px ${(props) => props.borderColor || "#0039ad"};
  color: transparent;
  transform-origin: top left;
  transform: scale(0) rotate(0deg) translate(-50%, -50%);
  animation: ${cubeAnimation} 7s ease-in forwards infinite;
  animation-delay: ${(props) => props.delay};
  left: ${(props) => props.left};
  top: ${(props) => props.top};
`;

  const cubes = [
    { delay: "0s", left: "24vw", top: "40vh", borderColor: "#0046d4" },
    { delay: "1s", left: "32vw", top: "66vh" },
    { delay: "2s", left: "69vw", top: "38vh", borderColor: "#0046d4" },
    { delay: "3s", left: "78vw", top: "2vh" },
    { delay: "5s", left: "28vw", top: "21vh", borderColor: "#0046d4" },
    { delay: "7s", left: "15vw", top: "20vh" },
  ];
  return (
    <Background>

      <div className={`flex flex-col relative z-[9999] py-10 items-center overflow-hidden w-full rounded-3xl bg-[#${bgColor}] text-[#${textColor}] px-4`}>
        {/* <SignOutnBtn /> */}
        <div className="flex flex-col  items-center">
          <div className="relative border shadow-md rounded-full overflow-hidden bg-cover text-transparent bg-no-repeat bg-center p-4" >
            {/* <Image
            src={profileImage}
            alt="Profile"
            className=" w-20 h-20 object-cover "
          /> */}
          </div>
          <h1 className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-xl font-semibold`}>{name}</h1>
          <p className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-sm mt-2 `}>{description}</p>
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
              <div onClick={handleVibration} key={index} className={` bg-white text-black active:translate-x-4 flex flex-row items-center customShadow gap-3 max-w-[700px] py-4 px-3 w-full  duration-200 text-center rounded-lg shadow bg-[${buttonColor}]`}>
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


        {cubes.map((cube, index) => (
          <Cube key={index} {...cube} />
        ))}
      </div>
    </Background>
  );
};