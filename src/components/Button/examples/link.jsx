import React from 'react';
import createClass from 'create-react-class';
import { Button, PlusIcon } from '../../../index';

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
					<Button style={buttonStyle} kind="link">Link</Button>
					<Button style={buttonStyle} kind="link" isDisabled={true}>
						Link disabled
					</Button>
					<Button style={buttonStyle} kind="link"><PlusIcon />Link</Button>
					<Button kind="link" hasOnlyIcon><PlusIcon /></Button>
				</article>
			</section>
		);
	},
});
