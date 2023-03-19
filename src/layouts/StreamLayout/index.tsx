import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Input from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import Sidebar from '@/components/common/Sidebar';
import Category from '@/components/common/Sidebar/Category';
import Spinner from '@/components/common/Spinner';
import NewChallengeForm from '@/components/stream/NewChallengeForm';
import Menu from '@/components/user/Menu';
import { MD_BP, sidebarIcon, streamSidebar } from '@/utils/constants';
import hamburgerSVG from 'public/images/hamburger.svg';

import 'simplebar-react/dist/simplebar.min.css';

const StreamLayout = ({
  children
}: {
  children:
    | (({
        mode,
        mdBP
      }: {
        mode: 'view' | 'set';
        mdBP: boolean;
      }) => JSX.Element[] | JSX.Element)
    | JSX.Element[]
    | JSX.Element;
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [mdBP, setMdBP] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);
  const [mode, setMode] = useState<'view' | 'set'>('view');
  const [showModal, setShowModal] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { t } = useTranslation('streams');

  const changeLayout = () => setMdBP(innerWidth <= MD_BP);

  useEffect(() => {
    window.addEventListener('resize', changeLayout);
    changeLayout();

    if (typeof window !== 'undefined') {
      setHasWindow(true);
    }

    return () => {
      window.addEventListener('resize', changeLayout);
    };
  }, []);

  const newMode = mode === 'view' ? 'set' : 'view';

  useEffect(() => {
    if (showSidebar) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showSidebar]);

  return (
    <>
      <Header
        showSidebar={() => setShowSidebar((prevState) => !prevState)}
        sidebar
        hidePhone
      />
      <div className="flex grow flex-col items-center justify-center overflow-hidden">
        {hasWindow && status !== 'loading' ? (
          <div className="relative h-full w-full md:flex md:flex-row">
            <button
              className="absolute top-2 left-4 z-30 bg-black/50 p-1 md:hidden"
              onClick={() => setShowSidebar(true)}
            >
              <Image src={hamburgerSVG} alt="hamburger" />
            </button>
            {session && (
              <Menu show={showMenu} hide={() => setShowMenu(false)} />
            )}
            <Sidebar
              show={showSidebar}
              hide={() => setShowSidebar(false)}
              custom={!mdBP}
              title={
                !mdBP
                  ? mode === 'view'
                    ? (t('sidebar.challenges') as string)
                    : (t('sidebar.new-challenge') as string)
                  : undefined
              }
            >
              {mdBP ? (
                streamSidebar.map((c) => (
                  <Category
                    key={c}
                    label={t(c)}
                    id={c}
                    onClick={(c) => {
                      switch (c) {
                        case 'sidebar.back':
                          router.back();
                          break;
                        case 'sidebar.donate':
                          setShowModal(true);
                          break;
                        case 'sidebar.new-challenge':
                          setMode(newMode);
                          break;
                        case 'sidebar.subscribe':
                          /* */
                          break;
                        case 'sidebar.add-money':
                          router.push('/top-up');
                          break;
                      }
                      setShowSidebar(false);
                    }}
                    icon={sidebarIcon && sidebarIcon[c]}
                  />
                ))
              ) : mode === 'view' ? (
                <p className="text-center">{t('empty')}</p>
              ) : (
                <NewChallengeForm />
              )}
            </Sidebar>
            <main className="sidebar:w-10/12 flex h-full w-full flex-row">
              {typeof children === 'function'
                ? children({
                    mode,
                    mdBP
                  })
                : children}
            </main>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
      <Footer
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        listener={(id) => {
          switch (id) {
            case 'donate':
              setShowModal(true);
              break;
            case 'challenges':
              setMode(newMode);
              return newMode;
            case 'Подписаться':
              /* */
              break;
            case 'Пополнить счет':
              /* */
              break;
          }
        }}
        hidePhone
        menu
      />

      {showModal && (
        <Modal show={showModal} hide={() => setShowModal(false)}>
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold">{t('modal.donate')}</h1>
            <div className="flex flex-col gap-4">
              <p className="text-chat">{t('modal.sum')}:</p>
              <label
                className="transition-border flex border-2 border-white/40 px-5 duration-200 focus-within:border-white"
                htmlFor="donate"
              >
                <Input
                  inputAttributes={{
                    className: 'border-none peer',
                    name: 'donate'
                  }}
                />
                <Image
                  src="/images/send.svg"
                  alt="send"
                  width={25}
                  height={25}
                />
              </label>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default StreamLayout;
