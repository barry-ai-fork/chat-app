import React, { FC, memo, useEffect } from '../../../lib/teact/teact';
import { getActions, withGlobal } from '../../../global';

import { ComponentsScreens } from '../../../types';
import { ApiUser } from '../../../api/types';

import { selectUser } from '../../../global/selectors';
import useLang from '../../../hooks/useLang';
import useHistoryBack from '../../../hooks/useHistoryBack';

import ListItem from '../../ui/ListItem';

type OwnProps = {
  isActive?: boolean;
  onScreenSelect: (screen: ComponentsScreens) => void;
  onReset: () => void;
};

type StateProps = {
  currentUser?: ApiUser;
  lastSyncTime?: number;
};

const ComponentsMain: FC<OwnProps & StateProps> = ({
  isActive,
  onScreenSelect,
  onReset,
  currentUser,
  lastSyncTime,
}) => {
  const { loadProfilePhotos } = getActions();

  const lang = useLang();
  const profileId = currentUser?.id;

  useEffect(() => {
    if (profileId && lastSyncTime) {
      loadProfilePhotos({ profileId });
    }
  }, [lastSyncTime, profileId, loadProfilePhotos]);

  useHistoryBack({
    isActive,
    onBack: onReset,
  });

  return (
    <div className="settings-content custom-scroll">
      <div className="settings-main-menu">
        <ListItem
          icon="italic"
          onClick={() => onScreenSelect(ComponentsScreens.UI)}
        >
          {lang('UI')}
        </ListItem>
        <ListItem
          icon="italic"
          onClick={() => onScreenSelect(ComponentsScreens.Icons)}
        >
          {lang('Icons')}
        </ListItem>
        <ListItem
          icon="italic"
          onClick={() => onScreenSelect(ComponentsScreens.Buttons)}
        >
          {lang('Buttons')}
        </ListItem>
        <ListItem
          icon="italic"
          onClick={() => onScreenSelect(ComponentsScreens.DropdownMenu)}
        >
          {lang('DropdownMenu')}
        </ListItem>
        <ListItem
          icon="italic"
          onClick={() => onScreenSelect(ComponentsScreens.Tab)}
        >
          {lang('Tab')}
        </ListItem>
      </div>
    </div>
  );
};

export default memo(withGlobal<OwnProps>(
  (global): StateProps => {
    const { currentUserId, lastSyncTime } = global;

    return {
      currentUser: currentUserId ? selectUser(global, currentUserId) : undefined,
      lastSyncTime,
    };
  },
)(ComponentsMain));
