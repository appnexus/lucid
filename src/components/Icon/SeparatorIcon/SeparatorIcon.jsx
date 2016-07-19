import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SeparatorIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An Separator icon.
 */
const SeparatorIcon = createClass({
	displayName: 'SeparatorIcon',
	propTypes: Icon.propTypes,

	getDefaultProps() {
		return {
			viewBox: '0 0 4.5 16',
		};
	},

	render() {
		const {
			className,
			...passThroughs,
		} = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, SeparatorIcon)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<polygon
					points='4.5,8 1.5,0 0,0 3,8 0,16 1.5,16 4.5,8'
				/>
			</Icon>
		);
	},
});

export default SeparatorIcon;
