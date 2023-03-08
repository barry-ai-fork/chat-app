import type { FC } from '../../../lib/teact/teact';
import React, {
  memo, useCallback, useEffect, useMemo, useRef,
} from '../../../lib/teact/teact';
import { getActions, getGlobal, withGlobal } from '../../../global';

import type { ApiChatFolder } from '../../../api/types';
import type { SettingsScreens } from '../../../types';
import type { FolderEditDispatch } from '../../../hooks/reducers/useFoldersReducer';

import { ALL_FOLDER_ID } from '../../../config';
import { IS_TOUCH_ENV } from '../../../util/environment';
import { captureEvents, SwipeDirection } from '../../../util/captureEvents';
import buildClassName from '../../../util/buildClassName';
import captureEscKeyListener from '../../../util/captureEscKeyListener';
import useShowTransition from '../../../hooks/useShowTransition';
import useLang from '../../../hooks/useLang';
import useHistoryBack from '../../../hooks/useHistoryBack';

import Transition from '../../ui/Transition';
import TabList from '../../ui/TabList';
import ChatList from './ChatList';
import { useFolderManagerForUnreadCounters } from '../../../hooks/useFolderManager';
import { selectCurrentLimit } from '../../../global/selectors/limits';
import EmptyFolder from './EmptyFolder';
import EmptyRecord from './EmptyRecord';
import Loading from '../../ui/Loading';
import ListItem from '../../ui/ListItem';
import { ComponentsScreens } from '../../../types';
import { MainViewTypeEnums } from '../../../global/types';

type OwnProps = {
  onScreenSelect: (screen: SettingsScreens) => void;
  foldersDispatch: FolderEditDispatch;
};

type StateProps = {
  chatFoldersById: Record<number, ApiChatFolder>;
  orderedFolderIds?: number[];
  activeChatFolder: number;
  currentUserId?: string;
  lastSyncTime?: number;
  shouldSkipHistoryAnimations?: boolean;
  maxFolders: number;
};

const SAVED_MESSAGES_HOTKEY = '0';

const TabWalletView: FC<OwnProps & StateProps> = ({
  foldersDispatch,
  onScreenSelect,
  chatFoldersById,
  orderedFolderIds,
  activeChatFolder,
  currentUserId,
  lastSyncTime,
  shouldSkipHistoryAnimations,
  maxFolders,
}) => {
  const {
    loadChatFolders,
    setActiveChatFolder,
    openMainView,
  } = getActions();

  // eslint-disable-next-line no-null/no-null
  const transitionRef = useRef<HTMLDivElement>(null);

  const lang = useLang();

  useEffect(() => {
    if (lastSyncTime) {
      loadChatFolders();
    }
  }, [lastSyncTime, loadChatFolders]);

  const defaultFolder = useMemo(() => {
    return {
      id: ALL_FOLDER_ID,
      title: orderedFolderIds?.[0] === ALL_FOLDER_ID ? lang('FilterAllChatsShort') : lang('FilterAllChats'),
    };
  }, [orderedFolderIds, lang]);

  const displayedFolders = useMemo(() => {
    return orderedFolderIds
      ? orderedFolderIds.map((id) => {
        if (id === ALL_FOLDER_ID) {
          return defaultFolder;
        }
        return chatFoldersById[id] || {};
      }).filter(Boolean)
      : undefined;
  }, [chatFoldersById, defaultFolder, orderedFolderIds]);

  const allFolderIndex = displayedFolders?.findIndex((folder) => folder.id === 0);
  const isInAllFolder = allFolderIndex === activeChatFolder;

  const folderCountersById = useFolderManagerForUnreadCounters();
  const folderTabs = useMemo(() => {
    if (!displayedFolders || !displayedFolders.length) {
      return undefined;
    }

    return displayedFolders.map(({ id, title }, i) => {
      const isBlocked = id !== ALL_FOLDER_ID && i > maxFolders - 1;

      return ({
        id,
        title,
        badgeCount: folderCountersById[id]?.chatsCount,
        isBadgeActive: Boolean(folderCountersById[id]?.notificationsCount),
        isBlocked,
      });
    });
  }, [displayedFolders, folderCountersById, maxFolders]);

  const handleSwitchTab = useCallback((index: number) => {
    setActiveChatFolder(index, { forceOnHeavyAnimation: true });
  }, [setActiveChatFolder]);

  // Prevent `activeTab` pointing at non-existing folder after update
  useEffect(() => {
    if (!folderTabs || !folderTabs.length) {
      return;
    }

    if (activeChatFolder >= folderTabs.length) {
      setActiveChatFolder(allFolderIndex);
    }
  }, [activeChatFolder, allFolderIndex, folderTabs, setActiveChatFolder]);

  useEffect(() => {
    if (!transitionRef.current || !IS_TOUCH_ENV || !folderTabs || !folderTabs.length) {
      return undefined;
    }

    return captureEvents(transitionRef.current, {
      selectorToPreventScroll: '.chat-list',
      onSwipe: ((e, direction) => {
        if (direction === SwipeDirection.Left) {
          setActiveChatFolder(Math.min(activeChatFolder + 1, folderTabs.length - 1), { forceOnHeavyAnimation: true });
          return true;
        } else if (direction === SwipeDirection.Right) {
          setActiveChatFolder(Math.max(0, activeChatFolder - 1), { forceOnHeavyAnimation: true });
          return true;
        }

        return false;
      }),
    });
  }, [activeChatFolder, folderTabs, setActiveChatFolder]);

  const isNotInAllTabRef = useRef();
  isNotInAllTabRef.current = !isInAllFolder;
  useEffect(() => (isNotInAllTabRef.current ? captureEscKeyListener(() => {
    if (isNotInAllTabRef.current) {
      setActiveChatFolder(allFolderIndex);
    }
  }) : undefined), [activeChatFolder, allFolderIndex, setActiveChatFolder]);

  useHistoryBack({
    isActive: !isInAllFolder,
    onBack: () => setActiveChatFolder(allFolderIndex, { forceOnHeavyAnimation: true }),
  });

  const {
    shouldRender: shouldRenderPlaceholder, transitionClassNames,
  } = useShowTransition(!orderedFolderIds, undefined, true);


  const shouldRenderFolders = folderTabs && folderTabs.length > 1;

  return (
    <div className="ChatFolders">
      <Transition
        ref={transitionRef}
        name={shouldSkipHistoryAnimations ? 'none' : lang.isRtl ? 'slide-optimized-rtl' : 'slide-optimized'}
        activeKey={activeChatFolder}
        renderCount={shouldRenderFolders ? folderTabs.length : undefined}
      >
        <div className={"p-2"}>
          <ListItem
            icon="italic"
            onClick={() => {
              openMainView({mainViewType:MainViewTypeEnums.componentsUi})
            }}
          >
            {lang('UI')}
          </ListItem>
        </div>
      </Transition>
    </div>
  );
};

export default memo(withGlobal<OwnProps>(
  (global): StateProps => {
    const {
      chatFolders: {
        byId: chatFoldersById,
        orderedIds: orderedFolderIds,
        activeChatFolder,
      },
      currentUserId,
      lastSyncTime,
      shouldSkipHistoryAnimations,
    } = global;

    const maxFolders = selectCurrentLimit(global, 'dialogFilters');

    return {
      chatFoldersById,
      orderedFolderIds,
      activeChatFolder,
      currentUserId,
      lastSyncTime,
      shouldSkipHistoryAnimations,
      maxFolders,
    };
  },
)(TabWalletView));
