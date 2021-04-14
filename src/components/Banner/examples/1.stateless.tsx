import React from 'react';
import createClass from 'create-react-class';
import { Banner, ChatIcon } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<div>
					<Banner style={{ marginBottom: 8 }}>Default</Banner>
					<Banner isCloseable={false} style={{ marginBottom: 8 }}>
						Default -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>
				<div>
					<Banner kind='success' style={{ marginBottom: 8 }}>
						Success
					</Banner>
					<Banner
						kind='success'
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Success -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner kind='warning' style={{ marginBottom: 8 }}>
						Warning <a href='#'>Don&apos;t Click Here</a>
					</Banner>
					<Banner
						kind='warning'
						isCloseable={false}
						style={{ marginBottom: 8 }}
					>
						Warning -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner kind='danger' style={{ marginBottom: 8 }}>
						Danger
					</Banner>
					<Banner kind='danger' isCloseable={false} style={{ marginBottom: 8 }}>
						Danger -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner kind='info' style={{ marginBottom: 8 }}>
						Info
					</Banner>
					<Banner kind='info' isCloseable={false} style={{ marginBottom: 8 }}>
						Info -- No Close {String.fromCharCode(0x00d7)}
					</Banner>
				</div>

				<div>
					<Banner style={{ marginBottom: 8 }} icon={<ChatIcon />} kind='danger'>
						Has Icon
					</Banner>
				</div>

				<div>
					<Banner style={{ marginBottom: 8 }} isFilled={false}>
						<div>
							Sit totam voluptas error dolorum ullam Quo ipsam esse amet
							mollitia consequuntur Cumque cum nisi porro cumque sit nisi
							Facilis placeat suscipit earum blanditiis eveniet Earum dolor
							voluptates perferendis quis
						</div>
						<div>
							Adipisicing culpa atque totam quidem dicta consequatur fugiat
							quaerat Facilis cupiditate amet nam in perferendis Veritatis iusto
							molestiae illum doloribus deserunt Odit autem obcaecati dolores ad
							incidunt? Ipsa eveniet modi.
						</div>
						<div>
							Lorem sit explicabo vitae illum labore Nostrum inventore dolor
							nisi deserunt voluptatem Voluptas itaque nesciunt omnis
							necessitatibus asperiores! Eius error ab consequatur
							necessitatibus repudiandae quibusdam Odio consequuntur at
							necessitatibus at
						</div>
						<div>
							<a href='#'>Click Me</a>
						</div>
					</Banner>
					<Banner kind='success' style={{ marginBottom: 8 }} isFilled={false}>
						<div>Success -- Outline</div>
						<div>Outline banners are for messages with multi-line content.</div>
					</Banner>
					<Banner kind='warning' style={{ marginBottom: 8 }} isFilled={false}>
						<div>Warning -- Outline</div>
						<div>Outline banners are for messages with multi-line content.</div>
					</Banner>
					<Banner kind='danger' style={{ marginBottom: 8 }} isFilled={false}>
						<div>Danger -- Outline</div>
						<div>Outline banners are for messages with multi-line content.</div>
					</Banner>
					<Banner kind='info' style={{ marginBottom: 8 }} isFilled={false}>
						<div>Info -- Outline</div>
						<div>Outline banners are for messages with multi-line content.</div>
					</Banner>
					<Banner
						style={{ marginBottom: 8 }}
						icon={<ChatIcon />}
						kind='danger'
						isFilled={false}
					>
						<div>Has Icon -- Outline</div>
						<div>Outline banners are for messages with multi-line content.</div>
					</Banner>
				</div>
			</div>
		);
	},
});
