import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface LoginData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>();
  const session = useSession();
  const router = useRouter();

  if (session.data) router.push('/');

  const onSubmit = async (data: LoginData) => {
    try {
      const result = await signIn('login', {
        redirect: false,
        username: data.username,
        password: data.password
      });

      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-3 flex flex-col items-center gap-10"
    >
      <Image src="/images/login.svg" alt="login" width={48} height={48} />
      <div className="flex w-full flex-col gap-5">
        <Input
          inputAttributes={{
            type: 'text',
            placeholder: 'Логин',
            autoComplete: 'username',
            ...register('username', { required: true })
          }}
        />
        <Input
          inputAttributes={{
            type: 'password',
            placeholder: 'Пароль',
            autoComplete: 'current-password',
            ...register('password', { required: true })
          }}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Button
          text="Войти"
          handleClick={() => {
            return;
          }}
          submit
        />
        <Button text="Регистрация" handleClick={() => router.push('sign-up')} />
      </div>
    </form>
  );
};

export default LoginForm;
