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

const images = ["/images/ia.jpg", "/images/ia2.jpg", "/images/ia3.jpg"];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const handleStorageChange = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  const darkModeClasses =
    "bg-gradient-to-b from-[#05000f] to-[#1a0a2b] text-white !important";
  const lightModeClasses =
    "bg-gradient-to-b from-white to-[#dcdcdc] text-black !important";

  return (
    <div className="flex flex-col gap-4 ">
      <div className="w-full flex items-center justify-center bg-gray-900">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0} // 🔹 Quitamos el espacio entre slides
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-full h-[500px]"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full relative">
                <Image
                  src={src}
                  alt={`Slide ${index + 1}`}
                  layout="fill" // 🔹 Hace que la imagen ocupe toda la caja
                  className="object-cover w-screen h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full h-[250px] flex bg-[#f1f1f2] ">
        <div className="border-r-2 border-primary h-full w-1/3 flex flex-col items-center justify-center text-center">
          <span className="mb-4 text-2xl">Vamos a conocer más de</span>
          <Button
            className="rounded-3xl bg-[#2a173a] px-10 py-6 text-white text-2xl font-bold transition-all duration-300 transform hover:scale-110 shadow-[0_6px_15px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_25px_rgba(255,255,255,0.5)]"
            onClick={() => (window.location.href = "/panel")}
          >
            <span className="text-3xl">Private Storage</span>
          </Button>
        </div>

        <div className="w-2/3 flex p-11">
          <span className="text-2xl">
            PrivateStorage es una aplicación descentralizada (dApp) que utiliza
            contratos inteligentes en blockchain para almacenar y gestionar
            información privada de forma segura y transparente. Su objetivo
            principal es permitir a los usuarios mantener datos sensibles
            accesibles únicamente a través de sus wallets conectadas,
            garantizando la privacidad y el control total sobre la información.
          </span>
        </div>
      </div>

      <div
        className={`${
          isDark ? darkModeClasses : lightModeClasses
        } h-[1000px] border-primary border-t-2 flex items-center flex-col p-10 pt-48`}
      >
        {/* <span className="text-4xl  mb-6">Protocolo Kii RWA</span>
        <p className="text-3xl  ml-12 text-center max-w-4xl">
          Tokeniza cualquier activo y accede a liquidez en más de 100
          ecosistemas blockchain con un solo protocolo.
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
        </Button> */}

        <div className="mt-10">
          <Rotation />
        </div>

        <div className="mt-20 w-full flex flex-col items-center">
          <span className="text-3xl  font-semibold">
            ¿Por qué elegir Private Storage?
          </span>
          <p className="text-xl  mt-4 max-w-3xl text-center">
            Gestión segura y privada de datos utilizando tecnología blockchain,
            diseñada para brindarte total transparencia y control.{" "}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 max-w-6xl">
            {/* Privacidad garantizada */}
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-primary"
              >
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8z" />
                <path d="M12 10a2 2 0 1 1-2 2 2 2 0 0 1 2-2z" />
                <path d="M10 14v4h4v-4h-4z" />
              </svg>
              <p className="text-lg mt-4">Privacidad garantizada</p>
            </div>

            {/* Control total */}
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-primary"
              >
                <path d="M19 12a7 7 0 1 0-14 0c0 3.87 7 10 7 10s7-6.13 7-10zM12 14a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" />
              </svg>
              <p className="text-lg mt-4">Control total</p>
            </div>

            {/* Seguridad descentralizada */}
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-16 h-16 text-primary"
              >
                <path d="M12 2L4 7v5c0 5.25 4.5 9.5 8 10 3.5-.5 8-4.75 8-10V7l-8-5zm0 17c-2.25-.5-6-3.75-6-7V8l6-3.5L18 8v4c0 3.25-3.75 6.5-6 7z" />
              </svg>
              <p className="text-lg mt-4">Seguridad descentralizada</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
