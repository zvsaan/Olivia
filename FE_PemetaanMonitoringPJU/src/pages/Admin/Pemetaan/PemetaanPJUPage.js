/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { Table, Tag, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Panel } = Collapse;

// Warna kecamatan
const kecamatanColors = {
  balerejo: "red",
  dagangan: "blue",
  dolopo: "green",
  geger: "orange",
  gemarang: "purple",
  jiwan: "cyan",
  kare: "pink",
  kebonsari: "yellow",
  madiun: "brown",
  mejayan: "lime",
  pilangkenceng: "teal",
  saradan: "navy",
  sawahan: "magenta",
  wonoasri: "olive",
  wungu: "gray",
  default: "black",
};

// Warna status
const statusColors = {
  Pending: "#FF4500", // Merah
  Proses: "#FFD700", // Kuning
  Selesai: "#4CAF50", // Hijau
};

const PemetaanPJUPage = () => {
  const [kecamatanList, setKecamatanList] = useState([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [pjuData, setPjuData] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [mapCenter, setMapCenter] = useState([-7.5625922, 111.5778515]);
  const [mapZoom, setMapZoom] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [riwayatData, setRiwayatData] = useState({});
  const [loadingRiwayat, setLoadingRiwayat] = useState({});
  const [expandedPopup, setExpandedPopup] = useState(null);

  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const MapViewUpdater = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

  useEffect(() => {
    const headers = { Authorization: `Bearer ${authToken}` };
  
    axios
      .get('http://localhost:8000/api/kecamatan-list', { headers })
      .then((response) => setKecamatanList(response.data || []))
      .catch((error) => {
        console.error('Error fetching kecamatan list:', error);
        setKecamatanList([]);
      });
  }, [authToken]);
  
  useEffect(() => {
    const headers = { Authorization: `Bearer ${authToken}` };

    if (selectedKecamatan) {
      setIsLoading(true);
  
      // Fetch GeoJSON
      fetch(`/geojson/${selectedKecamatan}.geojson`)
        .then((response) => {
          if (!response.ok) {
            console.error(`Failed to load ${selectedKecamatan}.geojson`);
            return null;
          }
          return response.json();
        })
        .then((data) => setGeoJsonData(data))
        .catch((error) => {
          console.error(`Error fetching ${selectedKecamatan}.geojson:`, error);
          setGeoJsonData(null);
        });
  
      // Fetch PJU data
      axios
        .get(`http://localhost:8000/api/pjus-with-status?kecamatan=${selectedKecamatan}`, { headers })
        .then((response) => {
          const data = response.data.data || [];
          setPjuData(data);
  
          if (data.length > 0) {
            const { latitude, longitude } = data[0];
            setMapCenter([latitude, longitude]);
            setMapZoom(14);
          }
        })
        .catch(() => {
          setPjuData([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [selectedKecamatan, authToken]);  

  const fetchRiwayatPJU = async (pjuId) => {
    setLoadingRiwayat(prev => ({ ...prev, [pjuId]: true }));
    try {
      const headers = { Authorization: `Bearer ${authToken}` };
      const response = await axios.get(`http://localhost:8000/api/riwayat-pju/${pjuId}`, { headers });
      
      const { riwayat_pjus = [], pengaduan_details = [] } = response.data;

      const riwayatData = riwayat_pjus.map((item) => ({
        ...item,
        source: "Riwayat",
      }));

      const pengaduanData = pengaduan_details.map((detail) => ({
        id_riwayat_pju: detail.id_detail_pengaduan,
        lokasi: detail.pengaduan?.lokasi || "",
        tanggal_masalah: detail.pengaduan?.tanggal_pengaduan || "",
        jam_masalah: detail.pengaduan?.jam_aduan || "",
        keterangan_masalah: detail.pengaduan?.keterangan_masalah || "",
        uraian_masalah: detail.pengaduan?.uraian_masalah || "",
        tanggal_penyelesaian: detail.pengaduan?.tanggal_penyelesaian || "",
        jam_penyelesaian: detail.pengaduan?.jam_penyelesaian || "",
        durasi_penyelesaian: detail.pengaduan?.durasi_penyelesaian || "",
        penyelesaian_masalah: detail.pengaduan?.penyelesaian_masalah || "",
        pencegahan: detail.pengaduan?.pencegahan_masalah || "",
        nomor_rujukan: detail.pengaduan?.nomor_pengaduan || "",
        status: detail.pengaduan?.status || "",
        source: "Pengaduan",
      }));

      const combinedData = [...riwayatData, ...pengaduanData];
      setRiwayatData(prev => ({ ...prev, [pjuId]: combinedData }));
    } catch (error) {
      console.error("Error fetching Riwayat PJU:", error);
      setRiwayatData(prev => ({ ...prev, [pjuId]: [] }));
    } finally {
      setLoadingRiwayat(prev => ({ ...prev, [pjuId]: false }));
    }
  };

  const handleKecamatanChange = (event) => {
    setSelectedKecamatan(event.target.value);
    setGeoJsonData(null);
  };

  const styleFeature = () => ({
    color: kecamatanColors[selectedKecamatan.toLowerCase()] || kecamatanColors.default,
    weight: 2,
    fillColor: kecamatanColors[selectedKecamatan.toLowerCase()] || kecamatanColors.default,
    fillOpacity: 0.5,
  });

  const getCustomMarkerIcon = (status) => {
    const color = statusColors[status] || "#808080";
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="45" viewBox="0 0 24 36">
        <path d="M12 0C7 0 3 4 3 9c0 6.5 9 18 9 18s9-11.5 9-18c0-5-4-9-9-9z" fill="${color}" stroke="#3a3a3a" stroke-width="1"/>
        <circle cx="12" cy="9" r="5" fill="white" stroke="#3a3a3a" stroke-width="1"/>
      </svg>
    `;
    return new L.DivIcon({
      className: 'custom-marker-icon',
      html: svgIcon,
      iconSize: [30, 45],
      iconAnchor: [15, 45],
      popupAnchor: [0, -45],
    });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id_riwayat_pju",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Lokasi",
      dataIndex: "lokasi",
      render: (lokasi) => (lokasi ? lokasi : "-"),
    },
    {
      title: "Tanggal Masalah",
      dataIndex: "tanggal_masalah",
      render: (date) => (date ? dayjs(date).format("DD MMMM YYYY") : "-"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        if (!status) return <Tag color="default">-</Tag>;
        let color;
        switch (status) {
          case "Pending": color = "gold"; break;
          case "Proses": color = "blue"; break;
          case "Selesai": color = "green"; break;
          default: color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Sumber",
      dataIndex: "source",
      render: (text) => <Tag>{text}</Tag>,
    },
  ];

  const expandedRowRender = (record) => {
    return (
      <div style={{ margin: 0, padding: 0 }}>
        <p><strong>Jam Masalah:</strong> {record.jam_masalah || "-"}</p>
        <p><strong>Keterangan Masalah:</strong> {record.keterangan_masalah || "-"}</p>
        <p><strong>Uraian Masalah:</strong> {record.uraian_masalah || "-"}</p>
        <p><strong>Tanggal Penyelesaian:</strong> {record.tanggal_penyelesaian ? dayjs(record.tanggal_penyelesaian).format("DD MMMM YYYY") : "-"}</p>
        <p><strong>Jam Penyelesaian:</strong> {record.jam_penyelesaian || "-"}</p>
        <p><strong>Durasi Penyelesaian:</strong> {record.durasi_penyelesaian || "-"}</p>
        <p><strong>Penyelesaian Masalah:</strong> {record.penyelesaian_masalah || "-"}</p>
        <p><strong>Pencegahan:</strong> {record.pencegahan || "-"}</p>
        <p><strong>Nomor Rujukan:</strong> {record.nomor_rujukan || "-"}</p>
      </div>
    );
  };

  const toggleRiwayat = (pjuId) => {
    if (expandedPopup === pjuId) {
      setExpandedPopup(null);
    } else {
      setExpandedPopup(pjuId);
      if (!riwayatData[pjuId]) {
        fetchRiwayatPJU(pjuId);
      }
    }
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <button
        onClick={() => navigate('/app/admin/dashboard')}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        Back to Dashboard
      </button>

      {/* Dropdown Kecamatan */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <label htmlFor="kecamatan" style={{ marginRight: '10px', fontWeight: 'bold', fontSize: '14px' }}>
          Pilih Kecamatan:
        </label>
        <select
          id="kecamatan"
          onChange={handleKecamatanChange}
          value={selectedKecamatan || ''}
          style={{
            padding: '5px',
            fontSize: '14px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '100%',
          }}
        >
          <option value="">-- Pilih Kecamatan --</option>
          {kecamatanList.map((kec, index) => (
            <option key={index} value={kec.kecamatan}>
              {kec.kecamatan}
            </option>
          ))}
        </select>
      </div>

      {/* Peta */}
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        <MapViewUpdater center={mapCenter} zoom={mapZoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJsonData && (
          <GeoJSON
            key={selectedKecamatan}
            data={geoJsonData}
            style={styleFeature}
            onEachFeature={(feature, layer) => {
              if (feature.properties) {
                layer.bindPopup(`
                  <div>
                    <strong>Kecamatan:</strong> ${feature.properties.district || 'Tidak diketahui'}
                    <br />
                    <strong>Desa:</strong> ${feature.properties.village || 'Tidak diketahui'}
                  </div>
                `);
              }
            }}
          />
        )}
        {pjuData.filter(pju => pju.latitude && pju.longitude).map((pju) => (
          <Marker
            key={pju.id_pju}
            position={[pju.latitude, pju.longitude]}
            icon={getCustomMarkerIcon(pju.status)}
          >
            <Popup>
              <div style={{ 
                maxWidth: expandedPopup === pju.id_pju ? '600px' : '300px',
                maxHeight: '500px', 
                overflow: 'auto',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '16px', textDecoration: 'underline', color: '#4CAF50' }}>
                    APJ DETAIL
                  </strong>
                  <br />
                  <b>No Tiang:</b> {pju.no_tiang_baru}
                  <br />
                  <b>Nama Jalan:</b> {pju.nama_jalan}
                  <br />
                  <b>Status:</b> {pju.status || "Tidak diketahui"}
                </div>

                <div 
                  onClick={() => toggleRiwayat(pju.id_pju)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#1890ff',
                    cursor: 'pointer',
                    margin: '10px 0',
                    userSelect: 'none'
                  }}
                >
                  <CaretRightOutlined 
                    style={{ 
                      transform: expandedPopup === pju.id_pju ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                      marginRight: '5px'
                    }} 
                  />
                  <span>
                    {loadingRiwayat[pju.id_pju] 
                      ? 'Memuat Riwayat...' 
                      : expandedPopup === pju.id_pju 
                        ? 'Sembunyikan Riwayat' 
                        : 'Tampilkan Riwayat'}
                  </span>
                </div>

                {expandedPopup === pju.id_pju && (
                  <div style={{ marginTop: '10px' }}>
                    {riwayatData[pju.id_pju] ? (
                      riwayatData[pju.id_pju].length > 0 ? (
                        <Table
                          columns={columns}
                          dataSource={riwayatData[pju.id_pju]}
                          size="small"
                          pagination={{ pageSize: 3 }}
                          scroll={{ x: true }}
                          expandable={{
                            expandedRowRender,
                            rowExpandable: () => true,
                          }}
                        />
                      ) : (
                        <p>Tidak ada data riwayat</p>
                      )
                    ) : (
                      <p>Memuat data riwayat...</p>
                    )}
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PemetaanPJUPage;