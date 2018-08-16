const getDefaultExport = module => {
	if (module.__esModule) {
		return module.default;
	}
	return module;
};

module.exports = [
	{
		name: 'Accordion',
		component: getDefaultExport(
			require('../src/components/Accordion/Accordion')
		),
		examplesContext: require.context(
			'../src/components/Accordion/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Accordion/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Autocomplete',
		component: getDefaultExport(
			require('../src/components/Autocomplete/Autocomplete')
		),
		examplesContext: require.context(
			'../src/components/Autocomplete/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Autocomplete/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Axis',
		component: getDefaultExport(require('../src/components/Axis/Axis')),
		examplesContext: require.context(
			'../src/components/Axis/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Axis/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'AxisLabel',
		component: getDefaultExport(
			require('../src/components/AxisLabel/AxisLabel')
		),
		examplesContext: require.context(
			'../src/components/AxisLabel/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/AxisLabel/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Badge',
		component: getDefaultExport(require('../src/components/Badge/Badge')),
		examplesContext: require.context(
			'../src/components/Badge/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Badge/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Banner',
		component: getDefaultExport(require('../src/components/Banner/Banner')),
		examplesContext: require.context(
			'../src/components/Banner/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Banner/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Bar',
		component: getDefaultExport(require('../src/components/Bar/Bar')),
		examplesContext: require.context(
			'../src/components/Bar/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Bar/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'BarChart',
		component: getDefaultExport(require('../src/components/BarChart/BarChart')),
		examplesContext: require.context(
			'../src/components/BarChart/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/BarChart/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Bars',
		component: getDefaultExport(require('../src/components/Bars/Bars')),
		examplesContext: require.context(
			'../src/components/Bars/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Bars/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Breadcrumb',
		component: getDefaultExport(
			require('../src/components/Breadcrumb/Breadcrumb')
		),
		examplesContext: require.context(
			'../src/components/Breadcrumb/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Breadcrumb/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Button',
		component: getDefaultExport(require('../src/components/Button/Button')),
		examplesContext: require.context(
			'../src/components/Button/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Button/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'ButtonGroup',
		component: getDefaultExport(
			require('../src/components/ButtonGroup/ButtonGroup')
		),
		examplesContext: require.context(
			'../src/components/ButtonGroup/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/ButtonGroup/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'CalendarMonth',
		component: getDefaultExport(
			require('../src/components/CalendarMonth/CalendarMonth')
		),
		examplesContext: require.context(
			'../src/components/CalendarMonth/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/CalendarMonth/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Checkbox',
		component: getDefaultExport(require('../src/components/Checkbox/Checkbox')),
		examplesContext: require.context(
			'../src/components/Checkbox/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Checkbox/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'CheckboxLabeled',
		component: getDefaultExport(
			require('../src/components/CheckboxLabeled/CheckboxLabeled')
		),
		examplesContext: require.context(
			'../src/components/CheckboxLabeled/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/CheckboxLabeled/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Collapsible',
		component: getDefaultExport(
			require('../src/components/Collapsible/Collapsible')
		),
		examplesContext: require.context(
			'../src/components/Collapsible/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Collapsible/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'ContextMenu',
		component: getDefaultExport(
			require('../src/components/ContextMenu/ContextMenu')
		),
		examplesContext: require.context(
			'../src/components/ContextMenu/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/ContextMenu/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'DataTable',
		component: getDefaultExport(
			require('../src/components/DataTable/DataTable')
		),
		examplesContext: require.context(
			'../src/components/DataTable/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/DataTable/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'DateSelect',
		component: getDefaultExport(
			require('../src/components/DateSelect/DateSelect')
		),
		examplesContext: require.context(
			'../src/components/DateSelect/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/DateSelect/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Dialog',
		component: getDefaultExport(require('../src/components/Dialog/Dialog')),
		examplesContext: require.context(
			'../src/components/Dialog/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Dialog/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'DragCaptureZone',
		component: getDefaultExport(
			require('../src/components/DragCaptureZone/DragCaptureZone')
		),
		examplesContext: require.context(
			'../src/components/DragCaptureZone/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/DragCaptureZone/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'DropMenu',
		component: getDefaultExport(require('../src/components/DropMenu/DropMenu')),
		examplesContext: require.context(
			'../src/components/DropMenu/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/DropMenu/examples',
			true,
			/\.jsx?$/
		),
	},
	//{
	//	name: 'EmptyStateWrapper',
	//	component: getDefaultExport(require('../src/components/EmptyStateWrapper/EmptyStateWrapper')),
	//	examplesContext: require.context('../src/components/EmptyStateWrapper/examples', true, /\.jsx?$/),
	//	examplesContextRaw: require.context('!!raw-loader!../src/components/EmptyStateWrapper/examples', true, /\.jsx?$/),
	//},
	//{
	//	name: 'ExampleComponent',
	//	component: getDefaultExport(require('../src/components/ExampleComponent/ExampleComponent')),
	//	examplesContext: require.context('../src/components/ExampleComponent/examples', true, /\.jsx?$/),
	//	examplesContextRaw: require.context('!!raw-loader!../src/components/ExampleComponent/examples', true, /\.jsx?$/),
	//},
	{
		name: 'Expander',
		component: getDefaultExport(require('../src/components/Expander/Expander')),
		examplesContext: require.context(
			'../src/components/Expander/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Expander/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'ExpanderPanel',
		component: getDefaultExport(
			require('../src/components/ExpanderPanel/ExpanderPanel')
		),
		examplesContext: require.context(
			'../src/components/ExpanderPanel/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/ExpanderPanel/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Grid',
		component: getDefaultExport(require('../src/components/Grid/Grid')),
		examplesContext: require.context(
			'../src/components/Grid/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Grid/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Icon',
		component: getDefaultExport(require('../src/components/Icon/Icon')),
		examplesContext: require.context(
			'../src/components/Icon/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Icon/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'IconSelect',
		component: getDefaultExport(
			require('../src/components/IconSelect/IconSelect')
		),
		examplesContext: require.context(
			'../src/components/IconSelect/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/IconSelect/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'InfiniteSlidePanel',
		component: getDefaultExport(
			require('../src/components/InfiniteSlidePanel/InfiniteSlidePanel')
		),
		examplesContext: require.context(
			'../src/components/InfiniteSlidePanel/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/InfiniteSlidePanel/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Legend',
		component: getDefaultExport(require('../src/components/Legend/Legend')),
		examplesContext: require.context(
			'../src/components/Legend/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Legend/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Line',
		component: getDefaultExport(require('../src/components/Line/Line')),
		examplesContext: require.context(
			'../src/components/Line/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Line/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'LineChart',
		component: getDefaultExport(
			require('../src/components/LineChart/LineChart')
		),
		examplesContext: require.context(
			'../src/components/LineChart/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LineChart/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Lines',
		component: getDefaultExport(require('../src/components/Lines/Lines')),
		examplesContext: require.context(
			'../src/components/Lines/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Lines/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'LoadingIndicator',
		component: getDefaultExport(
			require('../src/components/LoadingIndicator/LoadingIndicator')
		),
		examplesContext: require.context(
			'../src/components/LoadingIndicator/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingIndicator/examples',
			true,
			/\.jsx?$/
		),
	},
	//{
	//	name: 'LoadingMessage',
	//	component: getDefaultExport(require('../src/components/LoadingMessage/LoadingMessage')),
	//	examplesContext: require.context('../src/components/LoadingMessage/examples', true, /\.jsx?$/),
	//	examplesContextRaw: require.context('!!raw-loader!../src/components/LoadingMessage/examples', true, /\.jsx?$/),
	//},
	{
		name: 'Overlay',
		component: getDefaultExport(require('../src/components/Overlay/Overlay')),
		examplesContext: require.context(
			'../src/components/Overlay/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Overlay/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'OverlayWrapper',
		component: getDefaultExport(
			require('../src/components/OverlayWrapper/OverlayWrapper')
		),
		examplesContext: require.context(
			'../src/components/OverlayWrapper/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/OverlayWrapper/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Paginator',
		component: getDefaultExport(
			require('../src/components/Paginator/Paginator')
		),
		examplesContext: require.context(
			'../src/components/Paginator/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Paginator/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Panel',
		component: getDefaultExport(require('../src/components/Panel/Panel')),
		examplesContext: require.context(
			'../src/components/Panel/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Panel/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'PieChart',
		component: getDefaultExport(require('../src/components/PieChart/PieChart')),
		examplesContext: require.context(
			'../src/components/PieChart/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/PieChart/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Point',
		component: getDefaultExport(require('../src/components/Point/Point')),
		examplesContext: require.context(
			'../src/components/Point/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Point/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Points',
		component: getDefaultExport(require('../src/components/Points/Points')),
		examplesContext: require.context(
			'../src/components/Points/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Points/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Portal',
		component: getDefaultExport(require('../src/components/Portal/Portal')),
		examplesContext: require.context(
			'../src/components/Portal/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Portal/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'RadioButton',
		component: getDefaultExport(
			require('../src/components/RadioButton/RadioButton')
		),
		examplesContext: require.context(
			'../src/components/RadioButton/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/RadioButton/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'RadioButtonLabeled',
		component: getDefaultExport(
			require('../src/components/RadioButtonLabeled/RadioButtonLabeled')
		),
		examplesContext: require.context(
			'../src/components/RadioButtonLabeled/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/RadioButtonLabeled/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'RadioGroup',
		component: getDefaultExport(
			require('../src/components/RadioGroup/RadioGroup')
		),
		examplesContext: require.context(
			'../src/components/RadioGroup/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/RadioGroup/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Resizer',
		component: getDefaultExport(require('../src/components/Resizer/Resizer')),
		examplesContext: require.context(
			'../src/components/Resizer/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Resizer/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'ScrollTable',
		component: getDefaultExport(
			require('../src/components/ScrollTable/ScrollTable')
		),
		examplesContext: require.context(
			'../src/components/ScrollTable/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/ScrollTable/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'SearchField',
		component: getDefaultExport(
			require('../src/components/SearchField/SearchField')
		),
		examplesContext: require.context(
			'../src/components/SearchField/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SearchField/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'SearchableMultiSelect',
		component: getDefaultExport(
			require('../src/components/SearchableMultiSelect/SearchableMultiSelect')
		),
		examplesContext: require.context(
			'../src/components/SearchableMultiSelect/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SearchableMultiSelect/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'SearchableSelect',
		component: getDefaultExport(
			require('../src/components/SearchableSelect/SearchableSelect')
		),
		examplesContext: require.context(
			'../src/components/SearchableSelect/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SearchableSelect/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Selection',
		component: getDefaultExport(
			require('../src/components/Selection/Selection')
		),
		examplesContext: require.context(
			'../src/components/Selection/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Selection/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Sidebar',
		component: getDefaultExport(require('../src/components/Sidebar/Sidebar')),
		examplesContext: require.context(
			'../src/components/Sidebar/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Sidebar/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'SidePanel',
		component: getDefaultExport(
			require('../src/components/SidePanel/SidePanel')
		),
	},
	{
		name: 'SingleSelect',
		component: getDefaultExport(
			require('../src/components/SingleSelect/SingleSelect')
		),
		examplesContext: require.context(
			'../src/components/SingleSelect/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SingleSelect/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'SlidePanel',
		component: getDefaultExport(
			require('../src/components/SlidePanel/SlidePanel')
		),
		examplesContext: require.context(
			'../src/components/SlidePanel/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SlidePanel/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'SplitButton',
		component: getDefaultExport(
			require('../src/components/SplitButton/SplitButton')
		),
		examplesContext: require.context(
			'../src/components/SplitButton/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SplitButton/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'SplitHorizontal',
		component: getDefaultExport(
			require('../src/components/SplitHorizontal/SplitHorizontal')
		),
		examplesContext: require.context(
			'../src/components/SplitHorizontal/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SplitHorizontal/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'SplitVertical',
		component: getDefaultExport(
			require('../src/components/SplitVertical/SplitVertical')
		),
		examplesContext: require.context(
			'../src/components/SplitVertical/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SplitVertical/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'StickySection',
		component: getDefaultExport(
			require('../src/components/StickySection/StickySection')
		),
		examplesContext: require.context(
			'../src/components/StickySection/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/StickySection/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Submarine',
		component: getDefaultExport(
			require('../src/components/Submarine/Submarine')
		),
		examplesContext: require.context(
			'../src/components/Submarine/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Submarine/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Switch',
		component: getDefaultExport(require('../src/components/Switch/Switch')),
		examplesContext: require.context(
			'../src/components/Switch/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Switch/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'SwitchLabeled',
		component: getDefaultExport(
			require('../src/components/SwitchLabeled/SwitchLabeled')
		),
		examplesContext: require.context(
			'../src/components/SwitchLabeled/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SwitchLabeled/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Table',
		component: getDefaultExport(require('../src/components/Table/Table')),
		examplesContext: require.context(
			'../src/components/Table/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Table/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Tabs',
		component: getDefaultExport(require('../src/components/Tabs/Tabs')),
		examplesContext: require.context(
			'../src/components/Tabs/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Tabs/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Tag',
		component: getDefaultExport(require('../src/components/Tag/Tag')),
		examplesContext: require.context(
			'../src/components/Tag/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Tag/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'TextField',
		component: getDefaultExport(
			require('../src/components/TextField/TextField')
		),
		examplesContext: require.context(
			'../src/components/TextField/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/TextField/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'TextFieldValidated',
		component: getDefaultExport(
			require('../src/components/TextFieldValidated/TextFieldValidated')
		),
		examplesContext: require.context(
			'../src/components/TextFieldValidated/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/TextFieldValidated/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'ToolTip',
		component: getDefaultExport(require('../src/components/ToolTip/ToolTip')),
		examplesContext: require.context(
			'../src/components/ToolTip/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/ToolTip/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'Validation',
		component: getDefaultExport(
			require('../src/components/Validation/Validation')
		),
		examplesContext: require.context(
			'../src/components/Validation/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Validation/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'VerticalListMenu',
		component: getDefaultExport(
			require('../src/components/VerticalListMenu/VerticalListMenu')
		),
		examplesContext: require.context(
			'../src/components/VerticalListMenu/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/VerticalListMenu/examples',
			true,
			/\.jsx?$/
		),
	},
	{
		name: 'VerticalTabs',
		component: getDefaultExport(
			require('../src/components/VerticalTabs/VerticalTabs')
		),
		examplesContext: require.context(
			'../src/components/VerticalTabs/examples',
			true,
			/\.jsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/VerticalTabs/examples',
			true,
			/\.jsx?$/
		),
	},
];
