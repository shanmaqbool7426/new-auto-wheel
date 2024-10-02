'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Box, NavLink } from '@mantine/core';
import { data } from './data';
import styles from './NavMenu.module.css';
import { usePathname } from 'next/navigation'

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <ul className={styles.list}>
      {data.map((item,index) => (
        <li className={styles.listItem} key={index}>
          <NavLink
            component={Link}
            key={index}
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
