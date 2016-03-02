import classNames from 'classnames';
import React from 'react';

import { bindClassNames } from '../../util/style-helpers';

const boundClassNames = bindClassNames('ColorPalette');

const {
	string
} = React.PropTypes;

/**
 * {"categories": ["visual design", "color palette"]}
 *
 * A color palette to show all the color variables outline in the `variables.less`
 * file.
 */

const ColorPalette = React.createClass({

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,
		/**
		 * the name of the variable
		 */
		variableName: string
	},

	render() {

		const {
			className,
			variableName,
			...passThroughs
		} = this.props;

		return(
			<div
				className={classNames(boundClassNames('~'))}
			>
				<div className={className}></div>
				<p>{variableName}</p>
			</div>);
	}
});

export default ColorPalette;
