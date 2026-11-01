import sys

path = r'c:\Users\advai\OneDrive\Desktop\M.R. Textile\github-pages\js\whatsapp-gate.js'
with open(path, 'rb') as f:
    content = f.read().decode('utf-8')

# 1. Add saree-range dropdown field BEFORE the submit button in buildModal()
old1 = '        <button type="submit" class="wa-gate__submit" id="wa-gate-submit">'
new1 = '''        <div class="wa-gate__field">
          <label class="wa-gate__label" for="wa-saree-range">Per Pcs Saree Range <span aria-hidden="true">*</span></label>
          <select class="wa-gate__input" id="wa-saree-range" name="wa-saree-range" required aria-describedby="wa-saree-range-hint">
            <option value="" disabled selected>Select range</option>
            <option value="₹350 \u2013 ₹499">₹350 \u2013 ₹499</option>
            <option value="₹500 \u2013 ₹699">₹500 \u2013 ₹699</option>
            <option value="₹700 \u2013 ₹999">₹700 \u2013 ₹999</option>
            <option value="₹1,000 &amp; above">₹1,000 &amp; above</option>
          </select>
          <span id="wa-saree-range-hint" class="wa-gate__hint">Minimum price ₹350 per pc · MOQ 36\u201342 pcs, set-wise only</span>
          <span class="wa-gate__error" id="wa-saree-range-err" hidden>Please select a price range.</span>
        </div>

        <button type="submit" class="wa-gate__submit" id="wa-gate-submit">'''

if old1 in content:
    content = content.replace(old1, new1)
    print("MODAL FIELD: added")
else:
    print("MODAL FIELD: NOT FOUND")
    sys.exit(1)

# 2. Update buildMessage to accept sareeRange (5th param) and include it
old2 = '''function buildMessage(name, city, intent, lang) {
  if (lang === "hi") {
    return `\u0928\u092e\u0938\u094d\u0924\u0947 M.R. Textile, \u092e\u0948\u0902 *${name}* \u0939\u0942\u0901, *${city}* \u0938\u0947\u0964 \u092e\u0941\u091d\u0947 ${intent} \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u091a\u093e\u0939\u093f\u090f\u0964`;
  }
  return `Hi M.R. Textile, I'm *${name}* from *${city}*. My inquiry is about: ${intent}.`;
}'''
new2 = '''function buildMessage(name, city, intent, lang, sareeRange) {
  if (lang === "hi") {
    return `\u0928\u092e\u0938\u094d\u0924\u0947 M.R. Textile, \u092e\u0948\u0902 *${name}* \u0939\u0942\u0901, *${city}* \u0938\u0947\u0964 \u092e\u0941\u091d\u0947 ${intent} \u0915\u0947 \u092c\u093e\u0930\u0947 \u092e\u0947\u0902 \u091c\u093e\u0928\u0915\u093e\u0930\u0940 \u091a\u093e\u0939\u093f\u090f\u0964\n\u092a\u094d\u0930\u0924\u093f \u092a\u0940\u0938 \u0938\u093e\u0921\u093c\u0940 \u0930\u0947\u0902\u091c: ${sareeRange}`;
  }
  return `Hi M.R. Textile, I'm *${name}* from *${city}*. My inquiry is about: ${intent}.\nPer pcs saree range: ${sareeRange}`;
}'''

if old2 in content:
    content = content.replace(old2, new2)
    print("BUILD_MESSAGE: updated")
else:
    print("BUILD_MESSAGE: NOT FOUND")
    # Try to find context
    idx = content.find('buildMessage')
    print("Context:", repr(content[idx:idx+300]))
    sys.exit(1)

# 3. Update openGate submit handler to read, validate, and pass sareeRange
old3 = '''    const name   = overlay.querySelector("#wa-name").value.trim();
    const city   = overlay.querySelector("#wa-city").value.trim();
    const intent = overlay.querySelector('input[name="wa-intent"]:checked')?.value || "General Inquiry";
    const lang   = overlay.querySelector('input[name="wa-lang"]:checked')?.value || "hi";

    const nameErr = overlay.querySelector("#wa-name-err");
    const cityErr = overlay.querySelector("#wa-city-err");
    nameErr.hidden = true;
    cityErr.hidden = true;

    if (!name) { nameErr.hidden = false; overlay.querySelector("#wa-name").focus(); return; }
    if (!city) { cityErr.hidden = false; overlay.querySelector("#wa-city").focus(); return; }

    const msg = buildMessage(name, city, intent, lang);'''
new3 = '''    const name       = overlay.querySelector("#wa-name").value.trim();
    const city       = overlay.querySelector("#wa-city").value.trim();
    const intent     = overlay.querySelector('input[name="wa-intent"]:checked')?.value || "General Inquiry";
    const lang       = overlay.querySelector('input[name="wa-lang"]:checked')?.value || "hi";
    const sareeRange = overlay.querySelector('#wa-saree-range').value;

    const nameErr      = overlay.querySelector("#wa-name-err");
    const cityErr      = overlay.querySelector("#wa-city-err");
    const sareeRangeErr = overlay.querySelector('#wa-saree-range-err');
    nameErr.hidden      = true;
    cityErr.hidden      = true;
    sareeRangeErr.hidden = true;

    if (!name) { nameErr.hidden = false; overlay.querySelector("#wa-name").focus(); return; }
    if (!city) { cityErr.hidden = false; overlay.querySelector("#wa-city").focus(); return; }
    if (!sareeRange) { sareeRangeErr.hidden = false; overlay.querySelector('#wa-saree-range').focus(); return; }

    const msg = buildMessage(name, city, intent, lang, sareeRange);'''

if old3 in content:
    content = content.replace(old3, new3)
    print("SUBMIT_HANDLER: updated")
else:
    print("SUBMIT_HANDLER: NOT FOUND")
    idx = content.find('const name')
    print("Context:", repr(content[idx:idx+400]))
    sys.exit(1)

with open(path, 'wb') as f:
    f.write(content.encode('utf-8'))

print("whatsapp-gate.js patched successfully")
