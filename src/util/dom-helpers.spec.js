import assert from 'assert';
import _ from 'lodash';
import describeWithDOM from './describe-with-dom';

import {
	getAbsoluteBoundingClientRect,
	scrollParentTo,
} from './dom-helpers';

describeWithDOM('#getAbsoluteBoundingClientRect', () => {
	it('should throw if not passed a domNode', () => {
		assert.throws(() => {
			getAbsoluteBoundingClientRect(null);
		});
	});

	it('should return an object with boundingClientRect properties', () => {
		const div = document.createElement('div');
		const result = getAbsoluteBoundingClientRect(div);
		assert(_.isObject(result));
		assert(_.has(result, 'bottom'));
		assert(_.has(result, 'top'));
		assert(_.has(result, 'left'));
		assert(_.has(result, 'right'));
		assert(_.has(result, 'height'));
		assert(_.has(result, 'width'));
	});
});

describeWithDOM('#scrollParentTo', () => {
	let parentNode;
	let childNode;

	beforeEach(() => {
		parentNode = document.createElement('div');
		childNode = document.createElement('div');
		childNode.appendChild(document.createTextNode('foo'));
		parentNode.appendChild(childNode);
		document.body.appendChild(parentNode);
	});

	afterEach(() => {
		document.body.removeChild(parentNode);
	});

	it('should align to top if the top of the node is above the fold', () => {
		parentNode.scrollTop = 5; // parent element is scrolled down by 5px
		childNode.offsetTop = 0; // child element is located at the top of parent
		scrollParentTo(childNode);
		assert.equal(parentNode.scrollTop, 0); //expect parent to be scrolled to the top
	});

	it('should align to bottom if the bottom of the node is below the fold', () => {
		parentNode.scrollTop = 0; // parent element is scrolled up to top
		parentNode.clientHeight = 5; // parent element has height of 5px
		childNode.offsetTop = 10; // child element is located 10px down from the top
		childNode.offsetHeight = 8; // child element is has height of 8px
		scrollParentTo(childNode);
		assert.equal(parentNode.scrollTop, 13); //expect parent to be scrolled to align buttom of child with bottom of the parent scrollview
	});

	it('should not scroll if node is within the parent scrollview', () => {
		parentNode.scrollTop = 5; // parent element is scrolled down by 5px
		parentNode.clientHeight = 10; // parent element has height of 10px
		childNode.offsetTop = 10; // child element is located 10px down from the top
		childNode.offsetHeight = 5; // child element is has height of 5px
		scrollParentTo(childNode);
		assert.equal(parentNode.scrollTop, 5); //expect no change in scrolling of parent
	});

});
