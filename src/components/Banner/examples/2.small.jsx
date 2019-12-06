import React from 'react';
import createClass from 'create-react-class';
import { Banner } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<Banner style={{ marginBottom: 8 }} isSmall={true}>
						Default
					</Banner>
					<Banner
						isCloseable={false}
						style={{ marginBottom: 8 }}
						isSmall={true}
					>
						Default -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>
				<div>
					<Banner kind='success' style={{ marginBottom: 8 }} isSmall={true}>
						Success
					</Banner>
					<Banner
						kind='success'
						isCloseable={false}
						isSmall={true}
						style={{ marginBottom: 8 }}
					>
						Success -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner kind='warning' style={{ marginBottom: 8 }} isSmall={true}>
						Warning
					</Banner>
					<Banner
						kind='warning'
						isCloseable={false}
						isSmall={true}
						style={{ marginBottom: 8 }}
					>
						Warning -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner kind='danger' style={{ marginBottom: 8 }} isSmall={true}>
						Danger
					</Banner>
					<Banner
						kind='danger'
						isCloseable={false}
						style={{ marginBottom: 8 }}
						isSmall={true}
					>
						Danger -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner kind='info' style={{ marginBottom: 8 }} isSmall={true}>
						Info
					</Banner>
					<Banner
						kind='info'
						isCloseable={false}
						style={{ marginBottom: 8 }}
						isSmall={true}
					>
						Info -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner style={{ marginBottom: 8 }} isSmall={true} isFilled={false}>
						Default -- Outline Only
					</Banner>
					<Banner
						kind='success'
						style={{ marginBottom: 8 }}
						isSmall={true}
						isFilled={false}
					>
						Success -- Outline Only
					</Banner>
					<Banner
						kind='warning'
						style={{ marginBottom: 8 }}
						isSmall={true}
						isFilled={false}
					>
						Warning -- Outline Only
					</Banner>
					<Banner
						kind='danger'
						style={{ marginBottom: 8 }}
						isSmall={true}
						isFilled={false}
					>
						Danger -- Outline Only
					</Banner>
					<Banner
						kind='info'
						style={{ marginBottom: 8 }}
						isSmall={true}
						isFilled={false}
					>
						Info -- Outline Only
					</Banner>
				</div>
			</div>
		);
	},
});

// begin-hide-from-docs
export const notes = `
Use small banners inside \`Panels\`. Don't use icons inside small banners.
`;
// end-hide-from-docs
