import sys

SAREE_RANGE_DROPDOWN = '''                <div class="form-field form-field--full">
                  <label for="cf-saree-range">Per Pcs Saree Range <span class="req">*</span></label>
                  <select id="cf-saree-range" name="saree-range" required aria-describedby="cf-saree-range-hint">
                    <option value="" disabled selected>Select range</option>
                    <option value="\u20b9350 \u2013 \u20b9499">\u20b9350 \u2013 \u20b9499</option>
                    <option value="\u20b9500 \u2013 \u20b9699">\u20b9500 \u2013 \u20b9699</option>
                    <option value="\u20b9700 \u2013 \u20b9999">\u20b9700 \u2013 \u20b9999</option>
                    <option value="\u20b91,000 &amp; above">\u20b91,000 &amp; above</option>
                  </select>
                  <span id="cf-saree-range-hint" class="form-field__hint">Minimum price \u20b9350 per pc \u00b7 MOQ 36\u201342 pcs, set-wise only</span>
                  <span class="form-field__error" role="alert"></span>
                </div>'''

# ============================================================
# index.html
# ============================================================
path = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\index.html'
with open(path, 'rb') as f:
    content = f.read().decode('utf-8')

# Insert saree-range dropdown before Message field
# In index.html the Message field has a placeholder
old = '                <div class="form-field form-field--full">\r\n                  <label for="cf-message">Message <span class="req">*</span></label>\r\n                  <textarea id="cf-message" name="message" rows="4" placeholder='
new = SAREE_RANGE_DROPDOWN + '\r\n                <div class="form-field form-field--full">\r\n                  <label for="cf-message">Message <span class="req">*</span></label>\r\n                  <textarea id="cf-message" name="message" rows="4" placeholder='

if old in content:
    content = content.replace(old, new)
    print("index.html: saree-range dropdown inserted")
else:
    print("index.html: form field NOT FOUND")
    idx = content.find('cf-message')
    print("Context:", repr(content[max(0,idx-200):idx+100]))
    sys.exit(1)

# 2a. Replace MOQ answer
old_moq = '                <p>Yes \u2014 as a wholesale supplier we work in bulk quantities rather than single pieces. Exact minimums\r\n                  vary by category, so please contact us for current MOQs.</p>'
new_moq = '                <p>Yes. We sell set-wise only, and our minimum order is 36 to 42 pcs per set. Our minimum wholesale price starts at \u20b9350 per piece.</p>'
if old_moq in content:
    content = content.replace(old_moq, new_moq)
    print("index.html: MOQ answer replaced")
else:
    print("index.html: MOQ answer NOT FOUND")
    idx = content.find('bulk quantities rather than single')
    print("Context:", repr(content[max(0,idx-50):idx+200]))
    sys.exit(1)

# 2b. Add price range FAQ after MOQ faq-item, before "Can I visit the Manish Market"
price_range_faq = '''
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              What is your price range per piece?
              <span class="faq-icon" aria-hidden="true"></span>
            </button>
            <div class="faq-answer" aria-hidden="true">
              <div class="faq-answer-inner">
                <p>Our wholesale range starts at \u20b9350 per piece. When you send an inquiry, choose your budget range: \u20b9350\u2013\u20b9499, \u20b9500\u2013\u20b9699, \u20b9700\u2013\u20b9999 or \u20b91,000 and above, so we can share the right designs.</p>
              </div>
            </div>
          </div>'''

old_after_moq = '          <div class="faq-item">\r\n            <button class="faq-question" aria-expanded="false">\r\n              Can I visit the Manish Market showroom in person?'
new_after_moq = price_range_faq + '\r\n\r\n          <div class="faq-item">\r\n            <button class="faq-question" aria-expanded="false">\r\n              Can I visit the Manish Market showroom in person?'

if old_after_moq in content:
    content = content.replace(old_after_moq, new_after_moq)
    print("index.html: price range FAQ added")
else:
    print("index.html: anchor for price range FAQ NOT FOUND")
    idx = content.find('Can I visit the Manish Market showroom in person')
    print("Context:", repr(content[max(0,idx-100):idx+100]))
    sys.exit(1)

# 2c. Replace shipping answer
old_ship = '                <p>We work with retail partners across India. Share your city and order size when you reach out, and\r\n                  we\'ll confirm dispatch options for your location.</p>'
new_ship = '                <p>Yes. Our major supply states are Uttar Pradesh, Bihar, Maharashtra, Madhya Pradesh, Delhi, Chhattisgarh and Jharkhand. Share your city and order size when you reach out, and we\'ll confirm dispatch options for your location.</p>'

if old_ship in content:
    content = content.replace(old_ship, new_ship)
    print("index.html: shipping answer replaced")
else:
    print("index.html: shipping answer NOT FOUND")
    idx = content.find('retail partners across India')
    print("Context:", repr(content[max(0,idx-100):idx+200]))
    sys.exit(1)

# 2d. Add "How long have you been in business?" after shipping item, before "What payment terms"
business_age_faq = '''
          <div class="faq-item">
            <button class="faq-question" aria-expanded="false">
              How long have you been in business?
              <span class="faq-icon" aria-hidden="true"></span>
            </button>
            <div class="faq-answer" aria-hidden="true">
              <div class="faq-answer-inner">
                <p>M.R. Textile has been in the wholesale saree business since 2004, from Manish Market, Surat.</p>
              </div>
            </div>
          </div>'''

old_before_payment = '          <div class="faq-item">\r\n            <button class="faq-question" aria-expanded="false">\r\n              What payment terms do you offer?'
new_before_payment = business_age_faq + '\r\n\r\n          <div class="faq-item">\r\n            <button class="faq-question" aria-expanded="false">\r\n              What payment terms do you offer?'

if old_before_payment in content:
    content = content.replace(old_before_payment, new_before_payment)
    print("index.html: 'How long in business' FAQ added")
else:
    print("index.html: anchor for business age FAQ NOT FOUND")
    idx = content.find('What payment terms do you offer')
    print("Context:", repr(content[max(0,idx-100):idx+100]))
    sys.exit(1)

# Task 3: Replace JSON-LD block
old_jsonld = '''  <script type="application/ld+json">
  {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "name": "M.R. Textile / M.R. Sarees",
  "description": "Wholesale saree supplier based in Surat, Gujarat, offering Silk, Fancy, Brasso, Wedding and Printed sarees in bulk for retailers.",
  "image": "https://mrtextile.online/images/sarees/degital-sarees/saree_1.jpeg",
  "telephone": [
    "+91 9428393320",
    "+91 9427810031"
  ],
  "priceRange": "Wholesale enquiry",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "133, 1st Floor, Manish Market, Ring Road",
    "addressLocality": "Surat",
    "addressRegion": "Gujarat",
    "postalCode": "395003",
    "addressCountry": "IN"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    }
  ],
  "url": "https://mrtextile.online/"
}
  </script>'''

new_jsonld = '''  <script type="application/ld+json">
  {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "name": "M.R. Textile / M.R. Sarees",
  "description": "Wholesale saree supplier based in Surat, Gujarat, offering Silk, Fancy, Brasso, Wedding and Printed sarees in bulk for retailers.",
  "image": "https://mrtextile.online/images/sarees/degital-sarees/saree_1.jpeg",
  "telephone": [
    "+91 9428393320",
    "+91 9427810031"
  ],
  "foundingDate": "2004",
  "priceRange": "\u20b9350 and above per piece",
  "areaServed": [
    {"@type": "State", "name": "Gujarat"},
    {"@type": "State", "name": "Uttar Pradesh"},
    {"@type": "State", "name": "Bihar"},
    {"@type": "State", "name": "Maharashtra"},
    {"@type": "State", "name": "Madhya Pradesh"},
    {"@type": "State", "name": "Delhi"},
    {"@type": "State", "name": "Chhattisgarh"},
    {"@type": "State", "name": "Jharkhand"}
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "133, 1st Floor, Manish Market, Ring Road",
    "addressLocality": "Surat",
    "addressRegion": "Gujarat",
    "postalCode": "395003",
    "addressCountry": "IN"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "20:00"
    }
  ],
  "url": "https://mrtextile.online/"
}
  </script>'''

if old_jsonld in content:
    content = content.replace(old_jsonld, new_jsonld)
    print("index.html: JSON-LD updated")
else:
    print("index.html: JSON-LD NOT FOUND (trying CRLF variant)")
    # Try with CRLF
    old_jsonld_crlf = old_jsonld.replace('\n', '\r\n')
    if old_jsonld_crlf in content:
        new_jsonld_crlf = new_jsonld.replace('\n', '\r\n')
        content = content.replace(old_jsonld_crlf, new_jsonld_crlf)
        print("index.html: JSON-LD updated (CRLF)")
    else:
        idx = content.find('priceRange')
        print("Context:", repr(content[max(0,idx-50):idx+100]))
        sys.exit(1)

with open(path, 'wb') as f:
    f.write(content.encode('utf-8'))
print("index.html patched successfully\n")

# ============================================================
# contact.html
# ============================================================
path = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\contact.html'
with open(path, 'rb') as f:
    content = f.read().decode('utf-8')

# Insert saree-range dropdown before Message field (contact.html has rows="5" and a placeholder)
old_c = '                <div class="form-field form-field--full">\r\n                  <label for="cf-message">Message <span class="req" aria-label="required">*</span></label>\r\n                  <textarea id="cf-message" name="message" rows="5"'
new_c = SAREE_RANGE_DROPDOWN + '\r\n                <div class="form-field form-field--full">\r\n                  <label for="cf-message">Message <span class="req" aria-label="required">*</span></label>\r\n                  <textarea id="cf-message" name="message" rows="5"'

if old_c in content:
    content = content.replace(old_c, new_c)
    print("contact.html: saree-range dropdown inserted")
else:
    # Try without aria-label
    old_c2 = '                <div class="form-field form-field--full">\r\n                  <label for="cf-message">Message <span class="req">*</span></label>\r\n                  <textarea id="cf-message" name="message"'
    if old_c2 in content:
        new_c2 = SAREE_RANGE_DROPDOWN + '\r\n                <div class="form-field form-field--full">\r\n                  <label for="cf-message">Message <span class="req">*</span></label>\r\n                  <textarea id="cf-message" name="message"'
        content = content.replace(old_c2, new_c2)
        print("contact.html: saree-range dropdown inserted (alt pattern)")
    else:
        print("contact.html: form field NOT FOUND")
        idx = content.find('cf-message')
        print("Context:", repr(content[max(0,idx-200):idx+100]))
        sys.exit(1)

# 2a: Replace MOQ answer
old_moq_c = '                <p>Minimum order quantities vary by category and fabric type. Please contact us directly to discuss your\r\n                  specific requirements. We work with retailers of all sizes &mdash; from smaller boutiques to large\r\n                  stockists &mdash; and accommodate different ordering needs wherever possible.</p>'
new_moq_c = '                <p>Yes. We sell set-wise only, and our minimum order is 36 to 42 pcs per set. Our minimum wholesale price starts at \u20b9350 per piece.</p>'

if old_moq_c in content:
    content = content.replace(old_moq_c, new_moq_c)
    print("contact.html: MOQ answer replaced")
else:
    print("contact.html: MOQ answer NOT FOUND")
    idx = content.find('Minimum order quantities vary')
    print("Context:", repr(content[max(0,idx-50):idx+300]))
    sys.exit(1)

# 2b: Add price range FAQ after MOQ faq-item (before "Can I order from multiple categories")
price_range_faq_c = '''\r\n\r\n          <div class="faq-item">\r\n            <button class="faq-question" aria-expanded="false" id="faq-q5b">\r\n              What is your price range per piece?\r\n              <span class="faq-icon" aria-hidden="true"></span>\r\n            </button>\r\n            <div class="faq-answer" aria-hidden="true">\r\n              <div class="faq-answer-inner">\r\n                <p>Our wholesale range starts at \u20b9350 per piece. When you send an inquiry, choose your budget range: \u20b9350\u2013\u20b9499, \u20b9500\u2013\u20b9699, \u20b9700\u2013\u20b9999 or \u20b91,000 and above, so we can share the right designs.</p>\r\n              </div>\r\n            </div>\r\n          </div>'''

old_after_moq_c = '          <div class="faq-item">\r\n            <button class="faq-question" aria-expanded="false" id="faq-q6">\r\n              Can I order from multiple categories in a single order?'
new_after_moq_c = price_range_faq_c + '\r\n\r\n          <div class="faq-item">\r\n            <button class="faq-question" aria-expanded="false" id="faq-q6">\r\n              Can I order from multiple categories in a single order?'

if old_after_moq_c in content:
    content = content.replace(old_after_moq_c, new_after_moq_c)
    print("contact.html: price range FAQ added")
else:
    print("contact.html: anchor for price range FAQ NOT FOUND")
    idx = content.find('Can I order from multiple categories')
    print("Context:", repr(content[max(0,idx-200):idx+100]))
    sys.exit(1)

# 2c: Replace shipping answer
old_ship_c = '                <p>Yes &mdash; we supply wholesale sarees to retailers and distributors across India. Please contact us\r\n                  to discuss logistics and delivery arrangements for your location. Many of our long-standing partners\r\n                  place regular orders from cities across the country.</p>'
new_ship_c = '                <p>Yes. Our major supply states are Uttar Pradesh, Bihar, Maharashtra, Madhya Pradesh, Delhi, Chhattisgarh and Jharkhand. Share your city and order size when you reach out, and we\'ll confirm dispatch options for your location.</p>'

if old_ship_c in content:
    content = content.replace(old_ship_c, new_ship_c)
    print("contact.html: shipping answer replaced")
else:
    print("contact.html: shipping answer NOT FOUND")
    idx = content.find('wholesale sarees to retailers and distributors')
    print("Context:", repr(content[max(0,idx-50):idx+300]))
    sys.exit(1)

# 2d: Add business age FAQ after shipping item, before "Can I download or share"
business_age_faq_c = '''\r\n\r\n          <div class="faq-item">\r\n            <button class="faq-question" aria-expanded="false" id="faq-q7b">\r\n              How long have you been in business?\r\n              <span class="faq-icon" aria-hidden="true"></span>\r\n            </button>\r\n            <div class="faq-answer" aria-hidden="true">\r\n              <div class="faq-answer-inner">\r\n                <p>M.R. Textile has been in the wholesale saree business since 2004, from Manish Market, Surat.</p>\r\n              </div>\r\n            </div>\r\n          </div>'''

old_before_bc = '          <div class="faq-item">\r\n            <button class="faq-question" aria-expanded="false" id="faq-q8">\r\n              Can I download or share your official business card?'
new_before_bc = business_age_faq_c + '\r\n\r\n          <div class="faq-item">\r\n            <button class="faq-question" aria-expanded="false" id="faq-q8">\r\n              Can I download or share your official business card?'

if old_before_bc in content:
    content = content.replace(old_before_bc, new_before_bc)
    print("contact.html: 'How long in business' FAQ added")
else:
    print("contact.html: anchor for business age FAQ NOT FOUND")
    idx = content.find('Can I download or share your official business card')
    print("Context:", repr(content[max(0,idx-200):idx+100]))
    sys.exit(1)

# Task 3: Update JSON-LD for contact.html
old_jsonld_c = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "M.R. Textile / M.R. Sarees",
    "description": "Wholesale saree manufacturer and supplier based in Surat, Gujarat.",
    "image": "https://mrtextile.online/images/sarees/silk-sarees/saree_1.jpeg",
    "telephone": ["+91 9428393320", "+91 9427810031"],
    "priceRange": "Wholesale enquiry",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "133, 1st Floor, Manish Market, Ring Road",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "395003",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "url": "https://mrtextile.online/contact.html"
  }
  </script>'''

new_jsonld_c = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "M.R. Textile / M.R. Sarees",
    "description": "Wholesale saree manufacturer and supplier based in Surat, Gujarat.",
    "image": "https://mrtextile.online/images/sarees/silk-sarees/saree_1.jpeg",
    "telephone": ["+91 9428393320", "+91 9427810031"],
    "foundingDate": "2004",
    "priceRange": "\u20b9350 and above per piece",
    "areaServed": [
      {"@type": "State", "name": "Gujarat"},
      {"@type": "State", "name": "Uttar Pradesh"},
      {"@type": "State", "name": "Bihar"},
      {"@type": "State", "name": "Maharashtra"},
      {"@type": "State", "name": "Madhya Pradesh"},
      {"@type": "State", "name": "Delhi"},
      {"@type": "State", "name": "Chhattisgarh"},
      {"@type": "State", "name": "Jharkhand"}
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "133, 1st Floor, Manish Market, Ring Road",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "395003",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "url": "https://mrtextile.online/contact.html"
  }
  </script>'''

if old_jsonld_c in content:
    content = content.replace(old_jsonld_c, new_jsonld_c)
    print("contact.html: JSON-LD updated")
else:
    old_jsonld_c_crlf = old_jsonld_c.replace('\n', '\r\n')
    if old_jsonld_c_crlf in content:
        new_jsonld_c_crlf = new_jsonld_c.replace('\n', '\r\n')
        content = content.replace(old_jsonld_c_crlf, new_jsonld_c_crlf)
        print("contact.html: JSON-LD updated (CRLF)")
    else:
        print("contact.html: JSON-LD NOT FOUND")
        idx = content.find('priceRange')
        print("Context:", repr(content[max(0,idx-50):idx+100]))
        sys.exit(1)

with open(path, 'wb') as f:
    f.write(content.encode('utf-8'))
print("contact.html patched successfully\n")

# ============================================================
# b2b/index.html  — JSON-LD only
# ============================================================
path = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\b2b\index.html'
with open(path, 'rb') as f:
    content = f.read().decode('utf-8')

old_b2b_jsonld = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "M.R. Textile / M.R. Sarees",
    "description": "Wholesale saree supplier based in Surat, Gujarat, offering Silk, Banarasi, Cotton, Designer, Wedding and Printed sarees in bulk for retailers.",
    "image": "https://mrtextile.online/images/sarees/degital-sarees/saree_1.jpeg",
    "telephone": ["+91 9428393320", "+91 9427810031"],
    "priceRange": "Wholesale enquiry",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "133, 1st Floor, Manish Market, Ring Road",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "395003",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "url": "https://mrtextile.online/b2b/"
  }
  </script>'''

new_b2b_jsonld = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "M.R. Textile / M.R. Sarees",
    "description": "Wholesale saree supplier based in Surat, Gujarat, offering Silk, Banarasi, Cotton, Designer, Wedding and Printed sarees in bulk for retailers.",
    "image": "https://mrtextile.online/images/sarees/degital-sarees/saree_1.jpeg",
    "telephone": ["+91 9428393320", "+91 9427810031"],
    "foundingDate": "2004",
    "priceRange": "\u20b9350 and above per piece",
    "areaServed": [
      {"@type": "State", "name": "Gujarat"},
      {"@type": "State", "name": "Uttar Pradesh"},
      {"@type": "State", "name": "Bihar"},
      {"@type": "State", "name": "Maharashtra"},
      {"@type": "State", "name": "Madhya Pradesh"},
      {"@type": "State", "name": "Delhi"},
      {"@type": "State", "name": "Chhattisgarh"},
      {"@type": "State", "name": "Jharkhand"}
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "133, 1st Floor, Manish Market, Ring Road",
      "addressLocality": "Surat",
      "addressRegion": "Gujarat",
      "postalCode": "395003",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "url": "https://mrtextile.online/b2b/"
  }
  </script>'''

if old_b2b_jsonld in content:
    content = content.replace(old_b2b_jsonld, new_b2b_jsonld)
    print("b2b/index.html: JSON-LD updated")
else:
    old_crlf = old_b2b_jsonld.replace('\n', '\r\n')
    if old_crlf in content:
        content = content.replace(old_crlf, new_b2b_jsonld.replace('\n', '\r\n'))
        print("b2b/index.html: JSON-LD updated (CRLF)")
    else:
        print("b2b/index.html: JSON-LD NOT FOUND")
        idx = content.find('priceRange')
        print("Context:", repr(content[max(0,idx-50):idx+100]))
        sys.exit(1)

# b2b/index.html form — add saree-range dropdown before Message
old_b2bi_form = '                <div class="form-field form-field--full">\r\n                  <label for="cf-message">Message <span class="req">*</span></label>\r\n                  <textarea id="cf-message" name="message" rows="4" required></textarea>'
new_b2bi_form = SAREE_RANGE_DROPDOWN + '\r\n                <div class="form-field form-field--full">\r\n                  <label for="cf-message">Message <span class="req">*</span></label>\r\n                  <textarea id="cf-message" name="message" rows="4" required></textarea>'

if old_b2bi_form in content:
    content = content.replace(old_b2bi_form, new_b2bi_form)
    print("b2b/index.html: saree-range dropdown inserted")
else:
    print("b2b/index.html: form field NOT FOUND")
    idx = content.find('cf-message')
    print("Context:", repr(content[max(0,idx-200):idx+150]))
    sys.exit(1)

with open(path, 'wb') as f:
    f.write(content.encode('utf-8'))
print("b2b/index.html patched successfully\n")

# ============================================================
# b2b/contact.html
# ============================================================
path = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\b2b\contact.html'
with open(path, 'rb') as f:
    content = f.read().decode('utf-8')

# Form dropdown (b2b/contact.html has rows="4" no placeholder for message)
old_b2bc_form = '                <div class="form-field form-field--full">\r\n                  <label for="cf-message">Message <span class="req">*</span></label>\r\n                  <textarea id="cf-message" name="message" rows="4" required></textarea>'
new_b2bc_form = SAREE_RANGE_DROPDOWN + '\r\n                <div class="form-field form-field--full">\r\n                  <label for="cf-message">Message <span class="req">*</span></label>\r\n                  <textarea id="cf-message" name="message" rows="4" required></textarea>'

if old_b2bc_form in content:
    content = content.replace(old_b2bc_form, new_b2bc_form)
    print("b2b/contact.html: saree-range dropdown inserted")
else:
    print("b2b/contact.html: form field NOT FOUND")
    idx = content.find('cf-message')
    print("Context:", repr(content[max(0,idx-200):idx+150]))
    sys.exit(1)

# 2a: Replace MOQ info-card answer
old_moq_b2bc = '            <p>Minimum order quantities vary by category and fabric type. Contact us directly to discuss your specific requirements \u2014 we accommodate retail boutiques and large stockists alike.</p>'
new_moq_b2bc = '            <p>Yes. We sell set-wise only, and our minimum order is 36 to 42 pcs per set. Our minimum wholesale price starts at \u20b9350 per piece.</p>'

if old_moq_b2bc in content:
    content = content.replace(old_moq_b2bc, new_moq_b2bc)
    print("b2b/contact.html: MOQ answer replaced")
else:
    print("b2b/contact.html: MOQ answer NOT FOUND")
    idx = content.find('Minimum order quantities vary')
    print("Context:", repr(content[max(0,idx-50):idx+250]))
    sys.exit(1)

# 2c: Replace shipping info-card answer
old_ship_b2bc = '            <p>Yes \u2014 we supply wholesale sarees to retailers and distributors across all states in India with reliable transport logistics.</p>'
new_ship_b2bc = '            <p>Yes. Our major supply states are Uttar Pradesh, Bihar, Maharashtra, Madhya Pradesh, Delhi, Chhattisgarh and Jharkhand. Share your city and order size when you reach out, and we\'ll confirm dispatch options for your location.</p>'

if old_ship_b2bc in content:
    content = content.replace(old_ship_b2bc, new_ship_b2bc)
    print("b2b/contact.html: shipping answer replaced")
else:
    print("b2b/contact.html: shipping answer NOT FOUND")
    idx = content.find('wholesale sarees to retailers and distributors across all states')
    print("Context:", repr(content[max(0,idx-50):idx+200]))
    sys.exit(1)

# 2b+2d: Add two new info-card items before closing </div> of grid--2
two_new_cards = '''          <div class="info-card">
            <div class="info-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
            <h3>What is your price range per piece?</h3>
            <p>Our wholesale range starts at \u20b9350 per piece. When you send an inquiry, choose your budget range: \u20b9350\u2013\u20b9499, \u20b9500\u2013\u20b9699, \u20b9700\u2013\u20b9999 or \u20b91,000 and above, so we can share the right designs.</p>
          </div>
          <div class="info-card">
            <div class="info-card__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
            <h3>How long have you been in business?</h3>
            <p>M.R. Textile has been in the wholesale saree business since 2004, from Manish Market, Surat.</p>
          </div>\r\n'''

# Insert before closing </div> of grid--2 (the one ending the FAQ cards)
old_grid_end = '          </div>\r\n        </div>\r\n      </div>\r\n    </section>\r\n  </main>'
new_grid_end = two_new_cards + '          </div>\r\n        </div>\r\n      </div>\r\n    </section>\r\n  </main>'

if old_grid_end in content:
    content = content.replace(old_grid_end, new_grid_end)
    print("b2b/contact.html: two new info-cards added")
else:
    print("b2b/contact.html: grid end NOT FOUND")
    idx = content.find('</main>')
    print("Context:", repr(content[max(0,idx-300):idx+50]))
    sys.exit(1)

with open(path, 'wb') as f:
    f.write(content.encode('utf-8'))
print("b2b/contact.html patched successfully\n")

print("ALL HTML FILES PATCHED SUCCESSFULLY")
