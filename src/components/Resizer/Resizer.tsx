import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps, StandardProps } from '../../util/component-types';
import elementResizeDetectorMaker from 'element-resize-detector';

const cx = lucidClassNames.bind('&-Resizer');

const { func, string } = PropTypes;

interface IResizerProps extends StandardProps, React.HTMLProps<HTMLDivElement> {
	/** A function that returns your rendered content with the signature:
	 * \`(width, height) => {}\`
	 */
	children?: (width: number, height: number) => React.ReactNode;
}

interface IResizerState {
	width: number;
	height: number;
}

class Resizer extends React.Component<IResizerProps, IResizerState, {}> {
	static displayName = 'Resizer';
	static peek = {
		description: `
			This is a helper component used for getting the width and height of a
			containing element. This component doesn't take normal children. It
			expects you to pass a single function for children. It will then call
			that function with new \`width\` and \`height\` values if the container
			size changes.
		`,
		categories: ['utility'],
	};
	static propTypes = {
		className: string`
			Appended to the component-specific class names set on the root elements.
		`,

		children: func`
			A function that returns your rendered content with the signature:
			\`(width, height) => {}\`
		`,
	};

	private _element = React.createRef<HTMLDivElement>();
	private resizeDetector = elementResizeDetectorMaker({ strategy: 'scroll' });

	state = {
		width: 0,
		height: 0,
	};

	handleResize = ({
		offsetWidth,
		offsetHeight,
	}: {
		offsetWidth: number;
		offsetHeight: number;
	}): void => {
		this.setState({
			width: offsetWidth,
			height: offsetHeight,
		});
	};

	componentDidMount(): void {
		if (this._element.current) {
			this.resizeDetector.listenTo(this._element.current, this.handleResize);
		}
	}

	componentWillUnmount(): void {
		if (this._element.current) {
			this.resizeDetector.removeListener(
				this._element.current,
				this.handleResize
			);
		}
	}

	render(): React.ReactNode {
		const { className, children, ...passThroughs } = this.props;

		const { width, height } = this.state;

		return (
			<div
				{...omitProps(passThroughs, undefined, _.keys(Resizer.propTypes))}
				className={cx('&', className)}
				ref={this._element}
			>
				{children && children(width, height)}
			</div>
		);
	}
}

export default Resizer;
