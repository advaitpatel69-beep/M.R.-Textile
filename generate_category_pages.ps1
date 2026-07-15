# generate_category_pages.ps1
# Generates premium category pages for M.R. Textile

$templateStart = Get-Content template_top.txt -Raw -Encoding UTF8
$templateEnd = Get-Content template_bottom.txt -Raw -Encoding UTF8

# Ensure nav links point back to index.html
$templateStart = $templateStart -replace 'href="#', 'href="index.html#'

# Curate list of categories and their specific products/FAQs
$categories = @(
    @{
        ID = "silk"
        Title = "Silk Sarees"
        Folder = "silk-sarees"
        IntroHeadline = "Woven Heritage of Elegance and Splendor"
        IntroBody = "Our wholesale silk saree collection captures the essence of royal Indian attire. Sourced from premier weaving centers like Kanchipuram and Varanasi, each piece features rich mulberry silk base threads interwoven with premium zari work. Ideal for brides, wedding guests, and festive retail showcase, these sarees represent direct factory sourcing at unmatched wholesale rates from Surat."
        SeoTitle = "Wholesale Silk Sarees Surat - Kanjivaram & Banarasi Brocades | M.R. Textile"
        SeoDesc = "Buy premium wholesale silk sarees direct from Surat manufacturer. Bulk supplier of Kanjivaram, Banarasi, and Soft Silk sarees for retailers across India."
        Products = @(
            @{ Title="Royal Kanchipuram Silk"; Desc="Woven with double-warp pure silk and gold zari motifs."; Colors="Ruby Crimson, Forest Green, Royal Indigo"; Fabric="Mulberry Silk"; Occasions="Bridal, Grand Wedding" },
            @{ Title="Varanasi Zari Brocade"; Desc="Rich gold brocade design featuring traditional floral vines (Bel) on satin silk."; Colors="Maroon Gold, Emerald Gold, Navy Gold"; Fabric="Katan Silk"; Occasions="Festive, Wedding Reception" },
            @{ Title="Classic Surat Art Silk"; Desc="Affordable luxury featuring classic zari border and soft silk drape."; Colors="Mustard Yellow, Peacock Blue, Tussar Beige"; Fabric="Art Silk Blend"; Occasions="Festive, Party Wear" },
            @{ Title="Dharmavaram Wedding Special"; Desc="Traditional contrast pallu and heavy border with temple designs."; Colors="Magenta Teal, Orange Violet, Pink Gold"; Fabric="Dharmavaram Silk"; Occasions="Bridal, Traditional Festivals" },
            @{ Title="Mysore Soft Silk Saree"; Desc="Lightweight soft silk saree with minimal gold line borders, extremely comfortable."; Colors="Ivory Gold, Soft Rose, Mint Green"; Fabric="Mysore Soft Silk"; Occasions="Temple Wear, Family Events" }
        )
        Faqs = @(
            @{ Q="What is the Minimum Order Quantity (MOQ) for Silk sarees?"; A="For wholesale silk sarees, we require a minimum order of 1 full catalog (typically 4 to 8 pieces). Mixed selections across categories are also accepted for regular retail partners." },
            @{ Q="Do you provide catalog photos for reselling?"; A="Yes, we provide high-resolution digital catalog photographs and videos for all our silk sarees, which you can use for your retail shop's WhatsApp, Instagram, or e-commerce storefront." },
            @{ Q="Is the zari work made of pure gold or metallic thread?"; A="Our wholesale silk saree collection features premium metallic zari (tested zari) to keep prices competitive for volume retail markets. We also supply premium pure zari collections upon custom request." }
        )
    },
    @{
        ID = "designer"
        Title = "Designer Sarees"
        Folder = "designer-sarees"
        IntroHeadline = "Contemporary Masterpieces for Modern Boutiques"
        IntroBody = "Discover high-fashion draping with our designer saree catalog. Blending modern design sensibilities with traditional hand-embroidery, shimmering sequins, and sheer organza overlays, these sarees are meticulously crafted to stand out. Essential inventory for premium retail showrooms and boutiques catering to modern cocktail dinners and grand evening receptions."
        SeoTitle = "Wholesale Designer Sarees Surat - Sequin & Organza | M.R. Textile"
        SeoDesc = "Premium designer sarees at factory prices. Source the latest Surat designer collections, sequence georgettes, and pastel organza sarees in bulk."
        Products = @(
            @{ Title="Sequin Glamour Georgette"; Desc="Full-body micro-sequin sheet embroidery on premium fluid georgette fabric."; Colors="Midnight Black, Rose Gold, Wine Red"; Fabric="Premium Georgette"; Occasions="Evening Parties, Cocktail Dinners" },
            @{ Title="Pastel Organza Bouquet"; Desc="Hand-painted floral motifs with delicate cutwork borders and antique thread work."; Colors="Peach Pink, Mint Green, Lavender, Sky Blue"; Fabric="Premium Organza"; Occasions="Daytime Weddings, Boutique Collections" },
            @{ Title="Embroidered Bridal Net"; Desc="Heavy zardozi and stone embroidery on premium net mesh with velvet borders."; Colors="Deep Maroon, Scarlet Red, Emerald"; Fabric="Bridal Net"; Occasions="Wedding Reception, Bridal Showcase" },
            @{ Title="Modern Shimmer Georgette"; Desc="Contemporary metallic shimmer glaze on lightweight georgette, drapes beautifully."; Colors="Silver Grey, Champagne Gold, Navy Blue"; Fabric="Shimmer Georgette"; Occasions="Sangeet, Glamorous Parties" }
        )
        Faqs = @(
            @{ Q="Can we order custom color assortments in designer catalogs?"; A="Yes! Unlike traditional sets, we allow boutiques and retail partners to mix and match colors in designer catalogs to better suit their specific customer demographics." },
            @{ Q="What is the lead time for restocking designer collections?"; A="Since designer sarees involve semi-handcrafted embroidery and sequin work, restocking takes approximately 7 to 10 working days if not immediately available in our Surat warehouse." },
            @{ Q="Are the blouses stitched or unstitched?"; A="All our designer sarees ship with high-quality, unstitched blouse fabric matching the premium work of the saree, allowing custom styling by your retail clients." }
        )
    },
    @{
        ID = "printed"
        Title = "Printed Sarees"
        Folder = "printed-sarees"
        IntroHeadline = "Daily Wear Elegance in Vibrant Prints"
        IntroBody = "Our printed saree collection highlights comfort, wearability, and high-definition designs. Featuring traditional block prints, floral patterns, and geometric prints on airy georgette, crepe, and chiffon bases. Highly durable and easy to maintain, they are a staple catalog for retailers looking to restock daily wear, office wear, and casual collections."
        SeoTitle = "Wholesale Printed Sarees Surat - Crepe & Georgette Prints | M.R. Textile"
        SeoDesc = "Buy wholesale printed sarees from Surat. High-definition georgette prints, crepe floral collections, and everyday printed sarees at bulk manufacturer rates."
        Products = @(
            @{ Title="Surat Floral Georgette"; Desc="Vibrant daily-wear printed saree on soft georgette with a subtle zari lace border."; Colors="Mustard Yellow, Teal Blue, Cherry Pink"; Fabric="Soft Georgette"; Occasions="Daily Wear, Casual Events" },
            @{ Title="Geometric Office Crepe"; Desc="Smart geometric layouts printed on premium wrinkle-free French crepe fabric."; Colors="Charcoal Grey, Navy Blue, Rust Orange"; Fabric="French Crepe"; Occasions="Office Wear, Professional Styling" },
            @{ Title="Floral Digital Chiffon"; Desc="Ultra-lightweight chiffon saree featuring digital watercolor floral prints."; Colors="Powder Blue, Soft Peach, Lemon Yellow"; Fabric="Premium Chiffon"; Occasions="Summer Events, Semi-Formal Dinners" },
            @{ Title="Traditional Block Print"; Desc="Saree featuring Rajasthani bagru and sanganeri block prints on cotton silk blend."; Colors="Indigo Indigo, Madder Red, Mustard Gold"; Fabric="Cotton-Silk Blend"; Occasions="Ethnic Wear, Cultural Festivals" }
        )
        Faqs = @(
            @{ Q="Are these printed sarees color-fast and machine washable?"; A="Yes, all our georgette and crepe printed sarees undergo premium digital pigment dye printing, ensuring excellent color-fastness. They are fully washable and require minimal ironing." },
            @{ Q="What is the shipping package size for printed sarees?"; A="Printed sarees are packaged in lightweight, compact bundles to reduce shipping costs. Wholesale cartons can fit up to 100 printed sarees comfortably for nationwide logistics." },
            @{ Q="Do you offer bulk discounts on printed saree lots?"; A="Yes! For volume orders exceeding 200 pieces of printed sarees, we offer discounted factory lot prices. Contact our sales desk on WhatsApp for custom inquiries." }
        )
    },
    @{
        ID = "fancy"
        Title = "Fancy Sarees"
        Folder = "fancy-patern-sarees"
        IntroHeadline = "Glamorous Shimmer and Contemporary Patterns"
        IntroBody = "Make every celebration grand with our fancy saree collection. Sourced from the finest weaving mills of Surat, this catalog highlights fancy weaves, synthetic blends, metallic thread borders, and stripes. Perfect for retailers aiming to showcase glamorous party drapes, sangeet, and festive evening collections that sell rapidly during the wedding season."
        SeoTitle = "Wholesale Fancy Sarees Surat - Party Wear Fancy Drapes | M.R. Textile"
        SeoDesc = "Shop wholesale fancy sarees direct from Surat. Factory pricing on shimmer sarees, fancy zari borders, and contemporary stripe patterned evening sarees."
        Products = @(
            @{ Title="Metallic Shimmer Saree"; Desc="Shimmer woven texture that reflects light beautifully on a fluid synthetic base."; Colors="Rose Champagne, Silver Charcoal, Emerald Gold"; Fabric="Shimmer Organza-Silk"; Occasions="Evening Parties, Reception" },
            @{ Title="Lace Border Fancy Silk"; Desc="Classic fancy silk weave with intricate metallic lace stitching and sequin borders."; Colors="Crimson Red, Royal Violet, Amber Gold"; Fabric="Fancy Art Silk"; Occasions="Festivals, Family Events" },
            @{ Title="Fancy Stripe Chiffon"; Desc="Modern thin stripes pattern woven with gold lurex threads on fine chiffon."; Colors="Wine Burgundy, Slate Teal, Forest Green"; Fabric="Lurex Chiffon"; Occasions="Sangeet, Semi-Formal Gatherings" },
            @{ Title="Embroidered Pallu Fancy"; Desc="Saree featuring contrast heavy embroidery on the pallu and a clean pleated body."; Colors="Peach Gold, Navy Silver, Magenta Teal"; Fabric="Fancy Crepe Blend"; Occasions="Festive Gatherings, Dinner Parties" }
        )
        Faqs = @(
            @{ Q="What makes fancy sarees popular for retail shops?"; A="Fancy sarees offer the aesthetic of designer wear at a fraction of the cost, making them excellent impulse buys for retail walk-ins during festive seasons." },
            @{ Q="What is the packaging style of fancy sarees?"; A="Every fancy saree is individual-pouch packed with thick card inserts and high-grade plastic covers to prevent embroidery damage, suitable for direct display in showrooms." },
            @{ Q="Are these sarees comfortable for long wear?"; A="Yes! We select fancy blends that maintain structure and heavy border weights without causing irritation, ensuring comfortable wear throughout long events." }
        )
    },
    @{
        ID = "digital"
        Title = "Digital Sarees"
        Folder = "degital-sarees"
        IntroHeadline = "High-Definition Prints on Premium Canvases"
        IntroBody = "Discover modern textile engineering with our digital print sarees. We apply high-resolution digital print technology onto premium satin, organza, and linen-silk bases. Featuring sharp details, complex color spectrums, and artistic floral, abstract, or scenery layouts, these sarees represent direct Surat manufacturer craftsmanship for modern apparel retailers."
        SeoTitle = "Wholesale Digital Print Sarees Surat - HD Satin & Organza | M.R. Textile"
        SeoDesc = "Buy premium wholesale digital sarees from Surat. HD printing on soft satin, crystal organza, and linen bases at factory wholesale rates."
        Products = @(
            @{ Title="UHD Floral Satin Digital"; Desc="High-definition watercolor floral designs printed on soft satin silk with a pearl finish."; Colors="Orchid Fuchsia, Emerald Jade, Sapphire Pink"; Fabric="Premium Satin Silk"; Occasions="Boutiques, Modern Receptions" },
            @{ Title="Abstract Digital Organza"; Desc="Contemporary abstract brush strokes printed on glass organza with a gold border."; Colors="Pastel Peach Multi, Mint Aqua Multi, Lavender Gold"; Fabric="Crystal Organza"; Occasions="Daytime Festive, High-tea Gatherings" },
            @{ Title="Scenic Digital Linen-Silk"; Desc="Woven linen-silk base featuring scenic traditional forest motifs (Kalamkari style)."; Colors="Tussar Ochre, Ivory Indigo, Crimson Grey"; Fabric="Linen Silk Blend"; Occasions="Professional Styling, Cultural Seminars" }
        )
        Faqs = @(
            @{ Q="What is the advantage of digital printing over screen printing?"; A="Digital printing allows for infinite color gradients, sharp photographic detailing, and leaves the fabric feeling incredibly soft without any ink stiffness." },
            @{ Q="Is the digital print durable?"; A="Yes, we use industrial thermal color fixation. The digital prints do not fade, run, or wash off even after chemical dry cleaning." },
            @{ Q="What fabrics are available for digital sarees?"; A="We offer digital print catalogs on premium soft satin, glass organza, textured linen-cotton, and georgette bases." }
        )
    },
    @{
        ID = "wedding"
        Title = "Wedding Sarees"
        IntroHeadline = "Royal Bridal Trousseau and Festive Splendor"
        IntroBody = "Celebrate the grandest union with our royal wedding saree collection. Specially curated for Indian brides and wedding events, this collection features heavy zardozi hand embroidery, stone embellishments, and grand zari borders. Direct Surat wholesale pricing ensures retailers can stock bridal-heavy options at exceptional margins."
        SeoTitle = "Wholesale Wedding Sarees Surat - Heavy Bridal Zardozi | M.R. Textile"
        SeoDesc = "Premium wholesale wedding sarees from Surat. Heavy bridal zardozi, stone work georgettes, and traditional red-gold Banarasi wedding collections in bulk."
        Products = @(
            @{ Title="Royal Zardozi Bridal Silk"; Desc="Intricate handwoven gold zardozi patterns along the borders and heavily detailed pallu."; Colors="Bridal Red, Deep Maroon, Crimson Gold"; Fabric="Pure Banarasi Katan Silk"; Occasions="Wedding Ceremony, Bridal Wear" },
            @{ Title="Heavy Stone Work Georgette"; Desc="Luxurious georgette saree featuring floral hand-embroidery and Swarovski stone fittings."; Colors="Wine Purple, Emerald Green, Royal Blue"; Fabric="Heavy Georgette"; Occasions="Sangeet, Reception, Festive Gala" },
            @{ Title="Surat Hand-Embroidery Special"; Desc="Chiffon bridal saree with scalloped hand-worked lace borders and heavy stone detailing."; Colors="Blush Pink, Amber Gold, Teal Blue"; Fabric="Premium Chiffon Silk"; Occasions="Wedding Reception, Bridal Shower" },
            @{ Title="Banarasi Brocade Wedding Wear"; Desc="Classic bridal brocade (Kimkhab style) woven with pure metallic gold-plated threads."; Colors="Scarlet Gold, Ruby Emerald, Copper Maroon"; Fabric="Raw Silk Base"; Occasions="Traditional Wedding rituals" }
        )
        Faqs = @(
            @{ Q="What is the wholesale MOQ for heavy wedding sarees?"; A="Because wedding sarees feature heavy handwork and premium materials, the MOQ is 1 catalog set (typically 4 pieces). We also allow mixed selections for bridal boutique buyers." },
            @{ Q="Do these sarees come with heavy blouse pieces?"; A="Yes, every wedding saree includes highly-detailed blouse fabric with matching sleeve and neck borders to ensure a complete bridal outfit." },
            @{ Q="How do you ensure safe shipping for stone-studded sarees?"; A="Each wedding saree is wrapped in soft tissue paper and boxed in rigid cardboard boxes to protect stones, beads, and delicate zardozi work during transit." }
        )
    },
    @{
        ID = "party-wear"
        Title = "Party Wear Sarees"
        IntroHeadline = "Glamorous Evening Styles and Chic Silhouettes"
        IntroBody = "Light up any celebration with our dazzling party wear sarees. Featuring sequin sheets, metallic borders, and lightweight fabrics that drape beautifully, they offer the perfect balance of glamour and comfort."
        SeoTitle = "Wholesale Party Wear Sarees Surat - Sequin & Net Drapes | M.R. Textile"
        SeoDesc = "Direct Surat wholesale rates on party wear sarees. Heavy sequence georgettes, shimmer nets, and designer cocktail sarees for retailers."
        Products = @(
            @{ Title="Glam Sequin Sheets"; Desc="Fluid georgette drape completely covered in micro-sequins, creating a liquid shimmer look."; Colors="Black Sparkle, Rose Champagne, Emerald Shimmer"; Fabric="Soft Georgette"; Occasions="Cocktail Reception, Sangeet" },
            @{ Title="Shimmer Net Evening Saree"; Desc="Delicate premium net fabric woven with metallic highlights and a sleek satin border."; Colors="Metallic Grey, Midnight Navy, Plum Wine"; Fabric="Premium Net"; Occasions="Engagement Parties, High-Fashion Dinners" },
            @{ Title="Satin Pleated Modern Saree"; Desc="Pre-pleated satin saree with a metallic designer waist belt, extremely chic and fast to drape."; Colors="Wine Red, Charcoal Black, Emerald, Gold"; Fabric="Premium Satin"; Occasions="Evening Parties, Receptions" }
        )
        Faqs = @(
            @{ Q="What are the current top-selling colors for party wear sarees?"; A="Deep wine burgundy, rose gold, charcoal black, and emerald jade are currently the fastest-moving colors in the party wear segment." },
            @{ Q="Does the sequin work drop or peel off?"; A="No, we use high-tension lock stitching for all sequin sheets, ensuring they remain secure on the fabric even after dry cleaning." },
            @{ Q="Do you supply matching designer waist belts?"; A="Yes, specific catalog models (like our satin pleated range) ship with custom designer waist belts as part of the wholesale package." }
        )
    },
    @{
        ID = "linen"
        Title = "Linen Sarees"
        IntroHeadline = "Sophisticated Minimalism and Breathable Comfort"
        IntroBody = "Redefining summer luxury, our linen sarees offer a breath of fresh air. Blending natural linen fibers with premium cotton or soft silk threads to create a crisp yet drapable texture. Boasting organic textures, hand-block prints, and subtle gold borders, this collection is popular among boutiques catering to corporate professionals and lovers of sustainable fashion."
        SeoTitle = "Wholesale Linen Sarees Surat - Cotton Linen Blends | M.R. Textile"
        SeoDesc = "Buy wholesale linen sarees direct from Surat manufacturer. Pure linen-silk weaves, hand-block printed cotton-linen sarees at bulk rates."
        Products = @(
            @{ Title="Pure Linen Jamdani"; Desc="Natural linen weave featuring geometric Jamdani motifs handwoven with soft cotton threads."; Colors="Pastel Ochre, Indigo Ivory, Forest Olive"; Fabric="100% Natural Linen"; Occasions="Office Wear, Daytime Events" },
            @{ Title="Linen-Silk Metallic Border"; Desc="Linen blended with fine silk for a soft texture and subtle sheen, finished with a silver border."; Colors="Rose Coral, Mint Silver, Lemon Gold"; Fabric="Linen-Silk Blend"; Occasions="Professional Styling, Family Seminars" },
            @{ Title="Hand-Block Printed Linen"; Desc="Linen saree decorated with organic vegetable-dye block prints (Dabu/Bagru style)."; Colors="Charcoal Mustard, Terracotta Cream, Indigo White"; Fabric="Premium Cotton-Linen"; Occasions="Daily Wear, Art Festivals" }
        )
        Faqs = @(
            @{ Q="Is the linen fabric stiff or soft?"; A="Our linen-silk and cotton-linen blends are pre-washed and treated to ensure a soft, comfortable drape right out of the box, unlike stiff pure linen fabrics." },
            @{ Q="What is the fabric ratio of your Linen-Silk sarees?"; A="Our standard Linen-Silk sarees feature a balanced blend of 60% premium organic linen and 40% soft art silk, giving you natural breathability with a polished silk finish." },
            @{ Q="Does linen shrink after washing?"; A="Our linen collections are pre-shrunk during printing. We recommend dry cleaning or gentle hand washing to maintain the natural fiber texture." }
        )
    },
    @{
        ID = "traditional"
        Title = "Traditional Sarees"
        IntroHeadline = "Heritage Handlooms and Timeless Motifs"
        IntroBody = "A celebration of India's rich handloom heritage. Our traditional saree collection features authentic ethnic motifs, classic temple borders, and time-tested weaving patterns. Direct Surat wholesale sourcing ensures retailers can stock cultural essentials - such as Patolas, Bandhanis, and South Zari borders - at excellent, volume-optimized margins."
        SeoTitle = "Wholesale Traditional Sarees Surat - Classic Handloom Style | M.R. Textile"
        SeoDesc = "Source wholesale traditional sarees from Surat. Factory pricing on classic temple border sarees, Patola prints, and ethnic Indian handloom designs."
        Products = @(
            @{ Title="Classic Heritage Patola"; Desc="Rich geometric print and weave replicating the famous double-ikat Patola design of Gujarat."; Colors="Sindhoori Red, Mustard Indigo, Royal Green"; Fabric="Patola Art Silk"; Occasions="Traditional Festivals, Poojas" },
            @{ Title="Ethnic South Zari Border"; Desc="Classic south-style saree with heavy contrast borders and traditional checks on the body."; Colors="Emerald Maroon, Mustard Royal Blue, Black Crimson"; Fabric="Surat Cotton Silk"; Occasions="Temple Rituals, Traditional Weddings" },
            @{ Title="Temple Border Art Silk"; Desc="Simple yet elegant saree featuring contrast zari borders with sharp temple motif lining."; Colors="Off-White Red, Yellow Green, Pink Blue"; Fabric="Art Silk Base"; Occasions="Traditional Gathering, Family Events" }
        )
        Faqs = @(
            @{ Q="Are these authentic handlooms or manufactured art silk weaves?"; A="To make these traditional designs affordable for large-scale retail, our traditional collection features premium art silk and cotton-silk powerloom weaves that replicate traditional handloom aesthetics." },
            @{ Q="Do these sarees feature real gold zari?"; A="They feature tested metallic zari (lurex). This keeps the pricing highly competitive for high-volume retail buyers." },
            @{ Q="What are the best-selling traditional models for South India?"; A="Our Temple Border Art Silk and South Zari Border sarees are massive sellers in Andhra Pradesh, Telangana, Karnataka, and Tamil Nadu." }
        )
    }
)

# Fetch all available images to use for category pages
$allImages = @()
$categoriesFolders = @("silk-sarees", "designer-sarees", "printed-sarees", "fancy-patern-sarees", "degital-sarees")
foreach ($folder in $categoriesFolders) {
    $folderPath = "images\sarees\$folder"
    if (Test-Path $folderPath) {
        $files = @(Get-ChildItem -Path $folderPath -Filter "*.jpeg")
        $files += @(Get-ChildItem -Path $folderPath -Filter "*.jpg")
        foreach ($file in $files) {
            $allImages += "$folder/" + $file.Name
        }
    }
}

# Shuffle function for random images
function Get-RandomImages {
    param($Count)
    return $allImages | Sort-Object {Get-Random} | Select-Object -First $Count
}

# Placeholder color images (SVGs from images/gallery)
$colorPlaceholders = @(
    "images/gallery/weave-1.svg",
    "images/gallery/weave-2.svg",
    "images/gallery/weave-3.svg",
    "images/gallery/weave-4.svg"
)

# Generate HTML file for each category
foreach ($cat in $categories) {
    $id = $cat.ID
    $title = $cat.Title
    $folder = $cat.Folder
    $headline = $cat.IntroHeadline
    $body = $cat.IntroBody
    $seoTitle = $cat.SeoTitle
    $seoDesc = $cat.SeoDesc
    $products = $cat.Products
    $faqs = $cat.Faqs
    
    # 1. Image Selection
    $catImages = @()
    if ($folder -and (Test-Path "images/sarees/$folder")) {
        $files = @(Get-ChildItem -Path "images/sarees/$folder" -Filter "*.jpeg")
        $files += @(Get-ChildItem -Path "images/sarees/$folder" -Filter "*.jpg")
        foreach ($file in $files) {
            $catImages += "$folder/" + $file.Name
        }
    }
    
    # If no images in folder or not a folder category, get 6 random images
    if ($catImages.Count -eq 0) {
        $catImages = Get-RandomImages 6
    }
    
    # Parallax Background is the first image in the category pool
    $heroBg = "images/sarees/" + $catImages[0]
    
    # 2. Compile Top Section (SEO Headers)
    $topContent = $templateStart
    # Replace SEO Title
    $topContent = $topContent -replace '<title>.*</title>', "<title>$seoTitle</title>"
    # Replace Meta Description with correctly escaped quotes
    $topContent = $topContent -replace '<meta name="description" content="[^"]+" />', "<meta name=`"description`" content=`"$seoDesc`" />"
    # Replace Canonical URL
    $topContent = $topContent -replace '<link rel="canonical" href="[^"]+" />', "<link rel=`"canonical`" href=`"https://mrtextile.online/$id.html`" />"
    # Replace Open Graph URL
    $topContent = $topContent -replace '<meta property="og:url" content="[^"]+" />', "<meta property=`"og:url`" content=`"https://mrtextile.online/$id.html`" />"
    
    # Inject Custom Breadcrumb & Product Schema before </head>
    $breadcrumbItems = @(
        '{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://mrtextile.online/"}',
        '{"@type": "ListItem", "position": 2, "name": "Collections", "item": "https://mrtextile.online/#collections"}',
        '{"@type": "ListItem", "position": 3, "name": "'+$title+'", "item": "https://mrtextile.online/'+$id+'.html"}'
    )
    $breadcrumbSchema = '{"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [' + ($breadcrumbItems -join ', ') + ']}'
    
    $schemaSnippet = "`n  <script type=`"application/ld+json`">`n  $breadcrumbSchema`n  </script>`n</head>"
    $topContent = $topContent -replace '</head>', $schemaSnippet
    
    # 3. Assemble Hero Section
    $heroSection = @"
    <!-- ============================== CATEGORY HERO ============================== -->
    <section class="category-hero" style="background-image: url('$heroBg');" id="hero">
      <div class="category-hero__content" data-reveal="fade">
        <nav class="category-hero__breadcrumbs" aria-label="Breadcrumb">
          <a href="index.html">Home</a><span>&rarr;</span>
          <a href="index.html#collections">Collections</a><span>&rarr;</span>
          <span>$title</span>
        </nav>
        <h1 class="category-hero__title" data-reveal="rise">$title Collection</h1>
        <p class="category-hero__desc" data-reveal="fade" data-reveal-delay="100">$seoDesc</p>
      </div>
    </section>

    <!-- ============================== CATEGORY INTRO ============================== -->
    <section class="section category-intro" id="intro">
      <div class="container">
        <div class="category-intro__content" data-reveal="fade">
          <p class="eyebrow" style="justify-content:center;">About the Craft</p>
          <h2 class="category-intro__headline">$headline</h2>
          <p class="category-intro__body">$body</p>
        </div>
      </div>
    </section>
"@

    # 4. Assemble Why Choose Us Section
    $whyChooseSection = @"
    <section class="section section--champagne" id="why-choose">
      <div class="container">
        <div class="section-head section-head--center">
          <p class="eyebrow" style="justify-content:center;" data-reveal="fade">Wholesale Quality</p>
          <h2 data-reveal="rise">Why Source Our $title</h2>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" data-reveal="rise" data-reveal-group="features">
            <div class="feature-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 class="feature-card__title">Premium Fabric</h3>
            <p class="feature-card__desc">Sourced directly from certified Surat mills. High yarn-density weaves.</p>
          </div>
          
          <div class="feature-card" data-reveal="rise" data-reveal-group="features" data-reveal-delay="100">
            <div class="feature-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 class="feature-card__title">Wholesale Rates</h3>
            <p class="feature-card__desc">Direct manufacturer margins with no middlemen. Maximum retail profit.</p>
          </div>
          
          <div class="feature-card" data-reveal="rise" data-reveal-group="features" data-reveal-delay="200">
            <div class="feature-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l-7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3 class="feature-card__title">Bulk Dispatch</h3>
            <p class="feature-card__desc">Massive inventory stored in Surat. Immediate sorting and dispatch.</p>
          </div>
          
          <div class="feature-card" data-reveal="rise" data-reveal-group="features" data-reveal-delay="300">
            <div class="feature-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <h3 class="feature-card__title">Fast Logistics</h3>
            <p class="feature-card__desc">Secure, insured cargo transport with safe delivery tracking nationwide.</p>
          </div>
        </div>
      </div>
    </section>
"@

    # 5. Assemble Product Showcase Grid
    $productShowcaseSection = @"
    <section class="section product-showcase" id="showcase">
      <div class="container">
        <div class="section-head section-head--center">
          <p class="eyebrow" style="justify-content:center;" data-reveal="fade">Product Showcase</p>
          <h2 data-reveal="rise">Catalog Collection</h2>
          <p data-reveal="rise" data-reveal-delay="100">Click a card image to zoom and browse color options. Send wholesale inquiry direct on WhatsApp.</p>
        </div>
        
        <div class="product-grid">
"@

    # Construct the product cards
    for ($i = 0; $i -lt $products.Count; $i++) {
        $p = $products[$i]
        $pTitle = $p.Title
        $pDesc = $p.Desc
        $pColors = $p.Colors
        $pFabric = $p.Fabric
        $pOccasions = $p.Occasions
        
        # Pick main image, cycling if we run out of category images
        $imgIdx = $i % $catImages.Count
        $pMainImage = "images/sarees/" + $catImages[$imgIdx]
        
        # Build alternative color paths (reusing SVGs as placeholders)
        $pImagesList = @($pMainImage)
        foreach ($ph in $colorPlaceholders) {
            $pImagesList += $ph
        }
        $pImagesJoined = $pImagesList -join ","
        
        $whatsappMessage = [uri]::EscapeDataString("Hi M.R. Textile, I am a retailer and I want to inquire about bulk ordering from your $title collection.")
        $whatsappUrl = "https://wa.me/919428393320?text=$whatsappMessage"
        
        $productShowcaseSection += @"
          
          <div class="product-card" data-reveal="rise" data-reveal-group="products" 
               data-product-title="$pTitle" 
               data-product-desc="$pDesc" 
               data-product-images="$pImagesJoined" 
               data-product-colors="$pColors" 
               data-product-fabric="$pFabric" 
               data-product-occasions="$pOccasions">
            <div class="product-card__img-container" role="button" aria-label="View $pTitle catalog gallery">
              <img src="$pMainImage" alt="$pTitle" loading="lazy" />
              <div class="product-card__overlay"><span class="btn btn--ghost btn--sm" style="position: absolute; top:50%; left:50%; transform:translate(-50%,-50%);">Open Catalog</span></div>
            </div>
            <div class="product-card__body">
              <h3 class="product-card__title">$pTitle</h3>
              <p class="product-card__desc">$pDesc</p>
              
              <div class="product-card__specs">
                <div class="product-card__spec-item">
                  <strong>Fabric:</strong>
                  <span>$pFabric</span>
                </div>
                <div class="product-card__spec-item">
                  <strong>Colors:</strong>
                  <span>$pColors</span>
                </div>
                <div class="product-card__spec-item">
                  <strong>Occasions:</strong>
                  <span>$pOccasions</span>
                </div>
              </div>
              
              <a href="$whatsappUrl" target="_blank" rel="noopener" class="btn btn--gold product-card__btn">Send Inquiry</a>
            </div>
          </div>
"@
    }

    $productShowcaseSection += @"
        </div>
      </div>
    </section>
"@

    # 6. Assemble Masonry Gallery Section
    $gallerySection = @"
    <section class="section" id="gallery">
      <div class="container">
        <div class="section-head section-head--center">
          <p class="eyebrow" style="justify-content:center;" data-reveal="fade">Lifestyle Preview</p>
          <h2 data-reveal="rise">Inspirational Gallery</h2>
        </div>
        
        <div class="masonry" data-gallery-grid data-reveal="fade">
"@

    # Generate masonry thumbnails
    foreach ($img in $catImages) {
        $imgPath = "images/sarees/" + $img
        $gallerySection += @"
          <button class="masonry__item" data-full="$imgPath" data-caption="$title Showcase Drape">
            <img src="$imgPath" alt="$title Saree" loading="lazy" />
            <span class="masonry__overlay"><span class="masonry__caption"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>$title Drape</span></span>
          </button>
"@
    }

    $gallerySection += @"
        </div>
      </div>
    </section>
"@

    # 7. Assemble Perfect For Section
    $perfectForSection = @"
    <section class="section section--champagne" id="perfect-for">
      <div class="container">
        <div class="section-head section-head--center">
          <p class="eyebrow" style="justify-content:center;" data-reveal="fade">Occasions</p>
          <h2 data-reveal="rise">Ideal For</h2>
        </div>
        
        <div class="perfect-for-cards">
          <div class="perfect-card" data-reveal="rise" data-reveal-group="perfect">
            <h3 class="perfect-card__title">Retail Showrooms</h3>
            <p class="perfect-card__desc">Stunning designs that immediately catch customers' eyes on hangers or mannequin displays.</p>
          </div>
          
          <div class="perfect-card" data-reveal="rise" data-reveal-group="perfect" data-reveal-delay="100">
            <h3 class="perfect-card__title">Festive Season</h3>
            <p class="perfect-card__desc">Curated color palettes and patterns that sell heavily during Diwali, Eid, and regional festivals.</p>
          </div>
          
          <div class="perfect-card" data-reveal="rise" data-reveal-group="perfect" data-reveal-delay="200">
            <h3 class="perfect-card__title">Wedding Trousseau</h3>
            <p class="perfect-card__desc">Intricate borders and heavy drapes suitable for bridal wear, family rituals, and bridesmaids.</p>
          </div>
          
          <div class="perfect-card" data-reveal="rise" data-reveal-group="perfect" data-reveal-delay="300">
            <h3 class="perfect-card__title">Boutique Assortments</h3>
            <p class="perfect-card__desc">Custom styling options and premium textures preferred by boutique tailoring houses.</p>
          </div>
        </div>
      </div>
    </section>
"@

    # 8. Assemble Wholesale Advantages
    $advantagesSection = @"
    <section class="section" id="advantages">
      <div class="container">
        <div class="section-head section-head--center">
          <p class="eyebrow" style="justify-content:center;" data-reveal="fade">Partner Program</p>
          <h2 data-reveal="rise">Wholesale Advantages</h2>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" data-reveal="rise" data-reveal-group="advantages">
            <div class="feature-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h3 class="feature-card__title">Direct Factory Margin</h3>
            <p class="feature-card__desc">Cut down intermediate sourcing overheads. Purchase at direct wholesale cost from Surat Manish Market.</p>
          </div>
          
          <div class="feature-card" data-reveal="rise" data-reveal-group="advantages" data-reveal-delay="100">
            <div class="feature-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <h3 class="feature-card__title">Frequent Restock</h3>
            <p class="feature-card__desc">Never go out of stock. We update catalog varieties weekly and release new prints and zari weaves instantly.</p>
          </div>
          
          <div class="feature-card" data-reveal="rise" data-reveal-group="advantages" data-reveal-delay="200">
            <div class="feature-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
            </div>
            <h3 class="feature-card__title">Assured QC</h3>
            <p class="feature-card__desc">Every piece undergoes dual quality check audits to avoid weaving defects, stain spots, or sizing inconsistencies.</p>
          </div>
          
          <div class="feature-card" data-reveal="rise" data-reveal-group="advantages" data-reveal-delay="300">
            <div class="feature-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 class="feature-card__title">Nationwide Reach</h3>
            <p class="feature-card__desc">We ship via trusted logistics providers to transport cargo securely with fast tracking alerts across India.</p>
          </div>
        </div>
      </div>
    </section>
"@

    # 9. Assemble FAQs
    $faqSection = @"
    <section class="section section--champagne category-faq" id="faqs">
      <div class="container">
        <div class="section-head section-head--center">
          <p class="eyebrow" style="justify-content:center;" data-reveal="fade">Frequently Asked Questions</p>
          <h2 data-reveal="rise">Buying FAQs</h2>
        </div>
        
        <div class="faq-list">
"@

    foreach ($faq in $faqs) {
        $q = $faq.Q
        $a = $faq.A
        $faqSection += @"
          
          <div class="faq-item" data-reveal="fade">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>$q</span>
              <span class="faq-icon" aria-hidden="true"></span>
            </button>
            <div class="faq-answer" aria-hidden="true">
              <div class="faq-answer-inner">
                <p>$a</p>
              </div>
            </div>
          </div>
"@
    }

    # Add 2 generic FAQs to complete the list
    $faqSection += @"
          
          <div class="faq-item" data-reveal="fade">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>What payment options do you support?</span>
              <span class="faq-icon" aria-hidden="true"></span>
            </button>
            <div class="faq-answer" aria-hidden="true">
              <div class="faq-answer-inner">
                <p>We support Bank Transfers (IMPS, NEFT, RTGS), UPI, GPay, and cash payment directly at our Surat wholesale counter. We do not support credit terms for new retail accounts.</p>
              </div>
            </div>
          </div>
          
          <div class="faq-item" data-reveal="fade">
            <button class="faq-question" type="button" aria-expanded="false">
              <span>How are shipping charges calculated?</span>
              <span class="faq-icon" aria-hidden="true"></span>
            </button>
            <div class="faq-answer" aria-hidden="true">
              <div class="faq-answer-inner">
                <p>Shipping charges are calculated based on cargo weight and target delivery pincode. We use competitive transport rates via Surat's primary logistics channels and charge shipping at actual cost.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
"@

    # 10. Assemble CTA Banner
    $whatsappMessage = [uri]::EscapeDataString("Hi M.R. Textile, I am a retailer and I want to inquire about bulk ordering from your $title collection.")
    $whatsappUrl = "https://wa.me/919428393320?text=$whatsappMessage"
    
    $ctaSection = @"
    <!-- ============================== CTA BANNER ============================== -->
    <section class="section category-cta" id="cta">
      <div class="category-cta__content" data-reveal="fade">
        <h2 class="category-cta__title">Start Sourcing Premium $title</h2>
        <p class="category-cta__desc">Connect with Surat's trusted saree wholesale channel. Get the latest catalog brochures and factory pricing delivered directly to your WhatsApp.</p>
        <div class="category-cta__actions">
          <a href="$whatsappUrl" target="_blank" rel="noopener" class="btn btn--gold">WhatsApp Inquiry</a>
          <a href="tel:+919428393320" class="btn">Call Now</a>
          <a href="index.html#contact" class="btn btn--ghost">Inquiry Form</a>
        </div>
      </div>
    </section>
"@

    # Assemble and write final HTML file
    $finalHtml = $topContent + $heroSection + $whyChooseSection + $productShowcaseSection + $gallerySection + $perfectForSection + $advantagesSection + $faqSection + $ctaSection + $templateEnd
    
    Set-Content -Path "$id.html" -Value $finalHtml -Encoding UTF8
    Write-Host "Generated: $id.html"
}

# Clean up temporary build artifacts
if (Test-Path template_top.txt) { Remove-Item template_top.txt }
if (Test-Path template_bottom.txt) { Remove-Item template_bottom.txt }

Write-Host "Category page generation complete!"
