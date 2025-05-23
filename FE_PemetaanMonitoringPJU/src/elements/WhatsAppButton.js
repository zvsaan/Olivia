/* eslint-disable */
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppReportButton = () => {
  const handleWhatsAppClick = () => {
    const currentDate = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const currentTime = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const message = `Report Trobel PJU
Pelapor : 
Trobel : 
Lokasi : 
Id_tiang : 
Id_panel : 
Tanggal_aduan: ${currentDate}
Jam_aduan : ${currentTime}
Jam_penginformasian : ${currentTime}

Keterangan : 

(LAMPIRKAN FOTO)`;

    const whatsappUrl = `https://wa.me/6285225956590?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition duration-300 group"
      onClick={handleWhatsAppClick}
      style={{ zIndex: 1000 }}
      title="Laporkan Masalah PJU"
    >
      <FaWhatsapp size={24} />
      <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Pengaduan PJU
      </span>
    </div>
  );
};

export default WhatsAppReportButton; 