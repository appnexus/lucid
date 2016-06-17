import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const { oneOf } = React.PropTypes;
const cx = lucidClassNames.bind('&-LoadingIcon');
const durations = {
	fast: '0.75s',
	normal: '1.25s',
	slow: '4s',
};

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A loading icon.
 */
const LoadingIcon = createClass({
	displayName: 'LoadingIcon',
	propTypes: {
		...Icon.propTypes,
		/**
		 * The speed of rotation of the spinner. Defaults to 'normal'
		 */
		speed: oneOf(['fast', 'normal', 'slow']),
	},
	getDefaultProps() {
		return {
			...Icon.getDefaultProps(),
			speed: 'normal',
		};
	},
	render() {
		const {
			className,
			speed,
			...passThroughs,
		} = this.props;

		const animationDuration = `${durations[speed] || durations.normal}`;

		return (
			<Icon
				{...passThroughs}
				viewBox='0 0 100 100'
				className={cx('&', className)}
			>
				<rect
					x='0'
					y='0'
					width='100'
					height='100'
					fill='none'
				/>
				<circle
					cx='50'
					cy='50'
					r='40'
					stroke='#e3e3e3'
					fill='none'
					strokeWidth='12'
					strokeLinecap='round'
				/>
				<circle
					style={{ animationDuration }}
					className={cx('&-spinner')}
					cx='50'
					cy='50'
					r='40'
					stroke='#2abbb0'
					fill='none'
					strokeWidth='12'
					strokeLinecap='round'
				/>
			</Icon>
		);
	},
});

export default LoadingIcon;
