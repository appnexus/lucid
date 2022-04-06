import { icons, common } from '../../util/generic-tests';

import Icon from './Icon';

describe('Icon', () => {
	common(Icon);
	icons(Icon, { includeInitialState: true });
});
