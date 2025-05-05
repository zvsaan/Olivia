/* eslint-disable */
import React from 'react';

const Contact = () => {
  return (
    <section className="px-5 lg:px-52 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Contact Information */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-[#007bff] mb-4">DUKUNG SIGAP</h2>
          <p className="text-lg mb-4">Untuk informasi teknis, dukungan sistem, atau pertanyaan tentang platform SIGAP, silakan hubungi:</p>
          <ul className="text-lg">
            <li><strong>Tim Pengembangan:</strong> support@sigap-pju.id</li>
            <li><strong>Bantuan Teknis:</strong> 0851-XXXX-XXXX (Jam kerja 08:00-17:00)</li>
            <li><strong>Laporan Darurat:</strong> 24/7 Hotline: 0851-XXXX-XXXX</li>
            <li><strong>Alamat Kantor:</strong> JL. Teknologi No. 123, Madiun, Jawa Timur</li>
          </ul>
          <p className="text-lg mt-4">
            SIGAP dikembangkan oleh tim mahasiswa untuk mendukung pengelolaan penerangan jalan yang lebih efisien dan berbasis data.
          </p>
        </div>

        {/* Maps Section - Using generic university location */}
        <div className="flex-1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.0000000000005!2d111.000000!3d-7.500000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzAnMDAuMCJTIDExMcKwMDAnMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SIGAP Development Center"
          ></iframe>
          <p className="text-sm text-gray-500 mt-2">
            Lokasi Pengembangan SIGAP - Kampus Universitas Sebelas Maret Madiun
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;