import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-HatchPattern');

/**
 * {"categories": ["visual design"]}
 *
 * An SVG pattern with diagonally crossed lines that can be used as the header for messages or dialogs.
 */
const HatchPattern = createClass({
	displayName: 'HatchPattern',

	_isPrivate: true,

	getInitialState() {
		return {
			patternId: _.uniqueId('diagonalHatch'),
		};
	},

	render() {
		const {patternId} = this.state;

		return (
			<svg className={cx('&-container')}>
				<rect
					fill={`url(#${patternId})`}
					height='15px'
					width='100%'
					x='0'
					y='0'
				/>
				<defs>
					<pattern
						className={cx('&-pattern')}
						height='4'
						id={patternId}
						patternUnits='userSpaceOnUse'
						width='4'
					>
						<path d='M-1,1 l2,-2
										M0,4 l4,-4
										M3,5 l2,-2' />
					</pattern>
				</defs>
			</svg>
		);
	},
});

export default HatchPattern;
