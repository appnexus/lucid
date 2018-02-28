import React from 'react';
import PropTypes from 'react-peek/prop-types';
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

const Tag = createClass({
	displayName: 'Tag',

	statics: {
		peek: {
			description: `
				Organizes items into removable items or groups. Can be nested to
				facilitate grouping.
			`,
			categories: ['communication'],
		},
	},

	propTypes: {
		isRemovable: bool`
			Shows or hides the little "x" for a given tag.
		`,

		onRemove: func`
			Called when the user clicks to remove a tag.  Signature:
			\`({props, event}) => {}\`
		`,

		children: node`
			Can contain elements or nested \`Tag\` components.
		`,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,
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
		const hasOtherChildren = !_.isEmpty(otherChildren);
		const isLeaf = _.isEmpty(subTags);

		return (
			<div
				{...omitProps(passThroughs, Tag)}
				className={cx(
					'&',
					{
						'&-leaf': isLeaf,
						'&-is-removable': isRemovable,
					},
					className
				)}
			>
				<div className={cx('&-inner')}>
					{hasOtherChildren && (
						<span className={cx('&-inner-children')}>{otherChildren}</span>
					)}
					{isRemovable && (
						<span className={cx('&-remove')} onClick={this.handleRemove}>
							<CrossIcon
								className={cx('&-remove-button')}
								size={10}
								viewBox="4 4 8 8"
								isClickable
							/>
						</span>
					)}
					{subTags}
				</div>
			</div>
		);
	},
});

export default Tag;
