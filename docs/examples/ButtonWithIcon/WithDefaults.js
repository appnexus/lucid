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
					<ButtonWithIcon icon={<EditPageIcon />}>Edit</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon icon={<PlusIcon />}>Add New</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon icon={<ViewIcon />}>View details</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon icon={<DownloadIcon />}>Download</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon icon={<DuplicateIcon />}>Duplicate</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon icon={<UploadIcon />}>Upload</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon size="large" icon={<EditPageIcon />}>
						Edit
					</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon size="large" icon={<PlusIcon />}>
						Add New
					</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon size="large" icon={<ViewIcon />}>
						View details
					</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon size="large" icon={<DownloadIcon />}>
						Download
					</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon size="large" icon={<DuplicateIcon />}>
						Duplicate
					</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon size="large" icon={<UploadIcon />}>
						Upload
					</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon kind="invisible" icon={<EditPageIcon />}>
						Edit
					</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon kind="invisible" icon={<PlusIcon />}>
						Add New
					</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon kind="invisible" icon={<ViewIcon />}>
						View details
					</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon kind="invisible" icon={<DownloadIcon />}>
						Download
					</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon kind="invisible" icon={<DuplicateIcon />}>
						Duplicate
					</ButtonWithIcon>
				</article>
				<article style={articleStyle}>
					<ButtonWithIcon kind="invisible" icon={<UploadIcon />}>
						Upload
					</ButtonWithIcon>
				</article>
			</section>
		);
	}
}
