# float.ps1
# Erstellt ein ZIP für Joomla-Modul mod_r3d_floater – Version wird automatisch aus der XML gelesen.
# (c) 2025 Richard Dvorak, r3d.de

# === KONFIGURATION ===
$baseDir = 'd:\1DEV\mods\mod_r3d_floater'
$srcDir = Join-Path $baseDir 'src'
$xmlFile = Join-Path $srcDir 'mod_r3d_floater.xml'
$zipDir = Join-Path $baseDir 'dist'

# === Checks ===
if (!(Test-Path $srcDir)) { Write-Error "Source not found: $srcDir"; return }
if (!(Test-Path $xmlFile)) { Write-Error "XML not found: $xmlFile"; return }
if (!(Test-Path $zipDir)) { New-Item -ItemType Directory -Path $zipDir | Out-Null }

# === VERSION aus XML lesen ===
[xml]$xml = Get-Content $xmlFile -Raw
$node = $xml.SelectSingleNode('/extension/version')
if (-not $node) { Write-Error "Kein <version>-Knoten in $xmlFile gefunden!"; return }

$ver = ($node.InnerText).Trim()

# Validieren: x.y oder x.y.z oder x.y.z.w
if ($ver -notmatch '^\d+(?:\.\d+){1,3}$') {
    Write-Error "Ungültige Version im XML: '$ver' (erwartet x.y[.z[.w]])"
    return
}

# ZIP-Name
$zipName = "mod_r3d_floater-$ver.zip"
$zipPath = Join-Path $zipDir $zipName

# === ggf. vorherige ZIP löschen ===
if (Test-Path $zipPath) { Remove-Item $zipPath }

# === ZIP erstellen (nur Inhalt von /src, ohne .git, .vscode usw.) ===
$itemsToZip = Get-ChildItem -Path $srcDir -Recurse -File | Where-Object {
    $_.FullName -notmatch '\\\.git\\' -and
    $_.FullName -notmatch '\\\.vscode\\' -and
    $_.Name -ne '.gitignore' -and
    $_.Name -ne 'README.md'
}

# Temporären Ordner erstellen
$tempDir = Join-Path $env:TEMP ("mod_r3d_floater_" + [guid]::NewGuid())
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Dateien korrekt unter gleicher Struktur kopieren
foreach ($item in $itemsToZip) {
    $relativePath = $item.FullName.Substring($srcDir.Length + 1)
    $dest = Join-Path $tempDir $relativePath
    $destDir = Split-Path $dest -Parent
    if (!(Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir | Out-Null }
    Copy-Item $item.FullName $dest
}

# ZIP erstellen
Compress-Archive -Path (Join-Path $tempDir '*') -DestinationPath $zipPath

# Aufräumen
Remove-Item $tempDir -Recurse

Write-Host "ZIP wurde erstellt: $zipPath" -ForegroundColor Green
Pause
