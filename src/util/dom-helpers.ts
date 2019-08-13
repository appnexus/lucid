import _ from 'lodash';

export function getAbsoluteBoundingClientRect(domNode: HTMLElement): ClientRect {
	const elementRect: ClientRect = domNode.getBoundingClientRect();

	return {
		bottom: elementRect.bottom + window.pageYOffset,
		top: elementRect.top + window.pageYOffset,
		left: elementRect.left + window.pageXOffset,
		right: elementRect.right + window.pageXOffset,
		height: elementRect.height,
		width: elementRect.width,
	};
}

export function scrollParentTo(domNode: HTMLElement, additionalOffset: number = 0): void {
		const parentNode = domNode.parentElement;

		if (parentNode !== null) {
			if (parentNode.scrollTop > domNode.offsetTop - additionalOffset) {
				// if the top of the node is above the scroll line,
				// align to top
				parentNode.scrollTop = domNode.offsetTop - additionalOffset;
			} else if (
				parentNode.scrollTop + parentNode.clientHeight <
				domNode.offsetTop + domNode.offsetHeight
			) {
				// else if the bottom of the node is below the fold,
				// align to bottom
				parentNode.scrollTop =
					domNode.offsetHeight - (parentNode.clientHeight - domNode.offsetTop);
			} // else don't need to align anything
		}
}

export function dispatchDOMEvent(node: EventTarget, eventName: string, assignedEventProps: any) {
	const event = document.createEvent('Event');
	event.initEvent(eventName, true, true);
	node.dispatchEvent(_.assign(event, assignedEventProps));
	return event;
}

/**
 * sharesAncestor
 *
 * Recursively looks at `node` and its parents for `nodeName` and makes
 * sure it contains `siblingNode`.
 *
 * @param {Node} node - dom node to check if any of its ancestors are a `<label>`
 * @param {Node} siblingNode - dom node to see if it shares an ancestor
 * @param {string} nodeName - dom node name, should be uppercased, e.g. `LABEL` or `SPAN`
 * @returns {boolean}
 */
export function sharesAncestor(node: Node, siblingNode: Node, nodeName: string): boolean {
	const currentNodeName = _.get(node, 'nodeName');
	const parentNode = _.get(node, 'parentNode');

	if (currentNodeName === nodeName) {
		return node.contains(siblingNode);
	}

	if (parentNode) {
		return sharesAncestor(parentNode, siblingNode, nodeName);
	}

	return false;
}

export function shiftChildren(parent: HTMLElement, n: number = 1) {
	if (n < 0) {
		_.times(Math.abs(n), () => {
			parent.appendChild(parent.children[0]);
		});
	} else if (n > 0) {
		_.times(n, () => {
			parent.insertBefore(
				parent.children[parent.children.length - 1],
				parent.children[0]
			);
		});
	}
}
