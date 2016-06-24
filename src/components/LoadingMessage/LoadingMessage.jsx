import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';

const cx = lucidClassNames.bind('&-LoadingMessage');

const {
	any,
	node,
	string,
} = React.PropTypes;

/**
 *
 * {"categories": ["communication"], "madeFrom": ["LoadingIcon"]}
 *
 * A loading message.
 *
 */
const LoadingMessage = createClass({
	displayName: 'LoadingMessage',
	_lucidIsPrivate: true,
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
		Icon: createClass({
			displayName: 'LoadingMessage.Icon',
			propName: 'Icon',
		}),
		Title: createClass({
			displayName: 'LoadingMessage.Title',
			propName: 'Title',
		}),
		Body: createClass({
			displayName: 'LoadingMessage.Body',
			propName: 'Body',
		}),
	},

	render() {
		const {
			props,
			props: {
				className,
				...passThroughs,
			},
		} = this;

		const {
			Icon,
			Title,
			Body,
		} = LoadingMessage;

		const defaultTitle = 'Loading';
		const iconElement = _.first(findTypes(props, Icon));
		const iconChildren = _.get(iconElement, 'props.children', <LoadingIcon />);
		const titleElement = _.first(findTypes(props, Title));
		const titleChildren = _.get(titleElement, 'props.children');
		const bodyElement = _.first(findTypes(props, Body));
		const bodyChildren = _.get(bodyElement, 'props.children', null);

		return (
			<div
				{...omitProps(passThroughs, LoadingMessage)}
				className={cx('&', { '&-no-content': _.isNull(titleChildren) && !bodyChildren }, className)}
			>
				{iconChildren}
				{!_.isNull(titleChildren) && <h3 className={cx('&-title')}>{titleChildren || defaultTitle}</h3>}
				{bodyChildren && <span className={cx('&-body')}>{bodyChildren}</span>}
			</div>
		);
	},
});

export default LoadingMessage;
