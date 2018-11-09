import React from 'react';
import _ from 'lodash';
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

const icons = [
	[<ArrowIcon />, 'Back'],
	[<DeleteIcon />, 'Delete'],
	[<DownloadIcon />, 'Download'],
	[<DuplicateIcon />, 'Duplicate'],
	[<EditIcon />, 'Edit'],
	[<EditPageIcon />, 'Edit'],
	[<PlusIcon />, 'Add New'],
	[<SwitchIcon />, 'View as a Seller'],
	[<UploadIcon />, 'Upload'],
	[<UserIcon />, 'View Profile'],
	[<ViewIcon />, 'View Details'],
];

export default class extends React.Component {
	render() {
		return (
			<div>
				<p>Examples of commonly used text and icon combinations.</p>
				<section
					style={{
						display: 'grid',
						gridTemplateColumns: `repeat(${icons.length}, 1fr)`,
						gridColumnGap: 6,
						gridRowGap: 6,
					}}
				>
					{_.map(icons, ([icon, text]) => (
						<div>
							<ButtonWithIcon icon={icon}>{text}</ButtonWithIcon>
						</div>
					))}
					{_.map(icons, ([icon, text]) => (
						<div>
							<ButtonWithIcon kind="invisible" icon={icon}>
								{text}
							</ButtonWithIcon>
						</div>
					))}
					{_.map(icons, ([icon, text]) => (
						<div>
							<ButtonWithIcon size="short" icon={icon}>
								{text}
							</ButtonWithIcon>
						</div>
					))}
					{_.map(icons, ([icon, text]) => (
						<div>
							<ButtonWithIcon size="small" icon={icon}>
								{text}
							</ButtonWithIcon>
						</div>
					))}
					{_.map(icons, ([icon, text]) => (
						<div>
							<ButtonWithIcon size="large" icon={icon}>
								{text}
							</ButtonWithIcon>
						</div>
					))}
				</section>
			</div>
		);
	}
}
