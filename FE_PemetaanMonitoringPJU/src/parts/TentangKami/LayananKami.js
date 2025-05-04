/* eslint-disable */
import React from 'react';

const LayananKami = () => {
  return (
    <section className="px-5 lg:px-52 py-10">
      {/* Deskripsi */}
      <div className="text-lg text-gray-700 space-y-6">
        <h1 className="text-4xl font-semibold mb-6 text-black">Fitur SIGAP</h1>
        <p>
          SIGAP (Sistem Informasi Geospasial Analitik Penerangan) menawarkan solusi terintegrasi untuk manajemen penerangan jalan berbasis data. Platform ini dirancang untuk memberikan pengelolaan yang komprehensif dan efisien terhadap infrastruktur penerangan.
        </p>
        
        {/* Fitur 1 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">1. Pemetaan Digital Penerangan Jalan</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Visualisasi geospasial seluruh titik penerangan</li>
            <li>Integrasi dengan platform pemetaan digital</li>
            <li>Pelacakan lokasi dan kondisi APJ secara real-time</li>
          </ul>
        </div>
        
        {/* Fitur 2 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">2. Manajemen Data Historis</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Arsip digital riwayat pemeliharaan</li>
            <li>Pelacakan performa setiap unit penerangan</li>
            <li>Analisis tren kerusakan dan perbaikan</li>
          </ul>
        </div>

        {/* Fitur 3 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">3. Sistem Pelaporan Terpadu</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Platform pengaduan masyarakat terintegrasi</li>
            <li>Pelacakan status laporan secara real-time</li>
            <li>Analisis pola kerusakan berbasis lokasi</li>
          </ul>
        </div>

        {/* Fitur 4 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">4. Analisis Kinerja Penerangan</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Evaluasi efisiensi energi tiap titik penerangan</li>
            <li>Identifikasi area prioritas perbaikan</li>
            <li>Prediksi kebutuhan maintenance</li>
          </ul>
        </div>

        {/* Fitur 5 */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-black">5. Dashboard Manajemen</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>Antarmuka pengelolaan terpusat</li>
            <li>Visualisasi data kinerja penerangan</li>
            <li>Alat bantu pengambilan keputusan</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LayananKami;