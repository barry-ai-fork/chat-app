import React, { FC, memo, useCallback, useState } from '../../../lib/teact/teact';
import { getActions } from '../../../global';

import { ComponentsScreens } from '../../../types';
import useLang from '../../../hooks/useLang';

import DropdownMenu from '../../ui/DropdownMenu';
import Button from '../../ui/Button';

type OwnProps = {
  currentScreen: ComponentsScreens;
  editedFolderId?: number;
  onReset: () => void;
  onScreenSelect: (screen: ComponentsScreens) => void;
};

const ComponentsHeader: FC<OwnProps> = ({
  currentScreen,
  editedFolderId,
  onReset,
}) => {
  const {
    signOut,
    deleteChatFolder,
  } = getActions();

  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  const [isDeleteFolderDialogOpen, setIsDeleteFolderDialogOpen] = useState(false);

  const closeSignOutConfirmation = useCallback(() => {
    setIsSignOutDialogOpen(false);
  }, []);

  const closeDeleteFolderConfirmation = useCallback(() => {
    setIsDeleteFolderDialogOpen(false);
  }, []);

  const handleSignOutMessage = useCallback(() => {
    closeSignOutConfirmation();
    signOut();
  }, [closeSignOutConfirmation, signOut]);

  const handleDeleteFolderMessage = useCallback(() => {
    closeDeleteFolderConfirmation();
    deleteChatFolder({ id: editedFolderId });
    onReset();
  }, [editedFolderId, closeDeleteFolderConfirmation, deleteChatFolder, onReset]);

  const lang = useLang();

  function renderHeaderContent() {
    switch (currentScreen) {
      case ComponentsScreens.UI:
        return <h3>{lang('UI')}</h3>;
      case ComponentsScreens.Icons:
        return <h3>{lang('Icons')}</h3>;
      case ComponentsScreens.Buttons:
        return <h3>{lang('Buttons')}</h3>;
      case ComponentsScreens.DropdownMenu:
        return <h3>{lang('DropdownMenu')}</h3>;
      case ComponentsScreens.Tab:
        return <h3>{lang('Tab')}</h3>;
      default:
        return (
          <div className="settings-main-header">
            <h3>{lang('Components')}</h3>
          </div>
        );
    }
  }

  return (
    <div className="left-header">
      <Button
        round
        size="smaller"
        color="translucent"
        onClick={onReset}
        ariaLabel={lang('AccDescrGoBack')}
      >
        <i className="icon-arrow-left" />
      </Button>
      {renderHeaderContent()}
    </div>
  );
};

export default memo(ComponentsHeader);
