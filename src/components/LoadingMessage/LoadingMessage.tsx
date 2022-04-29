/* eslint-disable react/prop-types */
import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { getFirst, StandardProps } from '../../util/component-types';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';

const cx = lucidClassNames.bind('&-LoadingMessage');

const { any, node, string } = PropTypes;

/** Loading Message Icon */
export interface ILoadingMessageIconProps extends StandardProps {
	description?: string;
}
const LoadingMessageIcon = (_props: ILoadingMessageIconProps): null => null;
LoadingMessageIcon.displayName = 'LoadingMessage.Icon';
LoadingMessageIcon.peek = {
	description: `Renders the \`Icon\` element passed in.`,
};
LoadingMessageIcon.propName = 'Icon';
LoadingMessageIcon.propTypes = {
	description: string,
	children: any,
};

/** Loading Message Title */
export interface ILoadingMessageTitleProps extends StandardProps {
	description?: string;
}
const LoadingMessageTitle = (_props: ILoadingMessageTitleProps): null => null;
LoadingMessageTitle.displayName = 'LoadingMessage.Title';
LoadingMessageTitle.peek = {
	description: `Renders an \`<h3>\` that represents the title of the \`LoadingMessage\`.  Defaults to the string "Loading".`,
};
LoadingMessageTitle.propName = 'Title';
LoadingMessageTitle.propTypes = {
	description: string,
	children: any,
};

/** Loading Message Body */
export interface ILoadingMessageBodyProps extends StandardProps {
	description?: string;
}
const LoadingMessageBody = (_props: ILoadingMessageBodyProps): null => null;
LoadingMessageBody.displayName = 'LoadingMessage.Body';
LoadingMessageBody.peek = {
	description: `Renders a \`<span>\` that represents the body of the \`LoadingMessage\`.`,
};
LoadingMessageBody.propName = 'Body';
LoadingMessageBody.propTypes = {
	description: string,
	children: any,
};

/** Loading Message */
export interface ILoadingMessageProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Custom Icon element (alias for `LoadingMessage.Icon`) */
	Icon?: React.ReactNode;

	/** Custom Title element (alias for `LoadingMessage.Title`) */
	Title?: React.ReactNode;

	/** Custom Body element (alias for `LoadingMessage.Body`) */
	Body?: React.ReactNode;
}

export const LoadingMessage = (
	props: ILoadingMessageProps
): React.ReactElement => {
	const { className, ...passThroughs } = props;
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
			{...omit(passThroughs, [
				'className',
				'children',
				'Icon',
				'Title',
				'Body',
				'initialState',
				'callbackId',
			])}
			className={cx(
				'&',
				{ '&-no-content': _.isNull(titleChildren) && !bodyChildren },
				className
			)}
		>
			{iconChildren}
			{!_.isNull(titleChildren) && (
				<h3 className={cx('&-title')}>{titleChildren || defaultTitle}</h3>
			)}
			{bodyChildren && <span className={cx('&-body')}>{bodyChildren}</span>}
		</div>
	);
};

LoadingMessage.Icon = LoadingMessageIcon;
LoadingMessage.Title = LoadingMessageTitle;
LoadingMessage.Body = LoadingMessageBody;

LoadingMessage._isPrivate = true;
LoadingMessage.displayName = 'LoadingMessage';
LoadingMessage.peek = {
	description: `A loading message.`,
	categories: ['communication'],
	madeFrom: ['LoadingIcon'],
};
LoadingMessage.propTypes = {
	/**
		Class names that are appended to the defaults.
	*/
	className: string,

	/**
		Any valid React children.
	*/
	children: node,

	/**
		Custom Icon element (alias for \`LoadingMessage.Icon\`)
	*/
	Icon: node,

	/**
		Custom Title element (alias for \`LoadingMessage.Title\`)
	*/
	Title: node,

	/**
		Custom Body element (alias for \`LoadingMessage.Body\`)
	*/
	Body: node,
};

export default LoadingMessage;
