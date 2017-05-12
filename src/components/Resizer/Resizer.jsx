import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';
import elementResizeDetectorMaker from 'element-resize-detector';

const cx = lucidClassNames.bind('&-Resizer');

const { func, string } = PropTypes;

/**
 * {"categories": ["utility"]}
 *
 * This is a helper component used for getting the width and height of a
 * containing element. This component doesn't take normal children. It expects
 * you to pass a single function for children. It will then call that function
 * with new `width` and `height` values if the container size changes.
 */
const Resizer = createClass({
	displayName: 'Resizer',
	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root elements.
		 */
		className: string,
		/**
		 * A function that returns your rendered content with the signature:
		 *
		 * `(width, height) => {}`
		 */
		children: func,
	},

	getInitialState() {
		return {
			width: 0,
			height: 0,
		};
	},

	handleResize({ offsetWidth, offsetHeight }) {
		this.setState({
			width: offsetWidth,
			height: offsetHeight,
		});
	},

	componentDidMount() {
		this.resizeDetector = elementResizeDetectorMaker({ strategy: 'scroll' });
		this.resizeDetector.listenTo(this._element, this.handleResize);
	},

	componentWillUnmount() {
		this.resizeDetector.removeListener(this._element, this.handleResize);
	},

	render() {
		const { className, ...passThroughs } = this.props;

		const { width, height } = this.state;

		return (
			<div
				{...omitProps(passThroughs, Resizer)}
				className={cx('&', className)}
				ref={ref => this._element = ref}
			>
				{this.props.children(width, height)}
			</div>
		);
	},
});

export default Resizer;
