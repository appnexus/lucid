import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';
import {
	StandardProps,
	filterTypes,
	rejectTypes,
} from '../../util/component-types';

const cx = lucidClassNames.bind('&-Tag');

const { bool, func, node, string, oneOf } = PropTypes;

export interface ITagProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Set this prop if you're using three levels of tags so it can be styled
		appropriately. This is required because we aren't able to know if your
		Tags have grand children efficiently. */
	isTop: boolean;

	/** Use the light background when your tags are on a white page background.
		Use a dark background when your tags need to be placed on a darker
		background (e.g. in a page header). */
	hasLightBackground: boolean;

	/** Shows or hides the little "x" for a given tag. */
	isRemovable: boolean;

	/** Style variations of the `Tag`. */
	kind?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';

	/** Called when the user clicks to remove a tag. */
	onRemove: ({
		props,
		event,
	}: {
		props: ITagProps;
		event: React.MouseEvent;
	}) => void;
}

/** TODO: Remove the nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = ['callbackId', 'initialState'];

const defaultProps = {
	isTop: false,
	hasLightBackground: true,
	isRemovable: false,
	kind: 'default' as const,
	onRemove: _.noop,
};

export const Tag = (props: ITagProps): React.ReactElement => {
	const {
		isTop,
		hasLightBackground,
		isRemovable,
		kind,
		onRemove,
		children,
		className,
		...passThroughs
	} = props;

	const handleRemove = ({ event }: { event: React.MouseEvent }): void => {
		onRemove({ props, event });
	};

	const subTags = filterTypes(children, Tag);
	const otherChildren = rejectTypes(children, Tag);
	const hasOtherChildren = !_.isEmpty(otherChildren);
	const isLeaf = _.isEmpty(subTags);

	return (
		<div
			{..._.omit(passThroughs, nonPassThroughs)}
			className={cx(
				'&',
				{
					'&-is-top': isTop,
					'&-is-leaf': isLeaf,
					'&-is-removable': isRemovable,
					'&-has-light-background': hasLightBackground,
					'&-default': kind === 'default',
					'&-primary': kind === 'primary',
					'&-success': kind === 'success',
					'&-warning': kind === 'warning',
					'&-danger': kind === 'danger',
					'&-info': kind === 'info',
				},
				className
			)}
		>
			{hasOtherChildren && (
				<span className={cx('&-other-children')}>
					{otherChildren}
					{isRemovable && (
						<CloseIcon
							onClick={handleRemove}
							className={cx('&-remove-button')}
							size={7}
							isClickable
						/>
					)}
				</span>
			)}
			{subTags}
		</div>
	);
};

Tag.defaultProps = defaultProps;
Tag.displayName = 'Tag';

Tag.peek = {
	description: `\`Tag\` is a visualization for selected settings.`,
	notes: {
		overview: `
					A visualization for items. Tags can be removable and can be nested into groups.
					`,
		intendedUse: `
					Tags are typically used to display filter selections. Tags can be interactive or display-only. They can also be grouped into a parent container.
											
					**Styling notes**
					
					- The default style is not interactive, it does not have a \`CloseIcon\`.
					- Use \`isRemovable='true'\` for interactive tags.
					- Styling is optimized for 40 or fewer characters.
					`,
		technicalRecommendations: `
					None
			`,
	},
	categories: ['communication'],
};

Tag.propTypes = {
	/**
		Set this prop if you're using three levels of tags so it can be styled
		appropriately. This is required because we aren't able to know if your
		Tags have grand children efficiently.
	*/
	isTop: bool,

	/**
		Use the light background when your tags are on a white page background.
		Use a dark background when your tags need to be placed on a darker
		background (e.g. in a page header).
	*/
	hasLightBackground: bool,

	/**
		Shows or hides the little "x" for a given tag.
	*/
	isRemovable: bool,

	/**
		Style variations of the \`Tag\`.
	*/
	kind: oneOf(['primary', 'success', 'warning', 'danger', 'info', 'default']),

	/**
		Called when the user clicks to remove a tag.  Signature:
		\`({props, event}) => {}\`
	*/
	onRemove: func,

	/**
		Can contain elements or nested \`Tag\` components.
	*/
	children: node,

	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,
};

export default Tag;
