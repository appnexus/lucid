const getDefaultExport = (module) => {
	if (module.__esModule) {
		return module.default;
	}
	return module;
};

module.exports = [
	{
		name: 'Autocomplete',
		component: getDefaultExport(
			require('../src/components/Autocomplete/Autocomplete')
		),
		examplesContext: require.context(
			'../src/components/Autocomplete/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Autocomplete/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Axis',
		component: getDefaultExport(require('../src/components/Axis/Axis')),
		examplesContext: require.context(
			'../src/components/Axis/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Axis/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/AxisLabel/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Badge',
		component: getDefaultExport(require('../src/components/Badge/Badge')),
		examplesContext: require.context(
			'../src/components/Badge/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Badge/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Banner',
		component: getDefaultExport(require('../src/components/Banner/Banner')),
		examplesContext: require.context(
			'../src/components/Banner/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Banner/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Bar',
		component: getDefaultExport(require('../src/components/Bar/Bar')),
		examplesContext: require.context(
			'../src/components/Bar/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Bar/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'BarChart',
		component: getDefaultExport(require('../src/components/BarChart/BarChart')),
		examplesContext: require.context(
			'../src/components/BarChart/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/BarChart/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'BarChartLoadingSkeleton',
		component: getDefaultExport(
			require('../src/components/LoadingSkeletons/BarChartLoadingSkeleton')
		),
		examplesContext: require.context(
			'../src/components/LoadingSkeletons/examples/BarChartLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingSkeletons/examples/BarChartLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
	},

	{
		name: 'SingleLineLoadingSkeleton',
		component: getDefaultExport(
			require('../src/components/LoadingSkeletons/SingleLineLoadingSkeleton')
		),
		examplesContext: require.context(
			'../src/components/LoadingSkeletons/examples/SingleLineLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingSkeletons/examples/SingleLineLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
	},

	{
		name: 'SmallDataTableLoadingSkeleton',
		component: getDefaultExport(
			require('../src/components/LoadingSkeletons/SmallDataTableLoadingSkeleton')
		),
		examplesContext: require.context(
			'../src/components/LoadingSkeletons/examples/SmallDataTableLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingSkeletons/examples/SmallDataTableLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
	},

	{
		name: 'Bars',
		component: getDefaultExport(require('../src/components/Bars/Bars')),
		examplesContext: require.context(
			'../src/components/Bars/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Bars/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Breadcrumb/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'ButtonGroup',
		component: getDefaultExport(
			require('../src/components/ButtonGroup/ButtonGroup')
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/CalendarMonth/examples',
			true,
			/\.(j|t)sx?$/
		),
	},

	{
		name: 'CardLoadingSkeleton',
		component: getDefaultExport(
			require('../src/components/LoadingSkeletons/CardLoadingSkeleton')
		),
		examplesContext: require.context(
			'../src/components/LoadingSkeletons/examples/CardLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingSkeletons/examples/CardLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Collapsible/examples',
			true,
			/\.(j|t)sx?$/
		),
	},

	{
		name: 'ComplexTableLoadingSkeleton',
		component: getDefaultExport(
			require('../src/components/LoadingSkeletons/ComplexTableLoadingSkeleton')
		),
		examplesContext: require.context(
			'../src/components/LoadingSkeletons/examples/ComplexTableLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingSkeletons/examples/ComplexTableLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'HeaderLoadingSkeleton',
		component: getDefaultExport(
			require('../src/components/LoadingSkeletons/HeaderLoadingSkeleton')
		),
		examplesContext: require.context(
			'../src/components/LoadingSkeletons/examples/HeaderLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingSkeletons/examples/HeaderLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'GroupLoadingSkeleton',
		component: getDefaultExport(
			require('../src/components/LoadingSkeletons/GroupLoadingSkeleton')
		),
		examplesContext: require.context(
			'../src/components/LoadingSkeletons/examples/GroupLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingSkeletons/examples/GroupLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'LineChartLoadingSkeleton',
		component: getDefaultExport(
			require('../src/components/LoadingSkeletons/LineChartLoadingSkeleton')
		),
		examplesContext: require.context(
			'../src/components/LoadingSkeletons/examples/LineChartLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingSkeletons/examples/LineChartLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
	},

	{
		name: 'SimpleTableLoadingSkeleton',
		component: getDefaultExport(
			require('../src/components/LoadingSkeletons/SimpleTableLoadingSkeleton')
		),
		examplesContext: require.context(
			'../src/components/LoadingSkeletons/examples/SimpleTableLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingSkeletons/examples/SimpleTableLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/ContextMenu/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/DataTable/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/DateSelect/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Dialog',
		component: getDefaultExport(require('../src/components/Dialog/Dialog')),
		examplesContext: require.context(
			'../src/components/Dialog/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Dialog/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'DraggableLineChart',
		component: getDefaultExport(
			require('../src/components/DraggableLineChart/DraggableLineChart')
		),
		examplesContext: require.context(
			'../src/components/DraggableLineChart/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/DraggableLineChart/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'DraggableList',
		component: getDefaultExport(
			require('../src/components/DraggableList/DraggableList')
		),
		examplesContext: require.context(
			'../src/components/DraggableList/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/DraggableList/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/DragCaptureZone/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'DropMenu',
		component: getDefaultExport(require('../src/components/DropMenu/DropMenu')),
		examplesContext: require.context(
			'../src/components/DropMenu/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/DropMenu/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	//{
	//	name: 'EmptyStateWrapper',
	//	component: getDefaultExport(require('../src/components/EmptyStateWrapper/EmptyStateWrapper')),
	//	examplesContext: require.context('../src/components/EmptyStateWrapper/examples', true, /\.(j|t)sx?$/),
	//	examplesContextRaw: require.context('!!raw-loader!../src/components/EmptyStateWrapper/examples', true, /\.(j|t)sx?$/),
	//},
	//{
	//	name: 'ExampleComponent',
	//	component: getDefaultExport(require('../src/components/ExampleComponent/ExampleComponent')),
	//	examplesContext: require.context('../src/components/ExampleComponent/examples', true, /\.(j|t)sx?$/),
	//	examplesContextRaw: require.context('!!raw-loader!../src/components/ExampleComponent/examples', true, /\.(j|t)sx?$/),
	//},
	{
		name: 'Expander',
		component: getDefaultExport(require('../src/components/Expander/Expander')),
		examplesContext: require.context(
			'../src/components/Expander/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Expander/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/ExpanderPanel/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Grid',
		component: getDefaultExport(require('../src/components/Grid/Grid')),
		examplesContext: require.context(
			'../src/components/Grid/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Grid/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Icon',
		component: getDefaultExport(require('../src/components/Icon/Icon')),
		examplesContext: require.context(
			'../src/components/Icon/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Icon/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'IconSelect',
		component: getDefaultExport(
			require('../src/components/IconSelect/IconSelect')
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/InfiniteSlidePanel/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Legend',
		component: getDefaultExport(require('../src/components/Legend/Legend')),
		examplesContext: require.context(
			'../src/components/Legend/examples',
			true,
			/\.tsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Legend/examples',
			true,
			/\.tsx?$/
		),
	},
	{
		name: 'Line',
		component: getDefaultExport(require('../src/components/Line/Line')),
		examplesContext: require.context(
			'../src/components/Line/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Line/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LineChart/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Lines',
		component: getDefaultExport(require('../src/components/Lines/Lines')),
		examplesContext: require.context(
			'../src/components/Lines/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Lines/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingIndicator/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'TableLoadingSkeleton',
		component: getDefaultExport(
			require('../src/components/LoadingSkeletons/TableLoadingSkeleton')
		),
		examplesContext: require.context(
			'../src/components/LoadingSkeletons/examples/TableLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/LoadingSkeletons/examples/TableLoadingSkeleton',
			true,
			/\.(j|t)sx?$/
		),
	},
	//{
	//	name: 'LoadingMessage',
	//	component: getDefaultExport(require('../src/components/LoadingMessage/LoadingMessage')),
	//	examplesContext: require.context('../src/components/LoadingMessage/examples', true, /\.(j|t)sx?$/),
	//	examplesContextRaw: require.context('!!raw-loader!../src/components/LoadingMessage/examples', true, /\.(j|t)sx?$/),
	//},
	{
		name: 'NotchedTag',
		component: getDefaultExport(
			require('../src/components/NotchedTag/NotchedTag')
		),
		examplesContext: require.context(
			'../src/components/NotchedTag/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/NotchedTag/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Overlay',
		component: getDefaultExport(require('../src/components/Overlay/Overlay')),
		examplesContext: require.context(
			'../src/components/Overlay/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Overlay/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/OverlayWrapper/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Paginator/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Panel',
		component: getDefaultExport(require('../src/components/Panel/Panel')),
		examplesContext: require.context(
			'../src/components/Panel/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Panel/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'PieChart',
		component: getDefaultExport(require('../src/components/PieChart/PieChart')),
		examplesContext: require.context(
			'../src/components/PieChart/examples',
			true,
			/\.tsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/PieChart/examples',
			true,
			/\.tsx?$/
		),
	},
	{
		name: 'Point',
		component: getDefaultExport(require('../src/components/Point/Point')),
		examplesContext: require.context(
			'../src/components/Point/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Point/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Points',
		component: getDefaultExport(require('../src/components/Points/Points')),
		examplesContext: require.context(
			'../src/components/Points/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Points/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Portal',
		component: getDefaultExport(require('../src/components/Portal/Portal')),
		examplesContext: require.context(
			'../src/components/Portal/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Portal/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/RadioButton/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/RadioButtonLabeled/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.tsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/RadioGroup/examples',
			true,
			/\.tsx?$/
		),
	},
	{
		name: 'ResponsiveGrid',
		component: getDefaultExport(
			require('../src/components/ResponsiveGrid/ResponsiveGrid')
		),
		examplesContext: require.context(
			'../src/components/ResponsiveGrid/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/ResponsiveGrid/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Resizer',
		component: getDefaultExport(require('../src/components/Resizer/Resizer')),
		examplesContext: require.context(
			'../src/components/Resizer/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Resizer/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/ScrollTable/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SearchField/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.tsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SearchableMultiSelect/examples',
			true,
			/\.tsx?$/
		),
	},
	{
		name: 'SearchableSingleSelect',
		component: getDefaultExport(
			require('../src/components/SearchableSingleSelect/SearchableSingleSelect')
		),
	},
	{
		name: 'SearchableSelect',
		component: getDefaultExport(
			require('../src/components/SearchableSelect/SearchableSelect')
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
			/\.tsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Selection/examples',
			true,
			/\.tsx?$/
		),
	},
	{
		name: 'Sidebar',
		component: getDefaultExport(require('../src/components/Sidebar/Sidebar')),
		examplesContext: require.context(
			'../src/components/Sidebar/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Sidebar/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'SidePanel',
		component: getDefaultExport(
			require('../src/components/SidePanel/SidePanel')
		),
		examplesContext: require.context(
			'../src/components/SidePanel/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SidePanel/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'SingleSelect',
		component: getDefaultExport(
			require('../src/components/SingleSelect/SingleSelect')
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SlidePanel/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.tsx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SplitButton/examples',
			true,
			/\.tsx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SplitHorizontal/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SplitVertical/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/StickySection/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Submarine/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Switch',
		component: getDefaultExport(require('../src/components/Switch/Switch')),
		examplesContext: require.context(
			'../src/components/Switch/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Switch/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SwitchLabeled/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Table',
		component: getDefaultExport(require('../src/components/Table/Table')),
		examplesContext: require.context(
			'../src/components/Table/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Table/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Tabs',
		component: getDefaultExport(require('../src/components/Tabs/Tabs')),
		examplesContext: require.context(
			'../src/components/Tabs/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Tabs/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Tag',
		component: getDefaultExport(require('../src/components/Tag/Tag')),
		examplesContext: require.context(
			'../src/components/Tag/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Tag/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Typography',
		component: getDefaultExport(
			require('../src/components/Typography/Typography')
		),
		examplesContext: require.context(
			'../src/components/Typography/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Typography/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/TextField/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/TextFieldValidated/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'TimeSelect',
		component: getDefaultExport(
			require('../src/components/TimeSelect/TimeSelect')
		),
		examplesContext: require.context(
			'../src/components/TimeSelect/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/TimeSelect/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'ToolTip',
		component: getDefaultExport(require('../src/components/ToolTip/ToolTip')),
		examplesContext: require.context(
			'../src/components/ToolTip/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/ToolTip/examples',
			true,
			/\.(j|t)sx?$/
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
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Validation/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'VerticalListMenu',
		component: getDefaultExport(
			require('../src/components/VerticalListMenu/VerticalListMenu')
		),
	},
	{
		name: 'VerticalTabs',
		component: getDefaultExport(
			require('../src/components/VerticalTabs/VerticalTabs')
		),
	},
	{
		name: 'ProgressBar',
		component: getDefaultExport(
			require('../src/components/ProgressBar/ProgressBar')
		),
		examplesContext: require.context(
			'../src/components/ProgressBar/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/ProgressBar/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'SidePanel',
		component: getDefaultExport(
			require('../src/components/SidePanel/SidePanel')
		),
		examplesContext: require.context(
			'../src/components/SidePanel/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/SidePanel/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
	{
		name: 'Underline',
		component: getDefaultExport(
			require('../src/components/Underline/Underline')
		),
		examplesContext: require.context(
			'../src/components/Underline/examples',
			true,
			/\.(j|t)sx?$/
		),
		examplesContextRaw: require.context(
			'!!raw-loader!../src/components/Underline/examples',
			true,
			/\.(j|t)sx?$/
		),
	},
];
