import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';
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

		hasLightBackground: bool`
			Use the light background when your tags are on a white page background.
			Use a dark background when your tags need to be placed on a darker
			background (e.g. in a page header).
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
			hasLightBackground: true,
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
			hasLightBackground,
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
						'&-has-light-background': hasLightBackground,
					},
					className
				)}
			>
				{hasOtherChildren && (
					<span className={cx('&-other-children')}>
						{otherChildren}
						{isRemovable && (
							<CloseIcon
								onClick={this.handleRemove}
								className={cx('&-remove-button')}
								presetSize='small'
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
