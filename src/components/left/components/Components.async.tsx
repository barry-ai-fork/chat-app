import React, { FC, memo } from '../../../lib/teact/teact';
import { Bundles } from '../../../util/moduleLoader';

import { OwnProps } from './Components';

import useModuleLoader from '../../../hooks/useModuleLoader';
import Loading from '../../ui/Loading';

const ComponentsAsync: FC<OwnProps> = (props) => {
  const Components = useModuleLoader(Bundles.Extra, 'Components');
  // eslint-disable-next-line react/jsx-props-no-spreading
  return Components ? <Components {...props} /> : <Loading />;
};

export default memo(ComponentsAsync);
