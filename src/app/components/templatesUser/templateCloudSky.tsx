import Image from "next/image"
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

export default function TemplateCloudSky({ name, description, links, buttonColor }: PropsTemplate) {
  const [isDarkOrWhite, setIsDarkOrWhite] = useState("")

  const handleVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(90); // Vibra por 100ms
    }
  };

  // Animação do background
  const slidein = keyframes`
  from { background-position: top; background-size: 3000px; }
  to { background-position: -100px 0px; background-size: 2750px; }
`;

  const BgSky = styled.div`
  background-image: url('https://images.pexels.com/photos/19670/pexels-photo.jpg');
  position: fixed;
  width:100%;
  height: 100vh;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  overflow-y:scroll;
  list-style: none;
  animation: ${slidein} 100s infinite alternate;
`;

  const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(75, 75, 250, 0.3);
  border-radius: 3px;
`;

  return (
    <BgSky>

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

    </BgSky>
  );
};