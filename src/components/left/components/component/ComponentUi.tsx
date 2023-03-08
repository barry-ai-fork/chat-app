import React, { FC, useCallback, useState } from '../../../../lib/teact/teact';

import { ComponentsScreens } from '../../../../types';
import useHistoryBack from '../../../../hooks/useHistoryBack';
import Button from '../../../ui/Button';
import useLang from '../../../../hooks/useLang';
import Loading from '../../../ui/Loading';
import ConfirmDialog from '../../../ui/ConfirmDialog';
import Avatar from '../../../common/Avatar';
import ChatItem from '../../main/ChatItem';
import { CHAT_HEIGHT_PX } from '../../../../config';
import { ChatAnimationTypes } from '../../main/hooks';

type OwnProps = {
  isActive?: boolean;
  onScreenSelect: (screen: ComponentsScreens) => void;
  onReset: () => void;
};


const ComponentUi: FC<OwnProps> = ({
  isActive,
  onScreenSelect,
  onReset,
}) => {


  useHistoryBack({
    isActive,
    onBack: onReset,
  });
  const lang = useLang();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeConfirmation = useCallback(() => {
    setIsDialogOpen(false);
  }, []);


  return (
    <div className="settings-content custom-scroll">
      <div className="settings-item pt-3">
        <h4 className="settings-item-header" >{lang('Loading')}</h4>
        <div className={"flex-row"}>
          <Loading key="loading" />
        </div>
      </div>
      <div className="settings-item pt-3">
        <h4 className="settings-item-header" >{lang('ConfirmDialog')}</h4>
        <div className={"flex-row"}>
          <ConfirmDialog
            isOpen={isDialogOpen}
            onClose={closeConfirmation}
            text={lang('texttexttexttexttext')}
            confirmLabel={lang('Delete')}
            confirmHandler={()=>{}}
            confirmIsDestructive
          />
          <Button
            ripple={true}
            color="primary"
            ariaLabel={""}
            onClick={()=>setIsDialogOpen(true)}
          >
            Open
          </Button>
        </div>
      </div>
      <div className="settings-item pt-3">
        <h4 className="settings-item-header" >{lang('Avatar')}</h4>
        <div className={"flex-row"}>
          <Avatar
            text={"李四"}
          />
          <Avatar
            size={"medium"}
            className={"ml-2"}
            text={"张三"}
          />
        </div>
      </div>
      <div className="settings-item pt-3">
        <h4 className="settings-item-header" >{lang('ChatItem')}</h4>
        <div className={"flex-row position_relative"}>
          <ChatItem
            orderDiff={0}
            animationType={ChatAnimationTypes.Move}
            teactOrderKey={0}
            chatId={'102'}
            style={`top: ${(0) * CHAT_HEIGHT_PX}px;`}
          />
          <ChatItem
            orderDiff={1}
            animationType={ChatAnimationTypes.Move}
            teactOrderKey={1}
            chatId={'-101'}
            style={`top: ${(1) * CHAT_HEIGHT_PX}px;`}
          />
        </div>
      </div>
    </div>
  );
};

export default ComponentUi;
