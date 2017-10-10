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
					<Button style={buttonStyle} kind="danger">Danger</Button>
					<Button kind="danger" isDisabled={true}>Disabled</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="danger" size="short">Short</Button>
					<Button kind="danger" size="short" isDisabled={true}>
						Short disabled
					</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="danger" size="small">Small</Button>
					<Button kind="danger" size="small" isDisabled={true}>
						Small disabled
					</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} kind="danger" size="large">Large</Button>
					<Button kind="danger" size="large" isDisabled={true}>
						Large disabled
					</Button>
				</article>
			</section>
		);
	},
});
