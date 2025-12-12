import toIco from 'to-ico';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Standard ICO sizes
const ICO_SIZES = [16, 32, 48];

async function convertPngToIco(pngPath, icoPath) {
  try {
    if (!fs.existsSync(pngPath)) {
      console.error(`❌ Source file not found: ${pngPath}`);
      return false;
    }

    console.log(
      `🔄 Converting ${path.basename(pngPath)} → ${path.basename(icoPath)}...`,
    );

    // Resize to multiple ICO sizes and convert to buffers
    const buffers = await Promise.all(
      ICO_SIZES.map(async size => {
        const buffer = await sharp(pngPath)
          .resize(size, size, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png()
          .toBuffer();
        return buffer;
      }),
    );

    // Convert to ICO
    const output = await toIco(buffers);
    fs.writeFileSync(icoPath, output);

    console.log(`✅ Successfully converted to ICO: ${path.basename(icoPath)}`);
    return true;
  } catch (error) {
    console.error(`❌ Error converting ${pngPath}:`, error.message);
    return false;
  }
}

async function main() {
  const PUBLIC_DIR = path.join(__dirname, '../public');

  const lightPng = path.join(PUBLIC_DIR, 'favicon-light-christmas.png');
  const lightIco = path.join(PUBLIC_DIR, 'favicon-light-christmas.ico');
  const darkPng = path.join(PUBLIC_DIR, 'favicon-dark-christmas.png');
  const darkIco = path.join(PUBLIC_DIR, 'favicon-dark-christmas.ico');

  await convertPngToIco(lightPng, lightIco);
  await convertPngToIco(darkPng, darkIco);

  console.log('\n✅ All Christmas favicons converted!');
}

main();
