import React from 'react';
import Panel from '../Panel/Panel';
import SidePanel from './SidePanel';
import ResponsiveGrid from '../ResponsiveGrid/ResponsiveGrid';

export default {
	title: 'Layout/SidePanel',
	component: SidePanel,
	parameters: {
		docs: {
			description: {
				component: (SidePanel as any).peek.description,
			},
		},
	},
};

/* No Modal */
export const NoModal = () => {
	class Component extends React.Component<any, any> {
		constructor(props: any, state: any) {
			super(props, state);
			this.state = { isExpanded: true };
			this.handleToggle = this.handleToggle.bind(this);
		}

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		}

		render() {
			return (
				<section>
					<p>
						modal can be disabled in the underlying Overlay component to allow
						interaction with the background
					</p>
					<button onClick={this.handleToggle}>Toggle SidePanel</button>

					<SidePanel
						isModal={false}
						isExpanded={this.state.isExpanded}
						onCollapse={this.handleToggle}
						Header='Stumptown keytar schlitz'
					>
						<p>
							Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
							crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
							helvetica kitsch farm-to-table thundercats. Occupy hammock
							waistcoat pabst ethical. Sartorial umami cardigan, farm-to-table
							bespoke 90's schlitz cray drinking vinegar actually freegan
							bushwick wolf. Shabby chic tofu celiac shaman, twee af squid blue
							bottle street art. Lumbersexual lo-fi stumptown, iceland locavore
							tacos chillwave portland beard celiac polaroid.
						</p>
						<p>
							Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk
							four loko selfies ramps pop-up coloring book before they sold out
							yuccie biodiesel. Yuccie taxidermy beard, +1 church-key umami echo
							park synth. Fanny pack farm-to-table pok pok, next level trust
							fund live-edge asymmetrical art party intelligentsia listicle
							sriracha. Tote bag ugh meggings, selfies vegan blog locavore
							messenger bag chambray etsy heirloom cronut enamel pin hammock
							umami. Bushwick venmo activated charcoal, mumblecore skateboard
							hashtag literally brooklyn etsy ennui 3 wolf moon. Before they
							sold out blog iPhone subway tile, truffaut dreamcatcher organic
							raclette portland whatever brooklyn succulents flexitarian
							gentrify cray. Kogi subway tile gochujang dreamcatcher.
						</p>
					</SidePanel>
				</section>
			);
		}
	}
	return <Component />;
};
NoModal.storyName = 'NoModal';

/* With Defaults */
export const WithDefaults = () => {
	const margins = {
		margin: '0 0 16px 0',
	};
	class Component extends React.Component<any, any> {
		constructor(props: any, state: any) {
			super(props, state);
			this.state = { isExpanded: true };
			this.handleToggle = this.handleToggle.bind(this);
		}

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		}

		render() {
			return (
				<section>
					<p>expand and collapse SidePanel by passing the isExpanded prop</p>
					<button onClick={this.handleToggle}>Toggle SidePanel</button>

					<SidePanel
						isExpanded={this.state.isExpanded}
						onCollapse={this.handleToggle}
					>
						<p style={margins}>
							Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
							crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
							helvetica kitsch farm-to-table thundercats. Occupy hammock
							waistcoat pabst ethical. Sartorial umami cardigan, farm-to-table
							bespoke 90's schlitz cray drinking vinegar actually freegan
							bushwick wolf. Shabby chic tofu celiac shaman, twee af squid blue
							bottle street art. Lumbersexual lo-fi stumptown, iceland locavore
							tacos chillwave portland beard celiac polaroid.
						</p>
						<p style={margins}>
							Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk
							four loko selfies ramps pop-up coloring book before they sold out
							yuccie biodiesel. Yuccie taxidermy beard, +1 church-key umami echo
							park synth. Fanny pack farm-to-table pok pok, next level trust
							fund live-edge asymmetrical art party intelligentsia listicle
							sriracha. Tote bag ugh meggings, selfies vegan blog locavore
							messenger bag chambray etsy heirloom cronut enamel pin hammock
							umami. Bushwick venmo activated charcoal, mumblecore skateboard
							hashtag literally brooklyn etsy ennui 3 wolf moon. Before they
							sold out blog iPhone subway tile, truffaut dreamcatcher organic
							raclette portland whatever brooklyn succulents flexitarian
							gentrify cray. Kogi subway tile gochujang dreamcatcher.
						</p>
					</SidePanel>
				</section>
			);
		}
	}
	return <Component />;
};
WithDefaults.storyName = 'WithDefaults';

/* With Header */
export const WithHeader = () => {
	const margins = {
		margin: '0 0 16px 0',
	};

	class Component extends React.Component<any, any> {
		constructor(props: any, state: any) {
			super(props, state);
			this.state = { isExpanded: true };
			this.handleToggle = this.handleToggle.bind(this);
		}

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		}

		render() {
			return (
				<section>
					<p>render a header with a close button</p>
					<button onClick={this.handleToggle}>Toggle SidePanel</button>

					<SidePanel
						isExpanded={this.state.isExpanded}
						onCollapse={this.handleToggle}
						width={500}
					>
						<SidePanel.Header>
							<div>
								<div>
									<strong>Rich content</strong>
								</div>
							</div>
						</SidePanel.Header>
						<p style={margins}>
							Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
							crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
							helvetica kitsch farm-to-table thundercats. Occupy hammock
							waistcoat pabst ethical. Sartorial umami cardigan, farm-to-table
							bespoke 90's schlitz cray drinking vinegar actually freegan
							bushwick wolf. Shabby chic tofu celiac shaman, twee af squid blue
							bottle street art. Lumbersexual lo-fi stumptown, iceland locavore
							tacos chillwave portland beard celiac polaroid.
						</p>
						<p style={margins}>
							Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk
							four loko selfies ramps pop-up coloring book before they sold out
							yuccie biodiesel. Yuccie taxidermy beard, +1 church-key umami echo
							park synth. Fanny pack farm-to-table pok pok, next level trust
							fund live-edge asymmetrical art party intelligentsia listicle
							sriracha. Tote bag ugh meggings, selfies vegan blog locavore
							messenger bag chambray etsy heirloom cronut enamel pin hammock
							umami. Bushwick venmo activated charcoal, mumblecore skateboard
							hashtag literally brooklyn etsy ennui 3 wolf moon. Before they
							sold out blog iPhone subway tile, truffaut dreamcatcher organic
							raclette portland whatever brooklyn succulents flexitarian
							gentrify cray. Kogi subway tile gochujang dreamcatcher.
						</p>
					</SidePanel>
				</section>
			);
		}
	}
	return <Component />;
};
WithHeader.storyName = 'WithHeader';

/* With Left Position */
export const WithLeftPosition = () => {
	const margins = {
		margin: '0 0 16px 0',
	};

	class Component extends React.Component<any, any> {
		constructor(props: any, state: any) {
			super(props, state);
			this.state = { isExpanded: true };
			this.handleToggle = this.handleToggle.bind(this);
		}

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		}

		render() {
			return (
				<section>
					<p>
						position of the SidePanel can be aligned on either side of the page
					</p>
					<button onClick={this.handleToggle}>Toggle SidePanel</button>

					<SidePanel
						isExpanded={this.state.isExpanded}
						onCollapse={this.handleToggle}
						position='left'
						Header='Stumptown keytar schlitz'
					>
						<p style={margins}>
							Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
							crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
							helvetica kitsch farm-to-table thundercats. Occupy hammock
							waistcoat pabst ethical. Sartorial umami cardigan, farm-to-table
							bespoke 90's schlitz cray drinking vinegar actually freegan
							bushwick wolf. Shabby chic tofu celiac shaman, twee af squid blue
							bottle street art. Lumbersexual lo-fi stumptown, iceland locavore
							tacos chillwave portland beard celiac polaroid.
						</p>
						<p style={margins}>
							Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk
							four loko selfies ramps pop-up coloring book before they sold out
							yuccie biodiesel. Yuccie taxidermy beard, +1 church-key umami echo
							park synth. Fanny pack farm-to-table pok pok, next level trust
							fund live-edge asymmetrical art party intelligentsia listicle
							sriracha. Tote bag ugh meggings, selfies vegan blog locavore
							messenger bag chambray etsy heirloom cronut enamel pin hammock
							umami. Bushwick venmo activated charcoal, mumblecore skateboard
							hashtag literally brooklyn etsy ennui 3 wolf moon. Before they
							sold out blog iPhone subway tile, truffaut dreamcatcher organic
							raclette portland whatever brooklyn succulents flexitarian
							gentrify cray. Kogi subway tile gochujang dreamcatcher.
						</p>
					</SidePanel>
				</section>
			);
		}
	}
	return <Component />;
};
WithLeftPosition.storyName = 'WithLeftPosition';

/* Without Animation */
export const WithoutAnimation = () => {
	class Component extends React.Component<any, any> {
		constructor(props: any, state: any) {
			super(props, state);
			this.state = { isExpanded: true };
			this.handleToggle = this.handleToggle.bind(this);
		}

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		}

		render() {
			return (
				<section>
					<p>transition animations can be disabled if desired</p>
					<button onClick={this.handleToggle}>Toggle SidePanel</button>

					<SidePanel
						isAnimated={false}
						isExpanded={this.state.isExpanded}
						onCollapse={this.handleToggle}
						Header='Stumptown keytar schlitz'
					>
						<p>
							Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
							crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
							helvetica kitsch farm-to-table thundercats. Occupy hammock
							waistcoat pabst ethical. Sartorial umami cardigan, farm-to-table
							bespoke 90's schlitz cray drinking vinegar actually freegan
							bushwick wolf. Shabby chic tofu celiac shaman, twee af squid blue
							bottle street art. Lumbersexual lo-fi stumptown, iceland locavore
							tacos chillwave portland beard celiac polaroid.
						</p>
						<p>
							Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk
							four loko selfies ramps pop-up coloring book before they sold out
							yuccie biodiesel. Yuccie taxidermy beard, +1 church-key umami echo
							park synth. Fanny pack farm-to-table pok pok, next level trust
							fund live-edge asymmetrical art party intelligentsia listicle
							sriracha. Tote bag ugh meggings, selfies vegan blog locavore
							messenger bag chambray etsy heirloom cronut enamel pin hammock
							umami. Bushwick venmo activated charcoal, mumblecore skateboard
							hashtag literally brooklyn etsy ennui 3 wolf moon. Before they
							sold out blog iPhone subway tile, truffaut dreamcatcher organic
							raclette portland whatever brooklyn succulents flexitarian
							gentrify cray. Kogi subway tile gochujang dreamcatcher.
						</p>
					</SidePanel>
				</section>
			);
		}
	}
	return <Component />;
};
WithoutAnimation.storyName = 'WithoutAnimation';

/* Without Resize */
export const WithoutResize = () => {
	class Component extends React.Component<any, any> {
		constructor(props: any, state: any) {
			super(props, state);
			this.state = { isExpanded: true };
			this.handleToggle = this.handleToggle.bind(this);
		}

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		}

		render() {
			return (
				<section>
					<p>prevent resizing width by hiding the resizer</p>
					<button onClick={this.handleToggle}>Toggle SidePanel</button>

					<SidePanel
						isResizeDisabled
						isExpanded={this.state.isExpanded}
						onCollapse={this.handleToggle}
						Header='Stumptown keytar schlitz'
					>
						<p>
							Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
							crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
							helvetica kitsch farm-to-table thundercats. Occupy hammock
							waistcoat pabst ethical. Sartorial umami cardigan, farm-to-table
							bespoke 90's schlitz cray drinking vinegar actually freegan
							bushwick wolf. Shabby chic tofu celiac shaman, twee af squid blue
							bottle street art. Lumbersexual lo-fi stumptown, iceland locavore
							tacos chillwave portland beard celiac polaroid.
						</p>
						<p>
							Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk
							four loko selfies ramps pop-up coloring book before they sold out
							yuccie biodiesel. Yuccie taxidermy beard, +1 church-key umami echo
							park synth. Fanny pack farm-to-table pok pok, next level trust
							fund live-edge asymmetrical art party intelligentsia listicle
							sriracha. Tote bag ugh meggings, selfies vegan blog locavore
							messenger bag chambray etsy heirloom cronut enamel pin hammock
							umami. Bushwick venmo activated charcoal, mumblecore skateboard
							hashtag literally brooklyn etsy ennui 3 wolf moon. Before they
							sold out blog iPhone subway tile, truffaut dreamcatcher organic
							raclette portland whatever brooklyn succulents flexitarian
							gentrify cray. Kogi subway tile gochujang dreamcatcher.
						</p>
					</SidePanel>
				</section>
			);
		}
	}
	return <Component />;
};
WithoutResize.storyName = 'WithoutResize';

/* With Resize */
export const WithResize = () => {
	class Component extends React.Component<any, any> {
		constructor(props: any, state: any) {
			super(props, state);
			this.state = { isExpanded: true, width: 240 };
			this.handleToggle = this.handleToggle.bind(this);
			this.handleResize = this.handleResize.bind(this);
		}

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		}

		handleResize(width: any) {
			this.setState({
				width,
			});
		}

		render() {
			return (
				<section>
					<p>resized width is obtatined with a callback</p>
					<p>SidePanel width: {this.state.width}</p>
					<button onClick={this.handleToggle}>Toggle SidePanel</button>

					<SidePanel
						isExpanded={this.state.isExpanded}
						width={this.state.width}
						onCollapse={this.handleToggle}
						Header='Stumptown keytar schlitz'
						onResize={this.handleResize}
					>
						<p>
							Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
							crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
							helvetica kitsch farm-to-table thundercats. Occupy hammock
							waistcoat pabst ethical. Sartorial umami cardigan, farm-to-table
							bespoke 90's schlitz cray drinking vinegar actually freegan
							bushwick wolf. Shabby chic tofu celiac shaman, twee af squid blue
							bottle street art. Lumbersexual lo-fi stumptown, iceland locavore
							tacos chillwave portland beard celiac polaroid.
						</p>
						<p>
							Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk
							four loko selfies ramps pop-up coloring book before they sold out
							yuccie biodiesel. Yuccie taxidermy beard, +1 church-key umami echo
							park synth. Fanny pack farm-to-table pok pok, next level trust
							fund live-edge asymmetrical art party intelligentsia listicle
							sriracha. Tote bag ugh meggings, selfies vegan blog locavore
							messenger bag chambray etsy heirloom cronut enamel pin hammock
							umami. Bushwick venmo activated charcoal, mumblecore skateboard
							hashtag literally brooklyn etsy ennui 3 wolf moon. Before they
							sold out blog iPhone subway tile, truffaut dreamcatcher organic
							raclette portland whatever brooklyn succulents flexitarian
							gentrify cray. Kogi subway tile gochujang dreamcatcher.
						</p>
					</SidePanel>
				</section>
			);
		}
	}
	return <Component />;
};
WithResize.storyName = 'WithResize';

/* With Top Margin */
export const WithTopMargin = () => {
	const margins = {
		margin: '0 0 16px 0',
	};
	class Component extends React.Component<any, any> {
		constructor(props: any, state: any) {
			super(props, state);
			this.state = { isExpanded: true };
			this.handleToggle = this.handleToggle.bind(this);
		}

		handleToggle() {
			this.setState({
				isExpanded: !this.state.isExpanded,
			});
		}

		render() {
			return (
				<section>
					<p>render the component with a top margin</p>
					<button onClick={this.handleToggle}>Toggle SidePanel</button>

					<SidePanel
						isExpanded={this.state.isExpanded}
						onCollapse={this.handleToggle}
						topOffset={50}
					>
						<SidePanel.Header>
							<div>
								<div>
									<strong>Rich content</strong>
								</div>
							</div>
						</SidePanel.Header>
						<p style={margins}>
							Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
							crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
							helvetica kitsch farm-to-table thundercats. Occupy hammock
							waistcoat pabst ethical. Sartorial umami cardigan, farm-to-table
							bespoke 90's schlitz cray drinking vinegar actually freegan
							bushwick wolf. Shabby chic tofu celiac shaman, twee af squid blue
							bottle street art. Lumbersexual lo-fi stumptown, iceland locavore
							tacos chillwave portland beard celiac polaroid.
						</p>
						<p style={margins}>
							Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk
							four loko selfies ramps pop-up coloring book before they sold out
							yuccie biodiesel. Yuccie taxidermy beard, +1 church-key umami echo
							park synth. Fanny pack farm-to-table pok pok, next level trust
							fund live-edge asymmetrical art party intelligentsia listicle
							sriracha. Tote bag ugh meggings, selfies vegan blog locavore
							messenger bag chambray etsy heirloom cronut enamel pin hammock
							umami. Bushwick venmo activated charcoal, mumblecore skateboard
							hashtag literally brooklyn etsy ennui 3 wolf moon. Before they
							sold out blog iPhone subway tile, truffaut dreamcatcher organic
							raclette portland whatever brooklyn succulents flexitarian
							gentrify cray. Kogi subway tile gochujang dreamcatcher.
						</p>
					</SidePanel>
				</section>
			);
		}
	}
	return <Component />;
};
WithTopMargin.storyName = 'WithTopMargin';

/* With Responsive Grid */
export const WithResponsiveGrid = () => {
	class Component extends React.Component {
		//@ts-ignore
		constructor(...args) {
			//@ts-ignore
			super(...(args as any[]));
			this.state = { isExpanded: true };
			this.handleToggle = this.handleToggle.bind(this);
		}

		handleToggle() {
			this.setState({
				//@ts-ignore
				isExpanded: !this.state.isExpanded,
			});
		}

		render() {
			return (
				<section>
					<p>
						modal can be disabled in the underlying Overlay component to allow
						interaction with the background
					</p>
					<button onClick={this.handleToggle}>Toggle SidePanel</button>

					<SidePanel
						isModal={false}
						//@ts-ignore
						isExpanded={this.state.isExpanded}
						onCollapse={this.handleToggle}
						Header='Stumptown keytar schlitz'
					>
						<div>
							<Panel hasMargin={false} style={{ marginBottom: '12px' }}>
								Stumptown keytar schlitz, vinyl vexillologist humblebrag
								sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
								asymmetrical helvetica kitsch farm-to-table thundercats. Occupy
								hammock waistcoat pabst ethical. Sartorial umami cardigan,
								farm-to-table bespoke 90's schlitz cray drinking vinegar
								actually freegan bushwick wolf. Shabby chic tofu celiac shaman,
								twee af squid blue bottle street art. Lumbersexual lo-fi
								stumptown, iceland locavore tacos chillwave portland beard
								celiac polaroid.
							</Panel>
							<ResponsiveGrid breakPoints={[480, 960]}>
								<ResponsiveGrid.Cell>
									<Panel hasMargin={false}>
										<Panel.Header>1</Panel.Header>
										Stumptown keytar schlitz, vinyl vexillologist humblebrag
										sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
										asymmetrical helvetica kitsch farm-to-table thundercats.
										Occupy hammock waistcoat pabst ethical. Sartorial umami
										cardigan, farm-to-table bespoke 90's schlitz cray drinking
										vinegar actually freegan bushwick wolf. Shabby chic tofu
										celiac shaman, twee af squid blue bottle street art.
										Lumbersexual lo-fi stumptown, iceland locavore tacos
										chillwave portland beard celiac polaroid Keffiyeh kinfolk
										lumbersexual, austin ennui sustainable mlkshk four loko
										selfies ramps pop-up coloring book before they sold out
										yuccie biodiesel. Yuccie taxidermy beard, +1 church-key
										umami echo park synth. Fanny pack farm-to-table pok pok,
										next level trust fund live-edge asymmetrical art party
										intelligentsia listicle sriracha. Tote bag ugh meggings,
										selfies vegan blog locavore messenger bag chambray etsy
										heirloom cronut enamel pin hammock umami. Bushwick venmo
										activated charcoal, mumblecore skateboard hashtag literally
										brooklyn etsy ennui 3 wolf moon. Before they sold out blog
										iPhone subway tile, truffaut dreamcatcher organic raclette
										portland whatever brooklyn succulents flexitarian gentrify
										cray. Kogi subway tile gochujang dreamcatcher.
									</Panel>
								</ResponsiveGrid.Cell>
								<ResponsiveGrid.Cell>
									<Panel hasMargin={false}>
										<Panel.Header>2</Panel.Header>
										Stumptown keytar schlitz, vinyl vexillologist humblebrag
										sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
										asymmetrical helvetica kitsch farm-to-table thundercats.
										Occupy hammock waistcoat pabst ethical. Sartorial umami
										cardigan, farm-to-table bespoke 90's schlitz cray drinking
										vinegar actually freegan bushwick wolf. Shabby xitarian
										gentrify cray. Kogi subway tile gochujang dreamcatcher.
									</Panel>
								</ResponsiveGrid.Cell>
								<ResponsiveGrid.Cell>
									<Panel hasMargin={false}>
										<Panel.Header>3</Panel.Header>
										trust fund live-edge asymmetrical art party intelligentsia
										listicle sriracha. Tote bag ugh meggings, selfies vegan blog
										locavore messenger bag chambray etsy heirloom cronut enamel
										pin hammock umami. Bushwick venmo activated charcoal,
										mumblecore skateboard hashtag literally brooklyn etsy ennui
										3 wolf moon. Before they sold out blog iPhone subway tile,
										truffaut dreamcatcher organic raclette portland whatever
										brooklyn succulents flexitarian gentrify cray. Kogi subway
										tile gochujang dreamcatcher.
									</Panel>
								</ResponsiveGrid.Cell>
								<ResponsiveGrid.Cell>
									<Panel hasMargin={false}>
										<Panel.Header>4</Panel.Header>
										Stumptown keytar schlitz, vinyl vexillologist humblebrag
										sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
										asymmetrical helvetica kitsch farm-to-table thundercats.
										Occupy hammock waistcoat pabst ethical. Sartorial umami
										cardigan, farm-to-table bespoke 90's schlitz cray drinking
										vinegar actually freegan bushwick wolf. Shabby chic tofu
										celiac shaman, twee af squid blue bottle street art.
										Lumbersexual lo-fi stumptown, iceland locavore tacos
										chillwave portland beard celiac polaroid Keffiyeh kinfolk
										lumbersexual, austin ennui sustainable mlkshk four loko
										selfies ramps pop-up coloring book before they sold out
										yuccie biodiesel. Yuccie taxidermy beard, +1 church-key
										umami echo park synth. Fanny pack farm-to-table pok pok,
										next level trust fund live-edge asymmetrical art party
										intelligentsia listicle sriracha. Tote bag ugh meggings,
										selfies vegan blog locavore messenger bag chambray etsy
										heirloom cronut enamel pin hammock umami. Bushwick venmo
										activated charcoal, mumblecore skateboard hashtag literally
										brooklyn etsy ennui 3 wolf moon. Before they sold out blog
										iPhone subway tile, truffaut dreamcatcher organic raclette
										portland whatever brooklyn succulents flexitarian gentrify
										cray. Kogi subway tile gochujang dreamcatcher crucifix
										cornhole. Four dollar toast 8-bit taiyaki asymmetrical
										helvetica kitsch farm-to-table thundercats. Occupy hammock
										waistcoat pabst ethical. Sartorial umami cardigan,
										farm-to-table bespoke 90's schlitz cray drinking vinegar
										actually freegan bushwick wolf. Shabby chic tofu celiac
										shaman, twee af squid blue bottle street art. Lumbersexual
										lo-fi stumptown, iceland locavore tacos chillwave.
									</Panel>
								</ResponsiveGrid.Cell>
								<ResponsiveGrid.Cell>
									<Panel hasMargin={false}>
										<Panel.Header>5</Panel.Header>
										Stumptown keytar schlitz, vinyl vexillologist humblebrag
										sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
										asymmetrical helvetica kitsch farm-to-table thundercats.
										Occupy hammock waistcoat pabst ethical. Sartorial umami
										cardigan, farm-to-table bespoke 90's schlitz cray drinking
										vinegar actually freegan bushwick wolf. Shabby chic tofu
										celiac shaman, twee af squid blue bottle street art.
										Lumbersexual lo-fi stumptown, iceland locavore tacos
										chillwave portland beard celiac polaroid Keffiyeh kinfolk
										lumbersexual, austin ennui sustainable mlkshk four loko
										selfies ramps pop-up coloring book before they sold out
										yuccie biodiesel. Yuccie taxidermy beard, +1 church-key
										umami echo park synth. Fanny pack farm-to-table pok pok,
										next level trust fund live-edge asymmetrical art party
										intelligentsia listicle sriracha. Tote bag ugh meggings,
										selfies vegan blog locavore messenger bag chambray etsy
										heirloom cronut enamel pin hammock umami. Bushwick venmo
										activated charcoal, mumblecore skateboard hashtag literally
										brooklyn etsy ennui 3 wolf moon. Before they sold out blog
										iPhone subway tile, truffaut dreamcatcher organic raclette
										portland whatever brooklyn succulents flexitarian gentrify
										cray. Kogi subway tile gochujang dreamcatcher.
									</Panel>
								</ResponsiveGrid.Cell>
								<ResponsiveGrid.Cell>
									<Panel hasMargin={false}>
										<Panel.Header>6</Panel.Header>
										Stumptown keytar schlitz, vinyl vexillologist humblebrag
										sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
										asymmetrical helvetica kitsch farm-to-table thundercats.
										Occupy hammock waistcoat pabst ethical. Sartorial umami
										cardigan, farm-to-table bespoke 90's schlitz cray drinking
										vinegar actually freegan bushwick wolf. Shabby chic tofu
										celiac shaman, twee af squid blue bottle street art.
										brooklyn etsy ennui 3 wolf moon. Before they sold out blog
										iPhone subway tile, truffaut dreamcatcher organic raclette
										portland whatever brooklyn succulents flexitarian gentrify
										cray. Kogi subway tile gochujang dreamcatcher Lumbersexual
										lo-fi stumptown, iceland locavore tacos chillwave portland
										beard celiac polaroid Keffiyeh kinfolk lumbersexual, austin
										ennui sustainable mlkshk four loko selfies ramps pop-up
										coloring book before they sold out yuccie biodiesel. Yuccie
										taxidermy beard, +1 church-key umami echo park synth. Fanny
										pack farm-to-table pok pok, next level trust fund live-edge
										asymmetrical art party intelligentsia listicle sriracha.
										Tote bag ugh meggings, selfies vegan blog locavore messenger
										bag chambray etsy heirloom cronut enamel pin hammock umami.
										Bushwick venmo activated charcoal, mumblecore skateboard
										hashtag literally brooklyn etsy ennui 3 wolf moon. Before
										they sold out blog iPhone subway tile, truffaut dreamcatcher
										organic raclette portland whatever brooklyn succulents
										flexitarian gentrify cray. Kogi subway tile gochujang
										dreamcatcher.
									</Panel>
								</ResponsiveGrid.Cell>
								<ResponsiveGrid.Cell>
									<Panel hasMargin={false}>
										<Panel.Header>7</Panel.Header>
										Stumptown keytar schlitz, vinyl vexillologist humblebrag
										sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
										asymmetrical helvetica kitsch farm-to-table thundercats.
										Occupy hammock waistcoat pabst ethical. Sartorial umami
										cardigan, farm-to-table bespoke 90's schlitz cray drinking
										vinegar actually freegan bushwick wolf. Shabby
									</Panel>
								</ResponsiveGrid.Cell>
								<ResponsiveGrid.Cell>
									<Panel hasMargin={false}>
										<Panel.Header>8</Panel.Header>
										Stumptown keytar schlitz, vinyl vexillologist humblebrag
										sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
										asymmetrical helvetica kitsch farm-to-table thundercats.
										Occupy hammock waistcoat pabst ethical. Sartorial umami
										cardigan, farm-to-table bespoke 90's schlitz cray drinking
										vinegar actually freegan bushwick wolf. Shabby chic tofu
										celiac shaman, twee af squid blue bottle street art. they
										sold out yuccie biodiesel. Yuccie taxidermy beard, +1
										church-key umami echo park synth. Fanny pack farm-to-table
										pok pok, next level trust fund live-edge asymmetrical art
										party intelligentsia listicle sriracha. Tote bag ugh
										meggings, selfies vegan blog locavore messenger bag chambray
										etsy heirloom cronut enamel pin hammock umami. Bushwick
										venmo activated charcoal, mumblecore skateboard hashtag
										literally brooklyn etsy ennui 3 wolf moon. Before they sold
										out blog iPhone subway tile, truffaut dreamcatcher organic
										raclette portland whatever brooklyn succulents flexitarian
										gentrify cray. Kogi subway tile gochujang dreamcatcher.
										kitsch farm-to-table thundercats. Occupy hammock waistcoat
										pabst ethical. Sartorial umami cardigan, farm-to-table
										bespoke 90's schlitz cray drinking vinegar actually freegan
										bushwick wolf. Shabby chic tofu celiac shaman, twee af squid
										blue bottle street art. they sold out yuccie biodiesel.
										Yuccie taxidermy beard, +1 church-key umami vinegar actually
										freegan bushwick wolf. Shabby chic tofu celiac shaman, twee
										af squid blue bottle street art. they sold out yuccie
										biodiesel. Yuccie taxidermy beard, +1 church-key umami
									</Panel>
								</ResponsiveGrid.Cell>
								<ResponsiveGrid.Cell>
									<Panel hasMargin={false}>
										<Panel.Header>9</Panel.Header>
										Stumptown keytar schlitz, vinyl vexillologist humblebrag
										sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
										asymmetrical helvetica kitsch farm-to-table thundercats.
										Occupy hammock waistcoat pabst ethical. Sartorial umami
										cardigan, farm-to-table bespoke 90's schlitz cray drinking
										vinegar actually freegan bushwick wolf. Shabby chic tofu
										celiac shaman, twee af squid blue bottle street art.
										Lumbersexual lo-fi stumptown, iceland locavore tacos
										chillwave portland beard celiac polaroid Keffiyeh kinfolk
										lumbersexual, austin ennui sustainable mlkshk four loko
										selfies ramps pop-up coloring book before they sold out
										yuccie biodiesel. Yuccie taxidermy beard, +1 church-key
										umami echo park synth. Fanny pack farm-to-table pok pok,
										next level trust fund live-edge asymmetrical art party
										intelligentsia listicle sriracha. Tote bag ugh meggings,
										selfies vegan blog locavore messenger bag chambray etsy
										heirloom cronut enamel pin hammock umami. Bushwick venmo
										activated charcoal, mumblecore skateboard hashtag literally
										brooklyn etsy ennui 3 wolf moon. Before they sold out blog
										iPhone subway tile, truffaut dreamcatcher organic raclette
										portland whatever brooklyn succulents flexitarian gentrify
										cray. Kogi subway tile gochujang dreamcatcher. Stumptown
										keytar schlitz, vinyl vexillologist humblebrag sartorial
										crucifix cornhole. Four dollar toast 8-bit taiyaki
										asymmetrical helvetica kitsch farm-to-table thundercats.
										Occupy hammock waistcoat pabst ethical. Sartorial umami
										cardigan, farm-to-table bespoke 90's schlitz cray drinking
										vinegar actually freegan bushwick wolf. Shabby chic tofu
										celiac shaman, twee af squid blue bottle street art.
										Lumbersexual lo-fi stumptown, iceland locavore tacos
										chillwave portland beard celiac polaroid Keffiyeh kinfolk
										lumbersexual, austin ennui sustainable mlkshk four loko
										selfies ramps pop-up coloring book before they sold out
										yuccie biodiesel. Yuccie taxidermy beard, +1 church-key
										umami echo park synth. Fanny pack farm-to-table pok pok,
										next level trust fund live-edge asymmetrical art party
										intelligentsia listicle sriracha. Tote bag ugh meggings,
										selfies vegan blog locavore messenger bag chambray etsy
										heirloom cronut enamel pin hammock umami. Bushwick venmo
										activated charcoal, mumblecore skateboard hashtag literally
										brooklyn etsy ennui 3 wolf moon. Before they sold out blog
										iPhone subway tile, truffaut dreamcatcher organic raclette
										portland whatever brooklyn succulents flexitarian gentrify
										cray. Kogi subway tile gochujang dreamcatcher.
									</Panel>
								</ResponsiveGrid.Cell>
								<ResponsiveGrid.Cell>
									<Panel hasMargin={false}>
										<Panel.Header>10</Panel.Header>
										Stumptown keytar schlitz, vinyl vexillologist humblebrag
										sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
										asymmetrical helvetica kitsch farm-to-table thundercats.
										Occupy hammock waistcoat pabst ethical. Sartorial umami
										cardigan, farm-to-table bespoke 90's schlitz cray drinking
										vinegar actually freegan bushwick wolf. Shabby chic tofu
										celiac shaman, twee af squid blue bottle street art.
										Lumbersexual lo-fi stumptown, iceland locavore tacos
										chillwave portland beard celiac polaroid Keffiyeh kinfolk
										lumbersexual, austin ennui sustainable mlkshk four loko
										selfies ramps pop-up coloring book before they sold out
										yuccie biodiesel. Yuccie taxidermy beard, +1 church-key
										umami echo park synth. Fanny pack farm-to-table pok pok,
										next level trust fund live-edge asymmetrical art party
										intelligentsia listicle sriracha. Tote bag ugh meggings,
										selfies vegan blog locavore messenger bag chambray etsy
										heirloom cronut enamel pin hammock umami. Bushwick venmo
										activated charcoal, mumblecore skateboard hashtag literally
										brooklyn etsy ennui 3 wolf moon. Before they sold out blog
										iPhone subway tile, truffaut dreamcatcher organic raclette
										portland whatever brooklyn succulents flexitarian gentrify
										cray. Kogi subway tile gochujang dreamcatcher.
									</Panel>
								</ResponsiveGrid.Cell>
								<ResponsiveGrid.Cell>
									<Panel hasMargin={false}>
										<Panel.Header>11</Panel.Header>
										Stumptown keytar schlitz, vinyl vexillologist humblebrag
										sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
										asymmetrical helvetica kitsch farm-to-table thundercats.
										Occupy hammock waistcoat pabst.
									</Panel>
								</ResponsiveGrid.Cell>
							</ResponsiveGrid>
						</div>
					</SidePanel>
				</section>
			);
		}
	}
	return <Component />;
};
WithResponsiveGrid.storyName = 'WithResponsiveGrid';
