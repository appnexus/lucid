import _ from 'lodash';

// Mock RAF
// looks like this will be unnecessary starting with jest@21.3.0
// https://github.com/facebook/jest/issues/4545#issuecomment-338217594
global.requestAnimationFrame = function(callback) {
	setTimeout(callback, 0);
};

//mock random so tests/snapshots are deterministic
_.random = jest.fn(() => 1);
