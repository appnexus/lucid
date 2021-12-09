/* eslint-disable react/prop-types */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Breadcrumb');

const { any, node } = PropTypes;

export interface IBreadcrumbItemProps extends StandardProps {}
const BreadcrumbItem = (_props: IBreadcrumbItemProps): null => null;

BreadcrumbItem.displayName = 'Breadcrumb.Item';
BreadcrumbItem.peek = {
	description: `Renders a \`li\``,
};
BreadcrumbItem.propName = 'Item';
BreadcrumbItem.propTypes = {
	children: node,
};

export interface IBreadcrumbProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	Item?: string | (React.ReactNode & { props: IBreadcrumbItemProps });
}

export const Breadcrumb = (props: IBreadcrumbProps): React.ReactElement => {
	const { className, ...passThroughs } = props;
	const items = findTypes(props, Breadcrumb.Item);
	const initialItems = _.initial(items);
	const lastItem = _.last(items);

	return (
		<nav {...(passThroughs as any)} className={cx('&', className)}>
			{!_.isEmpty(items) ? (
				<ul className={cx('&-List')}>
					{_.map(
						initialItems as React.ReactElement[],
						({ props, key }): React.ReactNode => (
							<li {...props} key={key} className={cx('&-Item', className)}>
								{props.children}
								<span className={cx('&-BreadcrumbSeparator')}>
									<span />
									<span />
								</span>
							</li>
						)
					)}
					<li
						{...(lastItem as React.ReactElement).props}
						key={(lastItem as React.ReactElement).key}
						className={cx(
							'&-Item',
							(lastItem as React.ReactElement).props.className
						)}
					/>
				</ul>
			) : null}
		</nav>
	);
};
Breadcrumb.displayName = 'Breadcrumb';
Breadcrumb.peek = {
	description: `A navigation component to show a user's place in a navigation hierarchy and provide links to return to higher points in that hierarchy.`,
	categories: ['navigation'],
};
Breadcrumb.propTypes = {
	/**
		All children should be \`Breadcrumb.Item\`s. Others are ignored.
	*/
	children: node,
	/**
		Appended to the component-specific class names set on the root element.
		Value is run through the \`classnames\` library.
	*/
	className: any,
	/**
		A child element that renders a \`li\`.
	*/
	Item: node,
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
