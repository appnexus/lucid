import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';
import {
	StandardProps,
	filterTypes,
	rejectTypes,
	omitProps,
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

const defaultProps = {
	isTop: false,
	hasLightBackground: true,
	isRemovable: false,
	onRemove: _.noop,
	kind: 'default' as const,
};

export const Tag = (props: ITagProps): React.ReactElement => {
	const {
		isTop,
		isRemovable,
		children,
		className,
		onRemove,
		hasLightBackground,
		kind,
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
			{...omitProps(passThroughs, undefined, [
				..._.keys(Tag.propTypes),
				'callbackId',
			])}
			className={cx(
				'&',
				{
					'&-is-top': isTop,
					'&-is-leaf': isLeaf,
					'&-is-removable': isRemovable,
					'&-has-light-background': hasLightBackground,
					'&-default': kind === 'default',
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
	description: `
		Organizes items into removable items or groups. Can be nested to
		facilitate grouping.
	`,
	categories: ['communication'],
};

Tag.propTypes = {
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

	kind: oneOf(['primary', 'success', 'warning', 'danger', 'info', 'default'])`
		Style variations of the \`Tag\`.
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
};

export default Tag;
