/* eslint-disable */
import React from 'react';
import Area from 'assets/images/tentangKami/AreaPersebaran.png';

const AreaOperasiKami = () => {
  return (
    <section className="px-5 lg:px-52 py-10">
      {/* Deskripsi */}
      <div className="text-lg text-gray-700 space-y-6">
        <h1 className="text-4xl font-semibold mb-6 text-black">
          Cakupan Pemetaan SIGAP
        </h1>
        <div className="flex justify-center mb-6">
          <img src={Area} alt="Cakupan Pemetaan SIGAP di Kabupaten Madiun" className="max-w-full h-auto" />
        </div>
        <p>
          Sistem SIGAP mencakup seluruh wilayah Kabupaten Madiun dengan kemampuan pemantauan lebih dari 7,000 titik penerangan jalan. Platform ini dirancang untuk memberikan visibilitas komprehensif terhadap infrastruktur penerangan di 15 kecamatan, termasuk daerah terpencil sekalipun. Dengan antarmuka berbasis peta digital, SIGAP memungkinkan pengelolaan yang presisi terhadap setiap aset penerangan.
        </p>
        <p>
          Teknologi geospasial yang diintegrasikan dalam SIGAP memungkinkan analisis distribusi dan kepadatan penerangan jalan secara real-time. Sistem ini tidak hanya menampilkan lokasi fisik setiap titik penerangan, tetapi juga menyediakan data teknis dan historis yang penting untuk perencanaan pengembangan infrastruktur yang lebih efisien dan berkelanjutan.
        </p>
        <p>
          Implementasi SIGAP melibatkan beberapa tahapan penting mulai dari digitalisasi aset, integrasi data, hingga pengembangan alat analisis. Sistem ini bekerja dengan memadukan berbagai sumber data untuk memberikan gambaran utuh tentang kondisi penerangan jalan di seluruh wilayah. Dengan SIGAP, pengelola dapat melakukan evaluasi menyeluruh dan mengidentifikasi area yang membutuhkan perhatian khusus secara lebih efektif.
        </p>
        <p>
          Keunggulan SIGAP terletak pada kemampuannya untuk mentransformasi data mentah menjadi informasi strategis yang mendukung pengambilan keputusan. Dengan cakupan yang luas ini, sistem ini menjadi alat vital dalam menciptakan Kabupaten Madiun yang memiliki infrastruktur penerangan jalan yang terkelola dengan baik, efisien, dan siap untuk pengembangan lebih lanjut di masa depan.
        </p>
      </div>
    </section>
  );
};

export default AreaOperasiKami;