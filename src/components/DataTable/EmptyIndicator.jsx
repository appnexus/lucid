import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';

import Button from '../Button/Button';
import HatchPattern from './HatchPattern';

const cx = lucidClassNames.bind('&-EmptyIndicator');

const {
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["communication"], "madeFrom": ["Button"]}
 *
 * An emptiness indicator wrapper
 *
 */
const EmptyIndicator = createClass({
	displayName: 'EmptyIndicator',

	propTypes: {
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * Body text to display below the title.
		 */
		body: string,
		/**
		 * Optional URL for an Image to display.
		 */
		imageUrl: string,
		/**
		 * Title text to display.
		 */
		title: string,
	},

	getDefaultProps() {
		return {
			bodyText: null,
			imageUrl: null,
			title: 'You have no Line Items.',
		};
	},

	components: {
		/**
		 * Renders the 'call to action'.
		 */
		ActionButton: createClass({
			displayName: 'EmptyIndicator.ActionButton',
			propName: 'ColumnGroup',
			getDefaultProps: () => ({
				kind: 'link',
				children: 'Create one now.',
			}),
		}),
	},

	render() {
		const {
			body,
			className,
			imageUrl,
			title,
			...passThroughs,
		} = this.props;

		const buttonProps = _.get(getFirst(this.props, EmptyIndicator.ActionButton), 'props', EmptyIndicator.ActionButton.getDefaultProps());

		return (
				<div
					{...omitProps(passThroughs, EmptyIndicator)}
					className={cx('&', className)}
				>
					<div className={cx('&-message-container')}>
						<div className={cx('&-message-content')}>
							<HatchPattern
								className={cx('&-message-content-header')}
								height='15px'
								width='100%'
							/>
							<div className={cx('&-message-body')}>
								<span className={cx('&-message-title')}>{title}</span>
								{body && <p className={cx('&-message-body-text')}>{body}</p>}
								{imageUrl && <img className={cx('&-message-body-image')} src={imageUrl} style={{maxWidth: '375px', maxHeight: '200px'}} />}
								<Button {...buttonProps} />
							</div>
						</div>
					</div>
				</div>
			);
	},
});

export default EmptyIndicator;
