import { useEffect } from 'react';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

/*
 * HOC переводящий на страницу с аутентификацией если пользователь не залогинен
 */
const withAuth = (Component: () => JSX.Element) => {
  const WithAuthComponent = () => {
    const { status, data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      const getName = async () => {
        if (!session?.name && session)
          session.name = (
            await axios.get(
              `http://localhost:8080/user/whoami?token=${session?.accessToken}`
            )
          ).data;
      };

      getName();
    }, [session]);

    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else {
      return <Component />;
    }
  };

  return WithAuthComponent;
};

export default withAuth;
