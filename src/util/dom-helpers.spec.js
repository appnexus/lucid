import assert from 'assert';
import _ from 'lodash';

import {
	getAbsoluteBoundingClientRect,
	scrollParentTo,
} from './dom-helpers';

describe('#getAbsoluteBoundingClientRect', () => {

	let div;

	it('should throw if not passed a domNode', () => {
		assert.throws(() => {
			getAbsoluteBoundingClientRect(null);
		});
	});

	beforeEach(() => {
		div = document.createElement('div');
		document.body.appendChild(div);
	});

	afterEach(() => {
		div.parentNode.removeChild(div);
	});

	it('should return an object with boundingClientRect properties', () => {
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

describe('#scrollParentTo', () => {
	let parentNode;
	let childNode;

	beforeEach(() => {
		parentNode = document.createElement('div');
		parentNode.style.position = 'relative';
		parentNode.style.overflowY = 'scroll';
		childNode = document.createElement('div');
		parentNode.appendChild(childNode);
		document.body.appendChild(parentNode);
	});

	afterEach(() => {
		document.body.removeChild(parentNode);
	});

	it('should align to top if the top of the node is above the fold', () => {
		parentNode.scrollTop = 5; // parent element is scrolled down by 5px
		scrollParentTo(childNode);
		assert.equal(parentNode.scrollTop, 0); //expect parent to be scrolled to the top
	});

	it('should align using the additionalOffset', () => {
		// just using plain objects here to avoid having to deal with weird dom positioning
		const parent = {scrollTop: 10};
		const child = {parentNode: parent, offsetTop: 15};
		scrollParentTo(child, 10);
		assert.equal(parent.scrollTop, 5);
	});

	it('should align to bottom if the bottom of the node is below the fold', () => {
		parentNode.scrollTop = 0; // parent element is scrolled up to top
		parentNode.style.overflowY = 'scroll';
		parentNode.style.height = '5px';
		childNode.style.height = '18px';
		scrollParentTo(childNode);
		assert.equal(parentNode.scrollTop, 13); //expect parent to be scrolled to align buttom of child with bottom of the parent scrollview
	});

	it('should not scroll if node is within the parent scrollview', () => {
		const secondChild = document.createElement('div');
		secondChild.style.height = '10px';
		parentNode.appendChild(secondChild);

		parentNode.style.height = '10px';
		childNode.style.marginTop = '5px'; // child element is located 5px down from the top
		childNode.style.height = '5px';
		parentNode.scrollTop = 5; // parent element is scrolled down by 5px
		scrollParentTo(childNode);
		assert.equal(parentNode.scrollTop, 5); //expect no change in scrolling of parent
	});
});
