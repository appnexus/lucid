import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../../util/style-helpers';
import Icon from '../Icon';

const boundClassNames = bindClassNames('CaretIcon');

const {
	oneOf,
} = React.PropTypes;

/**
 *
 * {"categories": ["icons", "caret"]}
 *
 * A Caret Icon.
 */
const CaretIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
		/**
		 * direction variations of the icon
		 */
		direction: oneOf([
			'up',
			'down',
			'left',
			'right',
		]),
	},

	getDefaultProps() {
		return {
			direction: 'down'
		};
	},

	render() {
		let {
			className,
			badge,
			direction,
			...passThroughs
		} = this.props;

		let scopedClasses = boundClassNames('~', {
			'is-down': direction === 'down',
			'is-up': direction === 'up',
			'is-left': direction === 'left',
			'is-right': direction === 'right',
			'has-badge': badge,
		});

		return (
			<Icon className={classNames(className, scopedClasses)}
				{...passThroughs}>
				<path d="M1.234,4.408l6.718,7.184l6.813-7.184H1.234z" />
			</Icon>
		);
	}
});

export default CaretIcon;
