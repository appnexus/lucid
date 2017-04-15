import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import CrossIcon from '../Icon/CrossIcon/CrossIcon';
import {
	createClass,
	filterTypes,
	rejectTypes,
	omitProps,
} from '../../util/component-types';

const cx = lucidClassNames.bind('&-Tag');

const { bool, func, node, string } = PropTypes;

/**
 * {"categories": ["communication"]}
 *
 * Organizes items into removable items or groups. Can be nested to facilitate
 * grouping.
 */
const Tag = createClass({
	displayName: 'Tag',

	propTypes: {
		/**
		 * Shows or hides the little "x" for a given tag.
		 */
		isRemovable: bool,
		/**
		 * Called when the user clicks to remove a tag.
		 *
		 * Signature: `({props, event}) => {}`
		 */
		onRemove: func,
		/**
		 * Can contain elements or nested `Tag` components.
		 */
		children: node,
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
	},

	getDefaultProps() {
		return {
			onRemove: _.noop,
		};
	},

	handleRemove(event) {
		this.props.onRemove({ props: this.props, event });
	},

	render() {
		const { isRemovable, children, className, ...passThroughs } = this.props;

		const subTags = filterTypes(children, Tag);
		const otherChildren = rejectTypes(children, Tag);
		const isLeaf = _.isEmpty(subTags);

		return (
			<div
				{...omitProps(passThroughs, Tag)}
				className={cx('&', { '&-leaf': isLeaf }, className)}
			>
				<div className={cx('&-inner')}>
					<div className={cx('&-inner-content')}>
						{!_.isEmpty(otherChildren)
							? <span className={cx('&-inner-children')}>
									{otherChildren}
								</span>
							: null}
						{isRemovable
							? <span className={cx('&-remove')} onClick={this.handleRemove}>
									<CrossIcon
										className={cx('&-remove-button')}
										size={10}
										viewBox="4 4 8 8"
										isClickable
									/>
								</span>
							: null}
					</div>
					{!isLeaf
						? <div className={cx('&-subgroup')}>
								{subTags}
							</div>
						: null}
				</div>
			</div>
		);
	},
});

export default Tag;
