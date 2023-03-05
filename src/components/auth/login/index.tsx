import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface LoginData {
  login: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginData>();
  const onSubmit = (data: LoginData) => console.log(data);

  const router = useRouter();

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
            ...register('login', { required: true })
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
        <Button text="Войти" handleClick={() => console.log('wow')} submit />
        <Button text="Регистрация" handleClick={() => router.push('sign-up')} />
      </div>
    </form>
  );
};

export default LoginForm;
