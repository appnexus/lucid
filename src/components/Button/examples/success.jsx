import React from 'react';
import createClass from 'create-react-class';
import { Button } from '../../../index';

const sectionStyle = {
	display: 'flex',
	'flex-direction': 'column',
};

const articleStyle = {
	display: 'flex',
	margin: '5px 0',
};

const buttonStyle = {
	'margin-right': '5px',
};

export default createClass({
	render() {
		return (
			<section style={sectionStyle}>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="success">Success</Button>
					<Button kind="success" isDisabled={true}>Disabled</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="success" size="short">Short</Button>
					<Button kind="success" size="short" isDisabled={true}>
						Short disabled
					</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="success" size="small">Small</Button>
					<Button kind="success" size="small" isDisabled={true}>
						Small disabled
					</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="success" size="large">Large</Button>
					<Button kind="success" size="large" isDisabled={true}>
						Large disabled
					</Button>
				</article>
			</section>
		);
	},
});
