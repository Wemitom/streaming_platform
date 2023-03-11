import NextAuth from 'next-auth/next';

declare module 'next-auth' {
  interface User {
    username: string;
    email: string;
    accessToken?: string;
  }

  interface Session {
    accessToken: string;
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    user: User;
    // expires_in: number;
    // accessTokenExpires: number;
  }
}
