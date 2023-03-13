import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

/*
 * HOC переводящий на страницу с аутентификацией если пользователь не залогинен
 */
const withAuth = (Component: () => JSX.Element) => {
  const WithAuthComponent = () => {
    const { status } = useSession();
    const router = useRouter();

    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else {
      return <Component />;
    }
  };

  return WithAuthComponent;
};

export default withAuth;
