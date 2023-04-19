import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './styles.module.css';

type NavLinkProps = {
  path?: string;
  label: string;
  icon: string;
  onClick?: () => void;
};

const NavLink = ({ path, label, icon, onClick }: NavLinkProps) => {
  const router = useRouter();

  return (
    <li>
      {path ? (
        <Link href={path}>
          <a
            className={`
              ${router.asPath === path ? styles.activeButton : ''} ${
          styles.navButton
        }
            `}
          >
            <Image height={17} src={icon} width={20} />
            <p>{label}</p>
          </a>
        </Link>
      ) : (
        <a className={styles.navButton} onClick={onClick}>
          <Image height={17} src={icon} width={20} />
          <p>{label}</p>
        </a>
      )}
    </li>
  );
};

export default NavLink;
