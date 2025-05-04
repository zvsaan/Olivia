/* eslint-disable */
import React, { useState, useEffect } from "react";
import Button from "elements/Button";
import { Fade } from "react-awesome-reveal";

const heroData = [
  {
    image: require("../../assets/images/hero/herolandingpage/hero1.jpeg"),
    title: "SIGAP: Sistem Geospasial Analitik APJ",
    description: "Platform cerdas berbasis geospasial untuk pengelolaan infrastruktur penerangan jalan.",
  },
  {
    image: require("../../assets/images/hero/herolandingpage/hero2.jpg"),
    title: "Pemetaan Digital Aset Penerangan Jalan",
    description: "Visualisasi komprehensif seluruh titik penerangan dalam sistem SIGAP.",
  },
  {
    image: require("../../assets/images/hero/herolandingpage/hero3.jpeg"),
    title: "SIGAP: Arsip Digital Riwayat Penerangan",
    description: "Database lengkap catatan historis pemeliharaan setiap unit penerangan.",
  },
  {
    image: require("../../assets/images/hero/herolandingpage/hero4.jpeg"),
    title: "SIGAP: Optimalisasi Perawatan Infrastruktur",
    description: "Perencanaan maintenance berbasis analisis data terakumulasi.",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % heroData.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const currentSlide = heroData[currentIndex];

  return (
    <section 
      className="hero relative bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${currentSlide.image})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      
      <div className="relative z-10 flex items-center justify-start h-full text-white mt-5 lg:px-28 px-5">
        <div className="max-w-lg">
          <Fade direction="up" delay={300} triggerOnce>
            <h1 className="text-5xl font-semibold">{currentSlide.title}</h1>
          </Fade>

          <Fade direction="up" delay={500} triggerOnce>
            <p className="mt-4 text-lg">{currentSlide.description}</p>
          </Fade>

          <Fade direction="up" delay={700} triggerOnce>
            <Button
              href="/tentangkami/layanan"
              type="link"
              className="inline-flex items-center mt-5 px-5 py-4 text-white text-lg bg-theme-purple rounded-lg shadow-2xl hover:bg-dark-theme-purple transition duration-200"
            >
              Jelajahi SIGAP
              <svg
                className="ml-2 w-5 h-5 text-white animate-bounce-x"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default Hero;