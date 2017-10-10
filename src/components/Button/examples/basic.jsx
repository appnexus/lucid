import React from 'react';
import createClass from 'create-react-class';
import { Button, CheckIcon } from '../../../index';

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
					<Button style={buttonStyle}>Default</Button>
					<Button style={buttonStyle}><CheckIcon />Default</Button>
					<Button style={buttonStyle} hasOnlyIcon={true}><CheckIcon /></Button>
					<Button style={buttonStyle} isDisabled={true}>
						Default disabled
					</Button>
					<Button isActive={true}>Default active</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} size="short">Short</Button>
					<Button style={buttonStyle} size="short"><CheckIcon />Short</Button>
					<Button style={buttonStyle} size="short" hasOnlyIcon={true}>
						<CheckIcon />
					</Button>
					<Button style={buttonStyle} size="short" isDisabled={true}>
						Short disabled
					</Button>
					<Button size="short" isActive={true}>Short active</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} size="small">Small</Button>
					<Button style={buttonStyle} size="small"><CheckIcon />Small</Button>
					<Button style={buttonStyle} size="small" hasOnlyIcon={true}>
						<CheckIcon />
					</Button>
					<Button style={buttonStyle} size="small" isDisabled={true}>
						Small disabled
					</Button>
					<Button size="small" isActive={true}>Small active</Button>
				</article>
				<article style={articleStyle}>
					<Button style={buttonStyle} size="large">Large</Button>
					<Button style={buttonStyle} size="large"><CheckIcon />Large</Button>
					<Button style={buttonStyle} size="large" hasOnlyIcon={true}>
						<CheckIcon />
					</Button>
					<Button style={buttonStyle} size="large" isDisabled={true}>
						Large disabled
					</Button>
					<Button size="large" isActive={true}>Large active</Button>
				</article>
			</section>
		);
	},
});
