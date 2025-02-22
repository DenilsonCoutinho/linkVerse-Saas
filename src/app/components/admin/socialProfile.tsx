import Image from "next/image";
import imageProfile from '../../assets/uranus.png'
import { FaFacebook, FaPlus, FaTiktok, FaYoutube } from "react-icons/fa6";
export default function SocialProfile() {
    return (
        <div className="flex w-full border py-2 px-2 bg-slate-100 rounded-md border-slate-700">
            <div className="flex items-center gap-2">
                <div className="flex flex-col items-center ">
                    <div className="relative border shadow-md rounded-full overflow-hidden bg-cover text-transparent bg-no-repeat bg-center p-3" >
                        <Image
                            src={imageProfile}
                            alt="Profile"
                            className=" w-11 h-11 object-cover "
                        />
                    </div>
                </div>
                <div className="flex flex-col max-w-[300px]">
                    <h1 className="NameBio text-black text-sm font-medium">@Deni</h1>
                    <h1 className="BioText text-gray-400 text-xs my-2 font-medium">Lorem Ipsum is simply dummy text of the printing and typesetting .</h1>
                    <div className="Icons-Social flex flex-row items-center gap-4 ">
                        <div className="relative">
                            <div className="bg-white w-4 h-4 rounded-full left-4 bottom-3 border border-gray-400 absolute flex justify-center items-center">
                                <FaPlus className="text-[10px] text-gray-400 " />
                            </div>
                            <FaTiktok className="text-2xl  text-gray-400" />
                        </div>
                        <div className="relative">
                            <div className="bg-white w-4 h-4 rounded-full left-4 bottom-3 border border-gray-400 absolute flex justify-center items-center">
                                <FaPlus className="text-[10px] text-gray-400 " />
                            </div>
                            <FaFacebook className="text-2xl text-gray-400" />
                        </div>
                        <div className="relative">
                            <div className="bg-white w-4 h-4 rounded-full left-4 bottom-3 border border-gray-400 absolute flex justify-center items-center">
                                <FaPlus className="text-[10px] text-gray-400 " />
                            </div>
                            <FaTiktok className="text-2xl text-gray-400" />
                        </div>
                        <div className="relative">
                            <div className="bg-white w-4 h-4 rounded-full left-4 bottom-3 border border-gray-400 absolute flex justify-center items-center">
                                <FaPlus className="text-[10px] text-gray-400 " />
                            </div>
                            <FaYoutube className="text-2xl text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}