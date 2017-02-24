import { common, controls } from '../../util/generic-tests';
import Tag from './Tag';

describe('Tag', () => {
	common(Tag);

	controls(Tag, {
		callbackName: 'onRemove',
		controlSelector: '.lucid-Tag-remove-button',
		eventType: 'click',
		additionalProps: { isRemovable: true },
	});
});
