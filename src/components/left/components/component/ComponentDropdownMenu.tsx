import React, { FC, useMemo } from '../../../../lib/teact/teact';

import { ComponentsScreens } from '../../../../types';
import useHistoryBack from '../../../../hooks/useHistoryBack';
import Button from '../../../ui/Button';
import useLang from '../../../../hooks/useLang';
import { IS_SINGLE_COLUMN_LAYOUT } from '../../../../util/environment';
import MenuItem from '../../../ui/MenuItem';
import DropdownMenu from '../../../ui/DropdownMenu';

type OwnProps = {
  isActive?: boolean;
  onScreenSelect: (screen: ComponentsScreens) => void;
  onReset: () => void;
};


const ComponentDropdownMenu: FC<OwnProps> = ({
  isActive,
  onScreenSelect,
  onReset,
}) => {


  useHistoryBack({
    isActive,
    onBack: onReset,
  });
  const lang = useLang();

  const SettingsMenuButton: FC<{ onTrigger: () => void; isOpen?: boolean }> = useMemo(() => {
    return ({ onTrigger, isOpen }) => (
      <Button
        ripple={!IS_SINGLE_COLUMN_LAYOUT}
        size="smaller"
        color="translucent"
        className={isOpen ? 'active' : ''}
        onClick={onTrigger}
        ariaLabel="More actions"
      >
        <i className="icon-more" />
      </Button>
    );
  }, []);

  return (
    <div className="settings-content custom-scroll">
      <div className="settings-item pt-3">
        <DropdownMenu
          className="settings-more-menu"
          trigger={SettingsMenuButton}
          positionX="left"
        >
          <MenuItem icon="logout" onClick={()=>{}}>{lang('LogOutTitle')}</MenuItem>
        </DropdownMenu>
      </div>

    </div>
  );
};

export default ComponentDropdownMenu;
