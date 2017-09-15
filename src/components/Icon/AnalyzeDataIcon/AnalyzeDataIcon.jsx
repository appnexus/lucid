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
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path
					opacity=".1"
					d="M2 14h3V5.515L2 7.7M6 14h3V7.7L6 5.515M12.476 5.12L10 7.71V14h3V5.348c-.188-.05-.364-.126-.524-.228z"
				/>
				<path
					opacity=".25"
					d="M11.8 4.378L9.478 6.81 5.805 4.135l-.305.417-.304-.418L1.263 7H1v7h1V7.7l3-2.185V14h1V5.515L9 7.7V14h1V7.71l2.476-2.59c-.287-.182-.518-.438-.675-.742zM13.5 5.422c-.174 0-.34-.03-.5-.074V14h1V5.348c-.16.043-.326.074-.5.074z"
				/>
				<path d="M1 14h13v1H1z" />
				<circle cx="1.5" cy="7.5" r="1.5" />
				<circle cx="5.5" cy="4.5" r="1.5" />
				<circle cx="9.5" cy="7.5" r="1.5" />
				<path d="M13.5 1C12.12 1 11 2.12 11 3.5S12.12 6 13.5 6s2.498-1.12 2.498-2.5S14.88 1 13.5 1zm0 4c-.827 0-1.5-.673-1.5-1.5S12.673 2 13.5 2s1.498.673 1.498 1.5S14.328 5 13.5 5z" />
			</Icon>
		);
	},
});

export default AnalyzeDataIcon;
