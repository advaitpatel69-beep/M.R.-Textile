import json, re

# Verify contact-form.js
path = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\js\contact-form.js'
with open(path, 'rb') as f:
    content = f.read().decode('utf-8')
print('contact-form.js checks:')
print('  saree-range validator:', 'saree-range' in content)
print('  Per pcs saree range:', 'Per pcs saree range' in content)

# Verify whatsapp-gate.js
path2 = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\js\whatsapp-gate.js'
with open(path2, 'rb') as f:
    c2 = f.read().decode('utf-8')
print('whatsapp-gate.js checks:')
print('  wa-saree-range:', 'wa-saree-range' in c2)
print('  sareeRange param:', 'sareeRange' in c2)
print('  Per pcs saree range:', 'Per pcs saree range' in c2)

# Verify index.html
path3 = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\index.html'
with open(path3, 'rb') as f:
    c3 = f.read().decode('utf-8')
print('index.html checks:')
print('  saree-range select:', 'cf-saree-range' in c3)
print('  MOQ new answer:', '36 to 42 pcs per set' in c3)
print('  price range FAQ:', 'What is your price range per piece' in c3)
print('  shipping states:', 'Uttar Pradesh, Bihar, Maharashtra' in c3)
print('  business age FAQ:', 'since 2004' in c3)
print('  foundingDate:', ('"foundingDate": "2004"') in c3)
print('  areaServed:', 'areaServed' in c3)
print('  priceRange new:', '350 and above per piece' in c3)

# Verify contact.html
path4 = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\contact.html'
with open(path4, 'rb') as f:
    c4 = f.read().decode('utf-8')
print('contact.html checks:')
print('  saree-range select:', 'cf-saree-range' in c4)
print('  MOQ new answer:', '36 to 42 pcs per set' in c4)
print('  price range FAQ:', 'What is your price range per piece' in c4)
print('  shipping states:', 'Uttar Pradesh, Bihar, Maharashtra' in c4)
print('  business age FAQ:', 'since 2004' in c4)
print('  foundingDate:', ('"foundingDate": "2004"') in c4)
print('  areaServed:', 'areaServed' in c4)

# Verify b2b/index.html
path5 = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\b2b\index.html'
with open(path5, 'rb') as f:
    c5 = f.read().decode('utf-8')
print('b2b/index.html checks:')
print('  saree-range select:', 'cf-saree-range' in c5)
print('  foundingDate:', ('"foundingDate": "2004"') in c5)
print('  areaServed:', 'areaServed' in c5)

# Verify b2b/contact.html
path6 = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\b2b\contact.html'
with open(path6, 'rb') as f:
    c6 = f.read().decode('utf-8')
print('b2b/contact.html checks:')
print('  saree-range select:', 'cf-saree-range' in c6)
print('  MOQ new answer:', '36 to 42 pcs per set' in c6)
print('  shipping states:', 'Uttar Pradesh, Bihar' in c6)
print('  price range card:', 'What is your price range per piece' in c6)
print('  business age card:', 'since 2004' in c6)
print('  NO JSON-LD (correct):', 'application/ld+json' not in c6)

# Validate JSON-LD in index.html
ld = re.search(r'<script type="application/ld\+json">(.*?)</script>', c3, re.DOTALL)
if ld:
    try:
        json.loads(ld.group(1))
        print('index.html JSON-LD: VALID JSON')
    except Exception as e:
        print('index.html JSON-LD: INVALID -', e)

ld4 = re.search(r'<script type="application/ld\+json">(.*?)</script>', c4, re.DOTALL)
if ld4:
    try:
        json.loads(ld4.group(1))
        print('contact.html JSON-LD: VALID JSON')
    except Exception as e:
        print('contact.html JSON-LD: INVALID -', e)

ld5 = re.search(r'<script type="application/ld\+json">(.*?)</script>', c5, re.DOTALL)
if ld5:
    try:
        json.loads(ld5.group(1))
        print('b2b/index.html JSON-LD: VALID JSON')
    except Exception as e:
        print('b2b/index.html JSON-LD: INVALID -', e)
