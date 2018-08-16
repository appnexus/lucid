import React from 'react';
import { ButtonWithIcon } from '../../../src/index.js';
import EditPageIcon from '../../../src/components/Icon/EditPageIcon/EditPageIcon';

const sectionStyle = {
	display: 'flex',
	flexDirection: 'column',
};

const articleStyle = {
	display: 'flex',
	margin: '5px 0px',
};

export default class extends React.Component {
	render() {
		return (
			<section style={sectionStyle}>
				<article style={articleStyle}>
					<ButtonWithIcon icon={<EditPageIcon />} />
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon size="short" icon={<EditPageIcon />} />
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon size="small" icon={<EditPageIcon />} />
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon size="large" icon={<EditPageIcon />} />
				</article>
			</section>
		);
	}
}
