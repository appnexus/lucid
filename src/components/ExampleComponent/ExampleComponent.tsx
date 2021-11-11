// Required for all new components
import React from 'react';

import { lucidClassNames } from '../../util/style-helpers';
import { FC, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-ExampleComponent');

export interface IExampleComponentProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.DOMAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/**
	 * Appended to the component-specific class names set on the root
	 * element.
	 */
	className?: string;

	/**
	 * Any valid React children. This wraps your new component around whatever other React children consumers
	 * of your component may choose to use. If consumers can not use any/all React children. Be sure to call
	 * that out here.
	 */
	children?: any;

	/**
	 * Example of a boolean prop.
	 * Used in this example to control an additional classname
	 * `lucid-ExampleComponent-isX' on the root element.
	 */
	isX?: boolean;

	/**
	 * Example of a customizable component function. Always show the signature.
	 *
	 * Signature: `(item, { event, props }) => {}`
	 */
	onX?: ({ event, props }: { event: React.MouseEvent; props: any }) => void;

	/**
	 * Passed through to the root element.
	 */
	style?: object;
}

export const ExampleComponent: FC<IExampleComponentProps> = ({
	className,
	children,
	isX,
	style,
}): React.ReactElement => {
	const handleX = () => {
		alert('This is an example of a handler function');
	};

	return (
		<div
			className={cx('&', className, {
				'&-isX': isX,
			})}
			style={style}
			onClick={handleX}
		>
			{children}
		</div>
	);
};

/**
 * {"categories": ["category"]}
 *
 * Update the "category" array to set the category or categories your component falls under.
 * You can see available categories in the Storybook left hand column.
 *
 * Describe your component here. How it should be used, use cases and more.
 * Please see examples for more information.
 */

ExampleComponent.categories = ['Documentation'];
ExampleComponent.description = `An example component`;
ExampleComponent.displayName = 'ExampleComponent';

export default ExampleComponent;
