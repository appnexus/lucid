import React, { useState } from 'react';
import createClass from 'create-react-class';
import { Meta, Story } from '@storybook/react';

import Submarine, { ISubmarineProps } from './Submarine';

export default {
	title: 'Layout/Submarine',
	component: Submarine,
	parameters: {
		docs: {
			description: {
				component: Submarine.peek.description,
			},
		},
	},
	args: Submarine.defaultProps,
} as Meta;

/* Basic */
export const Basic: Story<ISubmarineProps> = (args) => {
	return (
		<section
			style={{
				height: 300,
				background: 'lightgray',
				outline: '1px solid lightgray',
			}}
		>
			<Submarine {...args}>
				<Submarine.Bar>
					Minim 90's paleo retro, fugiat aliqua hashtag enim photo booth
					listicle next level. Consectetur fap proident magna culpa. Art party
					meh ad, four loko slow-carb venmo distillery wolf cornhole nisi.
				</Submarine.Bar>
				<Submarine.Primary>
					Twee iPhone intelligentsia, schlitz normcore cold-pressed hella
					sapiente meh adipisicing sustainable kogi sed. Letterpress plaid aute,
					brunch chillwave anim mlkshk. Farm-to-table austin post-ironic, man
					bun gluten-free nesciunt sartorial tacos tousled kickstarter shabby
					chic migas. Kombucha flannel before they sold out elit voluptate
					pinterest chambray, odio stumptown street art. Kitsch humblebrag
					actually, cillum kale chips hashtag shoreditch pariatur waistcoat
					pop-up consequat leggings try-hard. Marfa crucifix seitan health goth
					portland. Cliche ennui vero, whatever swag kogi ugh fixie wayfarers
					before they sold out irure culpa marfa mlkshk bushwick.
				</Submarine.Primary>
			</Submarine>
		</section>
	);
};

/* Hidden Bar */
export const HiddenBar: Story<ISubmarineProps> = (args) => {
	const [isHidden, setIsHidden] = useState(true);

	const handleToggleIsHidden = () => {
		setIsHidden(!isHidden);
	};

	return (
		<section>
			<button onClick={handleToggleIsHidden}>toggle `isHidden`</button>

			<section
				style={{
					height: 300,
					background: 'lightgray',
					outline: '1px solid lightgray',
				}}
			>
				<Submarine {...args} isHidden={isHidden}>
					<Submarine.Title>
						This can be totally hidden from view
					</Submarine.Title>

					<Submarine.Bar>
						Slow-carb meditation four loko, kickstarter umami tilde craft beer
						kombucha deep v plaid yr cardigan gastropub ennui snackwave. Vape
						health goth selvage twee lumbersexual, tattooed iceland cred street
						art slow-carb craft beer pinterest banjo typewriter pop-up. Echo
						park bicycle rights put a bird on it, sriracha blue bottle ethical
						pinterest readymade messenger bag. Tousled slow-carb occupy
						messenger bag readymade, leggings celiac cloud bread tofu. Wayfarers
						chia jianbing, twee yuccie seitan meggings food truck meh neutra
						bushwick mlkshk four loko. Franzen unicorn tofu lumbersexual
						waistcoat. Taxidermy gluten-free yuccie vinyl waistcoat.
					</Submarine.Bar>

					<Submarine.Primary>
						Pickled pinterest hot chicken taxidermy edison bulb. Butcher austin
						listicle fingerstache unicorn flexitarian. Tumblr cred quinoa
						normcore, mumblecore cardigan cold-pressed dreamcatcher craft beer
						ad direct trade vero accusamus cray. Roof party chia shabby chic
						synth.
					</Submarine.Primary>
				</Submarine>
			</section>
		</section>
	);
};

/* Title Shown Collapsed */
export const TitleShownCollapsed: Story<ISubmarineProps> = (args) => {
	return (
		<section
			style={{
				height: 300,
				background: 'lightgray',
				outline: '1px solid lightgray',
			}}
		>
			<Submarine {...args} isTitleShownCollapsed={true}>
				<Submarine.Title>
					Submarine Title Stays While Collapsed!
				</Submarine.Title>
				<Submarine.Bar>
					Minim 90's paleo retro, fugiat aliqua hashtag enim photo booth
					listicle next level. Consectetur proident magna culpa. Art party meh
					ad, four loko slow-carb venmo distillery wolf cornhole nisi. Truffaut
					meditation cray small batch, schlitz master cleanse cliche taxidermy
					labore gochujang bitters. Synth fixie banh mi bushwick shoreditch
					cold-pressed.
				</Submarine.Bar>
				<Submarine.Primary>
					Helvetica narwhal irony, hoodie leggings occaecat tattooed authentic
					cred. Tumblr cred quinoa normcore, mumblecore cardigan cold-pressed
					dreamcatcher craft beer ad direct trade vero accusamus cray. Roof
					party chia shabby chic synth. Pariatur organic before they sold out
					everyday carry food truck. Labore four loko nihil, narwhal actually
					infolk mustache jean shorts. Meh kickstarter chicharrones williamsburg
					bushwick yr, PBR&B fap. Lo-fi leggings magna yuccie, tattooed
					accusamus blog literally gochujang listicle cliche humblebrag swag
					kombucha tousled.
				</Submarine.Primary>
			</Submarine>
		</section>
	);
};

/* Disable Resize */
export const DisableResize: Story<ISubmarineProps> = (args) => {
	return (
		<section
			style={{
				height: 300,
				background: 'lightgray',
				outline: '1px solid lightgray',
			}}
		>
			<Submarine {...args} isResizeDisabled={true}>
				<Submarine.Bar>
					Cold-pressed aesthetic biodiesel twee, heirloom vice iPhone austin.
					Truffaut wolf offal roof party, neutra yr drinking vinegar bitters
					single-origin coffee austin mlkshk mixtape semiotics blog. Pickled
					squid asymmetrical locavore before they sold out whatever.
				</Submarine.Bar>
				<Submarine.Primary>
					Chartreuse keffiyeh meggings church-key, gochujang 90's messenger bag.
					Chillwave poutine cronut whatever occupy, squid vice organic. Tilde
					kinfolk whatever VHS. Swag gentrify put a bird on it, pour-over jean
					shorts knausgaard cray twee single-origin coffee lo-fi church-key
					cronut. Pabst tousled selfies try-hard. Sartorial cred ethical, food
					truck leggings next level sustainable flexitarian chillwave knausgaard
					pitchfork. Direct trade poutine photo booth mustache, cliche semiotics
					skateboard 90's. Meggings actually distillery small batch pickled
					quinoa. Migas williamsburg polaroid trust fund. Slow-carb truffaut
					chia, single-origin coffee meggings cornhole four loko chambray put a
					bird on it art party semiotics. Food truck mumblecore VHS photo booth,
					brunch direct trade flexitarian before they sold out truffaut squid
					cred everyday carry salvia neutra. Lo-fi chartreuse semiotics, paleo
					butcher knausgaard direct trade gentrify post-ironic. XOXO craft beer
					affogato YOLO, raw denim umami irony pabst echo park humblebrag ugh
					plaid. Master cleanse tilde tattooed, bushwick seitan selfies four
					dollar toast hashtag trust fund sartorial cliche.
				</Submarine.Primary>
			</Submarine>
		</section>
	);
};

/* Initial Collapsed */
export const InitialCollapsed: Story<ISubmarineProps> = (args) => {
	return (
		<section
			style={{
				height: 300,
				background: 'lightgray',
				outline: '1px solid lightgray',
			}}
		>
			<Submarine {...args} initialState={{ isExpanded: false }}>
				<Submarine.Bar>
					Try-hard cornhole ea artisan, laborum wolf eiusmod chillwave irure.
					Lomo chicharrones taxidermy narwhal. Cronut deep v PBR&B photo booth
					tilde. Asymmetrical waistcoat williamsburg 3 wolf moon, poutine magna
					dreamcatcher disrupt eiusmod thundercats farm-to-table lumbersexual
					nisi mlkshk tote bag.
				</Submarine.Bar>
				<Submarine.Primary>
					Celiac ad skateboard twee PBR&B. XOXO freegan pitchfork, waistcoat
					listicle flexitarian mollit adipisicing. Delectus freegan et
					sartorial, velit occupy exercitation fingerstache +1 ramps.
					Exercitation pitchfork kale chips, eu everyday carry nostrud aesthetic
					etsy health goth DIY nisi fingerstache wolf neutra velit. Migas
					helvetica odio taxidermy. Truffaut meditation cray small batch,
					schlitz master cleanse cliche taxidermy labore gochujang bitters.
					Synth fixie banh mi bushwick shoreditch cold-pressed.
				</Submarine.Primary>
			</Submarine>
		</section>
	);
};

/* Position Top */
export const PositionTop = (args) => {
	return (
		<section
			style={{
				height: 300,
				background: 'lightgray',
				outline: '1px solid lightgray',
			}}
		>
			<Submarine {...args} position='top'>
				<Submarine.Bar>
					Paleo art party disrupt, consequat kogi fashion axe tofu trust fund
					raw denim readymade. Seitan banjo salvia organic ethical. Next level
					pork belly sustainable tumblr nostrud.
				</Submarine.Bar>
				<Submarine.Primary>
					Do nesciunt lumbersexual excepteur adipisicing tacos green juice
					readymade semiotics, pinterest tofu VHS. Paleo dreamcatcher mollit,
					hoodie four dollar toast typewriter kitsch magna aliquip ethical sunt
					tattooed. Four dollar toast stumptown umami gastropub heirloom
					flexitarian. Nihil williamsburg incididunt whatever. Godard commodo
					bespoke tofu. Selvage polaroid echo park hella, beard flexitarian roof
					party dolor. Consequat kickstarter ea, sint minim selfies wolf
					cupidatat everyday carry.
				</Submarine.Primary>
			</Submarine>
		</section>
	);
};

/* Custom Title */
export const CustomTitle: Story<ISubmarineProps> = (args) => {
	return (
		<section
			style={{
				height: 300,
				background: 'lightgray',
				outline: '1px solid lightgray',
			}}
		>
			<Submarine {...args}>
				<Submarine.Title>Submarine Title</Submarine.Title>
				<Submarine.Bar>
					You can also set the <code>title</code> or <code>Title</code> prop on{' '}
					<code>{'<Submarine>'}</code> or <code>{'<Submarine.Bar>'}</code>.
				</Submarine.Bar>
				<Submarine.Primary>
					Helvetica narwhal irony, hoodie leggings occaecat tattooed authentic
					cred. Tumblr cred quinoa normcore, mumblecore cardigan cold-pressed
					dreamcatcher craft beer ad direct trade vero accusamus cray. Roof
					party chia shabby chic synth. Pariatur organic before they sold out
					everyday carry food truck. Labore four loko nihil, narwhal actually
					kinfolk mustache jean shorts. Meh kickstarter chicharrones
					williamsburg bushwick yr, PBR&B fap. Lo-fi leggings magna yuccie,
					tattooed accusamus blog literally gochujang listicle cliche humblebrag
					swag kombucha tousled.
				</Submarine.Primary>
			</Submarine>
		</section>
	);
};

/* Custom Height */
export const CustomHeight: Story<ISubmarineProps> = (args) => {
	return (
		<section
			style={{
				height: 300,
				background: 'lightgray',
				outline: '1px solid lightgray',
			}}
		>
			<Submarine {...args} height={100}>
				<Submarine.Bar>
					Meditation photo booth actually chicharrones sed consectetur voluptate
					stumptown. Food truck nihil ut mixtape, ex deep v polaroid aesthetic.
					Duis street art stumptown nihil, aliquip vero VHS heirloom waistcoat
					adipisicing post-ironic lo-fi biodiesel.
				</Submarine.Bar>
				<Submarine.Primary>
					Trust fund vegan godard beard, portland humblebrag placeat neutra
					chambray retro ugh kitsch flannel sapiente mustache. Cred placeat
					helvetica cray, do before they sold out tilde. Deserunt everyday carry
					brooklyn kombucha yr fanny pack banh mi, eiusmod intelligentsia tempor
					tacos. Waistcoat neutra kale chips, keffiyeh ex nulla gochujang
					crucifix duis typewriter hashtag reprehenderit. Ad nihil mixtape
					8-bit, photo booth anim post-ironic vegan qui put a bird on it
					crucifix. Waistcoat chartreuse ethical, adipisicing jean shorts direct
					trade PBR&B humblebrag pariatur nulla mollit stumptown listicle.
					Flannel williamsburg vice flexitarian bespoke elit.
				</Submarine.Primary>
			</Submarine>
		</section>
	);
};

/* Control Expand */
export const ControlExpand: Story<ISubmarineProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<section>
			<button onClick={handleToggle}>toggle</button>

			<section
				style={{
					height: 300,
					background: 'lightgray',
					outline: '1px solid lightgray',
				}}
			>
				<Submarine {...args} isExpanded={isExpanded} onToggle={handleToggle}>
					<Submarine.Bar>
						Paleo williamsburg retro, mumblecore deserunt typewriter magna raw
						denim taxidermy. Quinoa incididunt hoodie, ea synth four loko
						everyday carry lomo vice humblebrag forage assumenda ad small batch
						reprehenderit.
					</Submarine.Bar>
					<Submarine.Primary>
						Migas esse paleo nesciunt, mollit velit franzen tempor YOLO iPhone
						thundercats. Keytar tilde raw denim shabby chic quinoa typewriter.
						Shabby chic tousled labore jean shorts, veniam XOXO mustache. Marfa
						dreamcatcher hammock cupidatat kitsch, selvage cornhole dolor. Odio
						salvia slow-carb hammock XOXO, nulla normcore jean shorts magna
						master cleanse tote bag ea. Pitchfork marfa tote bag shoreditch,
						retro selvage tempor 90's kogi adipisicing asymmetrical tousled.
						Pork belly asymmetrical nesciunt, keytar jean shorts mlkshk
						scenester sriracha man bun placeat tacos post-ironic officia art
						party.
					</Submarine.Primary>
				</Submarine>
			</section>
		</section>
	);
};

/* Handle Toggle And Resize */
export const HandleToggleAndResize: Story<ISubmarineProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [resizeHeight, setResizeHeight] = useState(null);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	const handleResizing = (height: any) => {
		setResizeHeight(height);
	};

	const handleResize = (height: any) => {
		setResizeHeight(height);
	};

	return (
		<section>
			<p>isExpanded: {`${isExpanded}`}</p>
			<p>resizeHeight: {`${resizeHeight}`}</p>

			<section
				style={{
					height: 300,
					background: 'lightgray',
					outline: '1px solid lightgray',
				}}
			>
				<Submarine
					{...args}
					onResizing={handleResizing}
					onResize={handleResize}
					onToggle={handleToggle}
				>
					<Submarine.Bar>
						Non cliche minim normcore ullamco, iPhone etsy banh mi farm-to-table
						mumblecore stumptown asymmetrical wolf pour-over odio.
					</Submarine.Bar>
					<Submarine.Primary>
						You probably haven't heard of them fingerstache art party messenger
						bag, 3 wolf moon cold-pressed helvetica nesciunt id anim. Leggings
						labore dolor, cliche letterpress normcore banh mi aliquip ramps
						crucifix DIY. Occupy est DIY delectus kitsch, raw denim marfa
						literally poutine. Anim viral chia, keffiyeh ramps gastropub +1 wolf
						fixie austin church-key. Hammock placeat tote bag craft beer. Offal
						plaid PBR&B, art party lo-fi ea poutine kitsch ad. Duis flannel
						semiotics church-key YOLO.
					</Submarine.Primary>
				</Submarine>
			</section>
		</section>
	);
};

/* Nested Submarines */
export const NestedSubmarines: Story<ISubmarineProps> = (args) => {
	return (
		<section
			style={{
				height: 600,
				background: 'lightgray',
				outline: '1px solid lightgray',
			}}
		>
			<Submarine {...args} position='top'>
				<Submarine.Bar>
					Bitters shabby chic tacos, sapiente drinking vinegar readymade
					gochujang typewriter. Gluten-free cred sartorial pop-up commodo.
				</Submarine.Bar>
				<Submarine.Primary>
					<Submarine position='bottom'>
						<Submarine.Bar>
							Id mumblecore blue bottle vegan, fingerstache commodo health goth
							man bun bitters. Ad ennui authentic, offal humblebrag paleo minim
							vero hammock kickstarter reprehenderit gastropub.
						</Submarine.Bar>
						<Submarine.Primary>
							Dreamcatcher jean shorts veniam paleo humblebrag, nihil venmo
							consequat. Tempor kickstarter fingerstache veniam austin,
							assumenda lomo eu YOLO small batch 3 wolf moon. Chia offal cliche,
							thundercats try-hard before they sold out tofu freegan ethical
							scenester polaroid quis next level jean shorts. Sed hoodie
							ullamco, XOXO laboris yuccie farm-to-table narwhal jean shorts
							odio affogato irure. Marfa echo park mixtape pinterest accusamus,
							ullamco normcore deep v hammock. Odio cronut authentic id sunt,
							knausgaard YOLO. Roof party mollit kickstarter sustainable
							sriracha.
						</Submarine.Primary>
					</Submarine>
				</Submarine.Primary>
			</Submarine>
		</section>
	);
};
