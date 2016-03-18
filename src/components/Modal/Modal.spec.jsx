import { common } from '../../util/generic-tests';

import Modal from './Modal';

describe('Modal', () => {
	common(Modal, {
		selector: '.lucid-Modal',
		getDefaultProps: () => {
			return { isClosed: false };
		},
	});

	// TODO moar tests!
});
