import { storiesOf } from '@storybook/react';
import '../src/index.less';
import ProgressBar from '../src/components/ProgressBar/ProgressBar';

storiesOf('ProgressBar', module).add('dev', () => {
	return <ProgressBar />;
});
