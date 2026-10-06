const fs = require('fs');
const path = require('path');

const presentacionesDir = path.join(__dirname, '..', 'presentaciones');
const manifestPath = path.join(__dirname, '..', 'presentaciones.json');

function scanPresentaciones() {
  if (!fs.existsSync(presentacionesDir)) {
    return [];
  }

  const entries = fs.readdirSync(presentacionesDir, { withFileTypes: true });
  const presentaciones = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const folderName = entry.name;
      if (folderName === 'ejemplo-demostracion') continue;

      const indexPath = path.join(presentacionesDir, folderName, 'index.html');
      
      let title = folderName.replace(/-/g, ' ').toUpperCase();
      let description = 'Presentación interactiva creada con reveal.js';
      let tag = 'Presentación';

      if (fs.existsSync(indexPath)) {
        const htmlContent = fs.readFileSync(indexPath, 'utf-8');
        
        // Extraer título del tag <title>
        const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
          title = titleMatch[1].trim();
        }

        // Extraer descripción de <meta name="description">
        const descMatch = htmlContent.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
        if (descMatch && descMatch[1]) {
          description = descMatch[1].trim();
        }
      }

      presentaciones.push({
        id: folderName,
        title: title,
        description: description,
        tag: tag,
        url: `presentaciones/${folderName}/index.html`
      });
    }
  }

  return presentaciones;
}

const list = scanPresentaciones();
fs.writeFileSync(manifestPath, JSON.stringify(list, null, 2), 'utf-8');
console.log(`✅ Manifiesto actualizado con ${list.length} presentaciones encontradas.`);
