<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>Asset QR Code Batch</title>

  {{-- ฝังฟอนต์ไทยแบบ Base64 สำหรับ DomPDF 3.x --}}
  @php
    $fontPath = public_path('fonts/THSarabunNew.ttf');
    $fontData = base64_encode(file_get_contents($fontPath));
  @endphp

  <style>
    @page { margin: 0; }

    @font-face {
      font-family: 'THSarabunNew';
      font-style: normal;
      font-weight: normal;
      src: url('data:font/truetype;charset=utf-8;base64,{{ $fontData }}') format('truetype');
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'THSarabunNew', DejaVu Sans, sans-serif;
      font-size: 16pt;
    }

    .label {
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .info {
      flex: 1;
      padding-right: 10px;
      line-height: 1.3;
    }

    .qrcode {
      width: 100px;
      height: 100px;
    }

    .page-break {
      page-break-after: always;
    }
  </style>
</head>
<body>
  @foreach ($qrCodes as $item)
    <div class="label">
      <div class="info">
        <strong>{{ $item['asset']->asset_code }}</strong><br>
        {{ $item['asset']->kind->type_name ?? '' }}<br>
        {{ $item['asset']->vendor->name ?? '-' }}<br>
        ภาษาไทยทดสอบฟอนต์
      </div>
      <div class="qrcode">
        <img src="{{ $item['qr_base64'] }}" width="100" height="100" />
      </div>
    </div>
    <div class="page-break"></div>
  @endforeach
</body>
</html>
