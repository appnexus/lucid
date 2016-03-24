import _ from 'lodash';
import React from 'react';
import Typeahead from '../Typeahead';

const style = {
	marginBottom: '10px'
};

const titles = [
	"12 Angry Men",
	"2001 A Space Odyssey",
	"A Clockwork Orange",
	"A Night At The Opera",
	"A Streetcar Named Desire",
	"African Queen, The",
	"All About Eve",
	"All The President S Men",
	"American Graffiti",
	"Annie Hall",
	"Apartment, The",
	"Apocalypse Now",
	"Ben Hur",
	"Best Years Of Our Lives, The",
	"Blade Runner",
	"Bonnie And Clyde",
	"Bridge On The River Kwai, The",
	"Bringing Up Baby",
	"Butch Cassidy And The Sundance Kid",
	"Cabaret",
	"Casablanca",
	"Chinatown",
	"Citizen Kane",
	"City Lights",
	"Deer Hunter, The",
	"Do The Right Thing",
	"Double Indemnity",
	"Dr Strangelove",
	"Duck Soup",
	"E T The Extra Terrestrial",
	"Easy Rider",
	"Forrest Gump",
	"French Connection, The",
	"General, The",
	"Godfather Part Ii, The",
	"Godfather, The",
	"Gold Rush, The",
	"Gone With The Wind",
	"Goodfellas",
	"Graduate, The",
	"Grapes Of Wrath, The",
	"High Noon",
	"In The Heat Of The Night",
	"Intolerance",
	"It Happened One Night",
	"It S A Wonderful Life",
	"Jaws",
	"King Kong",
	"Last Picture Show, The",
	"Lawrence Of Arabia",
	"Lord Of The Rings The Fellowship Of The Ring, The",
	"M A S H",
	"Maltese Falcon, The",
	"Midnight Cowboy",
	"Modern Times",
	"Mr Smith Goes To Washington",
	"Nashville",
	"Network",
	"North By Northwest",
	"On The Waterfront",
	"One Flew Over The Cuckoo S Nest",
	"Philadelphia Story, The",
	"Platoon",
	"Psycho",
	"Pulp Fiction",
	"Raging Bull",
	"Raiders Of The Lost Ark",
	"Rear Window",
	"Rocky",
	"Saving Private Ryan",
	"Schindler S List",
	"Searchers, The",
	"Shane",
	"Shawshank Redemption, The",
	"Silence Of The Lambs, The",
	"Singin In The Rain",
	"Sixth Sense, The",
	"Snow White And The Seven Dwarfs",
	"Some Like It Hot",
	"Sophie S Choice",
	"Sound Of Music, The",
	"Spartacus",
	"Star Wars",
	"Sullivan S Travels",
	"Sunset Blvd",
	"Swing Time",
	"Taxi Driver",
	"Titanic",
	"To Kill A Mockingbird",
	"Tootsie",
	"Toy Story",
	"Treasure Of The Sierra Madre, The",
	"Unforgiven",
	"Vertigo",
	"West Side Story",
	"Who S Afraid Of Virginia Woolf",
	"Wild Bunch, The",
	"Wizard Of Oz, The",
	"Yankee Doodle Dandy"
];

export default React.createClass({
	getInitialState() {
		return {
			focusedIndex: 0,
			isExpanded: false,
			suggestions: [],
			value: ''
		};
	},

	handleBlurred(event) {
		this.setState({
			isExpanded: false
		});
	},

	handleChanged(text) {
		const value = _.trim(text);
		const isExpanded = !_.isEmpty(value);
		const suggestions = _.filter(titles, (title) => _.startsWith(title, value));

		this.setState({
			focusedIndex: 0,
			isExpanded,
			suggestions,
			value
		});
	},

	handleFocusedNext() {
		this.setState({
			focusedIndex: this.state.focusedIndex + 1
		});
	},

	handleFocusedPrev() {
		this.setState({
			focusedIndex: this.state.focusedIndex - 1
		});
	},

	render() {
		return (
			<section>
				<section style={style}>
					<Typeahead
						focusedIndex={this.state.focusedIndex}
						onBlur={this.handleBlurred}
						onChange={this.handleChanged}
						onFocusNext={this.handleFocusedNext}
						onFocusPrev={this.handleFocusedPrev}
						isExpanded={this.state.isExpanded}
						suggestions={this.state.suggestions}
						value={this.state.value}
					/>
				</section>
			</section>
		);
	}
});