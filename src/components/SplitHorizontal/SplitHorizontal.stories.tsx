import React from 'react';
import createClass from 'create-react-class';
import { Meta, Story } from '@storybook/react';

import SplitHorizontal, { ISplitHorizontalProps } from './SplitHorizontal';

export default {
	title: 'Private/SplitHorizontal',
	component: SplitHorizontal,
	parameters: {
		docs: {
			description: {
				component: SplitHorizontal.peek.description,
			},
		},
	},
	args: SplitHorizontal.defaultProps,
} as Meta;

/* Default Split */
export const DefaultSplit: Story<ISplitHorizontalProps> = (args) => {
	return (
		<SplitHorizontal {...(args as any)}>
			<SplitHorizontal.TopPane>
				<p>
					Bicycle rights tofu hashtag blue bottle viral. Mixtape kinfolk
					mustache, iPhone godard voluptate direct trade pork belly truffaut
					duis sunt. 8-bit microdosing retro, excepteur direct trade offal
					listicle kale chips selvage master cleanse sustainable laborum migas
					helvetica. Man bun esse synth man braid fashion axe post-ironic id,
					fanny pack PBR&B. Scenester truffaut culpa yr heirloom, fanny pack
					intelligentsia dreamcatcher dolore nisi green juice ad you probably
					haven't heard of them raw denim. Before they sold out laborum poutine
					90's, blog voluptate chambray whatever. Excepteur ea kinfolk, irure
					photo booth brooklyn art party master cleanse mlkshk pug.
				</p>
			</SplitHorizontal.TopPane>
			<SplitHorizontal.BottomPane>
				<p>
					Aliquip hella incididunt, fashion axe irure small batch single-origin
					coffee ullamco. Offal fugiat salvia brooklyn meditation occaecat
					polaroid, fashion axe culpa intelligentsia. Sint ex intelligentsia
					fixie assumenda sriracha laborum, portland literally bespoke you
					probably haven't heard of them. Delectus skateboard put a bird on it,
					in kale chips messenger bag lo-fi. Cred nihil tote bag street art, id
					et velit authentic ullamco excepteur cold-pressed fixie shabby chic
					art party blue bottle. Mumblecore tempor selvage cray put a bird on
					it. Flexitarian crucifix tempor do pinterest, cornhole street art fap
					affogato selfies distillery consectetur listicle.
				</p>
			</SplitHorizontal.BottomPane>
		</SplitHorizontal>
	);
};

/* Animated Collapse */
export const AnimatedCollapse: Story<ISplitHorizontalProps> = (args) => {
	const Component = createClass({
		getInitialState() {
			return {
				isExpanded: true,
			};
		},

		handleToggle() {
			this.setState({ isExpanded: !this.state.isExpanded });
		},
		render() {
			return (
				<section>
					<button onClick={this.handleToggle}>toggle</button>

					<section style={{ height: 300, outline: '1px solid #e3e3e3' }}>
						<SplitHorizontal
							{...(args as any)}
							style={{ height: '100%' }}
							isAnimated
							isExpanded={this.state.isExpanded}
						>
							<SplitHorizontal.TopPane>
								<p>
									Poutine ea ramps cold-pressed, vinyl bespoke sint keffiyeh
									tumblr banjo kitsch hoodie tousled. Echo park occupy whatever
									voluptate iPhone. Freegan butcher shabby chic aliquip,
									truffaut single-origin coffee meditation tote bag gochujang
									meh est. Ut letterpress gochujang master cleanse, pariatur
									locavore meditation quis irure incididunt shoreditch
									typewriter placeat intelligentsia hoodie. Shabby chic
									chicharrones id, meh swag migas readymade chartreuse
									consectetur adipisicing ullamco. Laborum commodo occaecat
									paleo occupy. Cold-pressed kinfolk beard, exercitation
									post-ironic typewriter non street art offal flexitarian
									mixtape listicle pitchfork nostrud direct trade.
								</p>
							</SplitHorizontal.TopPane>
							<SplitHorizontal.BottomPane>
								<p>This pane is primary by default.</p>
								<p>
									Trust fund brunch waistcoat, fixie cronut typewriter ut
									gluten-free veniam blue bottle cillum laboris. Truffaut cronut
									cliche in dolore. Kickstarter ugh craft beer swag fashion axe.
									Nostrud tacos cred anim, exercitation kinfolk chillwave you
									probably haven't heard of them roof party wayfarers cray
									fingerstache dolore tattooed. Hashtag trust fund sed, bespoke
									3 wolf moon everyday carry anim blog vero mollit helvetica
									bushwick keffiyeh nesciunt. Yr mlkshk authentic small batch.
									Humblebrag kogi deep v, ex four dollar toast DIY street art
									adipisicing mlkshk iPhone excepteur intelligentsia cardigan.
								</p>
							</SplitHorizontal.BottomPane>
						</SplitHorizontal>
					</section>
				</section>
			);
		},
	});

	return <Component />;
};

/* Set Pane As Primary */
export const SetPaneAsPrimary: Story<ISplitHorizontalProps> = (args) => {
	const Component = createClass({
		getInitialState() {
			return {
				isExpanded: true,
			};
		},

		handleToggle() {
			this.setState({ isExpanded: !this.state.isExpanded });
		},
		render() {
			return (
				<section>
					<button onClick={this.handleToggle}>toggle</button>

					<section style={{ height: 300, outline: '1px solid #e3e3e3' }}>
						<SplitHorizontal
							{...(args as any)}
							style={{ height: '100%' }}
							isAnimated
							isExpanded={this.state.isExpanded}
						>
							<SplitHorizontal.TopPane isPrimary>
								<p>This is now the primary pane.</p>
								<p>
									Sunt nihil franzen fap VHS. Food truck artisan irony photo
									booth meh, migas pariatur thundercats. Hoodie eiusmod nulla
									qui godard gochujang. Venmo duis bitters poutine. Cupidatat
									raw denim franzen, ethical butcher chia occupy echo park
									church-key ramps proident. Fugiat placeat 90's keytar, bitters
									beard ullamco authentic adipisicing post-ironic salvia aliquip
									labore bespoke. Odio cold-pressed tumblr polaroid.
								</p>
							</SplitHorizontal.TopPane>
							<SplitHorizontal.BottomPane>
								<p>This side will be collapsed.</p>
								<p>
									Tote bag beard pariatur single-origin coffee portland
									farm-to-table. Chambray thundercats salvia echo park
									meditation ut readymade. Venmo occaecat magna placeat
									single-origin coffee, disrupt est blog fugiat. Chillwave
									knausgaard ennui velit polaroid. Godard anim aute, occupy
									dolor qui try-hard ut thundercats esse adipisicing kinfolk.
									Cray pug ethical ad cliche et, forage green juice consequat
									shabby chic gentrify fingerstache lomo scenester vegan. Ex
									labore beard, trust fund neutra chicharrones banjo consectetur
									jean shorts iPhone messenger bag.
								</p>
							</SplitHorizontal.BottomPane>
						</SplitHorizontal>
					</section>
				</section>
			);
		},
	});

	return <Component />;
};

/* Set Height Of Pane */
export const SetHeightOfPane: Story<ISplitHorizontalProps> = (args) => {
	return (
		<section style={{ height: 300, outline: '1px solid #e3e3e3' }}>
			<SplitHorizontal {...(args as any as any)}>
				<SplitHorizontal.TopPane height={64}>
					<p>
						Jean shorts reprehenderit in, commodo godard skateboard retro
						heirloom street art church-key. Gochujang sint hella food truck,
						officia next level sriracha listicle knausgaard try-hard 3 wolf moon
						kale chips. Offal scenester quinoa, hammock qui sint direct trade
						heirloom. Bushwick letterpress pabst, odio nihil sapiente ex
						cold-pressed flannel laboris wayfarers retro marfa jean shorts. Chia
						next level cardigan, deserunt church-key asymmetrical ennui
						messenger bag portland. Aute selvage cred gastropub freegan
						literally. Readymade artisan distillery occaecat qui.
					</p>
				</SplitHorizontal.TopPane>
				<SplitHorizontal.BottomPane isPrimary>
					<p>
						Plaid wolf cold-pressed, post-ironic etsy roof party tilde tattooed
						pug stumptown sed tofu art party ennui. Asymmetrical wayfarers dolor
						dolore, nisi mollit sed austin skateboard readymade 90's tumblr
						fugiat sint shoreditch. Cillum intelligentsia esse next level
						polaroid, beard vero. Qui polaroid portland beard artisan. Mixtape
						qui hella est. Fap consectetur freegan roof party duis mollit.
						Mixtape swag mustache, twee fashion axe sustainable ennui aliquip
						mlkshk gastropub seitan commodo photo booth blue bottle.
					</p>
				</SplitHorizontal.BottomPane>
			</SplitHorizontal>
		</section>
	);
};

/* Customize Divider */
export const CustomizeDivider: Story<ISplitHorizontalProps> = (args) => {
	return (
		<SplitHorizontal {...(args as any)}>
			<SplitHorizontal.TopPane>
				<p>
					Waistcoat man bun sartorial, PBR&B artisan blue bottle laboris disrupt
					pug dreamcatcher readymade gluten-free fingerstache placeat. Enim
					salvia celiac, veniam polaroid stumptown velit PBR&B. Ramps delectus
					cupidatat dolore. Portland try-hard slow-carb cronut, drinking vinegar
					readymade nulla pug aliqua cray VHS eiusmod odio incididunt wolf. 3
					wolf moon gentrify mustache blog freegan, literally ut helvetica
					stumptown godard synth direct trade. Sapiente slow-carb deep v, YOLO
					direct trade irony before they sold out tempor. Sunt aliqua seitan
					banjo.
				</p>
			</SplitHorizontal.TopPane>

			<SplitHorizontal.Divider
				style={{
					height: 18,
					background: 'gray',
					color: 'white',
					textAlign: 'center',
				}}
			>
				D I V I D E R
			</SplitHorizontal.Divider>

			<SplitHorizontal.BottomPane>
				<p>
					Exercitation fixie distillery pickled, gentrify meh laborum accusamus
					quinoa street art craft beer migas affogato chia. PBR&B cillum dolore,
					tilde sed eu tote bag narwhal vero schlitz chambray viral raw denim
					velit single-origin coffee. Occupy tempor hashtag non. Wayfarers
					bitters blog fixie mollit flexitarian forage. Listicle sriracha
					bespoke, laborum direct trade skateboard cliche umami selvage velit
					art party sartorial forage veniam. Authentic tattooed nesciunt before
					they sold out, blue bottle bicycle rights gastropub magna veniam
					hammock. Sint venmo nihil, meditation voluptate readymade banh mi.
				</p>
			</SplitHorizontal.BottomPane>
		</SplitHorizontal>
	);
};

/* No Animation */
export const NoAnimation: Story<ISplitHorizontalProps> = (args) => {
	const Component = createClass({
		getInitialState() {
			return {
				isExpanded: true,
			};
		},

		handleToggle() {
			this.setState({ isExpanded: !this.state.isExpanded });
		},
		render() {
			return (
				<section>
					<button onClick={this.handleToggle}>toggle</button>

					<section style={{ outline: '1px solid #e3e3e3' }}>
						<SplitHorizontal
							{...(args as any)}
							isExpanded={this.state.isExpanded}
						>
							<SplitHorizontal.TopPane>
								<p>
									Magna non tacos, et raw denim food truck mixtape semiotics
									forage. Meggings sartorial you probably haven't heard of them
									freegan chicharrones. Cronut affogato consequat fugiat.
									Portland shabby chic four loko blue bottle, tacos lomo veniam
									banh mi nulla. Proident sed sartorial, sint biodiesel duis
									seitan aute thundercats sustainable retro trust fund ugh. Man
									bun pariatur cray knausgaard elit waistcoat. Consequat yr 3
									wolf moon kickstarter, fugiat chambray excepteur godard trust
									fund food truck anim small batch artisan pork belly.
								</p>
							</SplitHorizontal.TopPane>
							<SplitHorizontal.BottomPane isPrimary>
								<p>
									Vero chia occupy butcher heirloom, ad everyday carry id
									selvage direct trade keytar brunch consequat lumbersexual
									skateboard. Meditation tousled craft beer consectetur
									chambray, knausgaard laboris nisi twee +1 shoreditch mollit.
									Health goth viral mumblecore fingerstache, jean shorts cronut
									celiac tote bag squid. Hoodie deserunt quinoa, tacos small
									batch odio chicharrones gluten-free plaid migas schlitz
									sartorial cillum. DIY chartreuse 90's, letterpress banh mi
									tousled farm-to-table kogi incididunt paleo wayfarers forage.
									Asymmetrical aesthetic tempor before they sold out, kombucha
									lo-fi minim intelligentsia migas yuccie chartreuse roof party.
									Nulla skateboard proident sapiente qui.
								</p>
							</SplitHorizontal.BottomPane>
						</SplitHorizontal>
					</section>
				</section>
			);
		},
	});

	return <Component />;
};

/* Collapse Shift */
export const CollapseShift: Story<ISplitHorizontalProps> = (args) => {
	const Component = createClass({
		getInitialState() {
			return {
				isExpanded: true,
			};
		},

		handleToggle() {
			this.setState({ isExpanded: !this.state.isExpanded });
		},
		render() {
			return (
				<section>
					<button onClick={this.handleToggle}>toggle</button>

					<section style={{ height: 300, outline: '1px solid #e3e3e3' }}>
						<SplitHorizontal
							{...(args as any)}
							style={{ height: '100%' }}
							collapseShift={64}
							isAnimated
							isExpanded={this.state.isExpanded}
						>
							<SplitHorizontal.TopPane>
								<p>This pane will stick out by 64px when collapsed.</p>
								<p>
									Velit gastropub literally, cold-pressed humblebrag blog
									normcore consectetur selfies. Pork belly squid cold-pressed,
									vegan kitsch green juice swag single-origin coffee you
									probably haven't heard of them irony. Thundercats butcher
									nulla, sartorial VHS irure humblebrag chartreuse whatever
									cronut craft beer cliche tofu et pinterest.
								</p>
							</SplitHorizontal.TopPane>
							<SplitHorizontal.BottomPane isPrimary>
								<p>This is the primary pane.</p>
								<p>
									Schlitz veniam normcore etsy pug. Kickstarter cold-pressed
									small batch, echo park next level cray aesthetic sunt proident
									pabst scenester drinking vinegar etsy est. Pug bitters
									ethical, laborum forage dolore tofu tousled eiusmod. Meh
									skateboard consectetur, adipisicing keffiyeh pop-up street
									art. Normcore gochujang franzen ut, reprehenderit meggings sed
									ethical thundercats viral ea pitchfork yuccie placeat tofu.
									Sint church-key affogato kogi, you probably haven't heard of
									them cliche chicharrones ramps in. Yuccie fashion axe pabst,
									intelligentsia tilde whatever cardigan yr accusamus 3 wolf
									moon tacos literally magna pop-up.
								</p>
							</SplitHorizontal.BottomPane>
						</SplitHorizontal>
					</section>
				</section>
			);
		},
	});

	return <Component />;
};

/* Handle Resize */
export const HandleResize: Story<ISplitHorizontalProps> = (args) => {
	const Component = createClass({
		getInitialState() {
			return {
				newHeight: null,
			};
		},

		handleResizing(height: any) {
			this.setState({ newHeight: height });
		},

		handleResize(height: any) {
			this.setState({ newHeight: height });
		},

		render() {
			return (
				<section>
					New Height: {`${this.state.newHeight}`}
					<section style={{ height: 300, outline: '1px solid #e3e3e3' }}>
						<SplitHorizontal
							{...(args as any)}
							style={{ height: '100%' }}
							onResizing={this.handleResizing}
							onResize={this.handleResize}
						>
							<SplitHorizontal.TopPane height={250}>
								<p>
									Occupy biodiesel nesciunt pug fugiat. VHS accusamus
									intelligentsia, chartreuse raw denim kogi bushwick
									cold-pressed chia heirloom sint forage. Cornhole affogato swag
									duis hella, pabst bitters trust fund heirloom viral blog
									selfies green juice commodo nulla. Single-origin coffee 8-bit
									ugh jean shorts proident, tote bag small batch meditation
									poutine next level lo-fi. Ethical before they sold out
									shoreditch, etsy man braid semiotics ea health goth squid
									aliquip drinking vinegar kinfolk excepteur polaroid. Meh
									schlitz cred tattooed chartreuse 3 wolf moon. Lumbersexual
									poutine kinfolk hella chartreuse thundercats.
								</p>
							</SplitHorizontal.TopPane>
							<SplitHorizontal.BottomPane>
								<p>
									Bitters jean shorts trust fund, typewriter assumenda lomo
									kickstarter waistcoat kombucha officia semiotics fanny pack
									yr. Ex quinoa nulla franzen, mollit enim kinfolk deep v pop-up
									consequat. Drinking vinegar beard cillum portland. Beard
									chambray sartorial est, enim mumblecore craft beer irony paleo
									pork belly typewriter ugh trust fund blog elit. Nostrud green
									juice fingerstache, adipisicing art party kitsch gochujang
									try-hard eu you probably haven't heard of them sed cornhole
									thundercats iPhone food truck. Scenester poutine tote bag, pug
									humblebrag 90's ullamco craft beer vice sed actually fanny
									pack gentrify. Flexitarian kale chips odio minim.
								</p>
							</SplitHorizontal.BottomPane>
						</SplitHorizontal>
					</section>
				</section>
			);
		},
	});

	return <Component />;
};
