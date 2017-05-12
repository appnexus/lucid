import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EditIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An edit icon.
 */
const EditIcon = createClass({
	displayName: 'EditIcon',
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
				<path d="M4.326,10.162l1.657,1.656L5.84,11.964l-3.09,1.462c-0.111,0.016-0.192-0.064-0.177-0.176l1.463-3.088 l0.145-0.145L4.326,10.162z M13.435,3.239l-0.67-0.67c-0.311-0.312-0.822-0.312-1.134,0.002l-0.732,0.73l1.804,1.8l0.734-0.732 C13.745,4.057,13.745,3.549,13.435,3.239z M5.098,9.1L6.9,10.9L11.803,6L10,4.199L5.098,9.1z" />
			</Icon>
		);
	},
});

export default EditIcon;
