import { common, controls } from '../../util/generic-tests';
import TextField from './TextField';

describe('TextField', () => {
	common(TextField);
	controls(TextField, {
		callbackName: 'onChange',
		controlSelector: '.lucid-TextField',
		eventType: 'change',
	});
});

