<?php

namespace App\Http\Controllers;

use App\Models\RiwayatPanel;
use App\Models\Pengaduan;
use Illuminate\Support\Facades\DB;
use App\Models\DetailPengaduan;
use Illuminate\Http\Request;
use App\Models\RiwayatPJU;
use App\Models\DataPJU;

class PemetaanController extends Controller
{
    public function getPanelStatus($panel_id)
    {
        $statuses = [];

        // Ambil semua status dari RiwayatPanel
        $riwayatStatuses = RiwayatPanel::where('panel_id', $panel_id)->pluck('status')->toArray();
        $statuses = array_merge($statuses, $riwayatStatuses);

        // Ambil semua status dari DetailPengaduan
        $pengaduanStatuses = DetailPengaduan::where('panel_id', $panel_id)
            ->with('pengaduan')
            ->get()
            ->pluck('pengaduan.status')
            ->toArray();
        $statuses = array_merge($statuses, $pengaduanStatuses);

        // Prioritaskan status
        if (in_array('Pending', $statuses)) {
            return 'Pending';
        } elseif (in_array('Proses', $statuses)) {
            return 'Proses';
        }

        // Default ke Selesai jika tidak ada status Pending atau Proses
        return 'Selesai';
    }

    public function getPanelsWithStatus()
    {
        $panels = DB::table('data_panels')->get();

        $panelsWithStatus = $panels->map(function ($panel) {
            $panel->status = $this->getPanelStatus($panel->id_panel);
            return $panel;
        });

        return response()->json($panelsWithStatus);
    }

    public function getPjusWithStatus(Request $request)
    {
        $kecamatan = $request->query('kecamatan');

        if ($kecamatan) {
            $pjus = DataPJU::where('kecamatan', $kecamatan)->get()->map(function ($pju) {
                $statuses = [];

                // Ambil status dari RiwayatPJU
                $riwayatStatuses = RiwayatPJU::where('pju_id', $pju->id_pju)->pluck('status')->toArray();
                $statuses = array_merge($statuses, $riwayatStatuses);

                // Ambil status dari DetailPengaduan
                $pengaduanStatuses = DetailPengaduan::where('pju_id', $pju->id_pju)
                    ->with('pengaduan')
                    ->get()
                    ->pluck('pengaduan.status')
                    ->toArray();
                $statuses = array_merge($statuses, $pengaduanStatuses);

                // Prioritaskan status
                if (in_array('Pending', $statuses)) {
                    $pju->status = 'Pending';
                } elseif (in_array('Proses', $statuses)) {
                    $pju->status = 'Proses';
                } else {
                    $pju->status = 'Selesai';
                }

                return $pju;
            });
        } else {
            $pjus = collect();
        }

        return response()->json([
            'data_count' => $pjus->count(),
            'data' => $pjus,
        ]);
    }

    public function riwayatpju($pju_id)
    {
        $dataPJU = DB::table('data_pjus')->where('id_pju', $pju_id)->first();
        
        // Ambil 1 data terbaru dari RiwayatPJU
        $riwayatPju = RiwayatPJU::where('pju_id', $pju_id)
            ->latest()
            ->first();

        // Ambil 1 data terbaru dari DetailPengaduan dengan relasi pengaduan
        $pengaduanDetail = DetailPengaduan::with('pengaduan')
            ->where('pju_id', $pju_id)
            ->latest()
            ->first();

        return response()->json([
            'no_tiang_baru' => $dataPJU->no_tiang_baru ?? 'Unknown',
            'riwayat_pju' => $riwayatPju, // sekarang singular karena hanya 1 data
            'pengaduan_detail' => $pengaduanDetail, // sekarang singular karena hanya 1 data
        ]);
    }

    public function riwayatpanel($panel_id)
    {
        $dataPanel = DB::table('data_panels')->where('id_panel', $panel_id)->first();
        
        // Ambil 1 data terbaru dari RiwayatPanel
        $riwayatPanel = RiwayatPanel::where('panel_id', $panel_id)
            ->latest()
            ->first();

        // Ambil 1 data terbaru dari DetailPengaduan dengan relasi pengaduan
        $pengaduanDetail = DetailPengaduan::with('pengaduan')
            ->where('panel_id', $panel_id)
            ->latest()
            ->first();

        return response()->json([
            'no_app' => $dataPanel->no_app ?? 'Unknown',
            'riwayat_panel' => $riwayatPanel, // sekarang singular karena hanya 1 data
            'pengaduan_detail' => $pengaduanDetail, // sekarang singular karena hanya 1 data
        ]);
    }
}