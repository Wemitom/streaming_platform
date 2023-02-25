import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="sticky bottom-0 z-50 w-full h-14 bg-secondary">
      <Link href={'info'}>Info</Link>
    </footer>
  );
};

export default Footer;
