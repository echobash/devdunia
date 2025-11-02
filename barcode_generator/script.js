// script.js
document.addEventListener('DOMContentLoaded', () => {
  // load sidebar & footer from parent directory
  fetch('../final_sidebar.html').then(r => r.text()).then(t => document.getElementById('sidebar').innerHTML = t).catch(()=>{});
  
  // elements
  const input = document.getElementById('barcode-input');
  const typeSel = document.getElementById('barcode-type');
  const sizeSel = document.getElementById('barcode-size');
  const fgColor = document.getElementById('fg-color');
  const fgText = document.getElementById('fg-text');
  const bgColor = document.getElementById('bg-color');
  const bgText = document.getElementById('bg-text');

  const generateBtn = document.getElementById('generate-btn');
  const downloadPngBtn = document.getElementById('download-png-btn');
  const downloadSvgBtn = document.getElementById('download-svg-btn');
  const clearBtn = document.getElementById('clear-btn');

  const barcodeSection = document.getElementById('barcode-section');
  const barcodeSvg = document.getElementById('barcode-svg');

  const infoType = document.getElementById('info-type');
  const infoSize = document.getElementById('info-size');
  const infoLength = document.getElementById('info-length');

  const templateBtns = document.querySelectorAll('.template-btn');

  let currentData = null;

  // sync color fields
  fgColor.addEventListener('change', () => fgText.value = fgColor.value);
  bgColor.addEventListener('change', () => bgText.value = bgColor.value);
  fgText.addEventListener('input', () => { if(/^#[0-9A-F]{6}$/i.test(fgText.value)) fgColor.value = fgText.value; });
  bgText.addEventListener('input', () => { if(/^#[0-9A-F]{6}$/i.test(bgText.value)) bgColor.value = bgText.value; });

  // quick templates
  const templates = {
    product: '123456789012',
    url: 'https://devdunia.com',
    serial: 'SN-0001-ABCD',
    isbn: '9783161484100'
  };
  templateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.template;
      input.value = templates[t] || '';
    });
  });

  // generate
  generateBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) { alert('Please enter some text or number to encode'); return; }

    const format = typeSel.value || 'CODE128';
    const scale = parseInt(sizeSel.value, 10) || 3;
    const lineColor = fgColor.value || '#000000';
    const background = bgColor.value || '#ffffff';

    try {
      // clear previous
      barcodeSvg.innerHTML = '';
      JsBarcode(barcodeSvg, text, {
        format: format,
        lineColor: lineColor,
        background: background,
        width: scale,
        height: 100,
        displayValue: true,
        fontSize: 14,
        margin: 10
      });

      currentData = { text, format, scale, lineColor, background };
      barcodeSection.classList.remove('hidden');
      downloadPngBtn.disabled = false;
      downloadSvgBtn.disabled = false;

      infoType.textContent = format;
      infoSize.textContent = scale;
      infoLength.textContent = text.length;
    } catch (err) {
      alert('Barcode generation error: ' + (err && err.message ? err.message : err));
    }
  });

  // download PNG
  downloadPngBtn.addEventListener('click', () => {
    if (!currentData) { alert('Generate a barcode first'); return; }
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(barcodeSvg);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      // apply background if not transparent
      if (currentData.background && currentData.background !== 'transparent') {
        ctx.fillStyle = currentData.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const png = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = png;
      a.download = 'barcode.png';
      a.click();
    };
    img.onerror = () => { URL.revokeObjectURL(url); alert('Failed to convert SVG to PNG'); };
    img.src = url;
  });

  // download SVG
  downloadSvgBtn.addEventListener('click', () => {
    if (!currentData) { alert('Generate a barcode first'); return; }
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(barcodeSvg);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'barcode.svg';
    a.click();
    URL.revokeObjectURL(url);
  });

  // clear
  clearBtn.addEventListener('click', () => {
    input.value = '';
    barcodeSvg.innerHTML = '';
    barcodeSection.classList.add('hidden');
    downloadPngBtn.disabled = true;
    downloadSvgBtn.disabled = true;
    currentData = null;
  });

  // default sample on load (same as QR page)
  window.addEventListener('load', () => {
    input.value = 'https://devdunia.com';
  });
});
