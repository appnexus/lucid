import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import { getAbsoluteBoundingClientRect } from '../../util/dom-helpers';
import StickySection from '../StickySection/StickySection';

const boundClassNames = lucidClassNames.bind('&-StickyContainer');
const {
	number,
	string,
} = React.PropTypes;

/**
 * {"categories": ["helpers"]}
 *
 * `StickyContainer` renders a sticky <section>.
 */
const StickyContainer = React.createClass(createLucidComponentDefinition({
	displayName: 'StickyContainer',
	propTypes: {
		/**
		 * className
		 */
		className: string,
	},

	childProps: {
		Header: null,
		Footer: null,
	},

	getInitialState() {
		return {
			footerBottom: null
		};
	},

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				footerBottom: getAbsoluteBoundingClientRect(this.refs.footer).bottom
			});
		}, 1);
	},

	render() {
		const {
			children,
			className,
			style,
			...passthrus
		} = this.props;

		const {
			footerBottom
		} = this.state;

		const headerProps = _.first(StickyContainer.Header.findInChildren(children)).props;
		let hasFooter = false;

		return (
			<section
				className={boundClassNames('&', className)}
				style={style}
			>
				<StickySection {...headerProps} footerBottom={footerBottom} />
				{React.Children.map(children, (childElement) => {
					if (childElement.type === StickyContainer.Footer) {
						hasFooter = true;
						return (<span ref='footer' />);
					}
					return childElement;
				})}
				{!hasFooter ? (
					<span ref='footer' />
				) : null}
			</section>
		);
	}
}));

export default StickyContainer;
