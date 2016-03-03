import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('CrossIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon"}
 *
 * A cross icon.
 */
const CrossIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				className={classNames(className, boundClassNames('~'))}
			>
				<path d='M8,9.25L5.25,6.48,6.53,5.16l2.8,2.78L12.1,5.16l1.32,1.31L10.63,9.25,13.42,12,12.1,13.34,9.32,10.56,6.53,13.34,5.21,12Z' />
			</Icon>
		);
	}
});

export default CrossIcon;
