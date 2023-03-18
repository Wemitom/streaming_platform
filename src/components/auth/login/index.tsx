import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface LoginData {
  name: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginData>();
  const router = useRouter();
  const { t } = useTranslation('login');

  const onSubmit = async (data: LoginData) => {
    try {
      const result = await signIn('login', {
        redirect: false,
        ...data
      });

      result?.ok && router.push((router.query.callbackUrl as string) ?? '/');
      result?.error &&
        setError('root', {
          type: 'custom',
          message: t('form.wrong-credentials') as string
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-3 flex flex-col items-center gap-10 p-6"
    >
      <Image
        priority
        src="/images/login.svg"
        alt="login"
        width={48}
        height={48}
      />
      <div className="flex w-full flex-col gap-5">
        <Input
          inputAttributes={{
            type: 'text',
            placeholder: t('form.name-placeholder') as string,
            autoComplete: 'username',
            ...register('name', { required: true })
          }}
        />
        <Input
          inputAttributes={{
            type: 'password',
            placeholder: t('form.password-placeholder') as string,
            autoComplete: 'current-password',
            ...register('password', { required: true })
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-3">
        <Button
          text={t('form.login-button')}
          handleClick={() => {
            return;
          }}
          submit
        />
        <Button
          text={t('form.signup-button')}
          handleClick={() => router.push('sign-up')}
        />
        {errors.root && (
          <p className="text-s text-chat pl-2">{errors.root.message}</p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
