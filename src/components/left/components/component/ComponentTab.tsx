import React, { FC, useState } from '../../../../lib/teact/teact';

import { ComponentsScreens } from '../../../../types';
import useHistoryBack from '../../../../hooks/useHistoryBack';
import TabList from '../../../ui/TabList';

type OwnProps = {
  isActive?: boolean;
  onScreenSelect: (screen: ComponentsScreens) => void;
  onReset: () => void;
};


const ComponentTab: FC<OwnProps> = ({
  isActive,
  onScreenSelect,
  onReset,
}) => {


  useHistoryBack({
    isActive,
    onBack: onReset,
  });
  const [currentTab,setCurrentTab] = useState(1)
  const tabs = [
    { type: 1, title: 'Tab1' },
    { type: 2, title: 'Tab2' },
  ];

  return (
    <div className="settings-content custom-scroll">
      <TabList activeTab={currentTab} tabs={tabs} onSwitchTab={(index)=>{
        setCurrentTab(index)
      }} />

    </div>
  );
};

export default ComponentTab
