import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { SignupErrors } from '@/pages/api/signup';

const validationSchema = yup
  .object({
    name: yup
      .string()
      .required('form.required')
      .min(3, 'form.name-short')
      .max(10, 'form.name-long'),
    email: yup.string().email('form.not-email').required('form.required'),
    password: yup
      .string()
      .required('form.required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[\d])[A-Za-z\d@$!%*?&]+$/,
        'form.password-regex'
      ),
    passwordConfirm: yup
      .string()
      .required('form.required')
      .oneOf([yup.ref('password')], 'form.password-not-much')
  })
  .required();
type SignupData = yup.InferType<typeof validationSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<SignupData>({ resolver: yupResolver(validationSchema) });
  const [unknownError, setUnknownError] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('signup');

  const onSubmit = async (data: SignupData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm, ...signupData } = data;
    setUnknownError(false);

    try {
      const { status }: { status: SignupErrors } = (
        await axios.post('/api/signup', signupData)
      ).data;

      switch (status) {
        case 'ok': {
          const loginResult = await signIn('login', {
            redirect: false,
            name: signupData.name,
            password: signupData.password
          });

          loginResult?.ok && router.push('/');
          break;
        }
        case 'user_exists':
          setError('name', {
            type: 'custom',
            message: t('form.user-exists') as string
          });
          break;
        default:
          setUnknownError(true);
          break;
      }
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
        src="/images/signup.svg"
        alt="signup"
        width={64}
        height={64}
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
        {errors.name && (
          <p className="text-s text-chat pl-2">
            {t(errors.name.message as string)}
          </p>
        )}
        <Input
          inputAttributes={{
            type: 'text',
            placeholder: t('form.email-placeholder') as string,
            autoComplete: 'email',
            ...register('email', { required: true })
          }}
        />
        {errors.email && (
          <p className="text-s text-chat pl-2">
            {t(errors.email.message as string)}
          </p>
        )}
        <Input
          inputAttributes={{
            type: 'password',
            placeholder: t('form.password-placeholder') as string,
            autoComplete: 'new-password',
            ...register('password', { required: true })
          }}
        />
        {errors.password && (
          <p className="text-s text-chat pl-2">
            {t(errors.password.message as string)}
          </p>
        )}
        <Input
          inputAttributes={{
            type: 'password',
            placeholder: t('form.confirm-password-placeholder') as string,
            autoComplete: 'new-password',
            ...register('passwordConfirm', { required: true })
          }}
        />
        {errors.passwordConfirm && (
          <p className="text-s text-chat pl-2">
            {t(errors.passwordConfirm.message as string)}
          </p>
        )}
      </div>
      <div className="flex flex-col items-center gap-3">
        <Button
          text={t('form.signup-button')}
          handleClick={() => router.push('sign-up')}
          submit
        />
        {unknownError && (
          <p className="text-s text-chat pl-2">{t('form.unknown-error')}</p>
        )}
      </div>
    </form>
  );
};

export default SignupForm;
