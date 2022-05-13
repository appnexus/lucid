import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';
import elementResizeDetectorMaker from 'element-resize-detector';

const cx = lucidClassNames.bind('&-Resizer');

const { func, string } = PropTypes;

export interface IResizerProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** A function that returns your rendered content. */
	children?: (width: number, height: number) => React.ReactNode;
}

interface IResizerState {
	width: number;
	height: number;
}

class Resizer extends React.Component<IResizerProps, IResizerState, {}> {
	static displayName = 'Resizer';
	static peek = {
		description: `A helper component used for getting the width and height of a containing element. This component doesn't take normal children. It expects you to pass a single function for children. It will then call that function with new \`width\` and \`height\` values if the container size changes.`,
		categories: ['utility'],
	};
	static propTypes = {
		/**
			Appended to the component-specific class names set on the root elements.
		*/
		className: string,

		/**
			A function that returns your rendered content with the signature:
			\`(width, height) => {}\`
		*/
		children: func,
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
				{...omit(
					passThroughs,
					['className', 'children'].concat(['initialState', 'callbackId'])
				)}
				className={cx('&', className)}
				ref={this._element}
			>
				{children && children(width, height)}
			</div>
		);
	}
}

export default Resizer;
