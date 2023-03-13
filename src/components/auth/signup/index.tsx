import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

const validationSchema = yup
  .object({
    username: yup
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Пароль должен содержать как минимум одну строчную букву латинского алфавита, одну заглавную букву латинского алфавита и один специальный символ'
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
    formState: { errors }
  } = useForm<SignupData>({ resolver: yupResolver(validationSchema) });
  const onSubmit = (data: SignupData) => console.log(data);

  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-3 flex flex-col items-center gap-10 p-6"
    >
      <Image src="/images/signup.svg" alt="signup" width={64} height={64} />
      <div className="flex w-full flex-col gap-5">
        <Input
          inputAttributes={{
            type: 'text',
            placeholder: 'Ваше имя',
            autoComplete: 'username',
            ...register('username', { required: true })
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
            ...register('passwordConfirm', { required: true })
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
