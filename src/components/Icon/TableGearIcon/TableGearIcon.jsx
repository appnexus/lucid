import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-TableGearIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A table configuration Icon.
 */

const TableGearIcon = createClass({
	displayName: 'TableGearIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, TableGearIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<g opacity="0.25">
					<rect x="3" y="4" width="1" height="8" />
					<rect x="6" y="4" width="1" height="8" />
					<rect x="9" y="4" width="1" height="5.5" />
					<rect x="12" y="4" width="1" height="3.847" />
				</g>

				<path d="M15.79 9.298l-1.19-.22c-.115-.02-.156-.116-.09-.214l.684-1.013c.064-.097.053-.245-.03-.328l-.656-.654c-.083-.085-.23-.1-.33-.03l-1.014.682c-.098.065-.193.025-.216-.09l-.22-1.192c-.02-.114-.138-.21-.252-.21h-.926c-.116 0-.23.096-.252.21l-.22 1.19c-.02.117-.118.157-.215.092l-1.01-.683c-.1-.067-.248-.054-.332.03l-.654.655c-.083.083-.095.232-.03.33l.682 1.013c.066.098.027.192-.088.215l-1.193.218c-.116.022-.21.138-.21.252v.93c0 .115.094.23.21.25l1.19.223c.117.02.157.116.09.214l-.683 1.013c-.062.098-.052.243.03.326l.657.656c.083.083.23.097.33.03l1.01-.684c.1-.065.194-.026.218.093l.22 1.19c.02.115.136.21.252.21h.93c.113 0 .23-.095.25-.21l.22-1.19c.022-.118.12-.157.217-.092l1.012.685c.1.063.245.052.328-.03l.656-.656c.083-.084.097-.23.03-.327l-.684-1.015c-.066-.097-.027-.192.09-.214l1.19-.22c.116-.02.21-.137.21-.252V9.55c0-.114-.094-.23-.21-.252zm-3.776 2.516c-.992 0-1.8-.806-1.8-1.8 0-.99.808-1.797 1.8-1.797s1.8.806 1.8 1.798c-.002.996-.808 1.8-1.8 1.8z" />
				<path d="M8 12H1.25c-.138 0-.25-.11-.25-.25v-7.5c0-.138.112-.25.25-.25h12.5c.14 0 .25.112.25.25V6h1V3.25C15 2.56 14.44 2 13.75 2H1.25C.56 2 0 2.56 0 3.25v8.5C0 12.44.56 13 1.25 13H8v-1z" />
			</Icon>
		);
	},
});

export default TableGearIcon;
