import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AddURLIcon');

const AddURLIcon = createClass({
	displayName: 'AddURLIcon',

	statics: {
		peek: {
			description: `
				Add URL
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

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
				<path d='M11.567 16a.647.647 0 0 1-.589-.375l-.927-1.99-1.561 1.181a.648.648 0 1 1-1.043-.518L7.45 4.83a.649.649 0 0 1 1.068-.497l7.249 6.089a.65.65 0 0 1-.273 1.131l-1.908.435.927 1.99a.65.65 0 0 1-.314.864l-2.356 1.098a.683.683 0 0 1-.276.06zm-1.266-4.019a.649.649 0 0 1 .589.375l.992 2.13 1.179-.549-.992-2.13a.652.652 0 0 1 .444-.909l1.418-.323-5.181-4.35-.001 6.765 1.159-.878a.652.652 0 0 1 .393-.131z' />
				<path d='M1.3 11.7V1.3H16V0H0v13h6v-1.3z' />
			</Icon>
		);
	},
});

export default AddURLIcon;
