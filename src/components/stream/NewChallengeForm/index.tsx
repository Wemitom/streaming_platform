import { useForm } from 'react-hook-form';

import Box from '@/components/common/Box';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

interface NewChallengeInterface {
  name: string;
  description: string;
  donationAmt: number;
}

const NewChallengeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<NewChallengeInterface>();

  return (
    <div className="p-4">
      <Box type="full">
        <form className="flex flex-col gap-3">
          <div>
            <p className="text-chat">Имя:</p>
            <Input
              inputAttributes={{
                type: 'text',
                ...register('name', { required: true })
              }}
            />
          </div>
          <div>
            <p className="text-chat">Что должен сделать стример:</p>
            <textarea
              className="rounded-5 transition-border h-32 w-full border-2 border-white/40 bg-transparent py-5 pl-8 text-lg outline-none duration-200 autofill:!text-white focus:border-white sm:text-xl"
              {...register('description', { required: true })}
            />
          </div>
          <div className="mb-10">
            <p className="text-chat">Твой донат:</p>
            <Input
              inputAttributes={{
                type: 'text',
                ...register('donationAmt', { required: true })
              }}
            />
          </div>
          <Button text="Создать челлендж" type="full" submit />
        </form>
      </Box>
    </div>
  );
};

export default NewChallengeForm;
