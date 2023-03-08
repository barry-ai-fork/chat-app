import React, { FC } from '../../../../lib/teact/teact';

import { ComponentsScreens } from '../../../../types';
import useHistoryBack from '../../../../hooks/useHistoryBack';
import Button from '../../../ui/Button';
import useLang from '../../../../hooks/useLang';

type OwnProps = {
  isActive?: boolean;
  onScreenSelect: (screen: ComponentsScreens) => void;
  onReset: () => void;
};


const ComponentButtons: FC<OwnProps> = ({
  isActive,
  onScreenSelect,
  onReset,
}) => {


  useHistoryBack({
    isActive,
    onBack: onReset,
  });
  const lang = useLang();

  return (
    <div className="settings-content custom-scroll">
      <div className="settings-item pt-3">
        <h4 className="settings-item-header" >{lang('Icon Button')}</h4>
        <div className={"flex-row"}>
          <Button
            className={"mr-2"}
            round
            ripple={true}
            size="tiny"
            color="primary"
            ariaLabel={""}
          >
            <i className="icon-edit" />
          </Button>

          <Button
            round
            className={"mr-2"}
            ripple={true}
            size="smaller"
            color="translucent"
            ariaLabel={""}
          >
            <i className="icon-edit" />
          </Button>
          <Button
            round
            ripple={false}
            size="default"
            // color="translucent"
            ariaLabel={""}
          >
            <i className="icon-edit" />
          </Button>
        </div>
      </div>
      <div className="settings-item pt-3">
      <h4 className="settings-item-header" >{lang('Button')}</h4>
        <div className={"flex-row"}>
          <Button
            ripple={true}
            size="tiny"
            color="primary"
            ariaLabel={""}
          >
            <i className="icon-edit" />
          </Button>
        </div>

      </div>
      <div className="settings-item pt-3">

        <h4 className="settings-item-header" >{lang('Loading')}</h4>
          <div className={"flex-row"}>
            <Button
              isLoading
              ripple={true}
              color="primary"
              ariaLabel={""}
            >
              <i className="icon-edit" />
            </Button>
          </div>
        </div>


    </div>
  );
};

export default ComponentButtons;
