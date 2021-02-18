import { common } from '../../util/generic-tests';
import Typography from './Typography';

describe('Typography', () => {
	common(Typography, {
		getDefaultProps: () => ({
			variant: 'p',
		}),
	});
});
