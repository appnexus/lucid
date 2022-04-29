import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import Panel from '../Panel/Panel';
import SidePanel, { ISidePanelProps } from './SidePanel';
import ResponsiveGrid from '../ResponsiveGrid/ResponsiveGrid';

export default {
	title: 'Layout/SidePanel',
	component: SidePanel,
	parameters: {
		docs: {
			description: {
				component: SidePanel.peek.description,
			},
		},
	},
	args: SidePanel.defaultProps,
} as Meta;

/* No Modal */
export const NoModal: Story<ISidePanelProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<section>
			<p>
				modal can be disabled in the underlying Overlay component to allow
				interaction with the background
			</p>
			<button onClick={handleToggle}>Toggle SidePanel</button>

			<SidePanel
				isModal={false}
				isExpanded={isExpanded}
				onCollapse={handleToggle}
				Header='Stumptown keytar schlitz'
			>
				<p>
					Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
					crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
					helvetica kitsch farm-to-table thundercats. Occupy hammock waistcoat
					pabst ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
					schlitz cray drinking vinegar actually freegan bushwick wolf. Shabby
					chic tofu celiac shaman, twee af squid blue bottle street art.
					Lumbersexual lo-fi stumptown, iceland locavore tacos chillwave
					portland beard celiac polaroid.
				</p>
				<p>
					Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk four
					loko selfies ramps pop-up coloring book before they sold out yuccie
					biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
					synth. Fanny pack farm-to-table pok pok, next level trust fund
					live-edge asymmetrical art party intelligentsia listicle sriracha.
					Tote bag ugh meggings, selfies vegan blog locavore messenger bag
					chambray etsy heirloom cronut enamel pin hammock umami. Bushwick venmo
					activated charcoal, mumblecore skateboard hashtag literally brooklyn
					etsy ennui 3 wolf moon. Before they sold out blog iPhone subway tile,
					truffaut dreamcatcher organic raclette portland whatever brooklyn
					succulents flexitarian gentrify cray. Kogi subway tile gochujang
					dreamcatcher.
				</p>
			</SidePanel>
		</section>
	);
};

/* With Defaults */
export const WithDefaults: Story<ISidePanelProps> = (args) => {
	const margins = {
		margin: '0 0 16px 0',
	};
	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};
	return (
		<section>
			<p>expand and collapse SidePanel by passing the isExpanded prop</p>
			<button onClick={handleToggle}>Toggle SidePanel</button>

			<SidePanel isExpanded={isExpanded} onCollapse={handleToggle}>
				<p style={margins}>
					Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
					crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
					helvetica kitsch farm-to-table thundercats. Occupy hammock waistcoat
					pabst ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
					schlitz cray drinking vinegar actually freegan bushwick wolf. Shabby
					chic tofu celiac shaman, twee af squid blue bottle street art.
					Lumbersexual lo-fi stumptown, iceland locavore tacos chillwave
					portland beard celiac polaroid.
				</p>
				<p style={margins}>
					Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk four
					loko selfies ramps pop-up coloring book before they sold out yuccie
					biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
					synth. Fanny pack farm-to-table pok pok, next level trust fund
					live-edge asymmetrical art party intelligentsia listicle sriracha.
					Tote bag ugh meggings, selfies vegan blog locavore messenger bag
					chambray etsy heirloom cronut enamel pin hammock umami. Bushwick venmo
					activated charcoal, mumblecore skateboard hashtag literally brooklyn
					etsy ennui 3 wolf moon. Before they sold out blog iPhone subway tile,
					truffaut dreamcatcher organic raclette portland whatever brooklyn
					succulents flexitarian gentrify cray. Kogi subway tile gochujang
					dreamcatcher.
				</p>
			</SidePanel>
		</section>
	);
};

/* With Header */
export const WithHeader: Story<ISidePanelProps> = (args) => {
	const margins = {
		margin: '0 0 16px 0',
	};

	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};
	return (
		<section>
			<p>render a header with a close button</p>
			<button onClick={handleToggle}>Toggle SidePanel</button>

			<SidePanel isExpanded={isExpanded} onCollapse={handleToggle} width={500}>
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
					helvetica kitsch farm-to-table thundercats. Occupy hammock waistcoat
					pabst ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
					schlitz cray drinking vinegar actually freegan bushwick wolf. Shabby
					chic tofu celiac shaman, twee af squid blue bottle street art.
					Lumbersexual lo-fi stumptown, iceland locavore tacos chillwave
					portland beard celiac polaroid.
				</p>
				<p style={margins}>
					Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk four
					loko selfies ramps pop-up coloring book before they sold out yuccie
					biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
					synth. Fanny pack farm-to-table pok pok, next level trust fund
					live-edge asymmetrical art party intelligentsia listicle sriracha.
					Tote bag ugh meggings, selfies vegan blog locavore messenger bag
					chambray etsy heirloom cronut enamel pin hammock umami. Bushwick venmo
					activated charcoal, mumblecore skateboard hashtag literally brooklyn
					etsy ennui 3 wolf moon. Before they sold out blog iPhone subway tile,
					truffaut dreamcatcher organic raclette portland whatever brooklyn
					succulents flexitarian gentrify cray. Kogi subway tile gochujang
					dreamcatcher.
				</p>
			</SidePanel>
		</section>
	);
};

/* With Left Position */
export const WithLeftPosition: Story<ISidePanelProps> = (args) => {
	const margins = {
		margin: '0 0 16px 0',
	};

	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};
	return (
		<section>
			<p>position of the SidePanel can be aligned on either side of the page</p>
			<button onClick={handleToggle}>Toggle SidePanel</button>

			<SidePanel
				isExpanded={isExpanded}
				onCollapse={handleToggle}
				position='left'
				Header='Stumptown keytar schlitz'
			>
				<p style={margins}>
					Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
					crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
					helvetica kitsch farm-to-table thundercats. Occupy hammock waistcoat
					pabst ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
					schlitz cray drinking vinegar actually freegan bushwick wolf. Shabby
					chic tofu celiac shaman, twee af squid blue bottle street art.
					Lumbersexual lo-fi stumptown, iceland locavore tacos chillwave
					portland beard celiac polaroid.
				</p>
				<p style={margins}>
					Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk four
					loko selfies ramps pop-up coloring book before they sold out yuccie
					biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
					synth. Fanny pack farm-to-table pok pok, next level trust fund
					live-edge asymmetrical art party intelligentsia listicle sriracha.
					Tote bag ugh meggings, selfies vegan blog locavore messenger bag
					chambray etsy heirloom cronut enamel pin hammock umami. Bushwick venmo
					activated charcoal, mumblecore skateboard hashtag literally brooklyn
					etsy ennui 3 wolf moon. Before they sold out blog iPhone subway tile,
					truffaut dreamcatcher organic raclette portland whatever brooklyn
					succulents flexitarian gentrify cray. Kogi subway tile gochujang
					dreamcatcher.
				</p>
			</SidePanel>
		</section>
	);
};

/* Without Animation */
export const WithoutAnimation: Story<ISidePanelProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};
	return (
		<section>
			<p>transition animations can be disabled if desired</p>
			<button onClick={handleToggle}>Toggle SidePanel</button>

			<SidePanel
				isAnimated={false}
				isExpanded={isExpanded}
				onCollapse={handleToggle}
				Header='Stumptown keytar schlitz'
			>
				<p>
					Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
					crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
					helvetica kitsch farm-to-table thundercats. Occupy hammock waistcoat
					pabst ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
					schlitz cray drinking vinegar actually freegan bushwick wolf. Shabby
					chic tofu celiac shaman, twee af squid blue bottle street art.
					Lumbersexual lo-fi stumptown, iceland locavore tacos chillwave
					portland beard celiac polaroid.
				</p>
				<p>
					Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk four
					loko selfies ramps pop-up coloring book before they sold out yuccie
					biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
					synth. Fanny pack farm-to-table pok pok, next level trust fund
					live-edge asymmetrical art party intelligentsia listicle sriracha.
					Tote bag ugh meggings, selfies vegan blog locavore messenger bag
					chambray etsy heirloom cronut enamel pin hammock umami. Bushwick venmo
					activated charcoal, mumblecore skateboard hashtag literally brooklyn
					etsy ennui 3 wolf moon. Before they sold out blog iPhone subway tile,
					truffaut dreamcatcher organic raclette portland whatever brooklyn
					succulents flexitarian gentrify cray. Kogi subway tile gochujang
					dreamcatcher.
				</p>
			</SidePanel>
		</section>
	);
};

/* Without Resize */
export const WithoutResize: Story<ISidePanelProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<section>
			<p>prevent resizing width by hiding the resizer</p>
			<button onClick={handleToggle}>Toggle SidePanel</button>

			<SidePanel
				isResizeDisabled
				isExpanded={isExpanded}
				onCollapse={handleToggle}
				Header='Stumptown keytar schlitz'
			>
				<p>
					Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
					crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
					helvetica kitsch farm-to-table thundercats. Occupy hammock waistcoat
					pabst ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
					schlitz cray drinking vinegar actually freegan bushwick wolf. Shabby
					chic tofu celiac shaman, twee af squid blue bottle street art.
					Lumbersexual lo-fi stumptown, iceland locavore tacos chillwave
					portland beard celiac polaroid.
				</p>
				<p>
					Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk four
					loko selfies ramps pop-up coloring book before they sold out yuccie
					biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
					synth. Fanny pack farm-to-table pok pok, next level trust fund
					live-edge asymmetrical art party intelligentsia listicle sriracha.
					Tote bag ugh meggings, selfies vegan blog locavore messenger bag
					chambray etsy heirloom cronut enamel pin hammock umami. Bushwick venmo
					activated charcoal, mumblecore skateboard hashtag literally brooklyn
					etsy ennui 3 wolf moon. Before they sold out blog iPhone subway tile,
					truffaut dreamcatcher organic raclette portland whatever brooklyn
					succulents flexitarian gentrify cray. Kogi subway tile gochujang
					dreamcatcher.
				</p>
			</SidePanel>
		</section>
	);
};

/* With Resize */
export const WithResize: Story<ISidePanelProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(true);
	const [width, setWidth] = useState(240);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	const handleResize = (width) => {
		setWidth(width);
	};

	return (
		<section>
			<p>resized width is obtatined with a callback</p>
			<p>SidePanel width: {width}</p>
			<button onClick={handleToggle}>Toggle SidePanel</button>

			<SidePanel
				isExpanded={isExpanded}
				width={width}
				onCollapse={handleToggle}
				Header='Stumptown keytar schlitz'
				onResize={handleResize}
			>
				<p>
					Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
					crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
					helvetica kitsch farm-to-table thundercats. Occupy hammock waistcoat
					pabst ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
					schlitz cray drinking vinegar actually freegan bushwick wolf. Shabby
					chic tofu celiac shaman, twee af squid blue bottle street art.
					Lumbersexual lo-fi stumptown, iceland locavore tacos chillwave
					portland beard celiac polaroid.
				</p>
				<p>
					Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk four
					loko selfies ramps pop-up coloring book before they sold out yuccie
					biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
					synth. Fanny pack farm-to-table pok pok, next level trust fund
					live-edge asymmetrical art party intelligentsia listicle sriracha.
					Tote bag ugh meggings, selfies vegan blog locavore messenger bag
					chambray etsy heirloom cronut enamel pin hammock umami. Bushwick venmo
					activated charcoal, mumblecore skateboard hashtag literally brooklyn
					etsy ennui 3 wolf moon. Before they sold out blog iPhone subway tile,
					truffaut dreamcatcher organic raclette portland whatever brooklyn
					succulents flexitarian gentrify cray. Kogi subway tile gochujang
					dreamcatcher.
				</p>
			</SidePanel>
		</section>
	);
};

/* With Top Margin */
export const WithTopMargin: Story<ISidePanelProps> = (args) => {
	const margins = {
		margin: '0 0 16px 0',
	};

	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<section>
			<p>render the component with a top margin</p>
			<button onClick={handleToggle}>Toggle SidePanel</button>

			<SidePanel
				isExpanded={isExpanded}
				onCollapse={handleToggle}
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
					helvetica kitsch farm-to-table thundercats. Occupy hammock waistcoat
					pabst ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
					schlitz cray drinking vinegar actually freegan bushwick wolf. Shabby
					chic tofu celiac shaman, twee af squid blue bottle street art.
					Lumbersexual lo-fi stumptown, iceland locavore tacos chillwave
					portland beard celiac polaroid.
				</p>
				<p style={margins}>
					Keffiyeh kinfolk lumbersexual, austin ennui sustainable mlkshk four
					loko selfies ramps pop-up coloring book before they sold out yuccie
					biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
					synth. Fanny pack farm-to-table pok pok, next level trust fund
					live-edge asymmetrical art party intelligentsia listicle sriracha.
					Tote bag ugh meggings, selfies vegan blog locavore messenger bag
					chambray etsy heirloom cronut enamel pin hammock umami. Bushwick venmo
					activated charcoal, mumblecore skateboard hashtag literally brooklyn
					etsy ennui 3 wolf moon. Before they sold out blog iPhone subway tile,
					truffaut dreamcatcher organic raclette portland whatever brooklyn
					succulents flexitarian gentrify cray. Kogi subway tile gochujang
					dreamcatcher.
				</p>
			</SidePanel>
		</section>
	);
};

/* With Responsive Grid */
export const WithResponsiveGrid: Story<ISidePanelProps> = (args) => {
	const [isExpanded, setIsExpanded] = useState(true);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<section>
			<p>
				modal can be disabled in the underlying Overlay component to allow
				interaction with the background
			</p>
			<button onClick={handleToggle}>Toggle SidePanel</button>

			<SidePanel
				isModal={false}
				isExpanded={isExpanded}
				onCollapse={handleToggle}
				Header='Stumptown keytar schlitz'
			>
				<div>
					<Panel hasMargin={false} style={{ marginBottom: '12px' }}>
						Stumptown keytar schlitz, vinyl vexillologist humblebrag sartorial
						crucifix cornhole. Four dollar toast 8-bit taiyaki asymmetrical
						helvetica kitsch farm-to-table thundercats. Occupy hammock waistcoat
						pabst ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
						schlitz cray drinking vinegar actually freegan bushwick wolf. Shabby
						chic tofu celiac shaman, twee af squid blue bottle street art.
						Lumbersexual lo-fi stumptown, iceland locavore tacos chillwave
						portland beard celiac polaroid.
					</Panel>
					<ResponsiveGrid breakPoints={[480, 960]}>
						<ResponsiveGrid.Cell>
							<Panel hasMargin={false}>
								<Panel.Header>1</Panel.Header>
								Stumptown keytar schlitz, vinyl vexillologist humblebrag
								sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
								asymmetrical helvetica kitsch farm-to-table thundercats. Occupy
								hammock waistcoat pabst ethical. Sartorial umami cardigan,
								farm-to-table bespoke 90's schlitz cray drinking vinegar
								actually freegan bushwick wolf. Shabby chic tofu celiac shaman,
								twee af squid blue bottle street art. Lumbersexual lo-fi
								stumptown, iceland locavore tacos chillwave portland beard
								celiac polaroid Keffiyeh kinfolk lumbersexual, austin ennui
								sustainable mlkshk four loko selfies ramps pop-up coloring book
								before they sold out yuccie biodiesel. Yuccie taxidermy beard,
								+1 church-key umami echo park synth. Fanny pack farm-to-table
								pok pok, next level trust fund live-edge asymmetrical art party
								intelligentsia listicle sriracha. Tote bag ugh meggings, selfies
								vegan blog locavore messenger bag chambray etsy heirloom cronut
								enamel pin hammock umami. Bushwick venmo activated charcoal,
								mumblecore skateboard hashtag literally brooklyn etsy ennui 3
								wolf moon. Before they sold out blog iPhone subway tile,
								truffaut dreamcatcher organic raclette portland whatever
								brooklyn succulents flexitarian gentrify cray. Kogi subway tile
								gochujang dreamcatcher.
							</Panel>
						</ResponsiveGrid.Cell>
						<ResponsiveGrid.Cell>
							<Panel hasMargin={false}>
								<Panel.Header>2</Panel.Header>
								Stumptown keytar schlitz, vinyl vexillologist humblebrag
								sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
								asymmetrical helvetica kitsch farm-to-table thundercats. Occupy
								hammock waistcoat pabst ethical. Sartorial umami cardigan,
								farm-to-table bespoke 90's schlitz cray drinking vinegar
								actually freegan bushwick wolf. Shabby xitarian gentrify cray.
								Kogi subway tile gochujang dreamcatcher.
							</Panel>
						</ResponsiveGrid.Cell>
						<ResponsiveGrid.Cell>
							<Panel hasMargin={false}>
								<Panel.Header>3</Panel.Header>
								trust fund live-edge asymmetrical art party intelligentsia
								listicle sriracha. Tote bag ugh meggings, selfies vegan blog
								locavore messenger bag chambray etsy heirloom cronut enamel pin
								hammock umami. Bushwick venmo activated charcoal, mumblecore
								skateboard hashtag literally brooklyn etsy ennui 3 wolf moon.
								Before they sold out blog iPhone subway tile, truffaut
								dreamcatcher organic raclette portland whatever brooklyn
								succulents flexitarian gentrify cray. Kogi subway tile gochujang
								dreamcatcher.
							</Panel>
						</ResponsiveGrid.Cell>
						<ResponsiveGrid.Cell>
							<Panel hasMargin={false}>
								<Panel.Header>4</Panel.Header>
								Stumptown keytar schlitz, vinyl vexillologist humblebrag
								sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
								asymmetrical helvetica kitsch farm-to-table thundercats. Occupy
								hammock waistcoat pabst ethical. Sartorial umami cardigan,
								farm-to-table bespoke 90's schlitz cray drinking vinegar
								actually freegan bushwick wolf. Shabby chic tofu celiac shaman,
								twee af squid blue bottle street art. Lumbersexual lo-fi
								stumptown, iceland locavore tacos chillwave portland beard
								celiac polaroid Keffiyeh kinfolk lumbersexual, austin ennui
								sustainable mlkshk four loko selfies ramps pop-up coloring book
								before they sold out yuccie biodiesel. Yuccie taxidermy beard,
								+1 church-key umami echo park synth. Fanny pack farm-to-table
								pok pok, next level trust fund live-edge asymmetrical art party
								intelligentsia listicle sriracha. Tote bag ugh meggings, selfies
								vegan blog locavore messenger bag chambray etsy heirloom cronut
								enamel pin hammock umami. Bushwick venmo activated charcoal,
								mumblecore skateboard hashtag literally brooklyn etsy ennui 3
								wolf moon. Before they sold out blog iPhone subway tile,
								truffaut dreamcatcher organic raclette portland whatever
								brooklyn succulents flexitarian gentrify cray. Kogi subway tile
								gochujang dreamcatcher crucifix cornhole. Four dollar toast
								8-bit taiyaki asymmetrical helvetica kitsch farm-to-table
								thundercats. Occupy hammock waistcoat pabst ethical. Sartorial
								umami cardigan, farm-to-table bespoke 90's schlitz cray drinking
								vinegar actually freegan bushwick wolf. Shabby chic tofu celiac
								shaman, twee af squid blue bottle street art. Lumbersexual lo-fi
								stumptown, iceland locavore tacos chillwave.
							</Panel>
						</ResponsiveGrid.Cell>
						<ResponsiveGrid.Cell>
							<Panel hasMargin={false}>
								<Panel.Header>5</Panel.Header>
								Stumptown keytar schlitz, vinyl vexillologist humblebrag
								sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
								asymmetrical helvetica kitsch farm-to-table thundercats. Occupy
								hammock waistcoat pabst ethical. Sartorial umami cardigan,
								farm-to-table bespoke 90's schlitz cray drinking vinegar
								actually freegan bushwick wolf. Shabby chic tofu celiac shaman,
								twee af squid blue bottle street art. Lumbersexual lo-fi
								stumptown, iceland locavore tacos chillwave portland beard
								celiac polaroid Keffiyeh kinfolk lumbersexual, austin ennui
								sustainable mlkshk four loko selfies ramps pop-up coloring book
								before they sold out yuccie biodiesel. Yuccie taxidermy beard,
								+1 church-key umami echo park synth. Fanny pack farm-to-table
								pok pok, next level trust fund live-edge asymmetrical art party
								intelligentsia listicle sriracha. Tote bag ugh meggings, selfies
								vegan blog locavore messenger bag chambray etsy heirloom cronut
								enamel pin hammock umami. Bushwick venmo activated charcoal,
								mumblecore skateboard hashtag literally brooklyn etsy ennui 3
								wolf moon. Before they sold out blog iPhone subway tile,
								truffaut dreamcatcher organic raclette portland whatever
								brooklyn succulents flexitarian gentrify cray. Kogi subway tile
								gochujang dreamcatcher.
							</Panel>
						</ResponsiveGrid.Cell>
						<ResponsiveGrid.Cell>
							<Panel hasMargin={false}>
								<Panel.Header>6</Panel.Header>
								Stumptown keytar schlitz, vinyl vexillologist humblebrag
								sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
								asymmetrical helvetica kitsch farm-to-table thundercats. Occupy
								hammock waistcoat pabst ethical. Sartorial umami cardigan,
								farm-to-table bespoke 90's schlitz cray drinking vinegar
								actually freegan bushwick wolf. Shabby chic tofu celiac shaman,
								twee af squid blue bottle street art. brooklyn etsy ennui 3 wolf
								moon. Before they sold out blog iPhone subway tile, truffaut
								dreamcatcher organic raclette portland whatever brooklyn
								succulents flexitarian gentrify cray. Kogi subway tile gochujang
								dreamcatcher Lumbersexual lo-fi stumptown, iceland locavore
								tacos chillwave portland beard celiac polaroid Keffiyeh kinfolk
								lumbersexual, austin ennui sustainable mlkshk four loko selfies
								ramps pop-up coloring book before they sold out yuccie
								biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
								synth. Fanny pack farm-to-table pok pok, next level trust fund
								live-edge asymmetrical art party intelligentsia listicle
								sriracha. Tote bag ugh meggings, selfies vegan blog locavore
								messenger bag chambray etsy heirloom cronut enamel pin hammock
								umami. Bushwick venmo activated charcoal, mumblecore skateboard
								hashtag literally brooklyn etsy ennui 3 wolf moon. Before they
								sold out blog iPhone subway tile, truffaut dreamcatcher organic
								raclette portland whatever brooklyn succulents flexitarian
								gentrify cray. Kogi subway tile gochujang dreamcatcher.
							</Panel>
						</ResponsiveGrid.Cell>
						<ResponsiveGrid.Cell>
							<Panel hasMargin={false}>
								<Panel.Header>7</Panel.Header>
								Stumptown keytar schlitz, vinyl vexillologist humblebrag
								sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
								asymmetrical helvetica kitsch farm-to-table thundercats. Occupy
								hammock waistcoat pabst ethical. Sartorial umami cardigan,
								farm-to-table bespoke 90's schlitz cray drinking vinegar
								actually freegan bushwick wolf. Shabby
							</Panel>
						</ResponsiveGrid.Cell>
						<ResponsiveGrid.Cell>
							<Panel hasMargin={false}>
								<Panel.Header>8</Panel.Header>
								Stumptown keytar schlitz, vinyl vexillologist humblebrag
								sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
								asymmetrical helvetica kitsch farm-to-table thundercats. Occupy
								hammock waistcoat pabst ethical. Sartorial umami cardigan,
								farm-to-table bespoke 90's schlitz cray drinking vinegar
								actually freegan bushwick wolf. Shabby chic tofu celiac shaman,
								twee af squid blue bottle street art. they sold out yuccie
								biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
								synth. Fanny pack farm-to-table pok pok, next level trust fund
								live-edge asymmetrical art party intelligentsia listicle
								sriracha. Tote bag ugh meggings, selfies vegan blog locavore
								messenger bag chambray etsy heirloom cronut enamel pin hammock
								umami. Bushwick venmo activated charcoal, mumblecore skateboard
								hashtag literally brooklyn etsy ennui 3 wolf moon. Before they
								sold out blog iPhone subway tile, truffaut dreamcatcher organic
								raclette portland whatever brooklyn succulents flexitarian
								gentrify cray. Kogi subway tile gochujang dreamcatcher. kitsch
								farm-to-table thundercats. Occupy hammock waistcoat pabst
								ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
								schlitz cray drinking vinegar actually freegan bushwick wolf.
								Shabby chic tofu celiac shaman, twee af squid blue bottle street
								art. they sold out yuccie biodiesel. Yuccie taxidermy beard, +1
								church-key umami vinegar actually freegan bushwick wolf. Shabby
								chic tofu celiac shaman, twee af squid blue bottle street art.
								they sold out yuccie biodiesel. Yuccie taxidermy beard, +1
								church-key umami
							</Panel>
						</ResponsiveGrid.Cell>
						<ResponsiveGrid.Cell>
							<Panel hasMargin={false}>
								<Panel.Header>9</Panel.Header>
								Stumptown keytar schlitz, vinyl vexillologist humblebrag
								sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
								asymmetrical helvetica kitsch farm-to-table thundercats. Occupy
								hammock waistcoat pabst ethical. Sartorial umami cardigan,
								farm-to-table bespoke 90's schlitz cray drinking vinegar
								actually freegan bushwick wolf. Shabby chic tofu celiac shaman,
								twee af squid blue bottle street art. Lumbersexual lo-fi
								stumptown, iceland locavore tacos chillwave portland beard
								celiac polaroid Keffiyeh kinfolk lumbersexual, austin ennui
								sustainable mlkshk four loko selfies ramps pop-up coloring book
								before they sold out yuccie biodiesel. Yuccie taxidermy beard,
								+1 church-key umami echo park synth. Fanny pack farm-to-table
								pok pok, next level trust fund live-edge asymmetrical art party
								intelligentsia listicle sriracha. Tote bag ugh meggings, selfies
								vegan blog locavore messenger bag chambray etsy heirloom cronut
								enamel pin hammock umami. Bushwick venmo activated charcoal,
								mumblecore skateboard hashtag literally brooklyn etsy ennui 3
								wolf moon. Before they sold out blog iPhone subway tile,
								truffaut dreamcatcher organic raclette portland whatever
								brooklyn succulents flexitarian gentrify cray. Kogi subway tile
								gochujang dreamcatcher. Stumptown keytar schlitz, vinyl
								vexillologist humblebrag sartorial crucifix cornhole. Four
								dollar toast 8-bit taiyaki asymmetrical helvetica kitsch
								farm-to-table thundercats. Occupy hammock waistcoat pabst
								ethical. Sartorial umami cardigan, farm-to-table bespoke 90's
								schlitz cray drinking vinegar actually freegan bushwick wolf.
								Shabby chic tofu celiac shaman, twee af squid blue bottle street
								art. Lumbersexual lo-fi stumptown, iceland locavore tacos
								chillwave portland beard celiac polaroid Keffiyeh kinfolk
								lumbersexual, austin ennui sustainable mlkshk four loko selfies
								ramps pop-up coloring book before they sold out yuccie
								biodiesel. Yuccie taxidermy beard, +1 church-key umami echo park
								synth. Fanny pack farm-to-table pok pok, next level trust fund
								live-edge asymmetrical art party intelligentsia listicle
								sriracha. Tote bag ugh meggings, selfies vegan blog locavore
								messenger bag chambray etsy heirloom cronut enamel pin hammock
								umami. Bushwick venmo activated charcoal, mumblecore skateboard
								hashtag literally brooklyn etsy ennui 3 wolf moon. Before they
								sold out blog iPhone subway tile, truffaut dreamcatcher organic
								raclette portland whatever brooklyn succulents flexitarian
								gentrify cray. Kogi subway tile gochujang dreamcatcher.
							</Panel>
						</ResponsiveGrid.Cell>
						<ResponsiveGrid.Cell>
							<Panel hasMargin={false}>
								<Panel.Header>10</Panel.Header>
								Stumptown keytar schlitz, vinyl vexillologist humblebrag
								sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
								asymmetrical helvetica kitsch farm-to-table thundercats. Occupy
								hammock waistcoat pabst ethical. Sartorial umami cardigan,
								farm-to-table bespoke 90's schlitz cray drinking vinegar
								actually freegan bushwick wolf. Shabby chic tofu celiac shaman,
								twee af squid blue bottle street art. Lumbersexual lo-fi
								stumptown, iceland locavore tacos chillwave portland beard
								celiac polaroid Keffiyeh kinfolk lumbersexual, austin ennui
								sustainable mlkshk four loko selfies ramps pop-up coloring book
								before they sold out yuccie biodiesel. Yuccie taxidermy beard,
								+1 church-key umami echo park synth. Fanny pack farm-to-table
								pok pok, next level trust fund live-edge asymmetrical art party
								intelligentsia listicle sriracha. Tote bag ugh meggings, selfies
								vegan blog locavore messenger bag chambray etsy heirloom cronut
								enamel pin hammock umami. Bushwick venmo activated charcoal,
								mumblecore skateboard hashtag literally brooklyn etsy ennui 3
								wolf moon. Before they sold out blog iPhone subway tile,
								truffaut dreamcatcher organic raclette portland whatever
								brooklyn succulents flexitarian gentrify cray. Kogi subway tile
								gochujang dreamcatcher.
							</Panel>
						</ResponsiveGrid.Cell>
						<ResponsiveGrid.Cell>
							<Panel hasMargin={false}>
								<Panel.Header>11</Panel.Header>
								Stumptown keytar schlitz, vinyl vexillologist humblebrag
								sartorial crucifix cornhole. Four dollar toast 8-bit taiyaki
								asymmetrical helvetica kitsch farm-to-table thundercats. Occupy
								hammock waistcoat pabst.
							</Panel>
						</ResponsiveGrid.Cell>
					</ResponsiveGrid>
				</div>
			</SidePanel>
		</section>
	);
};
