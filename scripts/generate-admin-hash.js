#!/usr/bin/env node

/**
 * Script to generate admin password hash for environment variables
 * Usage: node scripts/generate-admin-hash.js [password]
 */

const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

async function generateHash() {
  const password = process.argv[2] || 'admin123';

  console.log('🔐 Generating admin password hash...');
  console.log(`📧 Email: admin@acoblighting.com`);
  console.log(`🔑 Password: ${password}`);
  console.log('');

  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    console.log('✅ Hash generated successfully!');
    console.log('');
    console.log('📋 Add these to your .env.local file:');
    console.log('');
    console.log(`ADMIN_EMAIL=admin@acoblighting.com`);
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log(`ADMIN_NAME=ACOB Admin`);
    console.log(`ADMIN_ROLE=admin`);
    console.log(`NEXTAUTH_SECRET=${generateRandomSecret()}`);
    console.log('');
    console.log('⚠️  IMPORTANT:');
    console.log('   - Keep your .env.local file secure and never commit it');
    console.log('   - Use a strong password in production');
    console.log('   - Change the password regularly');
    console.log('   - Use different credentials for different environments');
  } catch (error) {
    console.error('❌ Error generating hash:', error);
    process.exit(1);
  }
}

function generateRandomSecret() {
  return require('crypto').randomBytes(32).toString('hex');
}

generateHash();
