import Image from "next/image"
import facebook from "../../assets/logo-black/facebook.svg"
import instagram from "../../assets/logo-black/instagram.svg"
import linkedin from "../../assets/logo-black/linkedin.svg"
import play from "../../assets/logo-black/play.svg"
import spotify from "../../assets/logo-black/spotify.svg"
import tiktok from "../../assets/logo-black/tiktok.svg"

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
  data:listArray[]
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

export default function TemplateUser({ profileImage, name, description, links, bgColor, textColor, buttonColor }: PropsTemplate) {
  const [myColor, setMyColor] = useState("#00A3E3")
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
    isColorLightOrDark(myColor)
    if (myColor) {
      window.document.body.style.background = `linear-gradient(10deg, ${myColor} 10%, rgba(255, 255, 255, 0.62) 130%)`;
      window.document.body.style.background = `-webkit-linear-gradient(10deg, ${myColor} 10%, rgba(255, 255, 255, 0.62) 130%);`;
    }
  }, [myColor])


  const handleVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(90); // Vibra por 100ms
    }
  };

  return (
    <div className={`flex flex-col z-50 relative items-center min-h-screen bg-[#${bgColor}] text-[#${textColor}] py-8 px-4`}>
      {/* <SignOutnBtn /> */}
      <input type="color" id="head" name="head" value={myColor} onChange={(e) => setMyColor(e.target.value)} />
      <div className="flex flex-col  items-center">
        <div className="relative border shadow-md rounded-full overflow-hidden bg-cover text-transparent bg-no-repeat bg-center p-4" >
          <Image
            src={profileImage}
            alt="Profile"
            className=" w-20 h-20 object-cover "
          />
        </div>
        <h1 className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-xl font-semibold`}>{name}</h1>
        <p className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-sm mt-2 `}>{description}</p>
        <div className="my-10">
          <ContadorEterno initialDate="2025-01-20" initialHour="19:00" typeColor={isDarkOrWhite} />
        </div>
      </div>

      <div className="flex items-end flex-row gap-5 mt-4">
        <div className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} duration-700 flex flex-row items-center gap-4  text-3xl`}><FaFacebook /> <FaInstagram /> <FaYoutube /> <FaTiktok /> <FaSpotify /> <FaLinkedin /></div>
      </div>

      <div className=" w-full flex flex-col items-center mt-8 space-y-4">
        {
          links &&
          links?.data?.map((link, index: number) => (
            <div onClick={handleVibration} key={index} className={`${isDarkOrWhite === "dark" ? "bg-white" : "bg-[#262626] text-white"} active:translate-x-4 flex flex-row items-center customShadow gap-3 max-w-[1000px] py-4 px-3 w-full  duration-200 text-center rounded-lg shadow bg-[${buttonColor}]`}>
              <a

                // href={link?.url}
                className={` customShaow gap-3 max-w-[1000px] w-full  duration-200 text-center rounded-lg `}
              >
                {link?.url}

              </a>
              <div className="flex flex-col items-start gap-1">
                <div className={`${isDarkOrWhite === "dark" ? "bg-[#262626]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                <div className={`${isDarkOrWhite === "dark" ? "bg-[#262626]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                <div className={`${isDarkOrWhite === "dark" ? "bg-[#262626]" : "bg-white"}   rounded-full h-1 w-1`}></div>
              </div>
            </div>
          ))}
      </div>
      {/* <section className="mt-12 max-w-[1000px] px-2">

        <div className={`${isDarkOrWhite === "dark" ? "bg-white" : "bg-[#262626]"} customShadowInner  rounded-lg p-3`}>
          <h2 className={`${isDarkOrWhite === "dark" ? "text-black" : "text-white"} text-xl font-bold mb-4`}>Nossa História</h2>
          <p className={`${isDarkOrWhite === "dark" ? "text-black" : "text-white"} text-gray-700 leading-6`}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...
          </p>
        </div>

      </section> */}
    </div>
  );
};