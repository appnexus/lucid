import React from 'react';
import PropTypes from 'react-peek/prop-types';
import ReactDOM from 'react-dom';
import { createClass, omitProps } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import classNames from 'classnames';

const cx = lucidClassNames.bind('&-Portal');

const { any, node, string } = PropTypes;

const Portal = createClass({
	displayName: 'Portal',

	statics: {
		peek: {
			description: `
				A Portal component is used to render content in a container that is
				appended to \`document.body\`.
			`,
			categories: ['utility'],
		},
	},

	propTypes: {
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
	},

	getInitialState() {
		return { isReady: false };
	},

	componentDidMount() {
		const { portalId } = this.props;

		let portalElement;

		if (portalId) {
			portalElement = document.getElementById(portalId);
		}

		if (!portalElement) {
			this.manuallyCreatedPortal = true;
			portalElement = document.createElement('div');
			portalElement.id = portalId;
			document.body.appendChild(portalElement);
		}

		this.portalElement = portalElement;
		this.setState({ isReady: true });
	},

	componentWillUnmount() {
		if (this.manuallyCreatedPortal) {
			this.portalElement.remove();
		}
	},

	render() {
		return this.state.isReady
			? ReactDOM.createPortal(
					<div
						className={classNames(cx('&'), this.props.className)}
						{...omitProps(this.props, Portal)}
					>
						{this.props.children}
					</div>,
					this.portalElement
				)
			: null;
	},
});

export default Portal;
