import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AnalyzeDataIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used to show the user that further data analysis is available.
 */
const AnalyzeDataIcon = createClass({
	displayName: 'AnalyzeDataIcon',
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
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<polygon opacity='0.1' points='2,14 5,14 5,5.515 2,7.7'/>
				<polygon opacity='0.1' points='6,14 9,14 9,7.7 6,5.515'/>
				<path opacity='0.1' d='M12.476,5.12L10,7.709V14h3V5.348C12.812,5.297,12.636,5.222,12.476,5.12z'/>
				<path opacity='0.25' d='M11.801,4.378L9.477,6.81L5.805,4.135L5.5,4.552L5.196,4.134L1.263,7H1v7h1 V7.7l3-2.185V14h1V5.515L9,7.7V14h1V7.709l2.476-2.589C12.189,4.938,11.958,4.682,11.801,4.378z'/>
				<path opacity='0.25' d='M13.5,5.422c-0.174,0-0.34-0.031-0.5-0.074V14h1V5.348 C13.84,5.391,13.674,5.422,13.5,5.422z'/>
				<rect x='1' y='14' width='13' height='1'/>
				<circle cx='1.5' cy='7.5' r='1.5'/>
				<circle cx='5.5' cy='4.5' r='1.5'/>
				<circle cx='9.5' cy='7.5' r='1.5'/>
				<path d='M13.5,1C12.12,1,11,2.119,11,3.5S12.12,6,13.5,6s2.498-1.119,2.498-2.5S14.88,1,13.5,1z M13.5,5C12.673,5,12,4.327,12,3.5 S12.673,2,13.5,2s1.498,0.673,1.498,1.5S14.327,5,13.5,5z'/>
			</Icon>
		);
	},
});

export default AnalyzeDataIcon;
