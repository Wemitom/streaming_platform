import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface User {
    name: string;
    status: 'ok' | 'wrong_credentials';
    accessToken?: string;
  }

  interface Session {
    accessToken: string;
    name: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    name: string;
    // expires_in: number;
    // accessTokenExpires: number;
  }
}
