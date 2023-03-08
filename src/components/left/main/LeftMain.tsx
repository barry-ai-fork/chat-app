import type { FC } from '../../../lib/teact/teact';
import React, {
  memo, useCallback, useEffect, useRef, useState,
} from '../../../lib/teact/teact';

import type { SettingsScreens } from '../../../types';
import { LeftColumnContent } from '../../../types';
import type { FolderEditDispatch } from '../../../hooks/reducers/useFoldersReducer';

import { IS_TOUCH_ENV } from '../../../util/environment';
import buildClassName from '../../../util/buildClassName';
import useFlag from '../../../hooks/useFlag';
import useShowTransition from '../../../hooks/useShowTransition';
import useLang from '../../../hooks/useLang';

import Transition from '../../ui/Transition';
import LeftMainHeader from './LeftMainHeader';
import ChatFolders from './ChatFolders';
import LeftSearch from '../search/LeftSearch.async';
import ContactList from './ContactList.async';
import NewChatButton from '../NewChatButton';
import Button from '../../ui/Button';

import './LeftMain.scss';
import TabList from '../../ui/TabList';
import TabBarList from '../../ui/TabBarList';
import TabWalletView from './TabWalletView';

type OwnProps = {
  content: LeftColumnContent;
  searchQuery?: string;
  searchDate?: number;
  contactsFilter: string;
  shouldSkipTransition?: boolean;
  foldersDispatch: FolderEditDispatch;
  onSearchQuery: (query: string) => void;
  onContentChange: (content: LeftColumnContent) => void;
  onScreenSelect: (screen: SettingsScreens) => void;
  onReset: () => void;
};

const TRANSITION_RENDER_COUNT = Object.keys(LeftColumnContent).length / 2;
const BUTTON_CLOSE_DELAY_MS = 250;
const APP_OUTDATED_TIMEOUT = 3 * 24 * 60 * 60 * 1000; // 3 days

let closeTimeout: number | undefined;

const LeftMain: FC<OwnProps> = ({
  content,
  searchQuery,
  searchDate,
  contactsFilter,
  shouldSkipTransition,
  foldersDispatch,
  onSearchQuery,
  onContentChange,
  onScreenSelect,
  onReset,
}) => {
  const [isNewChatButtonShown, setIsNewChatButtonShown] = useState(IS_TOUCH_ENV);

  const isMouseInside = useRef(false);

  const handleSelectSettings = useCallback(() => {
    onContentChange(LeftColumnContent.Settings);
  }, [onContentChange]);

  const handleSelectComponents = useCallback(() => {
    onContentChange(LeftColumnContent.Components);
  }, [onContentChange]);

  const handleSelectContacts = useCallback(() => {
    onContentChange(LeftColumnContent.Contacts);
  }, [onContentChange]);

  const handleSelectNewChannel = useCallback(() => {
    onContentChange(LeftColumnContent.NewChannelStep1);
  }, [onContentChange]);

  const handleSelectNewGroup = useCallback(() => {
    onContentChange(LeftColumnContent.NewGroupStep1);
  }, [onContentChange]);

  const handleSelectArchived = useCallback(() => {
    onContentChange(LeftColumnContent.Archived);
  }, [onContentChange]);

  const handleMouseEnter = useCallback(() => {
    if (content !== LeftColumnContent.ChatList) {
      return;
    }
    isMouseInside.current = true;
    setIsNewChatButtonShown(true);
  }, [content]);

  const handleMouseLeave = useCallback(() => {
    isMouseInside.current = false;

    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = undefined;
    }

    closeTimeout = window.setTimeout(() => {
      if (!isMouseInside.current) {
        setIsNewChatButtonShown(false);
      }
    }, BUTTON_CLOSE_DELAY_MS);
  }, []);


  const [shouldRenderUpdateButton, updateButtonClassNames, handleUpdateClick] = useAppOutdatedCheck();

  const lang = useLang();

  const tabs = [
    { type: LeftColumnContent.ChatList,icon:"fa-message fas"},
    { type: LeftColumnContent.Wallet, icon:"fa-wallet fas"},
    { type: LeftColumnContent.Chart, icon:"fa-chart-column fas"},
    { type: LeftColumnContent.Discover, icon:"fas fa-location-arrow"},
  ];

  let defaultCurrentTab = 0;
  for (let i = 0; i < tabs.length; i++) {
    if(tabs[i].type === content){
      defaultCurrentTab = i
      break
    }
  }
  const [currentTab,setCurrentTab] = useState(defaultCurrentTab)

  useEffect(() => {
    if(currentTab !== defaultCurrentTab){
      setCurrentTab(defaultCurrentTab)
    }
    let autoCloseTimeout: number | undefined;
    if (content !== LeftColumnContent.ChatList) {
      autoCloseTimeout = window.setTimeout(() => {
        setIsNewChatButtonShown(false);
      }, BUTTON_CLOSE_DELAY_MS);
    } else if (isMouseInside.current || IS_TOUCH_ENV) {
      setIsNewChatButtonShown(true);
    }

    return () => {
      if (autoCloseTimeout) {
        clearTimeout(autoCloseTimeout);
        autoCloseTimeout = undefined;
      }
    };
  }, [content,setCurrentTab,currentTab,defaultCurrentTab]);
  return (
    <div
      id="LeftColumn-main"
      onMouseEnter={!IS_TOUCH_ENV ? handleMouseEnter : undefined}
      onMouseLeave={!IS_TOUCH_ENV ? handleMouseLeave : undefined}
    >
      <LeftMainHeader
        content={content}
        contactsFilter={contactsFilter}
        onSearchQuery={onSearchQuery}
        onSelectSettings={handleSelectSettings}
        onSelectComponents={handleSelectComponents}
        onSelectContacts={handleSelectContacts}
        onSelectArchived={handleSelectArchived}
        onReset={onReset}
        shouldSkipTransition={shouldSkipTransition}
      />
      <Transition
        name={shouldSkipTransition ? 'none' : 'zoom-fade'}
        renderCount={TRANSITION_RENDER_COUNT}
        activeKey={content}
        shouldCleanup
        cleanupExceptionKey={LeftColumnContent.ChatList}
      >
        {(isActive) => {
          switch (content) {
            case LeftColumnContent.ChatList:
              return <ChatFolders onScreenSelect={onScreenSelect} foldersDispatch={foldersDispatch} />;
            case LeftColumnContent.Chart:
              return <TabWalletView onScreenSelect={onScreenSelect} foldersDispatch={foldersDispatch} />;
            case LeftColumnContent.Wallet:
              return <TabWalletView onScreenSelect={onScreenSelect} foldersDispatch={foldersDispatch} />;
            case LeftColumnContent.Discover:
              return <TabWalletView onScreenSelect={onScreenSelect} foldersDispatch={foldersDispatch} />;
            case LeftColumnContent.GlobalSearch:
              return (
                <LeftSearch
                  searchQuery={searchQuery}
                  searchDate={searchDate}
                  isActive={isActive}
                  onReset={onReset}
                />
              );
            case LeftColumnContent.Contacts:
              return <ContactList filter={contactsFilter} isActive={isActive} onReset={onReset} />;
            default:
              return undefined;
          }
        }}
      </Transition>
      {shouldRenderUpdateButton && (
        <Button
          fluid
          pill
          className={buildClassName('btn-update', updateButtonClassNames)}
          onClick={handleUpdateClick}
        >
          {lang('lng_update_telegram')}
        </Button>
      )}


      <TabBarList activeTab={currentTab} tabs={tabs} onSwitchTab={(index)=>{
        setCurrentTab(index)
        onContentChange(tabs[index].type);
      }} />

      {/*<NewChatButton*/}
      {/*  isShown={isNewChatButtonShown}*/}
      {/*  onNewPrivateChat={handleSelectContacts}*/}
      {/*  onNewChannel={handleSelectNewChannel}*/}
      {/*  onNewGroup={handleSelectNewGroup}*/}
      {/*/>*/}

    </div>
  );
};

function useAppOutdatedCheck() {
  const [isAppOutdated, markIsAppOutdated] = useFlag(false);

  useEffect(() => {
    const timeout = window.setTimeout(markIsAppOutdated, APP_OUTDATED_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
  }, [markIsAppOutdated]);

  const { shouldRender, transitionClassNames } = useShowTransition(isAppOutdated);

  const handleUpdateClick = () => {
    window.location.reload();
  };

  return [shouldRender, transitionClassNames, handleUpdateClick] as const;
}

export default memo(LeftMain);
