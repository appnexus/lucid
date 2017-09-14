import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-RefreshIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A refresh icon.
 */
const RefreshIcon = createClass({
	displayName: 'RefreshIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, RefreshIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M6.504 1.358L9.417 3.7c.082.06.132.15.132.253 0 .1-.05.193-.133.252L6.504 6.55c-.098.07-.225.08-.33.026C6.067 6.522 6 6.416 6 6.3l.1-1.925c-1.62.664-2.847 2.26-2.847 4.007 0 2.402 2.114 4.457 4.737 4.457s4.757-2.056 4.757-4.458c0-1.105-.452-2.41-1.274-3.22-.207-.203-.197-.524.027-.715s.574-.18.783.026c1.013.996 1.57 2.545 1.57 3.908 0 2.963-2.63 5.473-5.863 5.473-3.234 0-5.844-2.51-5.844-5.472 0-2.32 1.705-4.335 3.955-5.058L6 1.61c0-.116.067-.225.176-.276.103-.055.23-.045.328.024z" />
			</Icon>
		);
	},
});

export default RefreshIcon;
