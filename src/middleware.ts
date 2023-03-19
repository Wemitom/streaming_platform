import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      return !!token;
    }
  },
  pages: {
    signIn: '/auth/login'
  }
});

export const config = {
  matcher: ['/edit/profile', '/top-up', '/withdraw-money', '/referral']
};
