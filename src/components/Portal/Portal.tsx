import React from 'react';
import PropTypes from 'react-peek/prop-types';
import ReactDOM from 'react-dom';
import { omitProps, StandardProps } from '../../util/component-types';
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
		description: `
			A Portal component is used to render content in a container that is
			appended to \`document.body\`.
		`,
		categories: ['utility'],
	};
	static propTypes = {
		children: node`
			any valid React children
		`,

		className: any`
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		`,

		portalId: string`
			The \`id\` of the portal element that is appended to \`document.body\`.
		`,
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
						className={classNames(cx('&'), this.props.className)}
						{...omitProps(this.props, undefined, Object.keys(Portal.propTypes))}
					>
						{this.props.children}
					</div>,
					this.portalElement
			  )
			: null;
	}
}

export default Portal;
