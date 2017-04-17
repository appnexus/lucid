import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';

const cx = lucidClassNames.bind('&-LoadingMessage');

const { any, node, string } = PropTypes;

/**
 *
 * {"categories": ["communication"], "madeFrom": ["LoadingIcon"]}
 *
 * A loading message.
 *
 */
const LoadingMessage = createClass({
	displayName: 'LoadingMessage',
	_isPrivate: true,
	propTypes: {
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * Any valid React children.
		 */
		children: node,
		/**
		 * Custom Icon element (alias for `LoadingMessage.Icon`)
		 */
		Icon: any,
		/**
		 * Custom Title element (alias for `LoadingMessage.Title`)
		 */
		Title: any,
		/**
		 * Custom Body element (alias for `LoadingMessage.Body`)
		 */
		Body: any,
	},

	components: {
		/**
		 * Renders the `Icon` element passed in
		 */
		Icon: createClass({
			displayName: 'LoadingMessage.Icon',
			propName: 'Icon',
		}),
		/**
		 * Renders an `<h3>` that represents the title of the `LoadingMessage`.
		 * Defaults to the string "Loading".
		 */
		Title: createClass({
			displayName: 'LoadingMessage.Title',
			propName: 'Title',
		}),
		/**
		 * Renders an `<span>` that represents the body of the `LoadingMessage`.
		 */
		Body: createClass({
			displayName: 'LoadingMessage.Body',
			propName: 'Body',
		}),
	},

	render() {
		const { props, props: { className, ...passThroughs } } = this;

		const { Icon, Title, Body } = LoadingMessage;

		const defaultTitle = 'Loading';
		const iconElement = getFirst(props, Icon);
		const iconChildren = _.get(iconElement, 'props.children', <LoadingIcon />);
		const titleElement = getFirst(props, Title);
		const titleChildren = _.get(titleElement, 'props.children');
		const bodyElement = getFirst(props, Body);
		const bodyChildren = _.get(bodyElement, 'props.children', null);

		return (
			<div
				{...omitProps(passThroughs, LoadingMessage)}
				className={cx(
					'&',
					{ '&-no-content': _.isNull(titleChildren) && !bodyChildren },
					className
				)}
			>
				{iconChildren}
				{!_.isNull(titleChildren) &&
					<h3 className={cx('&-title')}>{titleChildren || defaultTitle}</h3>}
				{bodyChildren && <span className={cx('&-body')}>{bodyChildren}</span>}
			</div>
		);
	},
});

export default LoadingMessage;
