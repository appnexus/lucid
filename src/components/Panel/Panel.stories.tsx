import React from 'react';
import { Meta, Story } from '@storybook/react';

import Button from '../Button/Button';
import Table from '../Table/Table';
import Panel, { IPanelProps } from './Panel';
import SettingsIcon from '../Icon/SettingsIcon/SettingsIcon';

export default {
	title: 'Layout/Panel',
	component: Panel,
	parameters: {
		docs: {
			description: {
				component: Panel.peek.description,
			},
		},
	},
} as Meta;

/* With Content */
export const WithContent: Story<IPanelProps> = (args) => {
	return (
		<Panel {...args}>
			Coloring book 8-bit gluten-free jean shorts, occupy blog intelligentsia
			pour-over biodiesel small batch waistcoat 90's pork belly. Intelligentsia
			fashion axe sartorial vinyl literally, post-ironic hoodie selfies keytar
			man braid kickstarter af PBR&B. Direct trade fanny pack pitchfork
			kombucha, salvia semiotics hell of gluten-free tumeric helvetica. Photo
			booth lyft fingerstache VHS lumbersexual shoreditch, subway tile vegan
			tumblr man bun PBR&B banjo. Banh mi sriracha hashtag, quinoa hell of
			subway tile sartorial normcore vexillologist godard. Asymmetrical fanny
			pack bicycle rights snackwave iPhone, single-origin coffee ramps truffaut
			hammock brooklyn 90's marfa trust fund. Cray fingerstache direct trade,
			you probably haven't heard of them chicharrones crucifix pok pok. Bicycle
			rights disrupt taxidermy YOLO chicharrones. Poke cronut chillwave, pug
			meditation knausgaard church-key marfa chicharrones bitters paleo neutra
			photo booth sustainable shoreditch. Microdosing polaroid vape drinking
			vinegar franzen. Next level kogi occupy, cornhole aesthetic subway tile
			waistcoat hoodie you probably haven't heard of them butcher flannel paleo
			church-key tumblr. Cornhole raw denim mustache schlitz mumblecore hammock
			twee, whatever kitsch gochujang irony. Migas crucifix cornhole prism
			messenger bag microdosing heirloom. Lyft kombucha pork belly swag.
		</Panel>
	);
};

/* With Header */
export const WithHeader: Story<IPanelProps> = (args) => {
	return (
		<Panel {...args}>
			<Panel.Header>
				<span>Header</span>
			</Panel.Header>
			Meditation literally chia, schlitz banh mi mlkshk vape ennui art party.
			Succulents tumeric tumblr echo park hella umami. Pickled four loko
			hashtag, tbh bitters tofu pinterest quinoa retro. Raclette cred fanny pack
			tattooed chartreuse wayfarers brooklyn pabst, mixtape shabby chic
			kombucha. Meggings hashtag sriracha raclette post-ironic. Umami brunch
			stumptown salvia, disrupt lomo activated charcoal retro. Pok pok irony yr,
			semiotics distillery pug sriracha ramps drinking vinegar fanny pack.
			Forage selfies poutine disrupt, fashion axe craft beer 8-bit stumptown
			pabst food truck slow-carb wolf photo booth DIY gastropub. Bushwick austin
			activated charcoal poutine small batch polaroid. Venmo poutine umami
			biodiesel, seitan four dollar toast cold-pressed jean shorts gentrify
			meditation leggings street art selfies. Squid raclette you probably
			haven't heard of them selfies church-key vice. Woke intelligentsia viral,
			green juice seitan listicle kale chips yr la croix organic vaporware
			vexillologist tattooed neutra. Chambray sustainable unicorn neutra
			aesthetic, 8-bit farm-to-table DIY organic authentic woke. YOLO four
			dollar toast pop-up, tacos listicle chicharrones single-origin coffee raw
			denim yuccie.
		</Panel>
	);
};

/* With Icon Header */
export const WithIconHeader: Story<IPanelProps> = (args) => {
	return (
		<Panel {...args}>
			<Panel.Header>
				<SettingsIcon size={32} style={{ marginRight: '15px' }} />
				<span>Header</span>
			</Panel.Header>
			Meditation literally chia, schlitz banh mi mlkshk vape ennui art party.
			Succulents tumeric tumblr echo park hella umami. Pickled four loko
			hashtag, tbh bitters tofu pinterest quinoa retro. Raclette cred fanny pack
			tattooed chartreuse wayfarers brooklyn pabst, mixtape shabby chic
			kombucha. Meggings hashtag sriracha raclette post-ironic. Umami brunch
			stumptown salvia, disrupt lomo activated charcoal retro. Pok pok irony yr,
			semiotics distillery pug sriracha ramps drinking vinegar fanny pack.
			Forage selfies poutine disrupt, fashion axe craft beer 8-bit stumptown
			pabst food truck slow-carb wolf photo booth DIY gastropub. Bushwick austin
			activated charcoal poutine small batch polaroid. Venmo poutine umami
			biodiesel, seitan four dollar toast cold-pressed jean shorts gentrify
			meditation leggings street art selfies. Squid raclette you probably
			haven't heard of them selfies church-key vice. Woke intelligentsia viral,
			green juice seitan listicle kale chips yr la croix organic vaporware
			vexillologist tattooed neutra. Chambray sustainable unicorn neutra
			aesthetic, 8-bit farm-to-table DIY organic authentic woke. YOLO four
			dollar toast pop-up, tacos listicle chicharrones single-origin coffee raw
			denim yuccie.
		</Panel>
	);
};

/* With Header And Footer */
export const WithHeaderAndFooter: Story<IPanelProps> = (args) => {
	return (
		<Panel {...args}>
			<Panel.Header>
				<strong>Header</strong>
			</Panel.Header>
			Thundercats fam glossier, affogato microdosing +1 photo booth yuccie
			flannel iceland. Umami wayfarers tousled, deep v glossier fanny pack
			single-origin coffee la croix tofu crucifix mlkshk edison bulb. Tofu four
			loko tbh, trust fund semiotics schlitz succulents snackwave. Tilde
			live-edge XOXO, stumptown skateboard flexitarian distillery trust fund
			semiotics selvage. Kale chips artisan twee humblebrag selfies. Scenester
			woke truffaut plaid meditation freegan. Prism everyday carry post-ironic
			+1 wolf, copper mug kale chips tilde ethical jianbing jean shorts
			flexitarian. Fanny pack quinoa heirloom put a bird on it, venmo banjo
			church-key +1 sartorial cardigan paleo edison bulb DIY. Scenester four
			loko synth unicorn cardigan shoreditch. Ugh seitan chambray swag vice.
			Pork belly hammock cardigan, live-edge snackwave intelligentsia biodiesel.
			Vegan meggings drinking vinegar crucifix iPhone hoodie. Kickstarter before
			they sold out distillery, next level umami echo park chillwave iceland
			fanny pack XOXO actually. Street art try-hard master cleanse listicle,
			microdosing sartorial raw denim squid.
			<Panel.Footer>
				<Button {...Button.defaultProps}>Save</Button>
			</Panel.Footer>
		</Panel>
	);
};

/* Scrollable Content */
export const ScrollableContent: Story<IPanelProps> = (args) => {
	return (
		<Panel {...args} style={{ height: 240 }}>
			<Panel.Header>
				<strong>Header</strong>
			</Panel.Header>
			Tacos everyday carry vexillologist, health goth poutine portland raw denim
			synth sriracha listicle iceland jianbing. Chambray tumeric tousled
			typewriter, bespoke franzen lomo. Yuccie live-edge ugh asymmetrical
			aesthetic cornhole. Salvia post-ironic schlitz, tbh kickstarter yuccie
			ramps shoreditch godard wolf live-edge next level vinyl. Live-edge chia
			hashtag, kale chips shoreditch salvia blog butcher brooklyn cornhole.
			Succulents literally venmo flannel pug direct trade. Cornhole squid
			selvage, thundercats photo booth paleo iceland chartreuse vexillologist
			hot chicken. Normcore kale chips unicorn vaporware cardigan mustache
			thundercats squid hexagon. Woke vinyl letterpress, tattooed artisan
			taxidermy craft beer tacos thundercats cardigan fap plaid gastropub pork
			belly. Pabst coloring book gochujang four dollar toast fixie. Photo booth
			skateboard gluten-free, neutra pug tousled jean shorts normcore crucifix
			banh mi 3 wolf moon. Shabby chic flexitarian umami, pabst literally
			pickled selvage everyday carry next level mixtape drinking vinegar four
			dollar toast coloring book. Cardigan vice schlitz, subway tile jean shorts
			deep v vexillologist lo-fi trust fund plaid brunch taxidermy shabby chic
			blue bottle gochujang. Meggings four loko before they sold out small
			batch. Activated charcoal meh vice irony kinfolk la croix, fam disrupt
			church-key shoreditch thundercats offal fanny pack. Mustache small batch
			portland hashtag blog, lo-fi cray hot chicken ramps. Cornhole green juice
			cardigan shoreditch butcher, literally microdosing freegan wolf la croix
			schlitz raclette occupy. Chicharrones authentic vexillologist marfa
			glossier. Next level heirloom street art small batch lyft narwhal. Etsy
			cornhole direct trade, narwhal celiac humblebrag chambray selvage.
			Gentrify master cleanse mixtape taxidermy shoreditch tofu, blue bottle
			banh mi meh tbh kale chips woke meggings fanny pack. Keffiyeh celiac
			cardigan, polaroid slow-carb bitters intelligentsia unicorn squid ugh.
			Farm-to-table venmo four dollar toast godard you probably haven't heard of
			them, truffaut fashion axe gastropub before they sold out retro organic
			thundercats pitchfork subway tile next level. Sriracha normcore roof party
			mustache flexitarian jianbing. Food truck blog meggings yuccie franzen
			forage. Mixtape woke blue bottle green juice yuccie. Meggings
			intelligentsia food truck, subway tile post-ironic activated charcoal chia
			authentic schlitz venmo. Quinoa offal vexillologist, skateboard YOLO marfa
			banh mi yr typewriter green juice.
			<Panel.Footer>
				<strong>Footer</strong>
			</Panel.Footer>
		</Panel>
	);
};

/* No Margins */
export const NoMargins: Story<IPanelProps> = (args) => {
	const { Thead, Tbody, Th, Tr, Td } = Table;

	return (
		<Panel {...args} hasMargin={false}>
			<Panel.Header>
				<strong>Header</strong>
			</Panel.Header>

			<Table style={{ width: '100%' }}>
				<Thead>
					<Tr>
						<Th>Cell</Th>
						<Th>Cell</Th>
						<Th>Cell</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
				</Tbody>
			</Table>
		</Panel>
	);
};

/* No Content Padding */
export const NoContentPadding: Story<IPanelProps> = (args) => {
	const { Thead, Tbody, Th, Tr, Td } = Table;

	return (
		<Panel {...args} isGutterless={true}>
			<Panel.Header>
				<strong>Header</strong>
			</Panel.Header>

			<Table style={{ width: '100%' }}>
				<Thead>
					<Tr>
						<Th>Cell</Th>
						<Th>Cell</Th>
						<Th>Cell</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
				</Tbody>
			</Table>
		</Panel>
	);
};

/* No Margins Or Content Padding */
export const NoMarginsOrContentPadding: Story<IPanelProps> = (args) => {
	const { Thead, Tbody, Th, Tr, Td } = Table;

	return (
		<Panel {...args} hasMargin={false} isGutterless={true}>
			<Panel.Header>
				<strong>Header</strong>
			</Panel.Header>

			<Table style={{ width: '100%' }}>
				<Thead>
					<Tr>
						<Th>Cell</Th>
						<Th>Cell</Th>
						<Th>Cell</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
					<Tr>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</Tr>
				</Tbody>
			</Table>
		</Panel>
	);
};
