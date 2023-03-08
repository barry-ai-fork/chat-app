import type { FC } from '../../../lib/teact/teact';
import React, { memo } from '../../../lib/teact/teact';
import useLang from '../../../hooks/useLang';

import './EmptyFolder.scss';
import Button from '../../ui/Button';
import { IS_SINGLE_COLUMN_LAYOUT } from '../../../util/environment';

type OwnProps = {


};

type StateProps = {

};

const ICON_SIZE = 128;

const EmptyRecord: FC<OwnProps & StateProps> = ({

}) => {
  const lang = useLang();

  return (
    <div className="EmptyFolder">
      {/*<div className="sticker">*/}

      {/*</div>*/}
      <h3 className="title" dir="auto">{lang('FilterNoChatsToDisplay')}</h3>
      <p className="description" dir="auto">
        {lang('Chat.EmptyChat')}
      </p>
      <Button
        ripple={!IS_SINGLE_COLUMN_LAYOUT}
        fluid
        pill
        onClick={()=>{}}
        size="smaller"
        isRtl={lang.isRtl}
      >
        <i className="icon-settings" />
        {lang('ChatList.EmptyChatListEditFilter')}
      </Button>
    </div>
  );
};

export default memo(EmptyRecord);
