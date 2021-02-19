import reducers from './TextField.reducers';

const { onChange } = reducers;

describe('TextField reducers', () => {
	describe('onChange', () => {
		it('should correctly update state', () => {
			const state: any = { foo: 'bar' };
			const expected = { foo: 'bar', value: 'myValue' };
			expect(onChange(state, 'myValue')).toEqual(expected);
		});
	});
});
