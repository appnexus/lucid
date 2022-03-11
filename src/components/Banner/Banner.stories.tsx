import _ from 'lodash';
import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import { ChatIcon } from '../Icon/ChatIcon/ChatIcon';
import { Button } from '../Button/Button';
import { Banner, IBannerProps } from './Banner';

export default {
	title: 'communication/Banner',
	component: Banner,
	parameters: {
		docs: {
			description: {
				component: Banner.peek.description,
			},
		},
	},
	args: Banner.defaultProps,
} as Meta;

export const Basic: Story<IBannerProps> = (args) => (
	<Banner {...args}>Default</Banner>
);

export const Stateful: Story<IBannerProps> = (args) => {
	const [isClosed, setIsClosed] = useState(false);

	return (
		<div>
			<Button
				{...Button.defaultProps}
				onClick={() => setIsClosed(!isClosed)}
				style={{ marginBottom: 8 }}
			>
				Open/Close
			</Button>

			<br />

			<Banner {...args} isClosed={isClosed} onClose={() => setIsClosed(true)}>
				Default
			</Banner>
		</div>
	);
};

export const Stateless: Story<IBannerProps> = (args) => {
	const kinds = [
		{ label: 'Default', value: undefined },
		{ label: 'Success', value: 'success' },
		{ label: 'Warning', value: 'warning' },
		{ label: 'Danger', value: 'danger' },
		{ label: 'Info', value: 'info' },
	];

	return (
		<div>
			{_.map(kinds, ({ label, value }) => (
				<React.Fragment key={`stateless-${label}`}>
					<div>
						<Banner {...args} kind={value as any} style={{ marginBottom: 8 }}>
							{label}
						</Banner>
						<Banner
							{...args}
							kind={value as any}
							isCloseable={false}
							style={{ marginBottom: 8 }}
						>
							{label} -- No Close {String.fromCharCode(0x00d7)}
						</Banner>
					</div>
				</React.Fragment>
			))}

			<div>
				<Banner
					{...args}
					kind='danger'
					icon={<ChatIcon />}
					style={{ marginBottom: 8 }}
				>
					Has Icon
				</Banner>
			</div>

			<div>
				<Banner {...args} isFilled={false} style={{ marginBottom: 8 }}>
					<div>
						Sit totam voluptas error dolorum ullam Quo ipsam esse amet mollitia
						consequuntur Cumque cum nisi porro cumque sit nisi Facilis placeat
						suscipit earum blanditiis eveniet Earum dolor voluptates perferendis
						quis
					</div>
					<div>
						Adipisicing culpa atque totam quidem dicta consequatur fugiat
						quaerat Facilis cupiditate amet nam in perferendis Veritatis iusto
						molestiae illum doloribus deserunt Odit autem obcaecati dolores ad
						incidunt? Ipsa eveniet modi.
					</div>
					<div>
						Lorem sit explicabo vitae illum labore Nostrum inventore dolor nisi
						deserunt voluptatem Voluptas itaque nesciunt omnis necessitatibus
						asperiores! Eius error ab consequatur necessitatibus repudiandae
						quibusdam Odio consequuntur at necessitatibus at
					</div>
					<div>
						<a href='#'>Click Me</a>
					</div>
				</Banner>
			</div>

			{_.map(kinds, ({ label, value }) => (
				<React.Fragment key={`stateless-outline-${label}`}>
					<div>
						<Banner
							{...args}
							kind={value as any}
							isFilled={false}
							style={{ marginBottom: 8 }}
						>
							<div>{label} -- Outline</div>
							<div>
								Outline banners are for messages with multi-line content.
							</div>
						</Banner>
					</div>
				</React.Fragment>
			))}

			<div>
				<Banner
					{...args}
					kind='danger'
					icon={<ChatIcon />}
					isFilled={false}
					style={{ marginBottom: 8 }}
				>
					<div>Has Icon -- Outline</div>
					<div>Outline banners are for messages with multi-line content.</div>
				</Banner>
			</div>
		</div>
	);
};

export const Small: Story<IBannerProps> = (args) => {
	const kinds = [
		{ label: 'Default', value: undefined },
		{ label: 'Success', value: 'success' },
		{ label: 'Warning', value: 'warning' },
		{ label: 'Danger', value: 'danger' },
		{ label: 'Info', value: 'info' },
	];

	return (
		<div>
			{_.map(kinds, ({ label, value }) => (
				<React.Fragment key={`sm-${label}`}>
					<div>
						<Banner
							{...args}
							isSmall={true}
							kind={value as any}
							style={{ marginBottom: 8 }}
						>
							{label}
						</Banner>
						<Banner
							{...args}
							isSmall={true}
							kind={value as any}
							isCloseable={false}
							style={{ marginBottom: 8 }}
						>
							{label} -- No Close {String.fromCharCode(0x00d7)}
						</Banner>
					</div>
				</React.Fragment>
			))}

			{_.map(kinds, ({ label, value }) => (
				<React.Fragment key={`sm-outline-${label}`}>
					<div>
						<Banner
							{...args}
							isSmall={true}
							kind={value as any}
							isFilled={false}
							style={{ marginBottom: 8 }}
						>
							{label} -- Outline Only
						</Banner>
					</div>
				</React.Fragment>
			))}
		</div>
	);
};
