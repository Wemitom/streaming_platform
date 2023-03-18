import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import SimpleBar from 'simplebar-react';

import micSVG from 'public/images/mic.svg';
import picSVG from 'public/images/pic.svg';
import sendSVG from 'public/images/send.svg';

interface MessageInterface {
  username: string;
  message: string;
}

const Chat = () => {
  const [chatMessages, setChatMessages] = useState<MessageInterface[]>([]);
  const [input, setInput] = useState('');
  const { data: session } = useSession();
  const { t } = useTranslation('chat');
  const wrapperRef = useRef<HTMLDivElement>();

  const sendMessage = () => {
    if (session) {
      setChatMessages([
        ...chatMessages.slice(Math.max(chatMessages.length - 40, 0)),
        { username: session.name, message: input }
      ]);
      setInput('');
    }
  };

  useEffect(() => {
    if (wrapperRef.current)
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
  }, [chatMessages]);

  return (
    <>
      <section className="h-0 grow overflow-hidden md:w-80">
        {chatMessages.length ? (
          <SimpleBar
            className="flex h-full w-full flex-col pl-3 pt-3 pr-6"
            scrollableNodeProps={{ ref: wrapperRef }}
          >
            {chatMessages.map((chatMessage, i) => (
              <p key={i}>
                <span className="text-chat">{chatMessage.username}: </span>
                <span className="break-words">{chatMessage.message}</span>
              </p>
            ))}
          </SimpleBar>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3">
            <Image
              priority
              src="/images/chat_empty.svg"
              alt="chat_empty"
              width={97}
              height={86}
            />
            <p>{t('empty-chat')}</p>
          </div>
        )}
      </section>
      <label
        className="flex h-11 w-full items-center border-t border-white/40 focus-within:border-l focus-within:border-white"
        htmlFor="chat"
      >
        <input
          placeholder={t('chat-placeholder') as string}
          name="chat"
          className="h-11 grow bg-transparent pl-10 outline-none placeholder:text-white/40 md:pl-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={({ key }) => {
            if (key === 'Enter') sendMessage();
          }}
        />
        <div className="h-2/3 border-r border-white/40" />
        <div className="flex gap-3 px-2">
          <button>
            <Image src={micSVG} alt="mic" />
          </button>
          <button>
            <Image src={picSVG} alt="pic" />
          </button>
          <button onClick={sendMessage}>
            <Image src={sendSVG} alt="send" />
          </button>
        </div>
      </label>
    </>
  );
};

export default Chat;
