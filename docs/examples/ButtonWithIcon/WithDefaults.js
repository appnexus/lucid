import React from 'react';
import { ButtonWithIcon } from '../../../src/index.js';
import PlusIcon from '../../../src/components/Icon/PlusIcon/PlusIcon';
import EditPageIcon from '../../../src/components/Icon/EditPageIcon/EditPageIcon';
import ViewIcon from '../../../src/components/Icon/ViewIcon/ViewIcon';
import DownloadIcon from '../../../src/components/Icon/DownloadIcon/DownloadIcon';
import DuplicateIcon from '../../../src/components/Icon/DuplicateIcon/DuplicateIcon';
import UploadIcon from '../../../src/components/Icon/UploadIcon/UploadIcon';

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
