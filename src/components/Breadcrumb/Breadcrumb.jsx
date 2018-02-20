import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import SeparatorIcon from '../Icon/SeparatorIcon/SeparatorIcon';

const cx = lucidClassNames.bind('&-Breadcrumb');

const { any, node } = PropTypes;

const Breadcrumb = createClass({
	displayName: 'Breadcrumb',

	statics: {
		peek: {
			description: `
				Navigation component to show a user's place in a navigation hierarchy
				and provide links to return to higher points in the hierarchy
			`,
			categories: ['navigation'],
			madeFrom: ['SeparatorIcon'],
		},
	},

	components: {
		SeparatorIcon,

		Item: createClass({
			displayName: 'Breadcrumb.Item',
			statics: {
				peek: {
					description: `
						Renders a \`li\`
					`,
				},
			},
			propTypes: {
				children: node,
			},
		}),
	},

	propTypes: {
		children: node`
			All children should be \`Breadcrumb.Item\`s. Others are ignored.
		`,

		className: any`
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		`,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		const items = findTypes(this.props, Breadcrumb.Item);
		const initialItems = _.initial(items);
		const lastItem = _.last(items);

		return (
			<nav
				{...omitProps(passThroughs, Breadcrumb)}
				className={cx('&', className)}
			>
				{!_.isEmpty(items) ? (
					<ul className={cx('&-List')}>
						{_.map(initialItems, ({ props, key }) => (
							<li
								{...props}
								key={key}
								className={cx('&-Item', props.className)}
							>
								{props.children}
								<SeparatorIcon className={cx('&-SeparatorIcon')} />
							</li>
						))}
						<li
							{...lastItem.props}
							key={lastItem.key}
							className={cx('&-Item', lastItem.props.className)}
						/>
					</ul>
				) : null}
			</nav>
		);
	},
});

export default Breadcrumb;
