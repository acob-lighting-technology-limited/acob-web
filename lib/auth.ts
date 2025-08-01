import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword, getAdminCredentials } from './auth-utils';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Get admin credentials from environment variables
          const adminCreds = getAdminCredentials();

          // Check if email matches
          if (credentials?.email !== adminCreds.email) {
            return null;
          }

          // Verify password against hash
          const isValidPassword = await verifyPassword(
            credentials.password,
            adminCreds.passwordHash
          );

          if (isValidPassword) {
            return {
              id: '1',
              email: adminCreds.email,
              name: adminCreds.name,
              role: adminCreds.role,
            };
          }

          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  // Add security configurations
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};
