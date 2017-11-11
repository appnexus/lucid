// Selectors Spec file is only necessary if you use the Component Selectors file.
import selectors from './ExampleComponent.selectors.js';
import assert from 'assert';

const { selector } = selectors;

describe('ExampleComponent selectors', () => {
	describe('Example selector', () => {
		it('should return true', () => {
			const state = {
				number: 2,
			};
			assert.equal(selector(state), true, 'must be a number');
		});
	});
});
