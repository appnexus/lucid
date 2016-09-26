import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EqualsIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An equals icon.
 */
const EqualsIcon = createClass({
	displayName: 'EqualsIcon',
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
				{...omitProps(passThroughs, EqualsIcon)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path fill-rule='evenodd' clip-rule='evenodd' d='M3,5v2h10V5H3z M3,11h10V9H3V11z'/>
			</Icon>
		);
	},
});

export default EqualsIcon;
