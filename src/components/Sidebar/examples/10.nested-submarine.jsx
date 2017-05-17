import React from 'react';
import createClass from 'create-react-class';
import _ from 'lodash';
import { CheckboxLabeled, Sidebar, Submarine } from '../../../index';

export default createClass({
	render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', height: 600 }}>
				<Sidebar>
					<Sidebar.Bar>
						<div>
							{_.times(100, n => (
								<CheckboxLabeled key={n}>
									<CheckboxLabeled.Label>Filter #{n}</CheckboxLabeled.Label>
								</CheckboxLabeled>
							))}
						</div>
					</Sidebar.Bar>
					<Sidebar.Primary>
						<Submarine>
							<Submarine.Bar>
								Air plant blog pitchfork gastropub shabby chic wolf sriracha salvia, hella af. Taxidermy gastropub marfa fap, selvage af four dollar toast stumptown biodiesel post-ironic keffiyeh scenester cliche. Fashion axe listicle hexagon man bun pour-over migas. Schlitz you probably haven't heard of them la croix skateboard, literally small batch sartorial flexitarian messenger bag offal deep v kitsch chicharrones hammock. Keffiyeh knausgaard listicle, edison bulb lumbersexual flannel normcore ennui. YOLO la croix craft beer, pickled pitchfork intelligentsia PBR&B. Shabby chic raw denim cornhole raclette selfies messenger bag.

								Dreamcatcher jean shorts hoodie, subway tile viral franzen microdosing readymade photo booth farm-to-table echo park salvia lyft vegan chicharrones. Semiotics master cleanse meggings typewriter small batch. Four dollar toast green juice 90's, tattooed jianbing taxidermy gluten-free. Cronut la croix skateboard, sartorial sustainable asymmetrical mustache pinterest af semiotics lyft man bun fam truffaut. You probably haven't heard of them PBR&B bushwick hell of four dollar toast umami, put a bird on it church-key tattooed chillwave neutra live-edge twee. Chartreuse selvage gluten-free blue bottle. Ethical skateboard keffiyeh lumbersexual hell of, plaid bushwick iceland live-edge cornhole.

								Letterpress occupy man braid narwhal small batch, selfies pabst sustainable organic fashion axe pinterest flannel drinking vinegar. Meh tilde tattooed, readymade gastropub semiotics salvia williamsburg lomo truffaut direct trade gluten-free. Artisan neutra tilde microdosing, photo booth raw denim lo-fi celiac irony yr dreamcatcher taxidermy normcore. Stumptown bespoke offal, swag tilde chambray subway tile try-hard post-ironic. VHS literally keffiyeh, health goth 3 wolf moon chartreuse franzen trust fund locavore +1. Tousled lo-fi art party, craft beer knausgaard portland kombucha church-key 3 wolf moon heirloom taxidermy blue bottle narwhal. Migas portland sriracha, hot chicken green juice yr bushwick master cleanse PBR&B unicorn DIY waistcoat kombucha YOLO air plant.

								Four dollar toast air plant skateboard meditation. Waistcoat keffiyeh fingerstache vape. Stumptown heirloom pabst tote bag lo-fi microdosing, everyday carry knausgaard. Selfies readymade wolf, paleo pinterest chartreuse glossier pour-over irony literally cronut lyft stumptown iceland. Twee vice fixie +1, poutine flannel freegan put a bird on it ethical chicharrones. Scenester chartreuse swag sartorial, hella raclette art party. Pickled everyday carry quinoa gentrify.
							</Submarine.Bar>
							<Submarine.Primary>
								<div>
									Live-edge thundercats poutine vape, bushwick retro activated charcoal air plant whatever. Meh mustache drinking vinegar copper mug gastropub iceland. Chillwave +1 pabst flannel. Lumbersexual seitan master cleanse sartorial cold-pressed, ennui gastropub slow-carb lo-fi sriracha fashion axe affogato disrupt pok pok street art. Semiotics asymmetrical polaroid church-key pinterest. IPhone crucifix jean shorts, tumblr you probably haven't heard of them pickled fashion axe gastropub fixie quinoa pitchfork. Sartorial fap you probably haven't heard of them narwhal, biodiesel fixie freegan.

									Occupy ugh chia, godard selvage freegan cred hexagon lyft kickstarter tofu chartreuse. Normcore man bun blog, banjo hexagon street art irony lyft kombucha crucifix sartorial cliche vaporware 8-bit. Fap banh mi 90's, four dollar toast coloring book flexitarian tilde prism XOXO chartreuse brooklyn. Live-edge actually hammock vegan sartorial. Fashion axe asymmetrical austin try-hard chambray, snackwave retro green juice disrupt crucifix pok pok health goth activated charcoal. Hoodie cray synth, kombucha tacos street art sustainable. Umami next level ugh mumblecore bitters, four loko microdosing hot chicken try-hard knausgaard health goth pitchfork marfa hexagon.

									Bicycle rights artisan marfa affogato hexagon, franzen humblebrag pinterest brooklyn snackwave disrupt cray intelligentsia. Gochujang affogato stumptown, prism kinfolk before they sold out narwhal gluten-free cronut health goth venmo four loko. Vinyl ugh humblebrag gluten-free disrupt, chia cornhole. Single-origin coffee tote bag tacos chillwave, whatever tattooed portland ennui. Semiotics heirloom direct trade, cray you probably haven't heard of them squid salvia pickled affogato tumblr everyday carry succulents fixie butcher drinking vinegar. Shoreditch tacos forage art party waistcoat mixtape. Disrupt PBR&B literally viral mustache meditation, kinfolk normcore photo booth.

									Franzen cardigan af, squid schlitz unicorn leggings venmo distillery green juice brunch shoreditch thundercats +1. Heirloom biodiesel squid, keytar succulents dreamcatcher letterpress hammock next level. Semiotics pinterest viral retro salvia keffiyeh etsy. 90's four dollar toast hammock, tofu viral sartorial crucifix kitsch mustache green juice. Crucifix migas PBR&B, bitters air plant pork belly normcore hoodie single-origin coffee blue bottle sustainable slow-carb echo park vice. Waistcoat yuccie paleo knausgaard raclette fanny pack, you probably haven't heard of them YOLO quinoa hot chicken health goth neutra etsy. Lyft neutra small batch, 90's coloring book ethical before they sold out.

									Four loko fam freegan leggings, tumblr affogato mlkshk ethical activated charcoal. Fixie af helvetica, lo-fi iceland seitan church-key hashtag. Before they sold out put a bird on it VHS letterpress, jean shorts actually banjo kogi subway tile hammock kombucha. Activated charcoal pok pok keffiyeh direct trade scenester. Selfies skateboard health goth pop-up offal, gastropub craft beer tattooed man braid cornhole knausgaard cred chia keytar. Meggings deep v fixie hella, meditation kinfolk lomo narwhal lyft. DIY bitters kitsch, raclette vice pickled master cleanse drinking vinegar scenester austin tousled yuccie.

									Prism irony bicycle rights pork belly, whatever taxidermy subway tile pickled synth. Gastropub vaporware mumblecore, hell of cardigan gluten-free normcore put a bird on it synth fashion axe butcher letterpress. Hashtag aesthetic banjo twee salvia. Intelligentsia deep v kale chips celiac schlitz edison bulb. Enamel pin meditation mixtape direct trade fashion axe. Man braid kogi disrupt banjo. Waistcoat gluten-free DIY, small batch affogato kickstarter trust fund four dollar toast bicycle rights next level snackwave.

									Synth enamel pin tumblr, intelligentsia echo park unicorn roof party. Fap mlkshk tilde street art bicycle rights etsy. Enamel pin cronut seitan kickstarter, beard echo park hoodie ugh tote bag yuccie etsy asymmetrical heirloom. Fingerstache raw denim art party fanny pack, messenger bag direct trade single-origin coffee distillery offal cronut fap biodiesel twee. Humblebrag tumeric XOXO pork belly hammock, four dollar toast shoreditch. Bushwick PBR&B taxidermy disrupt keytar, thundercats literally. Schlitz cornhole meh organic crucifix aesthetic.

									Plaid you probably haven't heard of them ramps lyft roof party craft beer. Marfa snackwave hell of sartorial. Selfies prism gentrify bicycle rights, tumeric put a bird on it next level meggings migas authentic stumptown cold-pressed yr dreamcatcher. Hexagon hell of umami cronut vice. Bitters PBR&B messenger bag, lumbersexual selfies actually truffaut post-ironic fanny pack skateboard narwhal. You probably haven't heard of them bicycle rights helvetica, mumblecore enamel pin raw denim lumbersexual woke put a bird on it pug pabst snackwave flexitarian. Pork belly cornhole chillwave, post-ironic subway tile williamsburg slow-carb.

									Distillery art party small batch humblebrag blue bottle blog heirloom austin, live-edge helvetica cray poutine gluten-free hammock man braid. Vice blue bottle cardigan tbh, vegan ugh celiac. Roof party occupy flannel, jean shorts fap unicorn wolf beard. Pour-over air plant crucifix, man braid photo booth snackwave glossier sartorial affogato ethical vice. PBR&B hella selfies, tousled keytar biodiesel portland activated charcoal distillery art party echo park aesthetic. Affogato mlkshk literally pour-over, before they sold out crucifix cold-pressed kale chips ethical meh readymade williamsburg kogi knausgaard. Viral meditation kombucha hell of, godard chartreuse selfies pinterest thundercats vaporware microdosing.

									Meditation forage art party tacos blue bottle. Messenger bag cred jean shorts taxidermy, pug shabby chic stumptown 8-bit next level. Vaporware gastropub next level activated charcoal kale chips. Mixtape heirloom cred, tofu iceland keytar copper mug man bun. Squid godard pabst ethical, hexagon 8-bit butcher actually master cleanse narwhal small batch waistcoat hell of vice. Fashion axe pok pok before they sold out, thundercats four dollar toast tbh cornhole godard try-hard pug pour-over kale chips. Artisan aesthetic iPhone godard.

								</div>
							</Submarine.Primary>
						</Submarine>
					</Sidebar.Primary>
				</Sidebar>
			</div>
		);
	},
});
