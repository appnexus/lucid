// // Mock RAF
// // looks like this will be unnecessary starting with jest@21.3.0
// // https://github.com/facebook/jest/issues/4545#issuecomment-338217594
// global.requestAnimationFrame = function(callback) {
// 	setTimeout(callback, 0);
// };

jest.mock('lodash', () => {
	const _ = jest.requireActual('lodash');
	_.random = jest.fn(() => 1);
	return _;
});
