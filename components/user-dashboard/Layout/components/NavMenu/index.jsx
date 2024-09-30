'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Box, NavLink } from '@mantine/core';
import { data } from './data';
import styles from './NavMenu.module.css';
import { useRouter, usePathname } from 'next/navigation'

export default function NavMenu() {
  const pathname = usePathname();
  console.log('Router is ready:', pathname);


  return (
    <ul className={styles.list}>
      {data.map((item) => (
        <li className={styles.listItem}>
          <NavLink
            component={Link}
            key={item.label}
            href={item.href}
            label={item.label}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            active={pathname === item.href}
            variant='filled'
            color='#EB2321'
            classNames={{
              root: styles.root,
              icon: styles.icon,
              label: styles.label,
            }}
          />
        </li>
      ))}

    </ul>
  )
}
