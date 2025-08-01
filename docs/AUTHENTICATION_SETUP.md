# 🔐 Secure Authentication Setup Guide

## Overview

This document explains how to set up secure authentication for the ACOB Lighting Technology Limited admin panel using environment variables and bcrypt password hashing.

## 🚨 Security Changes Made

### Before (Insecure)

```typescript
// HARDCODED CREDENTIALS - SECURITY RISK!
if (
  credentials?.email === 'admin@acoblighting.com' &&
  credentials?.password === 'admin123'
) {
  // Login successful
}
```

### After (Secure)

```typescript
// SECURE - Environment variables + bcrypt hashing
const adminCreds = getAdminCredentials();
const isValidPassword = await verifyPassword(
  credentials.password,
  adminCreds.passwordHash
);
```

## 📋 Setup Instructions

### 1. Generate Password Hash

Run the password hash generator:

```bash
npm run generate-admin-hash [your-password]
```

**Example:**

```bash
npm run generate-admin-hash mySecurePassword123
```

### 2. Configure Environment Variables

Add the generated values to your `.env.local` file:

```env
# Admin Credentials (SECURE)
ADMIN_EMAIL=admin@acoblighting.com
ADMIN_PASSWORD_HASH=$2b$12$Bdhb4JAoF9NFsIs8MJZ79e3tH49nJ9WNIYWE7MyJ7jaiWdu/nFYaW
ADMIN_NAME=ACOB Admin
ADMIN_ROLE=admin
NEXTAUTH_SECRET=0b3a68916cca6cc281f4dd73e79840b011dde4efe8fc3ec2b3ae0ef2641e3a39
```

### 3. Test Authentication

1. Start the development server: `npm run dev`
2. Navigate to `/admin/login`
3. Use the credentials you set up

## 🔧 Technical Implementation

### Files Modified

- `lib/auth.ts` - Updated authentication logic
- `lib/auth-utils.ts` - New password hashing utilities
- `scripts/generate-admin-hash.js` - Password hash generator
- `env.example` - Updated environment template
- `package.json` - Added bcryptjs dependency

### Security Features

1. **bcrypt Password Hashing**
   - Salt rounds: 12 (high security)
   - One-way hashing (cannot be reversed)

2. **Environment Variables**
   - No hardcoded credentials
   - Secure credential storage

3. **Error Handling**
   - Graceful authentication failures
   - No information leakage

4. **Type Safety**
   - Proper TypeScript interfaces
   - No `any` types in authentication

## 🛡️ Security Best Practices

### Password Requirements

- **Minimum 12 characters**
- **Mix of uppercase, lowercase, numbers, symbols**
- **Avoid common words or patterns**
- **Change every 90 days**

### Environment Security

- **Never commit `.env.local`**
- **Use different credentials per environment**
- **Rotate secrets regularly**
- **Limit access to production credentials**

### Production Deployment

1. Generate strong production password
2. Use different email for production
3. Set up proper environment variables
4. Enable HTTPS only
5. Implement rate limiting

## 🔍 Troubleshooting

### Common Issues

**"Admin credentials not properly configured"**

- Check that all environment variables are set
- Verify `.env.local` file exists
- Ensure no typos in variable names

**"Authentication failed"**

- Verify password hash was generated correctly
- Check email matches exactly
- Ensure environment variables are loaded

**"Build errors"**

- Install dependencies: `npm install`
- Check TypeScript compilation
- Verify all imports are correct

## 📞 Support

For authentication issues:

1. Check this documentation
2. Verify environment variables
3. Test with generated hash
4. Contact development team

## 🔄 Maintenance

### Regular Tasks

- [ ] Change admin password quarterly
- [ ] Review access logs
- [ ] Update dependencies
- [ ] Test authentication flow

### Security Audits

- [ ] Review authentication code
- [ ] Check for new vulnerabilities
- [ ] Update security practices
- [ ] Test penetration resistance

---

**⚠️ IMPORTANT: Keep this documentation secure and limit access to production credentials.**
