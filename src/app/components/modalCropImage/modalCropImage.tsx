"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import Cropper, { Area } from "react-easy-crop";
import { ImageKitProvider } from "imagekitio-next";

import { ReactNode, useState } from "react"
import { MdEdit } from "react-icons/md";
import { Input } from "@/components/ui/input";
import UpdateImage from "@/app/services/updateImage";
import { Session } from "next-auth";
import { revalidateTag } from "next/cache";
import DeleteImage from "@/app/services/deleteImage";
import { useToast } from "@/hooks/use-toast";
const authenticator = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/authUpload");
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);
        const data = await response.json();
        return { signature: data.signature, expire: data.expire, token: data.token };
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(`Authentication failed: ${error.message}`);
        }
        return { signature: "", expire: 0, token: "" };
    }
};

const getCroppedImage = (
    imageSrc: string,
    crop: Area
): Promise<string> => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = imageSrc;

    return new Promise((resolve, reject) => {
        img.onload = () => {
            canvas.width = crop.width;
            canvas.height = crop.height;
            ctx?.drawImage(
                img,
                crop.x,
                crop.y,
                crop.width,
                crop.height,
                0,
                0,
                crop.width,
                crop.height
            );
            resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = reject;
    });
};
export function ModalCropImage({ session }: { session: Session | null }) {
    const { toast } = useToast()

    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isOpen, setOpen] = useState<boolean>(false);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    // const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files?.length) {
            const fileURL = URL.createObjectURL(e.target.files[0]);
            setImageSrc(fileURL);
            // const reader = new FileReader();
            //apenas pegar as dimenssões da imagem
            // reader.onload = (e) => {
            //   const img = document.createElement("img");
            //   img.onload = () => setImageSize({ width: img.width, height: img.height });
            //   img.src = e.target?.result as string;
            // };
            // reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onCropComplete = (_: any, croppedArea: Area) => {
        setCroppedAreaPixels(croppedArea);
    };


    const handleCrop = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels);
        const croppedBlob = await fetch(croppedImage).then((res) => res.blob());
        const file = new File([croppedBlob], "cropped-image.jpg", { type: "image/jpeg" });
        const { signature, expire, token } = await authenticator();
        // Criando a requisição para enviar o arquivo via FormData
        const form = new FormData();
        form.append("file", file);
        form.append("fileName", "cropped-image.jpg");
        form.append("publicKey", publicKey as string);
        form.append("signature", signature); // Adicione a assinatura obtida do authenticator
        form.append("expire", expire); // Adicione o tempo de expiração obtido do authenticator
        form.append("token", token);
        const options = {
            method: "POST",
            headers: { Accept: "application/json", Authorization: "Basic 123" }, // Altere a autorização conforme necessário
            body: form,
        };

        try {
            const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", options);
            const data = await response.json();
            await UpdateImage(session?.user?.id!, data?.fileId, data?.url)
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Alerta",
                description: "Erro ao atualizar posição do link!",
            })
        }finally{
            setOpen(false)
            setImageSrc(null)
        }
    };


    async function deleteImage() {
        try {
            const getIDataUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getIDataUser?userId=${session?.user?.id}`, {
                method: "GET",
            })

            const dataUser = await getIDataUser.json()
            if(!dataUser?.data?.imageID){
                return toast({
                    title: "Erro!",
                    variant:"destructive",
                    description: "Não há Imagem para ser deletada!",
                })
            }
            const response = await fetch(`http://localhost:3000/api/deleteFile?idImage=${dataUser?.data?.imageID}`);
            if (!response.ok) throw new Error("Erro ao deletar imagem!")
               
            await DeleteImage(session?.user?.id!)
            setOpen(false)
            setImageSrc(null)
            return toast({
                title: "Ok!",
                variant:"default",
                description: "Imagem deletada com sucesso!",
            })
        } catch (error) {
            if (error instanceof Error) {
                return toast({
                    title: "Alerta",
                    variant:"destructive",
                    description: error?.message,
                })
            }
        }finally{
            setOpen(false)
            setImageSrc(null)
        }


    }
    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)} variant="outline" className="w-8 h-8 -translate-x-7 -translate-y-7 rounded-full">
                    <MdEdit className="text-black" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar foto do perfil</DialogTitle>
                </DialogHeader>
                <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
                    {/* <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} /> */}
                    <Input id="picture" accept=".jpg,.jpeg,.png" onChange={handleFileChange} type="file" />
                    {imageSrc && (
                        <div style={{ width: "100%", height: "300px", position: "relative" }}>
                            <Cropper
                                image={imageSrc}
                                objectFit="contain"
                                cropShape="rect"
                                crop={crop}
                                zoom={zoom}
                                aspect={16 / 16}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                    )}
                    {
                        imageSrc &&
                        <Button className="bg-textColorDefault text-white rounded-lg px-1 shadow-md" onClick={handleCrop}>Crop and Upload</Button>
                    }
                    <Button className="hover:bg-transparent border border-red-500 bg-transparent text-red-500 rounded-lg px-1 shadow-md" onClick={() => deleteImage()}>Deletar imagem atual </Button>
                </ImageKitProvider>
            </DialogContent>
        </Dialog >
    )
}
