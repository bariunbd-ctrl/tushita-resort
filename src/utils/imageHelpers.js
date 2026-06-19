// Image helpers — placeholder generation & file reading

// Soft natural-colored gradient SVG placeholder as data URI
export function getPlaceholderImage(label = 'Зураг', width = 800, height = 600) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#9cc59f"/>
        <stop offset="100%" stop-color="#386b3d"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <text x="50%" y="50%" fill="#ffffff" font-family="sans-serif" font-size="28"
      text-anchor="middle" dominant-baseline="middle" opacity="0.85">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Read a File object to base64 data URL
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}
