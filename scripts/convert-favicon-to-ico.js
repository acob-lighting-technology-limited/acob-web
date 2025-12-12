import toIco from 'to-ico';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PNG_PATH = path.join(__dirname, '../public/favicon-light.png');
const ICO_PATH = path.join(__dirname, '../public/favicon-light.ico');

// Standard ICO sizes
const ICO_SIZES = [16, 32, 48];

async function convertPngToIco() {
  try {
    if (!fs.existsSync(PNG_PATH)) {
      console.error(`❌ Source file not found: ${PNG_PATH}`);
      process.exit(1);
    }

    console.log(
      `🔄 Converting ${path.basename(PNG_PATH)} → ${path.basename(ICO_PATH)}...`,
    );

    // Resize to multiple ICO sizes and convert to buffers
    const buffers = await Promise.all(
      ICO_SIZES.map(async size => {
        const buffer = await sharp(PNG_PATH)
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
    fs.writeFileSync(ICO_PATH, output);

    console.log(`✅ Successfully converted to ICO: ${path.basename(ICO_PATH)}`);
    console.log(`📁 Location: ${ICO_PATH}`);
  } catch (error) {
    console.error('❌ Error converting favicon:', error.message);
    process.exit(1);
  }
}

convertPngToIco();
