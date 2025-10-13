<?php

namespace App\Http\Controllers;

use App\Fonts\ThaiSarabunNew;
use Illuminate\Http\Request;
use App\Models\Asset;
use Endroid\QrCode\ErrorCorrectionLevel;
use Barryvdh\DomPDF\Facade\Pdf;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\Label\Font\OpenSans;
use Endroid\QrCode\Label\LabelAlignment;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;

class AssetQrController extends Controller
{
    public function batchPdf(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:assets,id',
        ]);

        $assets = Asset::with(['kind.category', 'vendor'])
            ->whereIn('id', $validated['ids'])
            ->get();

        $qrCodes = [];
        
        $fontPath = public_path('fonts/THSarabunNew.ttf');

        foreach ($assets as $asset) {
            $text = "Asset: {$asset->asset_code}\n"
                  . "Type: {$asset->kind->type_name}\n"
                  . "Category: {$asset->category->name}\n"
                  . "Vendor: " . ($asset->vendor->name ?? '-');

            $builder = new Builder(
                writer: new PngWriter(),
                writerOptions: [],
                validateResult: false,
                data: $asset->asset_code,
                encoding: new Encoding('UTF-8'),
                errorCorrectionLevel: ErrorCorrectionLevel::High,
                size: 300,
                margin: 10,
                roundBlockSizeMode: RoundBlockSizeMode::Margin,
                logoResizeToWidth: 50,
                logoPunchoutBackground: true,
                labelText: 'ทรัพย์สิน',
                labelFont: new ThaiSarabunNew(48),
                labelAlignment: LabelAlignment::Center
            );

            $result = $builder->build();

            $qrCodes[] = [
                'asset' => $asset,
                'qr_base64' => $result->getDataUri(),
            ];
        }

        $pdf = Pdf::setOptions([
            'isRemoteEnabled' => true,
            'defaultFont' => 'THSarabunNew'
        ])->loadView('pdfs.assets-qr-batch', compact('qrCodes'))
            ->setPaper([0, 0, 576, 288], 'landscape'); // 4x2 inch
        return view('pdfs.assets-qr-batch', compact('qrCodes'));    
        //return $pdf->stream('asset-qrcode-batch.pdf');
    }
}
