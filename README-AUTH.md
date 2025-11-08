# Authentication Setup Guide

This project uses JWT authentication with bcrypt password hashing and Supabase as the database.

## 📦 Installation

First, install the required packages:

```bash
npm install
```

This will install:
- `bcryptjs` - For password hashing
- `jsonwebtoken` - For JWT token generation and verification
- `@types/bcryptjs` - TypeScript types for bcryptjs
- `@types/jsonwebtoken` - TypeScript types for jsonwebtoken

## 🗄️ Database Setup

### 1. Create the Users Table

Run the SQL script in `database-schema.sql` in your Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
```

### 2. Configure Row Level Security (RLS)

For development, you can temporarily disable RLS:

```sql
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
```

For production, create appropriate policies based on your security requirements.

## 🔐 Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
```

### Getting Supabase Keys:

1. Go to your Supabase project dashboard
2. Navigate to Settings → API
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

### JWT Secret:

Generate a strong random string for `JWT_SECRET`:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🔑 API Endpoints

### POST `/api/signup`

Creates a new user account.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "confirmPassword": "securepassword123",
  "acceptTerms": true
}
```

**Response (201):**
```json
{
  "message": "Account created successfully",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "token": "jwt-token-here"
}
```

### POST `/api/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "full_name": "John Doe",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "token": "jwt-token-here"
}
```

## 🔒 Using JWT Tokens

### In Frontend:

After login/signup, the token is stored in localStorage:

```typescript
localStorage.setItem("auth_token", token);
localStorage.setItem("user_data", JSON.stringify(user));
```

### In API Requests:

Include the token in the Authorization header:

```typescript
fetch("/api/protected-route", {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
  }
});
```

### In Protected API Routes:

Use the `getAuthUser` helper:

```typescript
import { getAuthUser } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await getAuthUser(request);
  
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  // User is authenticated, proceed with request
  // user.userId and user.email are available
}
```

## 🛡️ Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt with 10 salt rounds
2. **JWT Tokens**: Secure token-based authentication
3. **Email Validation**: Email format validation on both client and server
4. **Password Requirements**: Minimum 8 characters
5. **Token Expiration**: Configurable token expiration (default: 7 days)

## 🧪 Testing

### Test Signup:

```bash
curl -X POST http://localhost:3000/api/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "testpassword123",
    "confirmPassword": "testpassword123",
    "acceptTerms": true
  }'
```

### Test Login:

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

## 📝 Notes

- Passwords are never stored in plain text
- JWT tokens contain user ID and email (no sensitive data)
- Tokens should be stored securely (consider httpOnly cookies for production)
- The middleware automatically protects routes (except public ones)
- Service role key should NEVER be exposed to the client

