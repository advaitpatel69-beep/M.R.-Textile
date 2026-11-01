import sys

path = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\js\contact-form.js'
with open(path, 'rb') as f:
    content = f.read().decode('utf-8')

# Add saree-range validator between email and message validators
old = "  email: (v) => (/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v.trim()) ? \"\" : \"Enter a valid email address.\"),\r\n  message:"
new = "  email: (v) => (/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v.trim()) ? \"\" : \"Enter a valid email address.\"),\r\n  'saree-range': (v) => (v ? '' : 'Please select a price range.'),\r\n  message:"

if old in content:
    content = content.replace(old, new)
    print("VALIDATOR: found and replaced")
else:
    print("VALIDATOR: NOT FOUND")
    sys.exit(1)

# Add Per pcs saree range line to buildWhatsappUrl BEFORE Requirement:
old2 = "      `Email: ${value(\"email\")}`,\r\n      \"\",\r\n      `Requirement: ${value(\"message\")}`,"
new2 = "      `Email: ${value(\"email\")}`,\r\n      \"\",\r\n      `Per pcs saree range: ${value('saree-range')}`,\r\n      `Requirement: ${value(\"message\")}`,"

if old2 in content:
    content = content.replace(old2, new2)
    print("BUILDURL: found and replaced")
else:
    print("BUILDURL: NOT FOUND")
    # Try to show context
    idx = content.find('Requirement:')
    print("Context around Requirement:", repr(content[max(0,idx-150):idx+60]))
    sys.exit(1)

# Also fix the has-error focus selector to include select elements
old3 = "      form.querySelector(\".has-error input, .has-error textarea\")?.focus();"
new3 = "      form.querySelector(\".has-error input, .has-error select, .has-error textarea\")?.focus();"

if old3 in content:
    content = content.replace(old3, new3)
    print("FOCUS: found and replaced")
else:
    print("FOCUS: NOT FOUND (skipping, not critical)")

with open(path, 'wb') as f:
    f.write(content.encode('utf-8'))

print("contact-form.js patched successfully")
