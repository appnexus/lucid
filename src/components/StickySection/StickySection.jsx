import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import { getAbsoluteBoundingClientRect } from '../../util/dom-helpers';

const boundClassNames = lucidClassNames.bind('&-StickySection');
const {
	number,
	string,
} = React.PropTypes;

/**
 * {"categories": ["helpers"]}
 *
 * `StickySection` renders a sticky <section>.
 */
const StickySection = React.createClass(createLucidComponentDefinition({
	displayName: 'StickySection',
	propTypes: {
		/**
		 * className
		 */
		className: string,
		scrollLeft: number,
	},

	getDefaultProps() {
		return {
			triggerAlign: _.noop
		};
	},

	getInitialState() {
		return {
			isAboveFold: false,
			containerRect: {},
		};
	},

	handleScroll(event) {
		const {
			isAboveFold,
			containerRect
		} = this.state;

		const nextContainerRect = this.getContainerRect();

		if (window.scrollY >= nextContainerRect.top) {
			if (!isAboveFold) {
				this.setState({
					isAboveFold: true
				});
			}
		} else {
			if (isAboveFold) {
				this.setState({
					isAboveFold: false
				});
			}
		}

		if (
			containerRect.bottom !== nextContainerRect.bottom
			|| containerRect.height !== nextContainerRect.height
			|| containerRect.left !== nextContainerRect.left
			|| containerRect.right !== nextContainerRect.right
			|| containerRect.top !== nextContainerRect.top
			|| containerRect.width !== nextContainerRect.width
		) {
			this.setState({
				containerRect: nextContainerRect
			});
		}
	},

	getContainerRect() {
		const containerRect = getAbsoluteBoundingClientRect(this.refs.scrollContainer);
		const stickyRect = this.refs.stickySection.getBoundingClientRect();
		
		return {
			bottom: containerRect.top + stickyRect.height,
			height: stickyRect.height,
			left: containerRect.left,
			right: containerRect.left + stickyRect.width,
			top: containerRect.top,
			scrollWidth: this.refs.stickySection.scrollWidth,
			width: containerRect.width,
		};
	},

	componentDidMount() {
		const {
			triggerAlign
		} = this.props;

		setTimeout(() => {
			this.setState({
				containerRect: this.getContainerRect()
			});
			this.handleScroll();
		}, 1);
		triggerAlign(this.handleScroll);
		window.addEventListener('scroll', this.handleScroll);
	},

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	},

	render() {
		const {
			children,
			className,
			style,
			scrollLeft,
			contentWidth,
			...passthrus
		} = this.props;

		const {
			isAboveFold,
			containerRect,
		} = this.state;

		return (
			<div
				{...passthrus}
				className={boundClassNames('&', '&-container', className)}
				style={{
					...(isAboveFold ? {
						height: containerRect.height,
					} : {}),
					...style
				}}
				ref='scrollContainer'
			>
				<div
					className={boundClassNames('&-sticky-frame')}
					style={{
						...(isAboveFold ? {
							position: 'fixed',
							top: 0,
							width: containerRect.width + (_.isNumber(scrollLeft) ? scrollLeft : 0),
							height: containerRect.height,
						} : {}),
						...style
					}}
				>
					<div
						className={boundClassNames('&-sticky-section')}
						ref='stickySection'
						style={{
							...(isAboveFold ? {
								position: 'fixed',
								top: 0,
								left: containerRect.left - (_.isNumber(scrollLeft) ? scrollLeft : 0),
								width: containerRect.scrollWidth + (_.isNumber(scrollLeft) ? scrollLeft : 0),
								height: containerRect.height,
							} : {
								position: 'relative',
								left: -(_.isNumber(scrollLeft) ? scrollLeft : 0),
							}),
							...style,
							...(contentWidth ? {
								width: contentWidth + (_.isNumber(scrollLeft) ? scrollLeft : 0),
							} : {}),
						}}
					>
						{children}
					</div>
				</div>
			</div>
		);
	}
}));

export default StickySection;
