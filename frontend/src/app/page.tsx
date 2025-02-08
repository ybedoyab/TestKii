"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Rotation from "@/components/ui/rotation";
import { useEffect, useState } from "react";
const images = [
  "/images/ia.png",
  "/images/Logo_KiiChain_2024.png",
  "/images/ia2.png",
  "/images/ia3.jpg",
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const handleStorageChange = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };
  
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  const darkModeClasses = "bg-gradient-to-b from-[#05000f] to-[#1a0a2b] text-white !important";
  const lightModeClasses = "bg-gradient-to-b from-white to-[#dcdcdc] text-black !important";

  return (
    <div className="flex flex-col gap-4 ">
      <div className="w-full  flex items-center justify-center bg-gray-900">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0} // 🔹 Quitamos el espacio entre slides
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-full max-w-4xl h-[500px]"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  fill // 🔹 Hace que la imagen ocupe toda la caja
                  className="object-cover w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full h-[250px] flex bg-[#f1f1f2] ">
        <div className="border-r-2 border-primary h-full w-1/3 flex flex-col items-center justify-center text-center">
          <span className="mb-4 text-2xl">Vamos a conocer más</span>
          <Button className="rounded-3xl bg-[#2a173a] px-10 py-6 text-white text-2xl font-bold transition-all duration-300 transform hover:scale-110 shadow-[0_6px_15px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_25px_rgba(255,255,255,0.5)]">
            <span className="text-3xl">¡Conozcamos!</span>
          </Button>

        </div>

        <div className="w-2/3 flex p-11">
          <span className="text-2xl">KiiChain es una AppChain creada especificamente para mercados emergentes, permitiendo a desarolladores y empresas aprovechar aplicaciones del mundo real mediante tecnología interoperable y de código abierto.</span>
        </div>

      </div>
      
      <div className={`${isDark ? darkModeClasses : lightModeClasses} h-[1000px] border-primary border-t-2 flex items-center flex-col p-10 pt-48`}>
        <span className="text-4xl  mb-6">Protocolo Kii RWA</span>
        <p className="text-3xl  ml-12 text-center max-w-4xl">
          Tokeniza cualquier activo y accede a liquidez en más de 100 ecosistemas blockchain con un solo protocolo.
        </p>
        <Button className="bg-[#05000f] border-2 border-primary text-white px-10 py-5 flex items-center gap-4 text-2xl font-bold rounded-2xl shadow-[0_6px_15px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:scale-110 hover:shadow-[0_12px_25px_rgba(255,255,255,0.5)] mt-6">
          <span>Comienza a construir</span>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 24 24"
            height="35"
            width="35"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.25 15.5a.75.75 0 0 1-.75-.75V7.56L7.28 17.78a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L16.44 6.5H9.25a.75.75 0 0 1 0-1.5h9a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75Z"></path>
          </svg>
        </Button>

        <div className="mt-10">
          <Rotation />
        </div>
       
        <div className="mt-20 w-full flex flex-col items-center">
          <span className="text-3xl  font-semibold">¿Por qué elegir Kii RWA?</span>
          <p className="text-xl  mt-4 max-w-3xl text-center">
            Con nuestro protocolo, puedes tokenizar activos físicos y digitales, asegurando interoperabilidad con los principales ecosistemas blockchain del mundo.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-6xl">
            <div className="flex flex-col items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-primary"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                <path d="M12 6a6 6 0 1 0 6 6 6.007 6.007 0 0 0-6-6zm0 10a4 4 0 1 1 4-4 4.005 4.005 0 0 1-4 4z" />
              </svg>
              <p className="text-lg mt-4">Seguridad y Transparencia</p>
            </div>

            <div className="flex flex-col items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-primary"
              >
                <path d="M3 12l18-10v20z" />
              </svg>
              <p className="text-lg mt-4">Interoperabilidad Multichain</p>
            </div>

            <div className="flex flex-col items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-primary"
              >
                <path d="M12 2L1.5 21h21z" />
              </svg>
              <p className="text-lg mt-4">Liquidez Inmediata</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
