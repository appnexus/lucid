import React from 'react';
import {
	ButtonWithIcon,
	PlusIcon,
	EditPageIcon,
	ViewIcon,
	DownloadIcon,
	DuplicateIcon,
	UploadIcon,
	EditIcon,
	ArrowIcon,
	DeleteIcon,
	SwitchIcon,
	UserIcon,
} from '../../../src/index.js';

const sectionStyle = {
	display: 'flex',
	flexDirection: 'column',
};

const articleStyle = {
	display: 'flex',
	margin: '5px 0px',
};

const buttonStyle = {
	marginRight: '5px',
};

export default class extends React.Component {
	render() {
		return (
			<div>
				<p>Examples of commonly used text and icon combinations.</p>
				<section style={sectionStyle}>
					<article style={articleStyle}>
						<ButtonWithIcon style={buttonStyle} icon={<EditPageIcon />}>
							Edit
						</ButtonWithIcon>
						<ButtonWithIcon style={buttonStyle} icon={<PlusIcon />}>
							Add New
						</ButtonWithIcon>
						<ButtonWithIcon style={buttonStyle} icon={<ViewIcon />}>
							View details
						</ButtonWithIcon>
						<ButtonWithIcon style={buttonStyle} icon={<DownloadIcon />}>
							Download
						</ButtonWithIcon>
						<ButtonWithIcon style={buttonStyle} icon={<DuplicateIcon />}>
							Duplicate
						</ButtonWithIcon>
						<ButtonWithIcon style={buttonStyle} icon={<UploadIcon />}>
							Upload
						</ButtonWithIcon>
						<ButtonWithIcon style={buttonStyle} icon={<EditIcon />}>
							Edit
						</ButtonWithIcon>
						<ButtonWithIcon style={buttonStyle} icon={<ArrowIcon />}>
							Back
						</ButtonWithIcon>
						<ButtonWithIcon style={buttonStyle} icon={<DeleteIcon />}>
							Delete
						</ButtonWithIcon>
						<ButtonWithIcon style={buttonStyle} icon={<SwitchIcon />}>
							View as a Seller
						</ButtonWithIcon>
						<ButtonWithIcon style={buttonStyle} icon={<UserIcon />}>
							View profile
						</ButtonWithIcon>
					</article>
					<article style={articleStyle}>
						<ButtonWithIcon
							style={buttonStyle}
							kind="invisible"
							icon={<EditPageIcon />}
						>
							Edit
						</ButtonWithIcon>
						<ButtonWithIcon
							style={buttonStyle}
							kind="invisible"
							icon={<PlusIcon />}
						>
							Add New
						</ButtonWithIcon>
						<ButtonWithIcon
							style={buttonStyle}
							kind="invisible"
							icon={<ViewIcon />}
						>
							View details
						</ButtonWithIcon>
						<ButtonWithIcon
							style={buttonStyle}
							kind="invisible"
							icon={<DownloadIcon />}
						>
							Download
						</ButtonWithIcon>
						<ButtonWithIcon
							style={buttonStyle}
							kind="invisible"
							icon={<DuplicateIcon />}
						>
							Duplicate
						</ButtonWithIcon>
						<ButtonWithIcon
							style={buttonStyle}
							kind="invisible"
							icon={<UploadIcon />}
						>
							Upload
						</ButtonWithIcon>
						<ButtonWithIcon
							style={buttonStyle}
							kind="invisible"
							icon={<EditIcon />}
						>
							Edit
						</ButtonWithIcon>
						<ButtonWithIcon
							style={buttonStyle}
							kind="invisible"
							icon={<ArrowIcon />}
						>
							Back
						</ButtonWithIcon>
						<ButtonWithIcon
							style={buttonStyle}
							kind="invisible"
							icon={<DeleteIcon />}
						>
							Delete
						</ButtonWithIcon>
						<ButtonWithIcon
							style={buttonStyle}
							kind="invisible"
							icon={<SwitchIcon />}
						>
							View as a Seller
						</ButtonWithIcon>
						<ButtonWithIcon
							style={buttonStyle}
							kind="invisible"
							icon={<UserIcon />}
						>
							View profile
						</ButtonWithIcon>
					</article>

					<article style={articleStyle}>
						<ButtonWithIcon size="large" icon={<PlusIcon />}>
							Button name
						</ButtonWithIcon>
					</article>
				</section>
			</div>
		);
	}
}
