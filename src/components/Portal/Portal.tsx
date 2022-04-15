import React from 'react';
import _, { omit } from 'lodash';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { StandardProps } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import classNames from 'classnames';

const cx = lucidClassNames.bind('&-Portal');

const { any, node, string } = PropTypes;

export interface IPortalProps
	extends StandardProps,
		React.HTMLProps<HTMLDivElement> {
	/** The `id` of the portal element that is appended to `document.body`. */
	portalId?: string;
}

interface IPortalState {
	isReady: boolean;
}

class Portal extends React.Component<IPortalProps, IPortalState, {}> {
	static displayName = 'Portal';
	static peek = {
		description: `A \`Portal\` component is used to render content in a container that is appended to \`document.body\`.`,
		categories: ['utility'],
	};
	static propTypes = {
		/**
			any valid React children
		*/
		children: node,

		/**
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		*/
		className: any,

		/**
			The \`id\` of the portal element that is appended to \`document.body\`.
		*/
		portalId: string,
	};

	state = {
		isReady: false,
	};

	manuallyCreatedPortal: boolean = false;
	portalElement: HTMLElement = document.createElement('div');

	componentDidMount(): void {
		const { portalId } = this.props;

		let portalElement;

		if (portalId) {
			portalElement = document.getElementById(portalId);
		}
		if (!portalElement) {
			this.manuallyCreatedPortal = true;
			portalElement = document.createElement('div');
			portalElement.id = portalId as string;
			document.body.appendChild(portalElement);
		}
		this.portalElement = portalElement;
		this.setState({ isReady: true });
	}
	componentWillUnmount(): void {
		if (this.manuallyCreatedPortal) {
			this.portalElement.remove();
		}
	}
	render(): React.ReactNode {
		return this.state.isReady
			? ReactDOM.createPortal(
					<div
						data-test-id={this.props.className}
						className={classNames(cx('&'), this.props.className)}
						{...omit(this.props, [
							'className',
							'children',
							'portalId',
							'initialState',
							'callbackId',
						])}
					>
						{this.props.children}
					</div>,
					this.portalElement
			  )
			: null;
	}
}

export default Portal;
