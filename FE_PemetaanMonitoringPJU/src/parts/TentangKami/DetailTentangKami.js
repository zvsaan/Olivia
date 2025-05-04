/* eslint-disable */
import React from 'react';
import Fade from 'react-awesome-reveal';

import bg1 from 'assets/images/tentangKami/bg/bg1.png';
import bg2 from 'assets/images/tentangKami/bg/bg2.png';
import bg3 from 'assets/images/tentangKami/bg/bg3.png';
import bg4 from 'assets/images/tentangKami/bg/bg4.png';
import bg5 from 'assets/images/tentangKami/bg/bg5.png';

import FotoSejarahKami from 'assets/images/tentangKami/sejarah.png';
import FotoSekilasTentangKami from 'assets/images/tentangKami/sekilas.png';
import FotoAreaPersebaran from 'assets/images/tentangKami/AreaPersebaran.png';
import FotoTeamKami from 'assets/images/tentangKami/team.jpeg';
import FotoLayanan from 'assets/images/tentangKami/layanan.jpeg';

import Visi from 'assets/images/tentangKami/visi.jpeg';
import Misi from 'assets/images/tentangKami/misi.jpeg';

const DetailTentangKami = () => {
  return (
    <>
      {/* Sekilas Tentang Sistem */}
      <section className="py-16" style={{ backgroundImage: `url(${bg1})` }}>
        <div className="flex flex-col lg:flex-row">
          <div className="flex-shrink-0 lg:w-1/2 w-full">
            <img
              src={FotoSekilasTentangKami}
              alt="Sekilas Tentang SIGAP"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="lg:w-1/2 w-full lg:pl-28 pl-5 pr-5 lg:pr-28">
            <Fade bottom>
              <h2 className="text-3xl font-bold mb-4">Sekilas Tentang SIGAP</h2>
              <p className="text-lg text-gray-700 mb-6">
                SIGAP adalah platform manajemen penerangan jalan berbasis geospasial yang dikembangkan untuk memantau dan mengoptimalkan 7,459 titik penerangan. Sistem ini dirancang untuk memberikan solusi cerdas dalam pengelolaan infrastruktur penerangan yang efisien dan berkelanjutan.
              </p>
              <a
                href="/tentangkami/sekilas"
                className="text-[#007bff] font-bold hover:text-blue-600"
              >
                Selengkapnya
              </a>
            </Fade>
          </div>
        </div>
      </section>

      {/* Latar Belakang Sistem */}
      <section className="py-16" style={{ backgroundImage: `url(${bg2})` }}>
        <div className="flex flex-col lg:flex-row-reverse">
          <div className="flex-shrink-0 lg:w-1/2 w-full">
            <img
              src={FotoSejarahKami}
              alt="Latar Belakang SIGAP"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="lg:w-1/2 w-full lg:pl-28 pl-5 pr-5 lg:pr-28 text-white">
            <Fade bottom>
              <h2 className="text-3xl font-bold mb-4">Latar Belakang Sistem</h2>
              <p className="text-lg mb-6">
                SIGAP dikembangkan sebagai respons terhadap kebutuhan pengelolaan penerangan jalan yang terintegrasi. Sistem ini memungkinkan pemantauan komprehensif terhadap seluruh titik penerangan, mendukung pengambilan keputusan berbasis data untuk perawatan dan pengembangan infrastruktur.
              </p>
              <a
                href="/tentangkami/sejarah"
                className="text-[#007bff] font-bold hover:text-blue-600"
              >
                Selengkapnya
              </a>
            </Fade>
          </div>
        </div>
      </section>

      {/* Cakupan Pemetaan */}
      <section
        className="bg-cover bg-center py-16"
        style={{ backgroundImage: `url(${bg3})` }}
      >
        <div className="flex flex-col lg:flex-row px-5 lg:px-28">
          <div className="flex-shrink-0 lg:w-1/2 w-full">
            <img
              src={FotoAreaPersebaran}
              alt="Cakupan Pemetaan SIGAP"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="lg:w-1/2 w-full lg:pl-28">
            <Fade bottom>
              <h2 className="text-3xl font-bold mb-4 text-white">Cakupan Pemetaan</h2>
              <p className="text-lg text-white mb-6">
                SIGAP mencakup seluruh wilayah Kabupaten Madiun dengan kemampuan visualisasi geospasial. Sistem ini memetakan setiap titik penerangan beserta data teknisnya, memungkinkan analisis distribusi dan identifikasi area yang membutuhkan perhatian khusus.
              </p>
              <a
                href="/tentangkami/area-operasi"
                className="text-[#007bff] font-bold hover:text-blue-600"
              >
                Selengkapnya
              </a>
            </Fade>
          </div>
        </div>
      </section>

      {/* Fitur Sistem */}
      <section
        className="bg-cover bg-center py-16"
        style={{ backgroundImage: `url(${bg4})` }}
      >
        <div className="flex flex-col lg:flex-row px-5 lg:px-28">
          <div className="lg:w-1/2 w-full lg:pr-28">
            <Fade bottom>
              <h2 className="text-3xl font-bold mb-4 text-white">Fitur SIGAP</h2>
              <p className="text-lg text-white mb-6">
                SIGAP menawarkan berbagai fitur unggulan termasuk pemantauan real-time, pelacakan riwayat maintenance, analisis kinerja, dan perencanaan perawatan. Sistem ini dirancang untuk meningkatkan efisiensi pengelolaan infrastruktur penerangan jalan.
              </p>
              <a
                href="/tentangkami/layanan"
                className="text-[#007bff] font-bold hover:text-blue-600"
              >
                Selengkapnya
              </a>
            </Fade>
          </div>
          <div className="flex-shrink-0 lg:w-1/2 w-full">
            <img
              src={FotoLayanan}
              alt="Fitur SIGAP"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Pengembang Sistem */}
      <section
        className="bg-cover bg-center py-16"
        style={{ backgroundImage: `url(${bg5})` }}
      >
        <div className="flex flex-col lg:flex-row px-5 lg:px-28">
          <div className="flex-shrink-0 lg:w-1/2 w-full">
            <img
              src={FotoTeamKami}
              alt="Tim Pengembang SIGAP"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="lg:w-1/2 w-full lg:pl-28">
            <Fade bottom>
              <h2 className="text-3xl font-bold mb-4 text-white">Tim Pengembang</h2>
              <p className="text-lg text-white mb-6">
                SIGAP dikembangkan oleh tim profesional yang berdedikasi dalam menciptakan solusi teknologi untuk infrastruktur publik. Dengan pendekatan berbasis data dan pengalaman lapangan, kami menghadirkan sistem yang andal dan mudah digunakan.
              </p>
              <a
                href="/tentangkami/team"
                className="text-[#007bff] font-bold hover:text-blue-600"
              >
                Selengkapnya
              </a>
            </Fade>
          </div>
        </div>
      </section>

      {/* Visi dan Misi */}
      <section>
        <div className="flex flex-col lg:flex-row-reverse px-0">
          <div className="flex-shrink-0 lg:w-1/2 w-full flex items-center justify-center">
            <img
              src={Visi}
              alt="Visi SIGAP"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:w-1/2 w-full px-5 lg:px-28 flex items-center justify-center">
            <Fade bottom>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Visi Sistem</h2>
                <div className="flex items-center justify-center mb-6">
                  <p className="text-lg">
                    MENJADI PLATFORM UNGGULAN UNTUK MANAJEMEN PENERANGAN JALAN BERBASIS DATA
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row px-0">
          <div className="flex-shrink-0 lg:w-1/2 w-full flex items-center justify-center">
            <img
              src={Misi}
              alt="Misi SIGAP"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:w-1/2 w-full px-5 lg:px-28 flex items-center justify-center">
            <Fade bottom>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Misi Sistem</h2>
                <div className="flex items-center justify-center mb-6">
                  <p className="text-lg">
                    MENYEDIAKAN SOLUSI TEKNOLOGI UNTUK PENGELOLAAN PENERANGAN JALAN YANG EFISIEN DAN BERKELANJUTAN
                  </p>
                </div>
              </div>
            </Fade>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailTentangKami;