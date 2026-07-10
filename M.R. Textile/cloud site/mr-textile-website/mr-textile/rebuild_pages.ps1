$templateStart = Get-Content template_top.txt -Raw
$templateEnd = Get-Content template_bottom.txt -Raw

# Fix navigation links to point back to index.html
$templateStart = $templateStart -replace 'href="#', 'href="index.html#'

function Get-ImageHtml {
    param($ImagePath, $CategoryName)
    return @"
          <button class="masonry__item" data-full="images/sarees/$ImagePath" data-caption="$CategoryName Saree">
            <img src="images/sarees/$ImagePath" alt="$CategoryName Saree" loading="lazy" />
            <span class="masonry__overlay"><span class="masonry__caption"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>$CategoryName Saree</span></span>
          </button>
"@
}

$categories = @{
    "silk" = @{ Title="Silk Sarees"; Folder="silk-sarees" }
    "designer" = @{ Title="Designer Sarees"; Folder="designer-sarees" }
    "printed" = @{ Title="Printed Sarees"; Folder="printed-sarees" }
    "fancy" = @{ Title="Fancy Sarees"; Folder="fancy-patern-sarees" }
    "digital" = @{ Title="Digital Sarees"; Folder="degital-sarees" }
}

$remaining = @{
    "wedding" = "Wedding Sarees"
    "party-wear" = "Party Wear Sarees"
    "linen" = "Linen Sarees"
    "traditional" = "Traditional Sarees"
}

$allImages = @()
foreach ($cat in $categories.Keys) {
    $folder = $categories[$cat].Folder
    $folderPath = "images\sarees\$folder"
    if (Test-Path $folderPath) {
        $files = @(Get-ChildItem -Path $folderPath -Filter "*.jpeg")
        $files += @(Get-ChildItem -Path $folderPath -Filter "*.jpg")
        foreach ($file in $files) {
            $allImages += "$folder/" + $file.Name
        }
    }
}

foreach ($cat in $categories.Keys) {
    $folder = $categories[$cat].Folder
    $title = $categories[$cat].Title
    
    $top = $templateStart -replace '<title>.*</title>', "<title>$title | M.R. Textile</title>"
    $html = $top + @"

    <section class="section" id="gallery">
      <div class="container">
        <div class="section-head section-head--center">
          <p class="eyebrow" style="justify-content:center;" data-reveal="fade">Explore Collection</p>
          <h2 data-reveal="rise">$title</h2>
        </div>
        <div class="masonry" data-gallery-grid data-reveal="fade">
"@
    
    $folderPath = "images\sarees\$folder"
    if (Test-Path $folderPath) {
        $files = @(Get-ChildItem -Path $folderPath -Filter "*.jpeg")
        $files += @(Get-ChildItem -Path $folderPath -Filter "*.jpg")
        foreach ($file in $files) {
            $imgHtml = Get-ImageHtml -ImagePath "$folder/$($file.Name)" -CategoryName $title
            $html += "`n" + $imgHtml
        }
    }
    
    $html += @"

        </div>
      </div>
    </section>
"@
    $html += $templateEnd
    Set-Content -Path "$cat.html" -Value $html -Encoding UTF8
}

foreach ($cat in $remaining.Keys) {
    $title = $remaining[$cat]
    $top = $templateStart -replace '<title>.*</title>', "<title>$title | M.R. Textile</title>"
    $html = $top + @"

    <section class="section" id="gallery">
      <div class="container">
        <div class="section-head section-head--center">
          <p class="eyebrow" style="justify-content:center;" data-reveal="fade">Explore Collection</p>
          <h2 data-reveal="rise">$title</h2>
        </div>
        <div class="masonry" data-gallery-grid data-reveal="fade">
"@
    
    $shuffled = $allImages | Sort-Object {Get-Random}
    $selected = $shuffled | Select-Object -First 6
    
    foreach ($img in $selected) {
        $imgHtml = Get-ImageHtml -ImagePath $img -CategoryName $title
        $html += "`n" + $imgHtml
    }
    
    $html += @"

        </div>
      </div>
    </section>
"@
    $html += $templateEnd
    Set-Content -Path "$cat.html" -Value $html -Encoding UTF8
}
