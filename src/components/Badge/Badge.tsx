import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps, FC } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Badge');

const { node, string, oneOf } = PropTypes;

enum Kind {
	Default = 'default',
	Primary = 'primary',
	Success = 'success',
	Danger = 'danger',
	Warning = 'warning',
	Info = 'info',
	Dark = 'dark',
}

enum Type {
	Filled = 'filled',
	Stroke = 'stroke',
}

export interface IBadgeProps {
	children: React.ReactNode;
	/** Appended to the component-specific class names set on the root element.
	 * */
	className?: string;
	/** Style variations for the `Badge` */
	kind?: Kind;
	/** Fill variations for the `Badge` */
	type?: Type;
}

const Badge: FC<IBadgeProps> = (props): React.ReactElement => {
	const {
		className,
		kind = Kind.Default,
		type = Type.Filled,
		children,
		...passThroughs
	} = props;

	return (
		<span
			className={cx('&', `&-${kind}`, `&-${type}`, className)}
			{...omitProps(passThroughs, undefined, _.keys(Badge.propTypes))}
		>
			{children}
		</span>
	);
};

Badge.displayName = 'Badge';
Badge.peek = {
	description: `
				\`Badge\` is a quick utility component to create a badge around any
				element(s).
			`,
	categories: ['visual design', 'icons'],
};
Badge.propTypes = {
	className: string`
			class names that are appended to the defaults
		`,

	children: node`
			any valid React children
		`,

	kind: oneOf(_.values(Kind))`
			Style variations for the \`Badge\`
		`,

	type: oneOf(_.values(Type))`
			Fill style variations for the \`Badge\`
		`,
};

export default Badge;
