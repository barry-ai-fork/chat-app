import React, { FC, memo, useCallback } from '../../../lib/teact/teact';

import { ComponentsScreens } from '../../../types';
import { FolderEditDispatch, FoldersState } from '../../../hooks/reducers/useFoldersReducer';

import { LAYERS_ANIMATION_NAME } from '../../../util/environment';

import Transition from '../../ui/Transition';
import ComponentsHeader from './ComponentsHeader';
import ComponentsMain from './ComponentsMain';
import ComponentIcons from './component/ComponentIcons';
import ComponentButtons from './component/ComponentButtons';
import ComponentDropdownMenu from './component/ComponentDropdownMenu';
import ComponentTab from './component/ComponentTab';
import ComponentUi from './component/ComponentUi';

import './Components.scss';

const TRANSITION_RENDER_COUNT = Object.keys(ComponentsScreens).length / 2;

export type OwnProps = {
  isActive: boolean;
  currentScreen: ComponentsScreens;
  foldersState: FoldersState;
  foldersDispatch: FolderEditDispatch;
  onScreenSelect: (screen: ComponentsScreens) => void;
  shouldSkipTransition?: boolean;
  onReset: () => void;
};

const Components: FC<OwnProps> = ({
  isActive,
  currentScreen,
  foldersState,
  foldersDispatch,
  onScreenSelect,
  onReset,
  shouldSkipTransition,
}) => {

  const handleReset = useCallback(() => {

    if ([
      ComponentsScreens.Icons,
      ComponentsScreens.Buttons,
      ComponentsScreens.DropdownMenu,
      ComponentsScreens.Tab,
      ComponentsScreens.UI
    ].includes(currentScreen)) {
      onScreenSelect(ComponentsScreens.Main);
      return;
    }
    onReset();
  }, [
    foldersState.mode, foldersDispatch,
    currentScreen, onReset, onScreenSelect,
  ]);

  function renderCurrentSectionContent(isScreenActive: boolean, screen: ComponentsScreens) {

    switch (currentScreen) {
      case ComponentsScreens.Main:
        return (
          <ComponentsMain onScreenSelect={onScreenSelect} isActive={isActive} onReset={handleReset} />
        );

      case ComponentsScreens.UI:
        return (
          <ComponentUi
            onScreenSelect={onScreenSelect}
            isActive={isScreenActive}
            onReset={handleReset}
          />
        );

      case ComponentsScreens.Icons:
        return (
          <ComponentIcons
            onScreenSelect={onScreenSelect}
            isActive={isScreenActive}
            onReset={handleReset}
          />
        );

      case ComponentsScreens.Buttons:
        return (
          <ComponentButtons
            onScreenSelect={onScreenSelect}
            isActive={isScreenActive}
            onReset={handleReset}
          />
        );

      case ComponentsScreens.DropdownMenu:
        return (
          <ComponentDropdownMenu
            onScreenSelect={onScreenSelect}
            isActive={isScreenActive}
            onReset={handleReset}
          />
        );
      case ComponentsScreens.Tab:
        return (
          <ComponentTab
            onScreenSelect={onScreenSelect}
            isActive={isScreenActive}
            onReset={handleReset}
          />
        );
      default:
        return undefined;
    }
  }

  function renderCurrentSection(isScreenActive: boolean, isFrom: boolean, currentKey: ComponentsScreens) {
    return (
      <>
        <ComponentsHeader
          currentScreen={currentScreen}
          onReset={handleReset}
          onScreenSelect={onScreenSelect}
          editedFolderId={foldersState.folderId}
        />
        {renderCurrentSectionContent(isScreenActive, currentKey)}
      </>
    );
  }

  return (
    <Transition
      id="Settings"
      name={shouldSkipTransition ? 'none' : LAYERS_ANIMATION_NAME}
      activeKey={currentScreen}
      renderCount={TRANSITION_RENDER_COUNT}
    >
      {renderCurrentSection}
    </Transition>
  );
};

export default memo(Components);
