import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('CheckIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon"}
 *
 * A check icon.
 */
const CheckIcon = React.createClass({
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
				<path d='M13.41,5.84l-0.25-.26a0.82,0.82,0,0,0-1.16,0h0L7.36,10.22,5.73,8.75a0.82,0.82,0,0,0-1.16,0h0l-0.32.38a0.82,0.82,0,0,0,0,1.16h0L6.7,12.61a0.82,0.82,0,0,0,1.16,0h0L13.41,7a0.82,0.82,0,0,0,0-1.16h0Z' />
			</Icon>
		);
	}
});

export default CheckIcon;
