import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass as createReactClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-QuestionMarkCircleIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Description.
 */
const QuestionMarkCircleIcon = createReactClass({
	displayName: 'QuestionMarkCircleIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon {...passThroughs} className={cx('&', className)}>
				<path d="M8.5,1C4.358,1,1,4.358,1,8.5C1,12.643,4.358,16,8.5,16c4.143,0,7.5-3.357,7.5-7.5C16,4.358,12.643,1,8.5,1z M9.057,12.887 c-0.211,0.201-0.498,0.296-0.823,0.295c-0.002,0-0.005,0-0.007,0c-0.309,0-0.587-0.098-0.792-0.295 c-0.209-0.197-0.313-0.475-0.311-0.782c-0.003-0.308,0.102-0.583,0.314-0.778c0.206-0.194,0.485-0.288,0.795-0.287 c0.325-0.001,0.61,0.09,0.82,0.287c0.211,0.195,0.316,0.471,0.313,0.778C9.37,12.412,9.265,12.689,9.057,12.887z M10.939,7.159 c-0.11,0.272-0.249,0.508-0.416,0.706c-0.162,0.191-0.34,0.358-0.535,0.505C9.812,8.501,9.65,8.642,9.509,8.79 C9.184,9.129,9.014,9.518,9.014,9.988v0.195c-0.548,0-1.096,0-1.643,0l-0.018-0.177C7.339,9.869,7.332,9.738,7.332,9.609 c0-0.576,0.209-1.101,0.554-1.556c0.353-0.465,0.86-0.809,1.181-1.293C9.312,6.39,9.183,5.77,8.701,5.676 C8.096,5.56,7.431,5.798,6.937,6.142L6.754,6.269L6,4.819C5.955,4.732,6.88,4.334,6.972,4.297c1.16-0.472,3.152-0.522,3.854,0.755 c0.164,0.298,0.283,0.726,0.281,1.067C11.107,6.525,11.056,6.872,10.939,7.159z" />
			</Icon>
		);
	},
});

export default QuestionMarkCircleIcon;
