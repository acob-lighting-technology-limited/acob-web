import bcrypt from 'bcryptjs';

// Salt rounds for password hashing (higher = more secure but slower)
const SALT_ROUNDS = 12;

/**
 * Hash a password securely using bcrypt
 * @param password - Plain text password
 * @returns Hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against its hash
 * @param password - Plain text password to verify
 * @param hashedPassword - Hashed password to compare against
 * @returns True if password matches, false otherwise
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

/**
 * Generate a secure admin password hash for environment variable
 * Use this function once to generate the hash, then store it in .env.local
 */
export async function generateAdminPasswordHash(): Promise<string> {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const hashedPassword = await hashPassword(adminPassword);
  console.log('Admin password hash for .env.local:');
  console.log(`ADMIN_PASSWORD_HASH=${hashedPassword}`);
  return hashedPassword;
}

// Admin credentials interface
export interface AdminCredentials {
  email: string;
  passwordHash: string;
  name: string;
  role: string;
}

// Get admin credentials from environment variables
export function getAdminCredentials(): AdminCredentials {
  const email = process.env.ADMIN_EMAIL;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const name = process.env.ADMIN_NAME || 'ACOB Admin';
  const role = process.env.ADMIN_ROLE || 'admin';

  if (!email || !passwordHash) {
    throw new Error(
      'Admin credentials not properly configured in environment variables',
    );
  }

  return {
    email,
    passwordHash,
    name,
    role,
  };
}
