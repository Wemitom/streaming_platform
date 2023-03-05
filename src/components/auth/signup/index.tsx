import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface SignupData {
  login: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupData>();
  const onSubmit = (data: SignupData) => console.log(data);

  const router = useRouter();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-3 flex flex-col items-center gap-10"
    >
      <Image src="/images/signup.svg" alt="signup" width={64} height={64} />
      <div className="flex w-full flex-col gap-5">
        <Input
          inputAttributes={{
            type: 'text',
            placeholder: 'Ваше имя',
            autoComplete: 'username',
            ...register('login', { required: true })
          }}
        />
        <Input
          inputAttributes={{
            type: 'text',
            placeholder: 'Электронная почта',
            autoComplete: 'email',
            ...register('email', { required: true })
          }}
        />
        <Input
          inputAttributes={{
            type: 'password',
            placeholder: 'Пароль',
            autoComplete: 'new-password',
            ...register('password', { required: true })
          }}
        />
        <Input
          inputAttributes={{
            type: 'password',
            placeholder: 'Повторите пароль',
            autoComplete: 'new-password',
            ...register('repeatPassword', { required: true })
          }}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Button
          text="Регистрация"
          handleClick={() => router.push('sign-up')}
          submit
        />
      </div>
    </form>
  );
};

export default SignupForm;
