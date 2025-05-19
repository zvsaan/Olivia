/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
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

const PemetaanPanelPage = () => {
  const [panelData, setPanelData] = useState([]);
  const [geoJsonData, setGeoJsonData] = useState([]);
  const [mapCenter, setMapCenter] = useState([-7.5625922, 111.5778515]);
  const [mapZoom, setMapZoom] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  const [riwayatData, setRiwayatData] = useState({});
  const [loadingRiwayat, setLoadingRiwayat] = useState({});
  const [expandedPopup, setExpandedPopup] = useState(null);

  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");

  const statusColors = {
    Pending: "#FF4500",
    Proses: "#FFD700",
    Selesai: "#4CAF50",
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchGeoJsonAndPanelData = async () => {
      try {
        // Fetch semua GeoJSON dari folder public
        const kecamatanNames = Object.keys(kecamatanColors).filter((name) => name !== "default");

        const geoJsonPromises = kecamatanNames.map((kecamatan) =>
          fetch(`/geojson/${kecamatan}.geojson`)
            .then((response) => {
              if (!response.ok) {
                console.error(`Failed to load ${kecamatan}.geojson`);
                return null;
              }
              return response.json();
            })
            .then((data) => (data ? { kecamatan, data } : null))
        );

        const geoJsonResults = await Promise.all(geoJsonPromises);
        const validGeoJson = geoJsonResults.filter((item) => item !== null);
        setGeoJsonData(validGeoJson);

        // Fetch panel data dari API dengan authorization
        const headers = { Authorization: `Bearer ${authToken}` };
        const panelResponse = await axios.get('http://localhost:8000/api/panels-with-status', { headers });
        setPanelData(panelResponse.data || []);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeoJsonAndPanelData();
  }, [authToken]);

  const fetchRiwayatPanel = async (panelId) => {
    setLoadingRiwayat(prev => ({ ...prev, [panelId]: true }));
    try {
      const headers = { Authorization: `Bearer ${authToken}` };
      const response = await axios.get(`http://localhost:8000/api/riwayat-panel/${panelId}`, { headers });

      const { riwayat_panels = [], pengaduan_details = [] } = response.data;

      const riwayatData = riwayat_panels.map((item) => ({
        ...item,
        source: "Riwayat",
      }));

      const pengaduanData = pengaduan_details.map((detail) => ({
        id_riwayat_panel: detail.id_detail_pengaduan,
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
      setRiwayatData(prev => ({ ...prev, [panelId]: combinedData }));
    } catch (error) {
      console.error("Error fetching Riwayat panel:", error);
      setRiwayatData(prev => ({ ...prev, [panelId]: [] }));
    } finally {
      setLoadingRiwayat(prev => ({ ...prev, [panelId]: false }));
    }
  };

  const styleFeature = (kecamatanName) => {
    const color = kecamatanColors[kecamatanName.toLowerCase()] || kecamatanColors.default;
    return {
      color: color,
      weight: 2,
      fillColor: color,
      fillOpacity: 0.5,
    };
  };

  const getCustomMarkerIcon = (status) => {
    const color = statusColors[status] || "#808080";
    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 24 36">
        <path d="M12 0C7 0 3 4 3 9c0 6.5 9 18 9 18s9-11.5 9-18c0-5-4-9-9-9z" fill="${color}" stroke="#333" stroke-width="1"/>
        <circle cx="12" cy="9" r="5" fill="#FFF" stroke="#333" stroke-width="1"/>
      </svg>
    `;
    return new L.DivIcon({
      className: 'custom-marker-icon',
      html: svgIcon,
      iconSize: [40, 60],
      iconAnchor: [20, 60],
      popupAnchor: [0, -60],
    });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "id_riwayat_panel",
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

  const toggleRiwayat = (panelId, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (expandedPopup === panelId) {
      setExpandedPopup(null);
    } else {
      setExpandedPopup(panelId);
      if (!riwayatData[panelId]) {
        fetchRiwayatPanel(panelId);
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

      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 500,
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          Loading data, please wait...
        </div>
      )}

      <MapContainer 
        center={mapCenter} 
        zoom={mapZoom} 
        style={{ height: '100%', width: '100%' }}
      >
        <div className="map-legend" style={{
        position: 'absolute',
        bottom: '30px',
        right: '10px',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        maxWidth: '200px'
      }}>
        <h4 style={{ marginBottom: '10px', textAlign: 'center' }}>Legenda Status</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: color,
                borderRadius: '50%',
                border: '1px solid #333',
                marginRight: '8px'
              }} />
              <span>{status}</span>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#808080',
              borderRadius: '50%',
              border: '1px solid #333',
              marginRight: '8px'
            }} />
            <span>Default/Tidak diketahui</span>
          </div>
        </div>
      </div>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJsonData.map(({ kecamatan, data }) => (
          <GeoJSON
            key={kecamatan}
            data={data}
            style={() => styleFeature(kecamatan)}
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
        ))}
        {panelData.filter(panel => panel.latitude && panel.longitude).map((panel) => (
          <Marker
            key={panel.id_panel}
            position={[panel.latitude, panel.longitude]}
            icon={getCustomMarkerIcon(panel.status || "Default")}
            eventHandlers={{
              click: (e) => {
                e.originalEvent.preventDefault();
                e.originalEvent.stopPropagation();
              }
            }}
          >
            <Popup>
              <div 
                style={{ 
                  maxWidth: expandedPopup === panel.id_panel ? '600px' : '300px',
                  maxHeight: '500px', 
                  overflow: 'auto',
                  transition: 'all 0.3s ease'
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ fontSize: '16px', textDecoration: 'underline', color: '#4CAF50' }}>
                    PANEL DETAIL
                  </strong>
                  <br />
                  <b>No APP:</b> {panel.no_app}
                  <br />
                  <b>Nama Jalan:</b> {panel.nama_jalan}
                  <br />
                  <b>Kecamatan:</b> {panel.kecamatan}
                  <br />
                  <b>Status:</b> {panel.status || "Tidak diketahui"}
                </div>

                <div 
                  onClick={(e) => toggleRiwayat(panel.id_panel, e)}
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
                      transform: expandedPopup === panel.id_panel ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                      marginRight: '5px'
                    }} 
                  />
                  <span>
                    {loadingRiwayat[panel.id_panel] 
                      ? 'Memuat Riwayat...' 
                      : expandedPopup === panel.id_panel 
                        ? 'Sembunyikan Riwayat' 
                        : 'Tampilkan Riwayat'}
                  </span>
                </div>

                {expandedPopup === panel.id_panel && (
                  <div style={{ marginTop: '10px' }}>
                    {riwayatData[panel.id_panel] ? (
                      riwayatData[panel.id_panel].length > 0 ? (
                        <Table
                          columns={columns}
                          dataSource={riwayatData[panel.id_panel]}
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

export default PemetaanPanelPage;