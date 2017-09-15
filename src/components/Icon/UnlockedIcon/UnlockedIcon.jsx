import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-UnlockedIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Unlock it.
 */
const UnlockedIcon = createClass({
	displayName: 'UnlockedIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M11 7H5.702V5.5c0-.99.807-1.798 1.798-1.798.816 0 1.5.55 1.72 1.298h1.73c-.245-1.694-1.687-3-3.45-3C5.566 2 4 3.566 4 5.5v1.55c-.566.12-1 .598-1 1.2v4.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V8.2c0-.602-.434-1.08-1-1.2z" />
			</Icon>
		);
	},
});

export default UnlockedIcon;
