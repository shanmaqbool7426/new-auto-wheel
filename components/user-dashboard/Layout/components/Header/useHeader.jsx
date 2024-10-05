import React from 'react';
import { usePathname } from 'next/navigation';

export default function useHeader() {
  const pathname = usePathname();
  const [title, setTitle] = React.useState('');
  const [isNotification, setIsNotification] = React.useState(true);

  React.useEffect(() => {
    const titleMap = {
      '/user': 'Dashboard',
      '/user/inventory': 'Inventory',
      '/user/favorite': 'Favorite',
      '/user/social': 'Social',
      '/user/chat': 'Chat',
      '/user/reviews': 'User Reviews',
      '/user/profile-settings': 'Profile Settings',
    };

    setTitle(titleMap[pathname] || 'Dashboard');
  }, [pathname]);

  return {
    isNotification,
    title,
  }
}
