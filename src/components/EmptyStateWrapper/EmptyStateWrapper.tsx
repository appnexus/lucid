import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { getFirst, omitProps, StandardProps } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';

import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import OverlayWrapper, {
	OverlayWrapperMessage,
	//	IOverlayWrapperProps,
} from '../OverlayWrapper/OverlayWrapper';

const cx = lucidClassNames.bind('&-EmptyStateWrapper');

const { any, bool, node, string } = PropTypes;

interface IEmptyStateWrapperBodyProps extends StandardProps {}

const EmptyStateWrapperBody = (_props: IEmptyStateWrapperBodyProps): null =>
	null;

interface IEmptyStateWrapperTitleProps extends StandardProps {}

const EmptyStateWrapperTitle = (_props: IEmptyStateWrapperTitleProps): null =>
	null;

//interface IEmptyStateWrapperProps extends IOverlayWrapperProps {
interface IEmptyStateWrapperProps extends StandardProps {
	/** *Child Element* The element to display in the body of the overlay. */
	Body?: React.ReactNode;

	/**	*Child Element* The element to display in the title of the overlay. */
	Title?: React.ReactNode;

	/** Controls the visibility of the \`EmptyMessage\`. */
	isEmpty: boolean;

	/** Controls the visibility of the \`LoadingMessage\`. */
	isLoading: boolean;
}

//const EmptyStateWrapper = createClass({
export const EmptyStateWrapper = (
	props: IEmptyStateWrapperProps
): React.ReactElement => {
	//render(): React.ReactNode {
	const { children, className, isEmpty, isLoading, ...passThroughs } = props;

	const emptyMessageBodyProp = _.get(
		getFirst(props, EmptyStateWrapperBody),
		'props'
	);

	const emptyMessageTitleProp = _.get(
		getFirst(props, EmptyStateWrapperTitle),
		'props',
		{ children: 'You have no data.' }
	);

	return isLoading ? (
		<LoadingIndicator
			className={cx('&', className)}
			isLoading
			//			{...omitProps(passThroughs, EmptyStateWrapper, [], false)}
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(EmptyStateWrapper.propTypes)
			)}
		>
			{children}
		</LoadingIndicator>
	) : (
		<OverlayWrapper
			className={cx('&', className)}
			hasOverlay={false}
			isVisible={isEmpty}
			//		{...omitProps(passThroughs, EmptyStateWrapper, [], false)}
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(EmptyStateWrapper.propTypes)
				//['children', 'className', 'isLoading', 'Message']
			)}
		>
			<OverlayWrapperMessage className={cx('&-message-container')}>
				<div className={cx('&-message-header')} />
				<div className={cx('&-message-contents')}>
					<header
						{...emptyMessageTitleProp}
						className={cx('&-message-title', emptyMessageTitleProp.className)}
					/>
					{emptyMessageBodyProp && <div {...emptyMessageBodyProp} />}
				</div>
			</OverlayWrapperMessage>

			{children}
		</OverlayWrapper>
	);
	//};
};
//});

EmptyStateWrapper._isPrivate = true;

EmptyStateWrapper.peek = {
	description: `
		A wrapper which can display either a \`LoadingIndicator\` or
		\`OverlayWrapper\`.
	`,
	categories: ['utility'],
	madeFrom: ['LoadingIndicator', 'OverlayWrapper'],
};

EmptyStateWrapper.displayName = 'EmptyStateWrapper';

EmptyStateWrapper.propTypes = {
	className: string`
		Class names that are appended to the defaults.
	`,

	children: node`
		Any valid React children.
	`,

	isEmpty: bool`
		Controls the visibility of the \`EmptyMessage\`.
	`,

	isLoading: bool`
		Controls the visibility of the \`LoadingMessage\`.
	`,

	Body: any`
		*Child Element* The element to display in the body of the overlay.
	`,

	Title: any`
		*Child Element* The element to display in the title of the overlay.
	`,
};

EmptyStateWrapperBody.displayName = 'EmptyStateWrapper.Body';
EmptyStateWrapper.Body = EmptyStateWrapperBody;
EmptyStateWrapperBody.peek = {
	description: `
		Body content for the message to display when there is no data.
	`,
};
EmptyStateWrapperBody.propName = 'Body';

EmptyStateWrapperTitle.displayName = 'EmptyStateWrapper.Title';
EmptyStateWrapper.Title = EmptyStateWrapperTitle;
EmptyStateWrapperTitle.peek = {
	description: `
		Title text for the message to display when there is no data.
	`,
};
EmptyStateWrapperTitle.propName = 'Title';

export default EmptyStateWrapper;
