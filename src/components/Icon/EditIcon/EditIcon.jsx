import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('EditIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon"}
 *
 * An edit icon.
 */
const EditIcon = React.createClass({
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
				<path d='M14.613,3.427L12.577,1.39c-0.156-0.156-0.412-0.156-0.568,0L2.77,10.627c-0.041,0.039-0.07,0.084-0.089,0.135L1.3,14.178 c-0.059,0.148-0.024,0.316,0.089,0.43c0.077,0.082,0.178,0.119,0.283,0.119c0.051,0,0.105-0.01,0.151-0.027l2.169-0.879 l1.244-0.498c0.049-0.023,0.094-0.051,0.132-0.09l9.242-9.239c0.075-0.074,0.118-0.179,0.118-0.285 C14.729,3.602,14.688,3.501,14.613,3.427z M4.864,12.605L3.53,13.145l-0.674-0.672l0.542-1.332l8.896-8.898l0.677,0.675L4.5,11.381 c-0.076,0.078-0.076,0.205,0,0.283c0.041,0.043,0.09,0.061,0.143,0.061c0.052,0,0.104-0.018,0.143-0.061l8.465-8.463l0.507,0.507 L4.864,12.605z'/>
			</Icon>
		);
	}
});

export default EditIcon;
