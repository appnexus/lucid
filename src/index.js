import { buildStatefulComponent } from './util/state-management';

// components with reducers
import { default as AutocompleteDumb } from './components/Autocomplete/Autocomplete';
import { default as ButtonGroupDumb } from './components/ButtonGroup/ButtonGroup';
import { default as DropMenuDumb } from './components/DropMenu/DropMenu';
import { default as ExpanderDumb } from './components/Expander/Expander';
import { default as SingleSelectDumb } from './components/SingleSelect/SingleSelect';
import { default as TabsDumb } from './components/Tabs/Tabs';
import { default as TextFieldDumb } from './components/TextField/TextField'
import { default as ValidatedTextFieldDumb } from './components/ValidatedTextField/ValidatedTextField';
import { default as VerticalListMenuDumb } from './components/VerticalListMenu/VerticalListMenu';

const Autocomplete = buildStatefulComponent(AutocompleteDumb);
const ButtonGroup = buildStatefulComponent(ButtonGroupDumb);
const DropMenu = buildStatefulComponent(DropMenuDumb);
const Expander = buildStatefulComponent(ExpanderDumb);
const SingleSelect = buildStatefulComponent(SingleSelectDumb);
const Tabs = buildStatefulComponent(TabsDumb);
const TextField = buildStatefulComponent(TextFieldDumb);
const ValidatedTextField = buildStatefulComponent(ValidatedTextFieldDumb);
const VerticalListMenu = buildStatefulComponent(VerticalListMenuDumb);

// dumb components
import Badge from './components/Badge/Badge';
import Banner from './components/Banner/Banner';
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
import LabeledCheckbox from './components/LabeledCheckbox/LabeledCheckbox';
import LabeledRadioButton from './components/LabeledRadioButton/LabeledRadioButton';
import LabeledSwitch from './components/LabeledSwitch/LabeledSwitch';
import MinusIcon from './components/Icon/MinusIcon/MinusIcon';
import Overlay from './components/Overlay/Overlay';
import Panel from './components/Panel/Panel';
import PlusIcon from './components/Icon/PlusIcon/PlusIcon';
import Portal from './components/Portal/Portal';
import RadioButton from './components/RadioButton/RadioButton';
import RadioGroup from './components/RadioGroup/RadioGroup';
import ResizeIcon from './components/Icon/ResizeIcon/ResizeIcon';
import ScrollTable from './components/ScrollTable/ScrollTable';
import SearchIcon from './components/Icon/SearchIcon/SearchIcon';
import StickySection from './components/StickySection/StickySection';
import SuccessIcon from './components/Icon/SuccessIcon/SuccessIcon';
import Switch from './components/Switch/Switch';
import Table from './components/Table/Table';
import Validation from './components/Validation/Validation';
import WarningIcon from './components/Icon/WarningIcon/WarningIcon';

// utils
import * as childComponent from './util/child-component';
import * as componentDefinition from './util/component-definition';
import * as domHelpers from './util/dom-helpers';
import * as stateManagement from './util/state-management';
import * as styleHelpers from './util/style-helpers';

export {
	childComponent,
	componentDefinition,
	domHelpers,
	stateManagement,
	styleHelpers,
};

export {
	Autocomplete,
	AutocompleteDumb,
	Badge,
	Banner,
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
	LabeledCheckbox,
	LabeledRadioButton,
	LabeledSwitch,
	MinusIcon,
	Overlay,
	PlusIcon,
	Portal,
	RadioButton,
	RadioGroup,
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
	TextFieldDumb,
	ValidatedTextField,
	ValidatedTextFieldDumb,
	Validation,
	VerticalListMenu,
	VerticalListMenuDumb,
	WarningIcon
};
