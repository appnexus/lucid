import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-InfoIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An info icon.
 */
const InfoIcon = createClass({
	displayName: 'InfoIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs,
		} = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, InfoIcon)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<circle cx='8' cy='8' r='8'/>
				<rect className={cx('&-background')} x='7' y='3' width='2' height='2'/>
				<rect className={cx('&-background')} x='7' y='6' width='2' height='7'/>
			</Icon>
		);
	},
});

export default InfoIcon;
