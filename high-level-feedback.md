# Recategorize
	- Is used more like a selector (like SingleSelect & MultiSelect) than a toggle
	- update name to something like IconSelect since it handles both single or multi select (using radio or checkboxes)
# Keep it stateless
	The minimal application state varies widely between various use cases:
		- for single icon selection (radio buttons)
			{ selectedIcon: 'item2' }
		- for multi icon selection (checkboxes)
			{ iconSelections: ['item2', 'item3'] }
		- for multi icon selection with partial select (checkboxes with indeterminate)
			{ iconSelections: [
				{ name: 'item2', isPartial: true },
				{ name: 'item3', isPartial: false }
			] }
	Leave partial selection behavior up to the consumer
		- items can be rendered with `isPartial` prop, `onSelect` callback passes name only
			onSelect: (state, name) => {
				const isPartial = findIcon(name).isPartial;
				if (isPartial) { ... }
				return nextState;
			}
# One component
	- IconGroup is basically a wrapper for state management and container element
	- IconBox is the real star component, but it doesn't have to be singular
# Use names for selections
	- Names make more sense than indices since icons are defined more deliberably than other options
	- Selection can be set with names/ids in props
