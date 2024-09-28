import React from 'react';

export default function useSocial() {
  const [activeTab, setActiveTab] = React.useState('followers');

  const handleChangeTab = (tab) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    handleChangeTab,
  };
}
