import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('CheckIcon');

/**
 *
 * {"categories": ["visual design", "icons"]}
 *
 * A check icon.
 */
const CheckIcon = React.createClass({
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
				<path d='M13.636,4.082l-0.267-0.398c-0.397-0.398-1.062-0.398-1.594,0L6.463,8.996L4.339,7.004c-0.399-0.397-1.063-0.397-1.594,0
					L2.347,7.535c-0.399,0.399-0.399,1.063,0,1.594l3.055,2.922c0,0,0,0,0.132,0.132l0.133,0.134c0.398,0.398,1.062,0.398,1.594,0
					l6.506-6.508C14.033,5.278,14.033,4.614,13.636,4.082'/>
			</Icon>
		);
	}
});

export default CheckIcon;
