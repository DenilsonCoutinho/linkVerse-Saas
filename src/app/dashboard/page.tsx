"use client"
import { SignOutnBtn } from "../components/auth/signOutButton";
import { useSession } from "next-auth/react"
import imageLogo from '../assets/uranus.png'
import Image, { StaticImageData } from "next/image";
import TemplateUser from "../components/templatesUser/template01";

export default function Dashboard() {
  const links = [
    { url: "#", label: "testando pra ver se presta" },
    { url: "#", label: "testando pra ver se presta" },
    { url: "#", label: "testando pra ver se presta" },
  ]
  
  return (
    <div>
      <TemplateUser links={links} buttonColor="#fff" name="Pizzaria Saturno" description="Atendemos De Seg a Sex até as 03:00pm"  profileImage={imageLogo} />
    </div>
  )
}



