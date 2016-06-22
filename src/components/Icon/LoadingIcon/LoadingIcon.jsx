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
			style,
			...passThroughs,
		} = this.props;

		const animationDuration = `${durations[speed] || durations.normal}`;

		return (
			<Icon
				{...passThroughs}
				viewBox='0 0 100 100'
				className={cx('&', className)}
				style={{ animationDuration, ...style }}
			>
				<rect
					x='0'
					y='0'
					width='100'
					height='100'
					fill='none'
				/>
				<circle
					className={cx('&-circle')}
					cx='50'
					cy='50'
					r='40'
				/>
				<circle
					style={{ animationDuration }}
					className={cx('&-spinner')}
					cx='50'
					cy='50'
					r='40'
				/>

			</Icon>
		);
	},
});

export default LoadingIcon;
