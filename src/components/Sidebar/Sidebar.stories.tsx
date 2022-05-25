import _ from 'lodash';
import React, { useState } from 'react';
import createClass from 'create-react-class';
import { Meta, Story } from '@storybook/react';

import Sidebar, { ISidebarProps } from './Sidebar';
import CheckboxLabeled from '../CheckboxLabeled/CheckboxLabeled';
import Submarine from '../Submarine/Submarine';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import SearchField from '../SearchField/SearchField';
import RadioGroup from '../RadioGroup/RadioGroup';
import Tag from '../Tag/Tag';

export default {
	title: 'Layout/Sidebar',
	component: Sidebar,
	parameters: {
		docs: {
			description: {
				component: Sidebar.peek.description,
			},
		},
	},
	args: Sidebar.defaultProps,
} as Meta;

/* Basic Sidebar */
export const BasicSidebar: Story<ISidebarProps> = (args) => {
	return (
		<Sidebar {...args}>
			<Sidebar.Bar>
				Minim 90's paleo retro, fugiat aliqua hashtag enim photo booth listicle
				next level. Consectetur fap proident magna culpa. Art party meh ad, four
				loko slow-carb venmo distillery wolf cornhole nisi.
			</Sidebar.Bar>
			<Sidebar.Primary>
				Twee iPhone intelligentsia, schlitz normcore cold-pressed hella sapiente
				meh adipisicing sustainable kogi sed. Letterpress plaid aute, brunch
				chillwave anim mlkshk. Farm-to-table austin post-ironic, man bun
				gluten-free nesciunt sartorial tacos tousled kickstarter shabby chic
				migas. Kombucha flannel before they sold out elit voluptate pinterest
				chambray, odio stumptown street art. Kitsch humblebrag actually, cillum
				kale chips hashtag shoreditch pariatur waistcoat pop-up consequat
				leggings try-hard. Marfa crucifix seitan health goth portland. Cliche
				ennui vero, whatever swag kogi ugh fixie wayfarers before they sold out
				irure culpa marfa mlkshk bushwick.
			</Sidebar.Primary>
		</Sidebar>
	);
};

/* Disable Resize */
export const DisableResize: Story<ISidebarProps> = (args) => {
	return (
		<Sidebar {...args} isResizeDisabled={true}>
			<Sidebar.Bar>
				Cold-pressed aesthetic biodiesel twee, heirloom vice iPhone austin.
				Truffaut wolf offal roof party, neutra yr drinking vinegar bitters
				single-origin coffee austin mlkshk mixtape semiotics blog. Pickled squid
				asymmetrical locavore before they sold out whatever.
			</Sidebar.Bar>
			<Sidebar.Primary>
				Chartreuse keffiyeh meggings church-key, gochujang 90's messenger bag.
				Chillwave poutine cronut whatever occupy, squid vice organic. Tilde
				kinfolk whatever VHS. Swag gentrify put a bird on it, pour-over jean
				shorts knausgaard cray twee single-origin coffee lo-fi church-key
				cronut. Pabst tousled selfies try-hard. Sartorial cred ethical, food
				truck leggings next level sustainable flexitarian chillwave knausgaard
				pitchfork. Direct trade poutine photo booth mustache, cliche semiotics
				skateboard 90's. Meggings actually distillery small batch pickled
				quinoa. Migas williamsburg polaroid trust fund. Slow-carb truffaut chia,
				single-origin coffee meggings cornhole four loko chambray put a bird on
				it art party semiotics. Food truck mumblecore VHS photo booth, brunch
				direct trade flexitarian before they sold out truffaut squid cred
				everyday carry salvia neutra. Lo-fi chartreuse semiotics, paleo butcher
				knausgaard direct trade gentrify post-ironic. XOXO craft beer affogato
				YOLO, raw denim umami irony pabst echo park humblebrag ugh plaid. Master
				cleanse tilde tattooed, bushwick seitan selfies four dollar toast
				hashtag trust fund sartorial cliche.
			</Sidebar.Primary>
		</Sidebar>
	);
};

/* Initial Collapsed */
export const InitialCollapsed: Story<ISidebarProps> = (args) => {
	return (
		<Sidebar {...args} {...{ initialState: { isExpanded: false } }}>
			<Sidebar.Bar>
				Try-hard cornhole ea artisan, laborum wolf eiusmod chillwave irure. Lomo
				chicharrones taxidermy narwhal. Cronut deep v PBR&B photo booth tilde.
				Asymmetrical waistcoat williamsburg 3 wolf moon, poutine magna
				dreamcatcher disrupt eiusmod thundercats farm-to-table lumbersexual nisi
				mlkshk tote bag.
			</Sidebar.Bar>
			<Sidebar.Primary>
				Celiac ad skateboard twee PBR&B. XOXO freegan pitchfork, waistcoat
				listicle flexitarian mollit adipisicing. Delectus freegan et sartorial,
				velit occupy exercitation fingerstache +1 ramps. Exercitation pitchfork
				kale chips, eu everyday carry nostrud aesthetic etsy health goth DIY
				nisi fingerstache wolf neutra velit. Migas helvetica odio taxidermy.
				Truffaut meditation cray small batch, schlitz master cleanse cliche
				taxidermy labore gochujang bitters. Synth fixie banh mi bushwick
				shoreditch cold-pressed.
			</Sidebar.Primary>
		</Sidebar>
	);
};

/* Position Right */
export const PositionRight: Story<ISidebarProps> = (args) => {
	return (
		<Sidebar {...args} position='right'>
			<Sidebar.Bar>
				Paleo art party disrupt, consequat kogi fashion axe tofu trust fund raw
				denim readymade. Seitan banjo salvia organic ethical. Next level pork
				belly sustainable tumblr nostrud.
			</Sidebar.Bar>
			<Sidebar.Primary>
				Do nesciunt lumbersexual excepteur adipisicing tacos green juice
				readymade semiotics, pinterest tofu VHS. Paleo dreamcatcher mollit,
				hoodie four dollar toast typewriter kitsch magna aliquip ethical sunt
				tattooed. Four dollar toast stumptown umami gastropub heirloom
				flexitarian. Nihil williamsburg incididunt whatever. Godard commodo
				bespoke tofu. Selvage polaroid echo park hella, beard flexitarian roof
				party dolor. Consequat kickstarter ea, sint minim selfies wolf cupidatat
				everyday carry.
			</Sidebar.Primary>
		</Sidebar>
	);
};

/* Custom Title */
export const CustomTitle: Story<ISidebarProps> = (args) => {
	return (
		<Sidebar {...args}>
			<Sidebar.Title>
				Sidebar Title <button>Edit</button>
			</Sidebar.Title>
			<Sidebar.Bar>
				You can also set the <code>title</code> or <code>Title</code> prop on{' '}
				<code>{'<Sidebar>'}</code> or <code>{'<Sidebar.Bar>'}</code>.
			</Sidebar.Bar>
			<Sidebar.Primary>
				Helvetica narwhal irony, hoodie leggings occaecat tattooed authentic
				cred. Tumblr cred quinoa normcore, mumblecore cardigan cold-pressed
				dreamcatcher craft beer ad direct trade vero accusamus cray. Roof party
				chia shabby chic synth. Pariatur organic before they sold out everyday
				carry food truck. Labore four loko nihil, narwhal actually kinfolk
				mustache jean shorts. Meh kickstarter chicharrones williamsburg bushwick
				yr, PBR&B fap. Lo-fi leggings magna yuccie, tattooed accusamus blog
				literally gochujang listicle cliche humblebrag swag kombucha tousled.
			</Sidebar.Primary>
		</Sidebar>
	);
};

/* Custom Width */
export const CustomWidth: Story<ISidebarProps> = (args) => {
	return (
		<Sidebar {...args} width={400}>
			<Sidebar.Bar>
				Meditation photo booth actually chicharrones sed consectetur voluptate
				stumptown. Food truck nihil ut mixtape, ex deep v polaroid aesthetic.
				Duis street art stumptown nihil, aliquip vero VHS heirloom waistcoat
				adipisicing post-ironic lo-fi biodiesel.
			</Sidebar.Bar>
			<Sidebar.Primary>
				Trust fund vegan godard beard, portland humblebrag placeat neutra
				chambray retro ugh kitsch flannel sapiente mustache. Cred placeat
				helvetica cray, do before they sold out tilde. Deserunt everyday carry
				brooklyn kombucha yr fanny pack banh mi, eiusmod intelligentsia tempor
				tacos. Waistcoat neutra kale chips, keffiyeh ex nulla gochujang crucifix
				duis typewriter hashtag reprehenderit. Ad nihil mixtape 8-bit, photo
				booth anim post-ironic vegan qui put a bird on it crucifix. Waistcoat
				chartreuse ethical, adipisicing jean shorts direct trade PBR&B
				humblebrag pariatur nulla mollit stumptown listicle. Flannel
				williamsburg vice flexitarian bespoke elit.
			</Sidebar.Primary>
		</Sidebar>
	);
};

/* Control Expand */
export const ControlExpand: Story<ISidebarProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<section>
			<button onClick={handleToggle}>Toggle</button>
			<Sidebar {...args} isExpanded={isExpanded} onToggle={handleToggle}>
				<Sidebar.Bar>
					Paleo williamsburg retro, mumblecore deserunt typewriter magna raw
					denim taxidermy. Quinoa incididunt hoodie, ea synth four loko everyday
					carry lomo vice humblebrag forage assumenda ad small batch
					reprehenderit.
				</Sidebar.Bar>
				<Sidebar.Primary>
					Migas esse paleo nesciunt, mollit velit franzen tempor YOLO iPhone
					thundercats. Keytar tilde raw denim shabby chic quinoa typewriter.
					Shabby chic tousled labore jean shorts, veniam XOXO mustache. Marfa
					dreamcatcher hammock cupidatat kitsch, selvage cornhole dolor. Odio
					salvia slow-carb hammock XOXO, nulla normcore jean shorts magna master
					cleanse tote bag ea. Pitchfork marfa tote bag shoreditch, retro
					selvage tempor 90's kogi adipisicing asymmetrical tousled. Pork belly
					asymmetrical nesciunt, keytar jean shorts mlkshk scenester sriracha
					man bun placeat tacos post-ironic officia art party.
				</Sidebar.Primary>
			</Sidebar>
		</section>
	);
};

/* Handle Toggle And Resize */
export const HandleToggleAndResize: Story<ISidebarProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(true);
	const [resizeWidth, setResizeWidth] = useState(null);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	const handleResize = (width: any) => {
		setResizeWidth(width);
	};

	return (
		<section>
			<p>isExpanded: {`${isExpanded}`}</p>
			<p>resizeWidth: {`${resizeWidth}`}</p>

			<Sidebar
				{...args}
				onResizing={handleResize}
				onResize={handleResize}
				onToggle={handleToggle}
			>
				<Sidebar.Bar>
					Non cliche minim normcore ullamco, iPhone etsy banh mi farm-to-table
					mumblecore stumptown asymmetrical wolf pour-over odio.
				</Sidebar.Bar>
				<Sidebar.Primary>
					You probably haven't heard of them fingerstache art party messenger
					bag, 3 wolf moon cold-pressed helvetica nesciunt id anim. Leggings
					labore dolor, cliche letterpress normcore banh mi aliquip ramps
					crucifix DIY. Occupy est DIY delectus kitsch, raw denim marfa
					literally poutine. Anim viral chia, keffiyeh ramps gastropub +1 wolf
					fixie austin church-key. Hammock placeat tote bag craft beer. Offal
					plaid PBR&B, art party lo-fi ea poutine kitsch ad. Duis flannel
					semiotics church-key YOLO.
				</Sidebar.Primary>
			</Sidebar>
		</section>
	);
};

/* Nested Sidebars */
export const NestedSidebars: Story<ISidebarProps> = (args) => {
	return (
		<Sidebar {...args}>
			<Sidebar.Bar>
				Bitters shabby chic tacos, sapiente drinking vinegar readymade gochujang
				typewriter. Gluten-free cred sartorial pop-up commodo.
			</Sidebar.Bar>
			<Sidebar.Primary>
				<Sidebar position='right'>
					<Sidebar.Bar>
						Id mumblecore blue bottle vegan, fingerstache commodo health goth
						man bun bitters. Ad ennui authentic, offal humblebrag paleo minim
						vero hammock kickstarter reprehenderit gastropub.
					</Sidebar.Bar>
					<Sidebar.Primary>
						Dreamcatcher jean shorts veniam paleo humblebrag, nihil venmo
						consequat. Tempor kickstarter fingerstache veniam austin, assumenda
						lomo eu YOLO small batch 3 wolf moon. Chia offal cliche, thundercats
						try-hard before they sold out tofu freegan ethical scenester
						polaroid quis next level jean shorts. Sed hoodie ullamco, XOXO
						laboris yuccie farm-to-table narwhal jean shorts odio affogato
						irure. Marfa echo park mixtape pinterest accusamus, ullamco normcore
						deep v hammock. Odio cronut authentic id sunt, knausgaard YOLO. Roof
						party mollit kickstarter sustainable sriracha.
					</Sidebar.Primary>
				</Sidebar>
			</Sidebar.Primary>
		</Sidebar>
	);
};

/* Nested Submarine */
export const NestedSubmarine: Story<ISidebarProps> = (args) => {
	return (
		<section style={{ display: 'flex', flexDirection: 'column', height: 600 }}>
			<Sidebar {...args}>
				<Sidebar.Bar>
					<div>
						{_.times(100, (n) => (
							<CheckboxLabeled key={n}>
								<CheckboxLabeled.Label>Filter #{n}</CheckboxLabeled.Label>
							</CheckboxLabeled>
						))}
					</div>
				</Sidebar.Bar>
				<Sidebar.Primary>
					<Submarine>
						<Submarine.Bar>
							Air plant blog pitchfork gastropub shabby chic wolf sriracha
							salvia, hella af. Taxidermy gastropub marfa fap, selvage af four
							dollar toast stumptown biodiesel post-ironic keffiyeh scenester
							cliche. Fashion axe listicle hexagon man bun pour-over migas.
							Schlitz you probably haven't heard of them la croix skateboard,
							literally small batch sartorial flexitarian messenger bag offal
							deep v kitsch chicharrones hammock. Keffiyeh knausgaard listicle,
							edison bulb lumbersexual flannel normcore ennui. YOLO la croix
							craft beer, pickled pitchfork intelligentsia PBR&B. Shabby chic
							raw denim cornhole raclette selfies messenger bag. Dreamcatcher
							jean shorts hoodie, subway tile viral franzen microdosing
							readymade photo booth farm-to-table echo park salvia lyft vegan
							chicharrones. Semiotics master cleanse meggings typewriter small
							batch. Four dollar toast green juice 90's, tattooed jianbing
							taxidermy gluten-free. Cronut la croix skateboard, sartorial
							sustainable asymmetrical mustache pinterest af semiotics lyft man
							bun fam truffaut. You probably haven't heard of them PBR&B
							bushwick hell of four dollar toast umami, put a bird on it
							church-key tattooed chillwave neutra live-edge twee. Chartreuse
							selvage gluten-free blue bottle. Ethical skateboard keffiyeh
							lumbersexual hell of, plaid bushwick iceland live-edge cornhole.
							Letterpress occupy man braid narwhal small batch, selfies pabst
							sustainable organic fashion axe pinterest flannel drinking
							vinegar. Meh tilde tattooed, readymade gastropub semiotics salvia
							williamsburg lomo truffaut direct trade gluten-free. Artisan
							neutra tilde microdosing, photo booth raw denim lo-fi celiac irony
							yr dreamcatcher taxidermy normcore. Stumptown bespoke offal, swag
							tilde chambray subway tile try-hard post-ironic. VHS literally
							keffiyeh, health goth 3 wolf moon chartreuse franzen trust fund
							locavore +1. Tousled lo-fi art party, craft beer knausgaard
							portland kombucha church-key 3 wolf moon heirloom taxidermy blue
							bottle narwhal. Migas portland sriracha, hot chicken green juice
							yr bushwick master cleanse PBR&B unicorn DIY waistcoat kombucha
							YOLO air plant. Four dollar toast air plant skateboard meditation.
							Waistcoat keffiyeh fingerstache vape. Stumptown heirloom pabst
							tote bag lo-fi microdosing, everyday carry knausgaard. Selfies
							readymade wolf, paleo pinterest chartreuse glossier pour-over
							irony literally cronut lyft stumptown iceland. Twee vice fixie +1,
							poutine flannel freegan put a bird on it ethical chicharrones.
							Scenester chartreuse swag sartorial, hella raclette art party.
							Pickled everyday carry quinoa gentrify.
						</Submarine.Bar>
						<Submarine.Primary>
							<div>
								Live-edge thundercats poutine vape, bushwick retro activated
								charcoal air plant whatever. Meh mustache drinking vinegar
								copper mug gastropub iceland. Chillwave +1 pabst flannel.
								Lumbersexual seitan master cleanse sartorial cold-pressed, ennui
								gastropub slow-carb lo-fi sriracha fashion axe affogato disrupt
								pok pok street art. Semiotics asymmetrical polaroid church-key
								pinterest. IPhone crucifix jean shorts, tumblr you probably
								haven't heard of them pickled fashion axe gastropub fixie quinoa
								pitchfork. Sartorial fap you probably haven't heard of them
								narwhal, biodiesel fixie freegan. Occupy ugh chia, godard
								selvage freegan cred hexagon lyft kickstarter tofu chartreuse.
								Normcore man bun blog, banjo hexagon street art irony lyft
								kombucha crucifix sartorial cliche vaporware 8-bit. Fap banh mi
								90's, four dollar toast coloring book flexitarian tilde prism
								XOXO chartreuse brooklyn. Live-edge actually hammock vegan
								sartorial. Fashion axe asymmetrical austin try-hard chambray,
								snackwave retro green juice disrupt crucifix pok pok health goth
								activated charcoal. Hoodie cray synth, kombucha tacos street art
								sustainable. Umami next level ugh mumblecore bitters, four loko
								microdosing hot chicken try-hard knausgaard health goth
								pitchfork marfa hexagon. Bicycle rights artisan marfa affogato
								hexagon, franzen humblebrag pinterest brooklyn snackwave disrupt
								cray intelligentsia. Gochujang affogato stumptown, prism kinfolk
								before they sold out narwhal gluten-free cronut health goth
								venmo four loko. Vinyl ugh humblebrag gluten-free disrupt, chia
								cornhole. Single-origin coffee tote bag tacos chillwave,
								whatever tattooed portland ennui. Semiotics heirloom direct
								trade, cray you probably haven't heard of them squid salvia
								pickled affogato tumblr everyday carry succulents fixie butcher
								drinking vinegar. Shoreditch tacos forage art party waistcoat
								mixtape. Disrupt PBR&B literally viral mustache meditation,
								kinfolk normcore photo booth. Franzen cardigan af, squid schlitz
								unicorn leggings venmo distillery green juice brunch shoreditch
								thundercats +1. Heirloom biodiesel squid, keytar succulents
								dreamcatcher letterpress hammock next level. Semiotics pinterest
								viral retro salvia keffiyeh etsy. 90's four dollar toast
								hammock, tofu viral sartorial crucifix kitsch mustache green
								juice. Crucifix migas PBR&B, bitters air plant pork belly
								normcore hoodie single-origin coffee blue bottle sustainable
								slow-carb echo park vice. Waistcoat yuccie paleo knausgaard
								raclette fanny pack, you probably haven't heard of them YOLO
								quinoa hot chicken health goth neutra etsy. Lyft neutra small
								batch, 90's coloring book ethical before they sold out. Four
								loko fam freegan leggings, tumblr affogato mlkshk ethical
								activated charcoal. Fixie af helvetica, lo-fi iceland seitan
								church-key hashtag. Before they sold out put a bird on it VHS
								letterpress, jean shorts actually banjo kogi subway tile hammock
								kombucha. Activated charcoal pok pok keffiyeh direct trade
								scenester. Selfies skateboard health goth pop-up offal,
								gastropub craft beer tattooed man braid cornhole knausgaard cred
								chia keytar. Meggings deep v fixie hella, meditation kinfolk
								lomo narwhal lyft. DIY bitters kitsch, raclette vice pickled
								master cleanse drinking vinegar scenester austin tousled yuccie.
								Prism irony bicycle rights pork belly, whatever taxidermy subway
								tile pickled synth. Gastropub vaporware mumblecore, hell of
								cardigan gluten-free normcore put a bird on it synth fashion axe
								butcher letterpress. Hashtag aesthetic banjo twee salvia.
								Intelligentsia deep v kale chips celiac schlitz edison bulb.
								Enamel pin meditation mixtape direct trade fashion axe. Man
								braid kogi disrupt banjo. Waistcoat gluten-free DIY, small batch
								affogato kickstarter trust fund four dollar toast bicycle rights
								next level snackwave. Synth enamel pin tumblr, intelligentsia
								echo park unicorn roof party. Fap mlkshk tilde street art
								bicycle rights etsy. Enamel pin cronut seitan kickstarter, beard
								echo park hoodie ugh tote bag yuccie etsy asymmetrical heirloom.
								Fingerstache raw denim art party fanny pack, messenger bag
								direct trade single-origin coffee distillery offal cronut fap
								biodiesel twee. Humblebrag tumeric XOXO pork belly hammock, four
								dollar toast shoreditch. Bushwick PBR&B taxidermy disrupt
								keytar, thundercats literally. Schlitz cornhole meh organic
								crucifix aesthetic. Plaid you probably haven't heard of them
								ramps lyft roof party craft beer. Marfa snackwave hell of
								sartorial. Selfies prism gentrify bicycle rights, tumeric put a
								bird on it next level meggings migas authentic stumptown
								cold-pressed yr dreamcatcher. Hexagon hell of umami cronut vice.
								Bitters PBR&B messenger bag, lumbersexual selfies actually
								truffaut post-ironic fanny pack skateboard narwhal. You probably
								haven't heard of them bicycle rights helvetica, mumblecore
								enamel pin raw denim lumbersexual woke put a bird on it pug
								pabst snackwave flexitarian. Pork belly cornhole chillwave,
								post-ironic subway tile williamsburg slow-carb. Distillery art
								party small batch humblebrag blue bottle blog heirloom austin,
								live-edge helvetica cray poutine gluten-free hammock man braid.
								Vice blue bottle cardigan tbh, vegan ugh celiac. Roof party
								occupy flannel, jean shorts fap unicorn wolf beard. Pour-over
								air plant crucifix, man braid photo booth snackwave glossier
								sartorial affogato ethical vice. PBR&B hella selfies, tousled
								keytar biodiesel portland activated charcoal distillery art
								party echo park aesthetic. Affogato mlkshk literally pour-over,
								before they sold out crucifix cold-pressed kale chips ethical
								meh readymade williamsburg kogi knausgaard. Viral meditation
								kombucha hell of, godard chartreuse selfies pinterest
								thundercats vaporware microdosing. Meditation forage art party
								tacos blue bottle. Messenger bag cred jean shorts taxidermy, pug
								shabby chic stumptown 8-bit next level. Vaporware gastropub next
								level activated charcoal kale chips. Mixtape heirloom cred, tofu
								iceland keytar copper mug man bun. Squid godard pabst ethical,
								hexagon 8-bit butcher actually master cleanse narwhal small
								batch waistcoat hell of vice. Fashion axe pok pok before they
								sold out, thundercats four dollar toast tbh cornhole godard
								try-hard pug pour-over kale chips. Artisan aesthetic iPhone
								godard.
							</div>
						</Submarine.Primary>
					</Submarine>
				</Sidebar.Primary>
			</Sidebar>
		</section>
	);
};

/* Different Content */
export const DifferentContent: Story<ISidebarProps> = (args) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: 600 }}>
			<Sidebar {...args}>
				<Sidebar.Bar>
					<div>
						<ButtonGroup>
							<ButtonGroup.Button style={{ flex: 1 }}>
								Messages
							</ButtonGroup.Button>
							<ButtonGroup.Button style={{ flex: 1 }}>
								Notifications
							</ButtonGroup.Button>
						</ButtonGroup>

						<SearchField placeholder='Search country' />
						{_.times(10, (n) => (
							<CheckboxLabeled key={n}>
								<CheckboxLabeled.Label>Filter #{n}</CheckboxLabeled.Label>
							</CheckboxLabeled>
						))}
						{_.times(10, (n) => {
							return (
								<Tag key={n} isRemovable={true}>
									{`Tag # ${n}`}
								</Tag>
							);
						})}
						<RadioGroup style={{ flexDirection: 'column' }}>
							<RadioGroup.RadioButton>
								<RadioGroup.Label>All (unfiltered)</RadioGroup.Label>
							</RadioGroup.RadioButton>
							<RadioGroup.RadioButton>
								<RadioGroup.Label>Eligible</RadioGroup.Label>
							</RadioGroup.RadioButton>
							<RadioGroup.RadioButton>
								<RadioGroup.Label>Blocked by You</RadioGroup.Label>
							</RadioGroup.RadioButton>
							<RadioGroup.RadioButton>
								<RadioGroup.Label>Blocked by Seller</RadioGroup.Label>
							</RadioGroup.RadioButton>
							<RadioGroup.RadioButton>
								<RadioGroup.Label>Mutually Blocked</RadioGroup.Label>
							</RadioGroup.RadioButton>
						</RadioGroup>
					</div>
				</Sidebar.Bar>
				<Sidebar.Primary>
					Air plant blog pitchfork gastropub shabby chic wolf sriracha salvia,
					hella af. Taxidermy gastropub marfa fap, selvage af four dollar toast
					stumptown biodiesel post-ironic keffiyeh scenester cliche. Fashion axe
					listicle hexagon man bun pour-over migas. Schlitz you probably haven't
					heard of them la croix skateboard, literally small batch sartorial
					flexitarian messenger bag offal deep v kitsch chicharrones hammock.
					Keffiyeh knausgaard listicle, edison bulb lumbersexual flannel
					normcore ennui. YOLO la croix craft beer, pickled pitchfork
					intelligentsia PBR&B. Shabby chic raw denim cornhole raclette selfies
					messenger bag. Dreamcatcher jean shorts hoodie, subway tile viral
					franzen microdosing readymade photo booth farm-to-table echo park
					salvia lyft vegan chicharrones. Semiotics master cleanse meggings
					typewriter small batch. Four dollar toast green juice 90's, tattooed
					jianbing taxidermy gluten-free. Cronut la croix skateboard, sartorial
					sustainable asymmetrical mustache pinterest af semiotics lyft man bun
					fam truffaut. You probably haven't heard of them PBR&B bushwick hell
					of four dollar toast umami, put a bird on it church-key tattooed
					chillwave neutra live-edge twee. Chartreuse selvage gluten-free blue
					bottle. Ethical skateboard keffiyeh lumbersexual hell of, plaid
					bushwick iceland live-edge cornhole. Letterpress occupy man braid
					narwhal small batch, selfies pabst sustainable organic fashion axe
					pinterest flannel drinking vinegar. Meh tilde tattooed, readymade
					gastropub semiotics salvia williamsburg lomo truffaut direct trade
					gluten-free. Artisan neutra tilde microdosing, photo booth raw denim
					lo-fi celiac irony yr dreamcatcher taxidermy normcore. Stumptown
					bespoke offal, swag tilde chambray subway tile try-hard post-ironic.
					VHS literally keffiyeh, health goth 3 wolf moon chartreuse franzen
					trust fund locavore +1. Tousled lo-fi art party, craft beer knausgaard
					portland kombucha church-key 3 wolf moon heirloom taxidermy blue
					bottle narwhal. Migas portland sriracha, hot chicken green juice yr
					bushwick master cleanse PBR&B unicorn DIY waistcoat kombucha YOLO air
					plant. Four dollar toast air plant skateboard meditation. Waistcoat
					keffiyeh fingerstache vape. Stumptown heirloom pabst tote bag lo-fi
					microdosing, everyday carry knausgaard. Selfies readymade wolf, paleo
					pinterest chartreuse glossier pour-over irony literally cronut lyft
					stumptown iceland. Twee vice fixie +1, poutine flannel freegan put a
					bird on it ethical chicharrones. Scenester chartreuse swag sartorial,
					hella raclette art party. Pickled everyday carry quinoa gentrify.
				</Sidebar.Primary>
			</Sidebar>
		</div>
	);
};
