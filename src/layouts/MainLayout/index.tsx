import { useEffect, useState } from 'react';

import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import SimpleBar from 'simplebar-react';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Category from '@/components/common/Sidebar/Category';
import Menu from '@/components/user/Menu';
import { classNames } from '@/utils/functions';

import 'simplebar-react/dist/simplebar.min.css';

interface PropsWithSidebar<T extends string> {
  curCategory: T;
  categories: readonly T[];
  setCategory: (val: T) => void;
  icons?: Record<T, string>;
}
interface CommonProps {
  children: JSX.Element[] | JSX.Element;
  autoHideScroll?: boolean;
  scrollbarWrapper?: boolean;
  centerContent?: boolean;
}
interface RequireSidebar<T extends string>
  extends PropsWithSidebar<T>,
    CommonProps {
  sidebar: true;
}
interface NoSidebar<T extends string>
  extends Partial<PropsWithSidebar<T>>,
    CommonProps {
  sidebar?: false;
}

type PropsType<T extends string> = RequireSidebar<T> | NoSidebar<T>;

/**
 * Отображает основной лэйаут с хедером, футером и сайдбаром
 */
const MainLayout = <T extends string>({
  children,
  sidebar,
  /**
   * Нужно ли рендерить сайдбар
   */
  autoHideScroll,
  /**
   * Прятать ли скроллбар тогда, когда пользователь не двигает мышку
   */
  scrollbarWrapper,
  /**
   * Нужен ли враппер со скроллбаром
   */
  centerContent,
  /**
   * Нужно ли расположить контент по центру
   */
  curCategory,
  /**
   * Текущая категория для сайдбара (Не нужно если !sidebar)
   */
  categories,
  /**
   * Все категории для сайдбара (Не нужно если !sidebar)
   */
  setCategory,
  /**
   * Функция для установки текущей категории (Не нужно если !sidebar)
   */
  icons
}: /**
 * Иконки для категорий (Не нужно если !sidebar)
 */
PropsType<T>) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { data: session } = useSession();
  const { t } = useTranslation('main');

  /**
   * Скрываем оверфлоу при открытии сайдбара
   */
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
        sidebar={sidebar}
      />
      <div className="flex grow flex-col overflow-hidden">
        <div className="relative h-full w-full md:flex md:flex-row">
          {session && <Menu show={showMenu} hide={() => setShowMenu(false)} />}
          {sidebar && (
            <Sidebar show={showSidebar} hide={() => setShowSidebar(false)}>
              {categories.map((c) => (
                <Category
                  key={c}
                  chosen={c === curCategory}
                  label={t('categories.' + c)}
                  id={c}
                  onClick={(c) => {
                    setCategory(c);
                    setShowSidebar(false);
                  }}
                  icon={icons && icons[c]}
                />
              ))}
            </Sidebar>
          )}
          <main
            className={classNames(
              'flex w-full flex-row h-full',
              sidebar ? 'sidebar:w-10/12 ' : ''
            )}
          >
            {scrollbarWrapper ? (
              <SimpleBar
                className={classNames(
                  'scrollbar max-h-full w-0 grow',
                  centerContent ? 'm-auto' : ''
                )}
                autoHide={autoHideScroll}
              >
                {children}
              </SimpleBar>
            ) : (
              children
            )}
          </main>
        </div>
      </div>
      <Footer showMenu={showMenu} setShowMenu={setShowMenu} menu />
    </>
  );
};

export default MainLayout;
