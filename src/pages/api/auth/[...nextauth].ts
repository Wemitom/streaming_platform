import axios from 'axios';
import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import { baseURL } from '@/utils/constants';

interface SuccessResponse {
  status: 'ok';
  token: string;
}
interface WrongCredentials {
  status: 'wrong_credentials';
  token?: string;
}
type LoginResponse = SuccessResponse | WrongCredentials;

async function refreshAccessToken(token: JWT) {
  try {
    const url = '';

    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    });

    const refreshedTokens = await res.json();

    if (!res.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'login',
      credentials: {
        name: { type: 'text' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { data }: { data: LoginResponse } = await axios.post(
            'http://0.0.0.0:8080/user/login',
            credentials
          );

          const { status, token } = data;
          return {
            name: credentials?.name,
            status,
            accessToken: token
          } as User;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      return user.status === 'ok';
    },
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.name = user.name;
      }

      return token;

      // console.log('token:', token, ';user:', user, ';account:', account);
      // if (account && user && account.expires_at) {
      //   return {
      //     accessToken: account.access_token,
      //     accessTokenExpires: Date.now() + account.expires_at * 1000,
      //     refreshToken: account.refresh_token,
      //     user
      //   };
      // }

      // if (Date.now() < token.accessTokenExpires) {
      //   return token;
      // } else {
      //   return refreshAccessToken(token);
      // }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.name = token.name;

      return session;
    }
  }
});
