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
		isTop: bool`
			Set this prop if you're using three levels of tags so it can be styled
			appropriately. This is required because we aren't able to know if your
			Tags have grand children efficiently.
		`,

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
			isTop: false,
		};
	},

	handleRemove(event) {
		this.props.onRemove({ props: this.props, event });
	},

	render() {
		const {
			isTop,
			isRemovable,
			children,
			className,
			...passThroughs
		} = this.props;

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
						'&-is-top': isTop,
						'&-is-leaf': isLeaf,
						'&-is-removable': isRemovable,
					},
					className
				)}
			>
				{hasOtherChildren && (
					<span className={cx('&-other-children')}>
						{otherChildren}
						{isRemovable && (
							<CrossIcon
								onClick={this.handleRemove}
								className={cx('&-remove-button')}
								presetSize="small"
								isClickable
							/>
						)}
					</span>
				)}
				{subTags}
			</div>
		);
	},
});

export default Tag;
