import _ from 'lodash';

type IClientRect = Omit<ClientRect, 'x' | 'y' | 'toJSON'>;

export function getAbsoluteBoundingClientRect(
	domNode: HTMLElement | null
): IClientRect {
	if (!domNode) {
		throw new Error('getAbsoluteBoundingClientRect called without a domNode');
	}

	const elementRect: ClientRect = domNode && domNode.getBoundingClientRect();

	return {
		bottom: elementRect.bottom + window.pageYOffset,
		top: elementRect.top + window.pageYOffset,
		left: elementRect.left + window.pageXOffset,
		right: elementRect.right + window.pageXOffset,
		height: elementRect.height,
		width: elementRect.width,
	};
}

export function scrollParentTo(
	domNode: HTMLElement | null,
	additionalOffset: number = 0
): void {
	if (domNode) {
		const parentElement = domNode.parentElement;

		if (parentElement) {
			if (parentElement.scrollTop > domNode.offsetTop - additionalOffset) {
				// if the top of the node is above the scroll line,
				// align to top
				parentElement.scrollTop = domNode.offsetTop - additionalOffset;
			} else if (
				parentElement.scrollTop + parentElement.clientHeight <
				domNode.offsetTop + domNode.offsetHeight
			) {
				// else if the bottom of the node is below the fold,
				// align to bottom
				parentElement.scrollTop =
					domNode.offsetHeight -
					(parentElement.clientHeight - domNode.offsetTop);
			} // else don't need to align anything
		}
	}
}

export function dispatchDOMEvent(
	node: EventTarget,
	eventName: string,
	assignedEventProps?: any
) {
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
export function sharesAncestor(
	node: Node,
	siblingNode: Node | null,
	nodeName: string
): boolean {
	const currentNodeName = _.get(node, 'nodeName');
	const parentElement = _.get(node, 'parentElement');

	if (currentNodeName === nodeName) {
		return node.contains(siblingNode);
	}

	if (parentElement) {
		return sharesAncestor(parentElement, siblingNode, nodeName);
	}

	return false;
}

export function shiftChildren(parent: HTMLElement, n: number = 1): void {
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
