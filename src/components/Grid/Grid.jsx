import _ from 'lodash';
import classNames from 'classnames';
import React from 'react';

import { bindClassNames } from '../../util/style-helpers';

const boundGridClassNames = bindClassNames('Grid');
const boundCellClassNames = bindClassNames('Cell');

const {
	object,
	string,
	node,
} = React.PropTypes;

function propsToClass (props) {
	const classNameProps = _.reduce(props, (memo, value, key)=>{
			if(_.startsWith(key, 'is-')){
				return memo.concat([key]);
			}
			return memo;
		}, []);

	if(_.isEmpty(classNameProps)){
		return null
	}

	return classNameProps;
}

/**
 * {"categories": ["layout", "grid"]}
 *
 * This component is designed to be used in Composits as a layout tool.
 *
 * You can use the Grid components themselves or create your own components using the Grid styles from Grid.less.
 * Please see examples/CSS-Grid.jsx for more information.
 */
const Grid = React.createClass({
	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Passed through to the root element.
		 */
		style: object,

		/**
		 * Any valid React component
		 */
		 children: node,
	},

	render() {
		const {
			className,
			style,
			children,
			...passThroughs
		} = this.props;

		let scopedClasses = boundGridClassNames('~', propsToClass(this.props));

		return (
			<section className={classNames(className, scopedClasses)}
				style={style}
				{...passThroughs} >
				{children}
			</section>
		);
	}
});

const Cell  = React.createClass({
	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Passed through to the root element.
		 */
		style: object,

		/**
		 * Any valid React component
		 */
		 children: node,
	},

	render() {
		const {
			className,
			style,
			children,
			...passThroughs
		} = this.props;

		let scopedClasses = boundCellClassNames('~', propsToClass(this.props));

		return (
			<article {...passThroughs}
				className={classNames(className, scopedClasses)}
				style={style}>
				{children}
			</article>
		);
	}
});

export {Grid, Cell};
export default Grid;
