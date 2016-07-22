import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EditPageIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A page edit icon.
 */
const EditPageIcon = createClass({
	displayName: 'EditPageIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs,
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M6.036,10.162l0.145-0.145l0.146,0.145l1.657,1.656L7.84,11.964l-3.09,1.462c-0.111,0.016-0.192-0.064-0.177-0.176 L6.036,10.162z M7.098,9.1L8.9,10.9L13.803,6L12,4.199L7.098,9.1z M15.436,3.239l-0.67-0.67c-0.312-0.312-0.822-0.312-1.135,0.002 l-0.732,0.73l1.805,1.8l0.734-0.732C15.745,4.057,15.745,3.549,15.436,3.239z M11,14.75c0,0.139-0.111,0.25-0.25,0.25H8H1.25 C1.112,15,1,14.889,1,14.75V1.25C1,1.112,1.112,1,1.25,1h9.5C10.889,1,11,1.112,11,1.25V2h1V1.25C12,0.56,11.439,0,10.75,0h-9.5 C0.56,0,0,0.56,0,1.25v13.5C0,15.439,0.56,16,1.25,16H8h2.75c0.689,0,1.25-0.561,1.25-1.25V11h-1V14.75z'/>
			</Icon>
		);
	},
});

export default EditPageIcon;
