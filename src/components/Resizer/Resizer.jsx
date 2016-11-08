import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';
import elementResizeDetectorMaker from 'element-resize-detector';

const cx = lucidClassNames.bind('&-Resizer');
const erd = elementResizeDetectorMaker({ strategy: 'scroll' });

const {
	func,
	string,
} = React.PropTypes;

/**
 * Contains the base functionality of `Resizer` but allows for injection of
 * `listenTo` and `removeListener` function dependencies to improve
 * testability.
 */
export const ResizerBase = createClass({
	propTypes: {
		/**
		 * A function that returns your rendered content with the signature:
		 *
		 * `(width, height) => {}`
		 */
		children: func,

		/**
		 * The function to initialize the resize listener when this component mounts.
		 */
		listenTo: func,

		/**
		 * The function to call when the component unmounts which will remove
		 * the resize listener.
		 */
		removeListener: func,
	},

	getDefaultProps() {
		return {
			listenTo: erd.listenTo,
			removeListener: erd.removeListener,
		};
	},

	getInitialState() {
		return {
			width: 0,
			height: 0,
		};
	},

	componentDidMount() {
		this.props.listenTo(this._element, this.handleResize);
	},

	componentWillUnmount() {
		this.props.removeListener(this._element, this.handleResize);
	},

	handleResize({offsetWidth, offsetHeight}) {
		this.setState({
			width: offsetWidth,
			height: offsetHeight,
		});
	},

	render() {
		const {
			children,
			...passThroughs,
		} = this.props;

		const {
			width,
			height,
		} = this.state;

		return (
			<div
				{...omitProps(passThroughs, ResizerBase)}
				ref={(ref) => this._element = ref}
			>
				{children(width, height)}
			</div>
		);
	},
});

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

	render() {
		const {
			className,
		} = this.props;

		return (
			<ResizerBase
				{...this.props}
				className={cx('&', className)}
			/>
		);
	},
});

export default Resizer;
