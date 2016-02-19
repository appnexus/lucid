import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('SearchIcon');

/**
 *
 * {"categories": ["visual design", "icons"]}
 *
 * A search icon.
 */
const SearchIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		let {
			className,
			...passThroughs
		} = this.props;

		let scopedClasses = boundClassNames('~');

		return (
			<Icon
				className={classNames(className, scopedClasses)}
				{...passThroughs}
			>
					<path d="M10.663,2.267c-2.256-2.256-6.015-2.256-8.396,0c-2.255,2.255-2.255,6.015,0,8.396c2.006,2.005,4.888,2.254,7.27,0.876 l3.508,3.51c0.501,0.502,1.504,0.502,2.005,0c0.502-0.502,0.502-1.505,0-2.004L11.54,9.534C12.918,7.154,12.669,4.146,10.663,2.267 L10.663,2.267z M9.159,9.033c-1.378,1.378-3.76,1.378-5.138,0c-1.378-1.378-1.378-3.759,0-5.138s3.759-1.378,5.138,0 C10.538,5.274,10.538,7.53,9.159,9.033L9.159,9.033z"/>
			</Icon>
		);
	}
});

export default SearchIcon;
