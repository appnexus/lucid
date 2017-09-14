import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-QuestionMarkCircleIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Description.
 */
const QuestionMarkCircleIcon = createClass({
	displayName: 'QuestionMarkCircleIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon {...passThroughs} className={cx('&', className)}>
				<path d="M8.5 1C4.358 1 1 4.358 1 8.5 1 12.643 4.358 16 8.5 16c4.143 0 7.5-3.357 7.5-7.5C16 4.358 12.643 1 8.5 1zm.557 11.887c-.21.2-.498.296-.823.295h-.007c-.31 0-.587-.098-.792-.295-.21-.197-.313-.475-.31-.782-.004-.308.1-.583.313-.778.206-.194.485-.288.795-.287.325 0 .61.09.82.287.21.195.316.47.313.778.004.307-.1.584-.31.782zM10.94 7.16c-.11.27-.25.507-.417.705-.162.19-.34.358-.535.505-.176.13-.338.272-.48.42-.324.34-.494.728-.494 1.198v.195H7.37l-.017-.177c-.014-.137-.02-.268-.02-.397 0-.577.208-1.102.553-1.557.353-.465.86-.81 1.18-1.293.246-.37.117-.99-.365-1.084-.604-.116-1.27.122-1.763.466l-.183.127L6 4.82c-.045-.088.88-.486.972-.523 1.16-.472 3.152-.522 3.854.755.164.298.283.726.28 1.067 0 .405-.05.752-.167 1.04z" />
			</Icon>
		);
	},
});

export default QuestionMarkCircleIcon;
