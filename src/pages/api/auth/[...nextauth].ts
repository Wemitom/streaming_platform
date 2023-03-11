import axios from 'axios';
import { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

interface LoginResponse {
  user: User;
  token: string;
}

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
        username: { type: 'text' },
        password: { type: 'password' }
      },
      async authorize(credentials) {
        try {
          const { data }: { data: LoginResponse } = await axios.post(
            'http://localhost:8085/auth',
            {
              identifier: 'a@b.com',
              password: 'test'
            }
          );

          const { user, token } = data;
          return { ...user, accessToken: token };
        } catch (error) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.user = user;
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
      session.user = token.user;

      return session;
    }
  }
});
