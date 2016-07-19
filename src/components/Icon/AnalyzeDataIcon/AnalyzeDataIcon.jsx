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
			...passThroughs,
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path opacity='0.25' d='M14,3.556V14h-1V4.572l-3,3.137V14H9V7.7L6,5.515V14H5V5.515L2,7.7V14H1V7h0.263l3.933-2.866L5.5,4.552 l0.305-0.417L9.477,6.81l3.11-3.254L13,3.951V3.556H14z'/>
				<path opacity='0.1' d='M6,5.515L9,7.7V14H6V5.515z M2,14h3V5.515L2,7.7V14z M10,7.709V14h3V4.572L10,7.709z'/>
				<path
					className={cx('&-background')}
					d='M13.5,2c0.827,0,1.498,0.673,1.498,1.5S14.327,5,13.5,5S12,4.327,12,3.5S12.673,2,13.5,2'
				/>
				<g>
					<rect x='1' y='14' width='13' height='1'/>
					<circle cx='1.5' cy='7.5' r='1.5'/>
					<circle cx='5.5' cy='4.5' r='1.5'/>
					<circle cx='9.5' cy='7.5' r='1.5'/>
					<path d='M13.5,1C12.12,1,11,2.119,11,3.5S12.12,6,13.5,6s2.498-1.119,2.498-2.5S14.88,1,13.5,1z M13.5,5C12.673,5,12,4.327,12,3.5 S12.673,2,13.5,2s1.498,0.673,1.498,1.5S14.327,5,13.5,5z'/>
				</g>
			</Icon>
		);
	},
});

export default AnalyzeDataIcon;
