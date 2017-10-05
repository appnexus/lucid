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
					<Button style={buttonStyle} kind="primary">Primary</Button>
					<Button kind="primary" isDisabled={true}>Disabled</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="primary" size="short">Short</Button>
					<Button kind="primary" size="short" isDisabled={true}>
						Short disabled
					</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="primary" size="small">Small</Button>
					<Button kind="primary" size="small" isDisabled={true}>
						Small disabled
					</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="primary" size="large">Large</Button>
					<Button kind="primary" size="large" isDisabled={true}>
						Large disabled
					</Button>
				</article>
			</section>
		);
	},
});
