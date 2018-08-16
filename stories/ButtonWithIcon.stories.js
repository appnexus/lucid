import React from 'react';
import { storiesOf } from '@storybook/react';
import '../src/index.less';
import ButtonWithIcon from '../src/components/ButtonWithIcon/ButtonWithIcon';

storiesOf('ButtonWithIcon', module).add('dev', () => {
	return <ButtonWithIcon />;
});
