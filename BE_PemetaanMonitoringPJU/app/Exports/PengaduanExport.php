<?php

namespace App\Exports;

use App\Models\Pengaduan;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class PengaduanExport implements FromCollection, WithHeadings
{
    public function collection()
    {
        $pengaduanData = Pengaduan::whereHas('detailPengaduans', function ($query) {
            $query->whereNotNull('pju_id'); 
        })
        ->with('detailPengaduans.pju')
        ->get();

        return $pengaduanData->map(function ($pengaduan) {
            $noTiang = $pengaduan->detailPengaduans->first()->pju->no_tiang_baru ?? 'N/A';

            return [
                'Source' => 'Pengaduan',
                'Nomor Pengaduan' => $pengaduan->nomor_pengaduan,
                'Pelapor' => $pengaduan->pelapor,
                'Lokasi' => $pengaduan->lokasi,
                'No Tiang' => $noTiang,
                'Kondisi Masalah' => $pengaduan->kondisi_masalah,
                'Tanggal Pengaduan' => \Carbon\Carbon::parse($pengaduan->tanggal_pengaduan)->format('d M Y'),
                'Jam Aduan' => $pengaduan->jam_aduan,
                'Keterangan Masalah' => $pengaduan->keterangan_masalah,
                'Uraian Masalah' => $pengaduan->uraian_masalah,
                'Tanggal Penyelesaian' => $pengaduan->tanggal_penyelesaian ? \Carbon\Carbon::parse($pengaduan->tanggal_penyelesaian)->format('d M Y') : '-',
                'Jam Penyelesaian' => $pengaduan->jam_penyelesaian ?? '-',
                'Durasi Penyelesaian (Jam)' => $pengaduan->durasi_penyelesaian ?? '-',
                'Penyelesaian Masalah' => $pengaduan->penyelesaian_masalah,
                'Pencegahan Masalah' => $pengaduan->pencegahan_masalah,
                'Pengelompokan Masalah' => $pengaduan->pengelompokan_masalah,
                'Status' => $pengaduan->status,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Source',
            'Nomor Pengaduan',
            'Pelapor',
            'Lokasi',
            'No Tiang',
            'Kondisi Masalah',
            'Tanggal Pengaduan',
            'Jam Aduan',
            'Keterangan Masalah',
            'Uraian Masalah',
            'Tanggal Penyelesaian',
            'Jam Penyelesaian',
            'Durasi Penyelesaian (Jam)',
            'Penyelesaian Masalah',
            'Pencegahan Masalah',
            'Pengelompokan Masalah',
            'Status',
        ];
    }
}