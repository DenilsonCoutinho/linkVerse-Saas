"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ContadorEterno from '../components/counter';
import { FaFacebook, FaInstagram, FaLinkedin, FaSpotify, FaTiktok, FaYoutube } from 'react-icons/fa6';
import ButtonPremium from '../components/ui/buttonPremium';
import { FaExternalLinkAlt } from "react-icons/fa";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
export default function SelectPlan() {

  const imgmine = require('../assets/business-entrepreneur-man-presenting-company-statistics-using-tablet-financial-presentation 1.svg')
  const links = [
    { url: "#", label: "testando pra ver se presta" },
    { url: "#", label: "testando pra ver se presta" },
    { url: "#", label: "testando pra ver se presta" },
  ]
  const [myColor, setMyColor] = useState("#262626")
  const [isDarkOrWhite, setIsDarkOrWhite] = useState("")
  const [isSelected, setIsSelected] = useState("")

  // const linkLogoWhite = [
  //   {
  //     imageLink: facebookWhite
  //   },
  //   {
  //     imageLink: instagramWhite
  //   },
  //   {
  //     imageLink: linkedinWhite
  //   },
  //   {
  //     imageLink: playWhite
  //   },
  //   {
  //     imageLink: spotifyWhite
  //   },
  //   {
  //     imageLink: tiktokWhite
  //   }
  // ]

  // const linkLogo = [
  //   {
  //     imageLink: facebook
  //   },
  //   {
  //     imageLink: instagram
  //   },
  //   {
  //     imageLink: linkedin
  //   },
  //   {
  //     imageLink: play
  //   },
  //   {
  //     imageLink: spotify
  //   },
  //   {
  //     imageLink: tiktok
  //   }
  // ]

  function isColorLightOrDark(hexColor: string) {
    hexColor = hexColor.replace("#", "");
    const r = parseInt(hexColor.substring(0, 2), 16) / 255;
    const g = parseInt(hexColor.substring(2, 4), 16) / 255;
    const b = parseInt(hexColor.substring(4, 6), 16) / 255;

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    console.log(hexColor)
    luminance > 0.6 ? setIsDarkOrWhite("white") : setIsDarkOrWhite("dark");
  }

  useEffect(() => {
    if (myColor) {
      console.log(myColor)
      isColorLightOrDark(myColor)
    }

  }, [])
  useEffect(() => {
    if (myColor) {

      isColorLightOrDark(myColor)
    }
    const plan_1 = document.getElementById("plan_1")
    const plan_2 = document.getElementById("plan_2")
    const plan_1_Carrosel = document.getElementById("plan_3")
    const plan_2_Carrosel = document.getElementById("plan_4")
    if (myColor) {
      if (plan_1) {
        plan_1.style.background = `${myColor}`;
      }
      if (plan_2) {
        plan_2.style.background = `${myColor}`;
      }
      if (plan_1_Carrosel) {
        plan_1_Carrosel.style.background = `${myColor}`;
      }
      if (plan_2_Carrosel) {
        plan_2_Carrosel.style.background = `${myColor}`;
      }
      // window.document.body.style.background = `${myColor};`;
    }
  }, [myColor])

  return (
    <div className="flex flex-col items-center min-h-screen  px-4">
      <h1 className="md:text-4xl text-sm font-bold text-center text-black">Seja notado. Vá de Premium.</h1>
      <p className="text-gray-600 md:text-base text-xs text-center my-2 max-w-5xl">
        Por apenas 1 real por dia tenha um layout incrível que reúne todos os seus links em um só lugar. Experimente agora.
      </p>

      <div className='flex flex-row items-center gap-10'>

        <div className='md:flex hidden  flex-col relative'>
          <div id='plan_1' className="cursor-pointer relative overflow-hidden flex flex-col select-none h-[28rem] md:flex-row gap-6 w-80 overflow-y-auto rounded-3xl scrollSelectPlans">
            {/* Plano Pro */}
            <div className={`flex flex-col items-center  relative`}>
              {/* <SignOutnBtn /> */}

              <div className="flex flex-col  items-center">
                <div className="relative bg-cover w-80 text-transparent bg-no-repeat bg-center">
                  <div className='w-full h-64 overflow-hidden'>
                    <Image quality={100} style={{ width: "100%" }} src={imgmine} alt='image' />
                  </div>

                  <div className="absolute -bottom-[1px] left-0 w-full h-60" style={{ background: `linear-gradient(to top,${myColor} , transparent)` }}></div>
                </div>
                <h1 className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-md font-semibold`}>@agencia_beaverte</h1>
                <p className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-xs mt-2 text-center `}>Planejamento | estruturação | execução de campanhas publicitárias multicanais</p>
                <div className="my-5">
                  <ContadorEterno initialDate="2021-01-30" initialHour="19:00" typeColor={isDarkOrWhite} />
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-end flex-row gap-5">
                <div className={`${isDarkOrWhite === "dark" ? "text-white" : "text-[#444141]"} duration-700 flex flex-row items-center gap-4  text-3xl`}><FaFacebook /> <FaInstagram /> <FaYoutube /> <FaTiktok /> <FaSpotify /> <FaLinkedin /></div>
              </div>

              {/* Buttons Section */}
              <div className=" w-full flex flex-col items-center mt-8 px-3 space-y-4">
                {
                  links &&
                  links?.map((link, index: number) => (
                    <div key={index} className={`${isDarkOrWhite === "dark" ? "bg-white" : "bg-[#444141] text-white"} active:translate-x-4 flex flex-row items-center customShadow gap-3 max-w-[1000px] py-3 px-2 w-full duration-200 text-center rounded-lg shadow`}>
                      <a
                        // href={link?.url}
                        className={` gap-3 max-w-[1000px] w-full text-sm duration-200 text-center rounded-lg `}
                      >
                        {link?.label}

                      </a>
                      <div className="flex flex-col items-start gap-1">
                        <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                        <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                        <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                      </div>
                    </div>
                  ))}
              </div>
              <section className="mt-12 max-w-[1000px] px-2">
                <div className={`${isDarkOrWhite === "dark" ? "bg-white" : "bg-[#444141]"} customShadowInner mb-4 rounded-lg p-3`}>
                  <h2 className={`${isDarkOrWhite === "dark" ? "text-black" : "text-white"} text-xl font-bold `}>Nossa História</h2>
                  <p className={`${isDarkOrWhite === "dark" ? "text-black" : "text-white"} text-gray-700 text-sm leading-5`}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...
                  </p>
                </div>

              </section>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center '>
            <p className='text-gray-400 text-xs my-1 font-semibold text-center'>Por apenas RS29,90/Mês. Cancele a qualquer momento</p>
            <div className='flex items-center gap-3'>
              <ButtonPremium className='buttonPremium ' text='Assinar Premium' />
              <div className='border border-gray-300 rounded-sm p-[14px]'>
                <FaExternalLinkAlt />
              </div>
            </div>
          </div>
        </div>

        <div className='md:flex hidden  flex-col relative'>
          <div id='plan_2' className="cursor-pointer  select-none h-[28rem] md:flex-row  gap-6  w-80  overflow-y-auto  rounded-3xl  scrollSelectPlans ">
            {/* Plano Pro */}
            <Image className=' object-cover w-24 h-24 mt-3 rounded-full overflow-hidden m-auto ' quality={100} src={imgmine} alt='image' />
            <div className={`flex flex-col items-center  `}>
              {/* <SignOutnBtn /> */}

              <div className="flex flex-col w-full  items-center">
                <h1 className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-sm font-semibold`}>@agencia_beaverte</h1>
                <p className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-xs mt-2 text-center `}>Planejamento | estruturação | execução de campanhas publicitárias multicanais</p>
              </div>

              {/* Social Links */}
              <div className="flex items-end flex-row gap-5 mt-2">
                <div className={`${isDarkOrWhite === "dark" ? "text-white" : "text-[#444141]"} duration-700 flex flex-row items-center gap-4  text-3xl`}><FaFacebook /> <FaInstagram /> <FaYoutube /> <FaTiktok /> <FaSpotify /> <FaLinkedin /></div>
              </div>

              {/* Buttons Section */}
              <div className=" w-full flex flex-col items-center mt-8 px-3 space-y-4">
                {
                  links &&
                  links?.map((link, index: number) => (
                    <div key={index} className={`${isDarkOrWhite === "dark" ? "bg-white" : "bg-[#444141] text-white"} active:translate-x-4 flex flex-row items-center customShadow gap-3 max-w-[1000px] py-3 px-2 w-full duration-200 text-center rounded-lg shadow`}>
                      <a
                        // href={link?.url}
                        className={` gap-3 max-w-[1000px] w-full text-sm duration-200 text-center rounded-lg `}
                      >
                        {link?.label}

                      </a>
                      <div className="flex flex-col items-start gap-1">
                        <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                        <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                        <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                      </div>
                    </div>
                  ))}
              </div>
              <section className="mt-12 max-w-[1000px] px-2">
                <div className={`${isDarkOrWhite === "dark" ? "bg-white" : "bg-[#444141]"} customShadowInner mb-4 rounded-lg p-3`}>
                  <h2 className={`${isDarkOrWhite === "dark" ? "text-black" : "text-white"} text-xl font-bold `}>Nossa História</h2>
                  <p className={`${isDarkOrWhite === "dark" ? "text-black" : "text-white"} text-gray-700 text-sm leading-5`}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...
                  </p>
                </div>

              </section>
            </div>
          </div>
          <div className='flex flex-col items-center justify-center '>
            <p className='text-gray-400 text-xs my-1 font-semibold text-center'>Use nosso clássico layout.</p>
            <div className='flex items-center gap-3'>
              <button className=' px-4  h-12 bg-transparent text-black border border-gray-400 flex items-center rounded-lg'>Plano Grátis</button>
              <div className='border border-gray-300 rounded-sm p-[14px]'>
                <FaExternalLinkAlt />
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className='md:hidden flex'>
        <Swiper
          slidesPerView={'auto'}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper max-w-[310px]"
        >
          <SwiperSlide>
            <div className='flex flex-col items-center relative'>
              <div id='plan_3' className="cursor-pointer relative overflow-hidden flex flex-col select-none h-[30rem] md:flex-row gap-6 w-72 overflow-y-auto rounded-3xl scrollSelectPlans">
                {/* Plano Pro */}
                <div className={`flex flex-col items-center  relative`}>
                  {/* <SignOutnBtn /> */}

                  <div className="flex flex-col  items-center">
                    <div className="relative bg-cover w-72 text-transparent bg-no-repeat bg-center">
                      <div className='w-full h-60 overflow-hidden'>
                        <Image quality={100} style={{ width: "100%" }} src={imgmine} alt='image' />
                      </div>

                      <div className="absolute bottom-[6px] left-0 w-full h-36" style={{ background: `linear-gradient(to top,${myColor} , transparent)` }}></div>
                    </div>
                    <h1 className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-sm font-semibold`}>@agencia_beaverte</h1>
                    <p className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-xs mt-2 text-center `}>Planejamento | estruturação | execução de campanhas publicitárias multicanais</p>
                    <div className="my-5">
                      <ContadorEterno initialDate="2021-01-30" initialHour="19:00" typeColor={isDarkOrWhite} />
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-end flex-row gap-5">
                    <div className={`${isDarkOrWhite === "dark" ? "text-white" : "text-[#444141]"} duration-700 flex flex-row items-center gap-4  text-3xl`}><FaFacebook /> <FaInstagram /> <FaYoutube /> <FaTiktok /> <FaSpotify /> <FaLinkedin /></div>
                  </div>

                  {/* Buttons Section */}
                  <div className=" w-full flex flex-col items-center mt-8 px-3 space-y-4">
                    {
                      links &&
                      links?.map((link, index: number) => (
                        <div key={index} className={`${isDarkOrWhite === "dark" ? "bg-white" : "bg-[#444141] text-white"} active:translate-x-4 flex flex-row items-center customShadow gap-3 max-w-[1000px] py-3 px-2 w-full duration-200 text-center rounded-lg shadow`}>
                          <a
                            // href={link?.url}
                            className={` gap-3 max-w-[1000px] w-full text-sm duration-200 text-center rounded-lg `}
                          >
                            {link?.label}

                          </a>
                          <div className="flex flex-col items-start gap-1">
                            <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                            <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                            <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <section className="mt-12 max-w-[1000px] px-2">
                    <div className={`${isDarkOrWhite === "dark" ? "bg-white" : "bg-[#444141]"} customShadowInner mb-4 rounded-lg p-3`}>
                      <h2 className={`${isDarkOrWhite === "dark" ? "text-black" : "text-white"} text-xl font-bold `}>Nossa História</h2>
                      <p className={`${isDarkOrWhite === "dark" ? "text-black" : "text-white"} text-gray-700 text-xs leading-5`}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...
                      </p>
                    </div>

                  </section>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center '>
                <p className='text-gray-400 text-xs my-1 font-semibold text-center'>Por apenas RS29,90/Mês. Cancele a qualquer momento</p>
                <div className='flex items-center gap-3'>
                  <ButtonPremium className='buttonPremium p-4' text='Assinar Premium' />
                  <div className='border border-gray-300 rounded-sm p-[14px]'>
                    <FaExternalLinkAlt />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className=''>
            <div className='flex flex-col justify-center items-center relative'>
              <div id='plan_4' className="cursor-pointer select-none h-[30rem] md:flex-row gap-6 w-72 overflow-y-auto rounded-3xl scrollSelectPlans ">
                {/* Plano Pro */}
                <Image className=' object-cover w-24 h-24 mt-3 rounded-full overflow-hidden m-auto ' quality={100} src={imgmine} alt='image' />
                <div className={`flex flex-col items-center  `}>
                  {/* <SignOutnBtn /> */}

                  <div className="flex flex-col w-full  items-center">
                    <h1 className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-sm font-semibold`}>@agencia_beaverte</h1>
                    <p className={`${isDarkOrWhite === "dark" ? "text-white" : "text-black"} text-xs mt-2 text-center `}>Planejamento | estruturação | execução de campanhas publicitárias multicanais</p>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-end flex-row gap-5 mt-2">
                    <div className={`${isDarkOrWhite === "dark" ? "text-white" : "text-[#444141]"} duration-700 flex flex-row items-center gap-4  text-3xl`}><FaFacebook /> <FaInstagram /> <FaYoutube /> <FaTiktok /> <FaSpotify /> <FaLinkedin /></div>
                  </div>

                  {/* Buttons Section */}
                  <div className=" w-full flex flex-col items-center mt-8 px-3 space-y-4">
                    {
                      links &&
                      links?.map((link, index: number) => (
                        <div key={index} className={`${isDarkOrWhite === "dark" ? "bg-white" : "bg-[#444141] text-white"} active:translate-x-4 flex flex-row items-center customShadow gap-3 max-w-[1000px] py-3 px-2 w-full duration-200 text-center rounded-lg shadow`}>
                          <a
                            // href={link?.url}
                            className={` gap-3 max-w-[1000px] w-full text-sm duration-200 text-center rounded-lg `}
                          >
                            {link?.label}

                          </a>
                          <div className="flex flex-col items-start gap-1">
                            <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                            <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                            <div className={`${isDarkOrWhite === "dark" ? "bg-[#444141]" : "bg-white"}   rounded-full h-1 w-1`}></div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <section className="mt-12 max-w-[1000px] px-2">
                    <div className={`${isDarkOrWhite === "dark" ? "bg-white" : "bg-[#444141]"} customShadowInner mb-4 rounded-lg p-3`}>
                      <h2 className={`${isDarkOrWhite === "dark" ? "text-black" : "text-white"} text-xl font-bold `}>Nossa História</h2>
                      <p className={`${isDarkOrWhite === "dark" ? "text-black" : "text-white"} text-gray-700 text-sm leading-5`}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...
                      </p>
                    </div>

                  </section>
                </div>
              </div>
              <div className='flex flex-col items-center justify-center '>
                <p className='text-gray-400 text-xs my-1 font-semibold text-center'>Use nosso clássico layout.</p>
                <div className='flex items-center gap-3'>
                  <button className=' px-4  h-12 bg-transparent text-black border border-gray-400 flex items-center rounded-lg'>Plano Grátis</button>
                  <div className='border border-gray-300 rounded-sm p-[14px]'>
                    <FaExternalLinkAlt />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

    </div>
  );
}