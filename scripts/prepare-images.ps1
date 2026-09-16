$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$source = 'D:\000.임헌수의 AI마케팅스쿨\0.임헌수의AI마케팅스쿨12주과정\02.AI홈페이지\0.디자인목업\15.강산재'
$destination = Join-Path $PSScriptRoot '..\public\images'
New-Item -ItemType Directory -Path $destination -Force | Out-Null
$mapping = [ordered]@{
  '1.jpg'='main-exterior.jpg'; '2.jpg'='hanok-side.jpg'; '3.jpg'='hanok-eaves.jpg';
  '4.jpg'='mountain-view.jpg'; '5.jpg'='roof-detail.jpg'; '7.jpg'='hero-hanok.jpg';
  '8.jpg'='courtyard.jpg'; '9.jpg'='wood-detail.jpg'; '10.jpg'='garden-house.jpg';
  '11.jpg'='winter-house.jpg'; '12.jpg'='snow-jars.jpg'; '13.jpg'='snow-courtyard.jpg';
  '14.jpg'='living-room.jpg'; '15.jpg'='dining-kitchen.jpg'; '16.jpg'='bathroom.jpg';
  '17.jpg'='interior-detail.jpg'; '18.jpg'='floor-bedding.jpg'; '19.jpg'='bedroom.jpg';
  '20.jpg'='loft.jpg'; '21.jpg'='loft-bedroom.jpg'; '22.jpg'='evening-hanok.jpg';
  '23.jpg'='blue-hour.jpg'; '25.jpg'='firepit.jpg'; '26.jpg'='pond.jpg';
  '27.jpg'='garden-gate.jpg'; '28.jpg'='pavilion.jpg'; '29.jpg'='misty-mountain.jpg';
  '30.jpg'='snow-night.jpg'; '31.jpg'='forest-path.jpg'; '32.jpg'='jars.jpg';
  '34.jpg'='pavilion-view.jpg'; '35.jpg'='green-lawn.jpg'; '36.jpg'='cloudy-hanok.jpg';
  '팔봉산홍천강.png'='palbongsan-river.jpg'
}
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$encoder = [System.Drawing.Imaging.Encoder]::Quality
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, [long]82)
$manifest = @('# Image source mapping', '', 'Original files remain in the supplied D: folder. These are resized web copies (long edge at most 1600px, JPEG quality 82).', '', '| Original | Web file |', '| --- | --- |')
foreach ($entry in $mapping.GetEnumerator()) {
  $inputPath = Join-Path $source $entry.Key
  if (-not (Test-Path -LiteralPath $inputPath)) { throw "Missing image: $inputPath" }
  $original = [System.Drawing.Image]::FromFile($inputPath)
  try {
    $ratio = [Math]::Min(1, 1600 / [Math]::Max($original.Width, $original.Height))
    $width = [int][Math]::Round($original.Width * $ratio)
    $height = [int][Math]::Round($original.Height * $ratio)
    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($original, 0, 0, $width, $height)
      } finally { $graphics.Dispose() }
      $bitmap.Save((Join-Path $destination $entry.Value), $codec, $params)
    } finally { $bitmap.Dispose() }
  } finally { $original.Dispose() }
  $manifest += "| $($entry.Key) | $($entry.Value) |"
}
Set-Content -LiteralPath (Join-Path $destination 'README.md') -Value $manifest -Encoding UTF8
