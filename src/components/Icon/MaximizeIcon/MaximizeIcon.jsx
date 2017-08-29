import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import {
	createClass as createReactClass,
	omitProps,
} from '../../../util/component-types';

const cx = lucidClassNames.bind('&-MaximizeIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A maximize icon.
 */
const MaximizeIcon = createReactClass({
	displayName: 'MaximizeIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, MaximizeIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M4,12h4v1.996c0,0-4.17,0.002-4.172,0c-0.814,0.057-1.314-0.465-1.314-0.465s-0.584-0.482-0.507-1.295 c-0.002-0.002,0-4.233,0-4.233L4,8V12z M13.996,3.828c0.057-0.814-0.465-1.314-0.465-1.314s-0.482-0.584-1.295-0.507 c-0.002-0.002-4.233,0-4.233,0L8,4h4v4h1.996C13.996,8,13.998,3.83,13.996,3.828z" />
			</Icon>
		);
	},
});

export default MaximizeIcon;
