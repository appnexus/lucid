import { buildHybridComponent } from './util/state-management';

// components with reducers
import { default as AutocompleteDumb } from './components/Autocomplete/Autocomplete';
import { default as ButtonGroupDumb } from './components/ButtonGroup/ButtonGroup';
import { default as DropMenuDumb } from './components/DropMenu/DropMenu';
import { default as ExpanderDumb } from './components/Expander/Expander';
import { default as SingleSelectDumb } from './components/SingleSelect/SingleSelect';
import { default as TabsDumb } from './components/Tabs/Tabs';
import { default as VerticalListMenuDumb } from './components/VerticalListMenu/VerticalListMenu';
import { default as RadioGroupDumb } from './components/RadioGroup/RadioGroup';

const Autocomplete = buildHybridComponent(AutocompleteDumb);
const ButtonGroup = buildHybridComponent(ButtonGroupDumb);
const DropMenu = buildHybridComponent(DropMenuDumb);
const Expander = buildHybridComponent(ExpanderDumb);
const RadioGroup = buildHybridComponent(RadioGroupDumb);
const SingleSelect = buildHybridComponent(SingleSelectDumb);
const Tabs = buildHybridComponent(TabsDumb);
const VerticalListMenu = buildHybridComponent(VerticalListMenuDumb);

// dumb components
import Badge from './components/Badge/Badge';
import Banner from './components/Banner/Banner';
import BarChart from './components/BarChart/BarChart';
import Button from './components/Button/Button';
import CaretIcon from './components/Icon/CaretIcon/CaretIcon';
import CheckIcon from './components/Icon/CheckIcon/CheckIcon';
import Checkbox from './components/Checkbox/Checkbox';
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
import CheckboxLabeled from './components/CheckboxLabeled/CheckboxLabeled';
import RadioButtonLabeled from './components/RadioButtonLabeled/RadioButtonLabeled';
import SwitchLabeled from './components/SwitchLabeled/SwitchLabeled';
import LineChart from './components/LineChart/LineChart';
import ToolTip from './components/ToolTip/ToolTip';
import MinusIcon from './components/Icon/MinusIcon/MinusIcon';
import Overlay from './components/Overlay/Overlay';
import Panel from './components/Panel/Panel';
import PlusIcon from './components/Icon/PlusIcon/PlusIcon';
import Portal from './components/Portal/Portal';
import RadioButton from './components/RadioButton/RadioButton';
import ResizeIcon from './components/Icon/ResizeIcon/ResizeIcon';
import ScrollTable from './components/ScrollTable/ScrollTable';
import SearchIcon from './components/Icon/SearchIcon/SearchIcon';
import StickySection from './components/StickySection/StickySection';
import SuccessIcon from './components/Icon/SuccessIcon/SuccessIcon';
import Switch from './components/Switch/Switch';
import Table from './components/Table/Table';
import TextField from './components/TextField/TextField';
import TextFieldValidated from './components/TextFieldValidated/TextFieldValidated';
import Validation from './components/Validation/Validation';
import WarningIcon from './components/Icon/WarningIcon/WarningIcon';

// utils
import * as componentTypes from './util/component-types';
import * as domHelpers from './util/dom-helpers';
import * as stateManagement from './util/state-management';
import * as styleHelpers from './util/style-helpers';
import * as redux from './util/redux';

export {
	componentTypes,
	domHelpers,
	redux,
	stateManagement,
	styleHelpers
};

export {
	Autocomplete,
	AutocompleteDumb,
	Badge,
	Banner,
	BarChart,
	Button,
	ButtonGroup,
	ButtonGroupDumb,
	CaretIcon,
	CheckIcon,
	ChevronIcon,
	Checkbox,
	Panel,
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
	Grid,
	Icon,
	InfoIcon,
	CheckboxLabeled,
	RadioButtonLabeled,
	SwitchLabeled,
	LineChart,
	ToolTip,
	MinusIcon,
	Overlay,
	PlusIcon,
	Portal,
	RadioButton,
	RadioGroup,
	RadioGroupDumb,
	ResizeIcon,
	ScrollTable,
	SearchIcon,
	SingleSelect,
	SingleSelectDumb,
	SuccessIcon,
	StickySection,
	Switch,
	Table,
	Tabs,
	TabsDumb,
	TextField,
	TextFieldValidated,
	Validation,
	VerticalListMenu,
	VerticalListMenuDumb,
	WarningIcon
};

