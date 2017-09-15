import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AsteriskIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An asterisk icon.
 */
const AsteriskIcon = createClass({
	displayName: 'AsteriskIcon',
	propTypes: {
		...Icon.propTypes,
	},

	getDefaultProps() {
		return {
			viewBox: '0 0 18 18',
			size: 18,
		};
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, AsteriskIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M10 7.268l1.964-1.134c.478-.276 1.09-.112 1.366.366s.112 1.09-.366 1.366L11 9l1.964 1.134c.478.276.642.888.366 1.366-.276.478-.888.642-1.366.366L10 10.732V13c0 .552-.448 1-1 1s-1-.448-1-1v-2.268l-1.964 1.134c-.478.276-1.09.112-1.366-.366s-.112-1.09.366-1.366L7 9 5.036 7.866c-.478-.276-.642-.888-.366-1.366.276-.478.888-.642 1.366-.366L8 7.268V5c0-.552.448-1 1-1s1 .448 1 1v2.268z" />
			</Icon>
		);
	},
});

export default AsteriskIcon;
