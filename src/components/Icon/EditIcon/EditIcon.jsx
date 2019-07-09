import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EditIcon');

const EditIcon = createClass({
	displayName: 'EditIcon',

	statics: {
		peek: {
			description: `
				An edit icon.
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
				{...omitProps(passThroughs, EditIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M4.541 14.522L.548 15.547l.974-4.006L12.452.472l3.019 2.981zm5.924-12.038l3.019 2.981M2.5 10.5l3 3' />
			</Icon>
		);
	},
});

export default EditIcon;
