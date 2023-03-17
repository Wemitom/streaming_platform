import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { SignupErrors } from '@/pages/api/signup';

const validationSchema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Логин не может быть короче 3 символов')
      .max(10, 'Логин не может быть длинее 8 символов')
      .required('Обязательно для заполнения'),
    email: yup
      .string()
      .email('Введите email!')
      .required('Обязательно для заполнения'),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[\d])[A-Za-z\d@$!%*?&]+$/,
        'Пароль должен содержать как минимум одну строчную букву латинского алфавита, одну заглавную букву латинского алфавита, одну цифру и один специальный символ'
      )
      .required('Обязательно для заполнения'),
    passwordConfirm: yup
      .string()
      .required('Обязательно для заполнения')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать')
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
            message: 'Такой логин уже существует'
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

  const router = useRouter();
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
            placeholder: 'Ваше имя',
            autoComplete: 'username',
            ...register('name', { required: true })
          }}
        />
        {errors.name && (
          <p className="text-s text-chat pl-2">{errors.name.message}</p>
        )}
        <Input
          inputAttributes={{
            type: 'text',
            placeholder: 'Электронная почта',
            autoComplete: 'email',
            ...register('email', { required: true })
          }}
        />
        {errors.email && (
          <p className="text-s text-chat pl-2">{errors.email.message}</p>
        )}
        <Input
          inputAttributes={{
            type: 'password',
            placeholder: 'Пароль',
            autoComplete: 'new-password',
            ...register('password', { required: true })
          }}
        />
        {errors.password && (
          <p className="text-s text-chat pl-2">{errors.password.message}</p>
        )}
        <Input
          inputAttributes={{
            type: 'password',
            placeholder: 'Повторите пароль',
            autoComplete: 'new-password',
            ...register('passwordConfirm', { required: true })
          }}
        />
        {errors.passwordConfirm && (
          <p className="text-s text-chat pl-2">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>
      <div className="flex flex-col items-center gap-3">
        <Button
          text="Регистрация"
          handleClick={() => router.push('sign-up')}
          submit
        />
        {unknownError && (
          <p className="text-s text-chat pl-2">
            При регистрации произошла неизвестная ошибка
          </p>
        )}
      </div>
    </form>
  );
};

export default SignupForm;
