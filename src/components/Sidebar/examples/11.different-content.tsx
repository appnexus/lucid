import React from 'react';
import createClass from 'create-react-class';
import _ from 'lodash';
import {
	ButtonGroup,
	CheckboxLabeled,
	RadioGroup,
	SearchField,
	Sidebar,
	Tag,
} from '../../../index';

export default createClass({
	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', height: 600 }}>
				<Sidebar>
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
							{_.times(10, n => (
								<CheckboxLabeled key={n}>
									<CheckboxLabeled.Label>Filter #{n}</CheckboxLabeled.Label>
								</CheckboxLabeled>
							))}
							{_.times(10, n => {
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
						hella af. Taxidermy gastropub marfa fap, selvage af four dollar
						toast stumptown biodiesel post-ironic keffiyeh scenester cliche.
						Fashion axe listicle hexagon man bun pour-over migas. Schlitz you
						probably haven't heard of them la croix skateboard, literally small
						batch sartorial flexitarian messenger bag offal deep v kitsch
						chicharrones hammock. Keffiyeh knausgaard listicle, edison bulb
						lumbersexual flannel normcore ennui. YOLO la croix craft beer,
						pickled pitchfork intelligentsia PBR&B. Shabby chic raw denim
						cornhole raclette selfies messenger bag. Dreamcatcher jean shorts
						hoodie, subway tile viral franzen microdosing readymade photo booth
						farm-to-table echo park salvia lyft vegan chicharrones. Semiotics
						master cleanse meggings typewriter small batch. Four dollar toast
						green juice 90's, tattooed jianbing taxidermy gluten-free. Cronut la
						croix skateboard, sartorial sustainable asymmetrical mustache
						pinterest af semiotics lyft man bun fam truffaut. You probably
						haven't heard of them PBR&B bushwick hell of four dollar toast
						umami, put a bird on it church-key tattooed chillwave neutra
						live-edge twee. Chartreuse selvage gluten-free blue bottle. Ethical
						skateboard keffiyeh lumbersexual hell of, plaid bushwick iceland
						live-edge cornhole. Letterpress occupy man braid narwhal small
						batch, selfies pabst sustainable organic fashion axe pinterest
						flannel drinking vinegar. Meh tilde tattooed, readymade gastropub
						semiotics salvia williamsburg lomo truffaut direct trade
						gluten-free. Artisan neutra tilde microdosing, photo booth raw denim
						lo-fi celiac irony yr dreamcatcher taxidermy normcore. Stumptown
						bespoke offal, swag tilde chambray subway tile try-hard post-ironic.
						VHS literally keffiyeh, health goth 3 wolf moon chartreuse franzen
						trust fund locavore +1. Tousled lo-fi art party, craft beer
						knausgaard portland kombucha church-key 3 wolf moon heirloom
						taxidermy blue bottle narwhal. Migas portland sriracha, hot chicken
						green juice yr bushwick master cleanse PBR&B unicorn DIY waistcoat
						kombucha YOLO air plant. Four dollar toast air plant skateboard
						meditation. Waistcoat keffiyeh fingerstache vape. Stumptown heirloom
						pabst tote bag lo-fi microdosing, everyday carry knausgaard. Selfies
						readymade wolf, paleo pinterest chartreuse glossier pour-over irony
						literally cronut lyft stumptown iceland. Twee vice fixie +1, poutine
						flannel freegan put a bird on it ethical chicharrones. Scenester
						chartreuse swag sartorial, hella raclette art party. Pickled
						everyday carry quinoa gentrify.
					</Sidebar.Primary>
				</Sidebar>
			</div>
		);
	},
});
