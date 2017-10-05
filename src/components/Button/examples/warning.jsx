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
					<Button style={buttonStyle} kind="warning">Warning</Button>
					<Button kind="warning" isDisabled={true}>Disabled</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="warning" size="short">Short</Button>
					<Button kind="warning" size="short" isDisabled={true}>
						Short disabled
					</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="warning" size="small">Small</Button>
					<Button kind="warning" size="small" isDisabled={true}>
						Small disabled
					</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="warning" size="large">Large</Button>
					<Button kind="warning" size="large" isDisabled={true}>
						Large disabled
					</Button>
				</article>
			</section>
		);
	},
});
