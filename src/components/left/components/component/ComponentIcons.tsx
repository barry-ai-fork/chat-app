import React, { FC } from '../../../../lib/teact/teact';

import { ComponentsScreens } from '../../../../types';
import useHistoryBack from '../../../../hooks/useHistoryBack';
import IconView from './IconView';

type OwnProps = {
  isActive?: boolean;
  onScreenSelect: (screen: ComponentsScreens) => void;
  onReset: () => void;
};


const ComponentIcons: FC<OwnProps> = ({
  isActive,
  onScreenSelect,
  onReset,
}) => {


  useHistoryBack({
    isActive,
    onBack: onReset,
  });

  return (
    <div className="settings-content custom-scroll">
      <IconView />
    </div>
  );
};

export default ComponentIcons
