import { buildHybridComponent } from './util/state-management';

// components with reducers
import { default as AccordionDumb } from './components/Accordion/Accordion';
import { default as AutocompleteDumb } from './components/Autocomplete/Autocomplete';
import { default as ButtonGroupDumb } from './components/ButtonGroup/ButtonGroup';
import { default as DropMenuDumb } from './components/DropMenu/DropMenu';
import { default as ExpanderDumb } from './components/Expander/Expander';
import { default as ExpanderPanelDumb } from './components/ExpanderPanel/ExpanderPanel';
import { default as PaginatorDumb } from './components/Paginator/Paginator';
import { default as PieChartDumb } from './components/PieChart/PieChart';
import { default as RadioGroupDumb } from './components/RadioGroup/RadioGroup';
import { default as SearchFieldDumb } from './components/SearchField/SearchField';
import { default as SidebarDumb } from './components/Sidebar/Sidebar';
import { default as SingleSelectDumb } from './components/SingleSelect/SingleSelect';
import { default as SubmarineDumb } from './components/Submarine/Submarine';
import { default as TabsDumb } from './components/Tabs/Tabs';
import { default as ToolTipDumb } from './components/ToolTip/ToolTip';
import { default as VerticalListMenuDumb } from './components/VerticalListMenu/VerticalListMenu';

const Accordion = buildHybridComponent(AccordionDumb);
const Autocomplete = buildHybridComponent(AutocompleteDumb);
const ButtonGroup = buildHybridComponent(ButtonGroupDumb);
const DropMenu = buildHybridComponent(DropMenuDumb);
const Expander = buildHybridComponent(ExpanderDumb);
const ExpanderPanel = buildHybridComponent(ExpanderPanelDumb);
const Paginator = buildHybridComponent(PaginatorDumb);
const PieChart = buildHybridComponent(PieChartDumb);
const RadioGroup = buildHybridComponent(RadioGroupDumb);
const SearchField = buildHybridComponent(SearchFieldDumb);
const Sidebar = buildHybridComponent(SidebarDumb);
const SingleSelect = buildHybridComponent(SingleSelectDumb);
const Submarine = buildHybridComponent(SubmarineDumb);
const Tabs = buildHybridComponent(TabsDumb);
const ToolTip = buildHybridComponent(ToolTipDumb);
const VerticalListMenu = buildHybridComponent(VerticalListMenuDumb);

// dumb components
import ArrowIcon from './components/Icon/ArrowIcon/ArrowIcon';
import Axis from './components/Axis/Axis';
import AxisLabel from './components/AxisLabel/AxisLabel';
import Badge from './components/Badge/Badge';
import Banner from './components/Banner/Banner';
import Bar from './components/Bar/Bar';
import Bars from './components/Bars/Bars';
import BarChart from './components/BarChart/BarChart';
import Button from './components/Button/Button';
import CaretIcon from './components/Icon/CaretIcon/CaretIcon';
import CheckIcon from './components/Icon/CheckIcon/CheckIcon';
import Checkbox from './components/Checkbox/Checkbox';
import CheckboxLabeled from './components/CheckboxLabeled/CheckboxLabeled';
import ChevronIcon from './components/Icon/ChevronIcon/ChevronIcon';
import ContextMenu from './components/ContextMenu/ContextMenu';
import CrossIcon from './components/Icon/CrossIcon/CrossIcon';
import DangerIcon from './components/Icon/DangerIcon/DangerIcon';
import DataTable from './components/DataTable/DataTable';
import Dialog from './components/Dialog/Dialog';
import DragCaptureZone from './components/DragCaptureZone/DragCaptureZone';
import EditIcon from './components/Icon/EditIcon/EditIcon';
import EligibilityIcon from './components/Icon/EligibilityIcon/EligibilityIcon';
import Grid from './components/Grid/Grid';
import Icon from './components/Icon/Icon';
import InfoIcon from './components/Icon/InfoIcon/InfoIcon';
import Legend from './components/Legend/Legend';
import Line from './components/Line/Line';
import Lines from './components/Lines/Lines';
import LineChart from './components/LineChart/LineChart';
import LoadingIcon from './components/Icon/LoadingIcon/LoadingIcon';
import LoadingIndicator from './components/LoadingIndicator/LoadingIndicator';
import LoadingMessage from './components/LoadingMessage/LoadingMessage';
import MaximizeIcon from './components/Icon/MaximizeIcon/MaximizeIcon';
import MinimizeIcon from './components/Icon/MinimizeIcon/MinimizeIcon';
import MinusIcon from './components/Icon/MinusIcon/MinusIcon';
import Overlay from './components/Overlay/Overlay';
import Panel from './components/Panel/Panel';
import PlusIcon from './components/Icon/PlusIcon/PlusIcon';
import Point from './components/Point/Point';
import Points from './components/Points/Points';
import Portal from './components/Portal/Portal';
import RadioButton from './components/RadioButton/RadioButton';
import RadioButtonLabeled from './components/RadioButtonLabeled/RadioButtonLabeled';
import RefreshIcon from './components/Icon/RefreshIcon/RefreshIcon';
import ResizeIcon from './components/Icon/ResizeIcon/ResizeIcon';
import ScrollTable from './components/ScrollTable/ScrollTable';
import SearchIcon from './components/Icon/SearchIcon/SearchIcon';
import SplitHorizontal from './components/SplitHorizontal/SplitHorizontal';
import SplitVertical from './components/SplitVertical/SplitVertical';
import StickySection from './components/StickySection/StickySection';
import SuccessIcon from './components/Icon/SuccessIcon/SuccessIcon';
import Switch from './components/Switch/Switch';
import SwitchLabeled from './components/SwitchLabeled/SwitchLabeled';
import Table from './components/Table/Table';
import TableGearIcon from './components/Icon/TableGearIcon/TableGearIcon';
import TextField from './components/TextField/TextField'
import TextFieldValidated from './components/TextFieldValidated/TextFieldValidated';
import Validation from './components/Validation/Validation';
import WarningIcon from './components/Icon/WarningIcon/WarningIcon';

// utils
import * as componentTypes from './util/component-types';
import * as domHelpers from './util/dom-helpers';
import * as stateManagement from './util/state-management';
import * as styleHelpers from './util/style-helpers';
import * as redux from './util/redux';
import * as chartConstants from './constants/charts';

import * as d3Scale from 'd3-scale';
import * as d3Time from 'd3-time';

export {
	componentTypes,
	domHelpers,
	redux,
	stateManagement,
	styleHelpers,
	chartConstants,
	d3Scale,
	d3Time,
};

export {
	Accordion,
	AccordionDumb,
	ArrowIcon,
	Autocomplete,
	AutocompleteDumb,
	Axis,
	AxisLabel,
	Badge,
	Banner,
	Bar,
	Bars,
	BarChart,
	Button,
	ButtonGroup,
	ButtonGroupDumb,
	CaretIcon,
	CheckIcon,
	Checkbox,
	CheckboxLabeled,
	ChevronIcon,
	ContextMenu,
	CrossIcon,
	DangerIcon,
	DataTable,
	Dialog,
	DragCaptureZone,
	DropMenu,
	DropMenuDumb,
	EditIcon,
	EligibilityIcon,
	Expander,
	ExpanderDumb,
	ExpanderPanel,
	ExpanderPanelDumb,
	Grid,
	Icon,
	InfoIcon,
	Legend,
	Line,
	LineChart,
	Lines,
	LoadingIcon,
	LoadingIndicator,
	LoadingMessage,
	MaximizeIcon,
	MinimizeIcon,
	MinusIcon,
	Overlay,
	Paginator,
	PaginatorDumb,
	Panel,
	PieChart,
	PlusIcon,
	Point,
	Points,
	Portal,
	RadioButton,
	RadioButtonLabeled,
	RadioGroup,
	RadioGroupDumb,
	RefreshIcon,
	ResizeIcon,
	ScrollTable,
	SearchField,
	SearchIcon,
	SingleSelect,
	SingleSelectDumb,
	Sidebar,
	SidebarDumb,
	SplitHorizontal,
	SplitVertical,
	StickySection,
	Submarine,
	SubmarineDumb,
	SuccessIcon,
	Switch,
	SwitchLabeled,
	Table,
	TableGearIcon,
	Tabs,
	TabsDumb,
	TextField,
	TextFieldValidated,
	ToolTip,
	ToolTipDumb,
	Validation,
	VerticalListMenu,
	VerticalListMenuDumb,
	WarningIcon,
};
