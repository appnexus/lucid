import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Badge');

const badgePropTypes = {
	/** class names that are appended to the defaults */
	className: PropTypes.string,

	/** any valid React children */
	children: PropTypes.node,

	/** Style variations for the `Badge` */
	kind: PropTypes.oneOf([
		'default',
		'primary',
		'success',
		'danger',
		'warning',
		'info',
		'dark',
	]),

	/** Fill style variations for the `Badge` */
	type: PropTypes.oneOf(['filled', 'stroke']),
};

export enum Kind {
	default = 'default',
	primary = 'primary',
	success = 'success',
	danger = 'danger',
	warning = 'warning',
	info = 'info',
	dark = 'dark',
}

export enum Type {
	filled = 'filled',
	stroke = 'stroke',
}

export interface IBadgeProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLSpanElement>,
			HTMLSpanElement
		> {
	kind: keyof typeof Kind;
	/** Fill variations for the `Badge` */
	type: keyof typeof Type;
}

const defaultProps = {
	kind: Kind.default,
	type: Type.filled,
};

export const Badge = (props: IBadgeProps): React.ReactElement => {
	const { className, kind, type, children, ...passThroughs } = props;

	return (
		<span
			className={cx('&', `&-${kind}`, `&-${type}`, className)}
			{...(passThroughs as any)}
		>
			{children}
		</span>
	);
};

Badge.defaultProps = defaultProps;
Badge.displayName = 'Badge';
Badge.peek = {
	description: `A quick utility component to create a badge around an element.`,
	categories: ['visual design', 'icons'],
};
Badge.propTypes = badgePropTypes;

export default Badge;
