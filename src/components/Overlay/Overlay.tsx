import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../Portal/Portal';
import { CSSTransition } from 'react-transition-group';
import { lucidClassNames, uniqueName } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Overlay');

const { string, bool, func, node } = PropTypes;

export interface IOverlayProps extends StandardProps {
	/** Controls visibility. */
	isShown: boolean;

	/** Enables animated transitions during expansion and collapse. */
	isAnimated: boolean;

	/** Determines if it shows with a gray background. If `false`, the
		background will be rendered but will be invisible, except for the
		contents, and it won't capture any of the user click events. */
	isModal: boolean;

	/** Set your own id for the \`Portal\` is that is opened up to contain the
		contents. In practice you should never need to set this manually. */
	portalId?: string;

	/** Fired when the user hits escape. */
	onEscape: ({
		event,
		props,
	}: {
		event: KeyboardEvent;
		props: IOverlayProps;
	}) => void;

	/** Fired when the user clicks on the background, this may or may not be
		visible depending on \`isModal\`. */
	onBackgroundClick: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IOverlayProps;
	}) => void;
}

export const overlayPropTypes = [
	'children',
	'className',
	'isShown',
	'isAnimated',
	'isModal',
	'portalId',
	'onEscape',
	'onBackgroundClick',
];

const nonPassThroughs = [...overlayPropTypes, 'initialState', 'callbackId'];

interface IOverlayState {
	portalId: string;
}

export const defaultProps = {
	isAnimated: true,
	isModal: true,
	isShown: false,
	onBackgroundClick: _.noop,
	onEscape: _.noop,
};

class Overlay extends React.Component<IOverlayProps, IOverlayState, {}> {
	static displayName = 'Overlay';

	static peek = {
		description: `\`Overlay\` is used to block user interaction with the rest of the app until something has been completed.`,
		categories: ['utility'],
		madeFrom: ['Portal'],
	};

	static propTypes = {
		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,

		/**
			Generally you should only have a single child element so the centering
			works correctly.
		*/
		children: node,

		/**
			Controls visibility.
		*/
		isShown: bool,

		/**
			Enables animated transitions during expansion and collapse.
		 */
		isAnimated: bool,

		/**
			Determines if it shows with a gray background. If \`false\`, the
			background will be rendered but will be invisible, except for the
			contents, and it won't capture any of the user click events.
		*/
		isModal: bool,

		/**
			Set your own id for the \`Portal\` is that is opened up to contain the
			contents. In practice you should never need to set this manually.
		*/
		portalId: string,

		/**
			Fired when the user hits escape.  Signature: \`({ event, props }) => {}\`
		*/
		onEscape: func,

		/**
			Fired when the user clicks on the background, this may or may not be
			visible depending on \`isModal\`.  Signature: \`({ event, props }) => {}\`
		*/
		onBackgroundClick: func,
	};

	private rootHTMLDivElement = React.createRef<HTMLDivElement>();

	static defaultProps = defaultProps;

	state = {
		// This must be in state because getDefaultProps only runs once per
		// component import which causes collisions
		portalId: this.props.portalId || uniqueName('Overlay-Portal-'),
	};

	componentDidMount(): void {
		if (window && window.document) {
			window.document.addEventListener('keydown', this.handleDocumentKeyDown);
		}
	}

	componentWillUnmount(): void {
		if (window && window.document) {
			window.document.removeEventListener(
				'keydown',
				this.handleDocumentKeyDown
			);
		}
	}

	handleDocumentKeyDown = (event: KeyboardEvent): void => {
		// If the user hits the "escape" key, then fire an `onEscape`
		// TODO: use key helpers
		if (event.keyCode === 27) {
			this.props.onEscape({ event, props: this.props });
		}
	};

	handleBackgroundClick = (event: React.MouseEvent): void => {
		// Use the reference we previously stored from the `ref` to check what
		// element was clicked on.
		if (
			this.rootHTMLDivElement.current &&
			event.target === this.rootHTMLDivElement.current
		) {
			this.props.onBackgroundClick({ event, props: this.props });
		}
	};

	render(): React.ReactNode {
		const {
			className,
			isShown,
			isModal,
			isAnimated,
			children,
			...passThroughs
		} = this.props;

		const { portalId } = this.state;

		const overlayElement = (
			<div
				{..._.omit(passThroughs, nonPassThroughs)}
				className={cx(className, '&', {
					'&-is-not-modal': !isModal,
					'&-is-animated': isAnimated,
				})}
				onClick={this.handleBackgroundClick}
				ref={this.rootHTMLDivElement}
			>
				{children}
			</div>
		);

		return (
			<Portal portalId={portalId}>
				{isAnimated ? (
					<CSSTransition
						in={isShown}
						classNames={cx('&')}
						timeout={300}
						unmountOnExit
					>
						{overlayElement}
					</CSSTransition>
				) : isShown ? (
					overlayElement
				) : null}
			</Portal>
		);
	}
}

export default Overlay;
