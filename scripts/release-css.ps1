param(
  [Parameter(Position=0)] [string]$ver = "1.0.0"
)

$root = (Resolve-Path "$PSScriptRoot\..").Path
$src  = Join-Path $root 'src\assets\tailwind.css'
$dir  = Join-Path $root 'public\releases\tailwind'

if (!(Test-Path $src)) { Write-Error "Tidak ketemu: $src"; exit 1 }

New-Item -ItemType Directory -Force -Path $dir | Out-Null

Copy-Item -Force $src (Join-Path $dir "tailwind-$ver.css")
Copy-Item -Force $src (Join-Path $dir "latest.css")

Write-Host "? Copied to $dir (tailwind-$ver.css & latest.css)" -ForegroundColor Green
