export function getAbsoluteBoundingClientRect(domNode) {
	let elementRect = domNode.getBoundingClientRect();

	return {
		bottom: elementRect.bottom + window.pageYOffset,
		top: elementRect.top + window.pageYOffset,
		left: elementRect.left + window.pageXOffset,
		right: elementRect.right + window.pageXOffset,
		height: elementRect.height,
		width: elementRect.width
	};
}


export function scrollParentTo(domNode) {
	if (domNode) {
		let parentNode = domNode.parentNode;
		if (parentNode.scrollTop > domNode.offsetTop) {
			// if the top of the node is above the scroll line,
			// align to top
			parentNode.scrollTop = domNode.offsetTop;
		} else if ( parentNode.scrollTop + parentNode.clientHeight < domNode.offsetTop + domNode.offsetHeight) {
			// else if the bottom of the node is below the fold,
			// align to bottom
			parentNode.scrollTop = domNode.offsetHeight - (parentNode.clientHeight - domNode.offsetTop);
		} // else don't need to align anything
	}
}
