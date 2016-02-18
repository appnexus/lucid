import React from 'react';
import ReactDOM from 'react-dom';

const {
	PropTypes: {
		string
	}
} = React;

/**
 *
 * {"categories": ["utility"]}
 *
 * A portal component which is rendered as a direct child of document.body.
 */
const Portal = React.createClass({
	propTypes: {
		portalId: string.isRequired
	},
	render: () => null,
	portalElement: null,
	componentDidMount() {
		let {
			portalId
		} = this.props;
		let portalElement = window.document.getElementById(portalId);
		if (!portalElement) {
			portalElement = window.document.createElement('div');
			portalElement.id = portalId;
			window.document.body.appendChild(portalElement);
		}
		this.portalElement = portalElement;
		this.componentDidUpdate();
	},
	componentWillUnmount() {
		window.document.body.removeChild(this.portalElement);
	},
	componentDidUpdate() {
		ReactDOM.render(<div {...this.props}>{this.props.children}</div>, this.portalElement);
	}
});

export default Portal;
