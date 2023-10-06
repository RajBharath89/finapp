import { useState } from 'react';
import { Group, Code, Image } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconDashboard,
  IconHome,
  IconMoneybag,
  IconArrowsDownUp,
  IconArrowsDiagonal,
  IconZoomMoney,
  IconReportMoney,
} from '@tabler/icons-react';
import MantineLogo from '../../public/logo-white.svg';
import classes from './Dashboard.module.css';
import Link from 'next/link';

const data = [
  { link: './dashboard', label: 'Dashboard', icon: IconDashboard },
  { link: './residents', label: 'Residents', icon: IconHome },
  { link: './transactions', label: 'Transactions', icon: IconReportMoney },
  { link: './payments', label: 'Payments', icon: IconMoneybag },
//   { link: '', label: 'Databases', icon: IconDatabaseImport },
//   { link: '', label: 'Authentication', icon: Icon2fa },
//   { link: '', label: 'Other Settings', icon: IconSettings },
];

export function Navigation() {
//   const [active, setActive] = useState('Dashboard');

//   const links = data.map((item) => (
//     <Link
//       className={classes.link}
//       data-active={item.label === active || undefined}
//       href={item.link}
//       key={item.label}
//       onClick={(event) => {
//         event.preventDefault();
//         setActive(item.label);
//       }}
//     >
//       <item.icon className={classes.linkIcon} stroke={1.5} />
//       <span>{item.label}</span>
//     </Link>

    
//   ));

  return (
   <> 
   <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
        <Image
      radius="md"
      src="/logo-white.svg"
    />
        </Group>
        {/* {links} */}
        {data.map((item) => (
            <Link 
            className={classes.link} 
            key={item.label} 
            // data-active={item.label === active || undefined} 
            href={item.link}
            // onClick={(event) => {
            //     event.preventDefault();
            //     setActive(item.label);
            //   }}
            >
                <item.icon className={classes.linkIcon} stroke={1.5} /> 
                {item.label}
            </Link>
      
      ))}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
    </>
  );
}
export default Navigation;