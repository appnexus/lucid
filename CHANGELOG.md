## Unreleased

## 5.6.1

- #1226 [patch] Add div props to `RadioButtonLabeled` props interface.
- #1225 [patch] Center align `RadioButton` text.
- #1124 [minor] Add `VideoLiveIcon`, `VideoLongIcon`, `VideoOnDemandIcon`, and `VideoShortIcon` to the component icon library.
- #1123 [minor] Convert `Table` to TypeScript.
- #1122 [minor] Keep the loading indicator viewable. Add `anchorMessage` prop to `DataTable` to keep the loading and empty state messages anchored to the top of the table. This prop is passed through to the underlying `OverlayWrapper`. Solves the issue of the loading indicator rendering outside of the viewport when tables are large.
- #1121 [none] Update `SingleSelect` docs.
- #1120 [none] Prefix `UNSAFE_` to legacy React component 'lifecycle' methods.
- #1119 [none] Move Xandr fonts refernce out of the main Less file and into the docs.
- #1117 [patch] Replace `getInitialState` method in `SingleSelect`, `SearchableSelect`, `SearchableSingleSelect`, and `SearchableMultiSelect`.
- #1115 [minor] Add TypeScript extensions to load script for Storybook components and icons.
- #1114 [minor] Add `RunReportIcon` to the component icon library.
- #1113 [none] Add instructions on how to release Lucid UI in `RELEASING.md` doc.

https://github.com/appnexus/lucid/compare/v5.5.0...v5.6.0

## 5.5.0

- #1110 [patch] Remove `kind` type of `primary` from `Tag`, avoid adding `kind` border styles on parent `Tag`.
- #1109 [none] `NotchedTag` documentation.
- #1105 [none] Import css for example app.
- #1112 [patch] Fix props for `SearchableSelect`, `SearchableSingleSelect`, `SearchableMultiSelect` and `RadioGroup`.
- #1111 [minor] Add custom select all text as an option.
- #1108 [minor] Add converted components TypeScript linter.
- #1102 [minor] Convert `SearchableMultiSelect` to TypeScript.
- #1106 [patch] Convert `SplitButton` to TypeScript.
- #1101 [patch] Convert `EmptyStateWrapper` to TypeScript.
- #1099 [minor] Convert `SearchableSingleSelect` to TypeScript.
- #1095 [minor] Convert `SearchableSelect` to TypeScript.
- #1093 [none] Fix typos in the props documentation.
- #1097 [patch] Convert `AxisLabel` to TypeScript.
- #1107 [none] Update PR Checklist.
- #1098 [minor] Convert `Legend` to TypeScript.
- #1092 [minor] Convert `Paginator` and `SingleSelect` to TypeScript.
- #1094 [minor] Convert `RadioGroup` to TypeScript.
- #1096 [minor] Bump handlebars 4.1.2 -> 4.5.3.

https://github.com/appnexus/lucid/compare/v5.4.0...v5.5.0

## 5.4.0

- #1104 [minor] Change border colors for `Tag`.
- #1089 [minor] Add validation state to `SearchableMultiSelect`, `SearchableSingleSelect`, `SearchableSelect`.
- #1090 [minor] Move lodash library from "devDependencies" to "dependencies" in package.json.
- #1073 [patch] Convert `VerticalTabs` to TypeScript.
- #1070 [patch] Convert `Selection` to TypeScript.
- #1076 [patch] Convert `Accordion` to TypeScript.
- #1082 [patch] Convert `Piechart` to TypeScript.
- #1069 [patch] Convert `Legend` TypeScript.
- #1081 [minor] Add `HideIcon`, `SaveIcon`, and `GetMaximumIcon`.
- #1088 [none] Update text in `Banner` docs, added docs for `RadioButtonLabeled`.

https://github.com/appnexus/lucid/compare/v5.3.2...v5.4.0

## 5.3.2

- #1086 [patch] fix type signatures on `VerticalListMenu` and for `createClass`.
  - It's worth noting that if you don't have time to pass the correct generics to `createClass` you can always just use it like `createClass<any, any>()` to avoid most of the type checking.

https://github.com/appnexus/lucid/compare/v5.3.1...v5.3.2

## 5.3.1

- #1086 [patch] Fix storybook register to be compatible with older versions.

https://github.com/appnexus/lucid/compare/v5.3.0...v5.3.1

## 5.3.0

- #1058 [minor] Migrated another round of components to TypeScript and added a new utility function `buildModernHybridComponent` that works with class and functional React components. We also significantly reworked the way we annotate types of our functional components that should hopefully reduce the number of instances where optional props were incorrectly marked as required.
  - Components converted to TypeScript:
    - `ButtonGroup`
    - `DateSelect`
    - `DropMenu`
    - `ExpanderPanel`
    - `SearchField`
    - `Sidebar`
    - `Submarine`
    - `Tabs`
    - `TextFieldValidated`
    - `ToolTip`
    - `VerticalListMenu`
  - Components converted to use `buildModernHybridComponent`:
    - `ButtonGroup`
    - `DateSelect`
    - `DropMenu`
    - `ExpanderPanel`
    - `Expander`
    - `SearchField`
    - `Sidebar`
    - `Submarine`
    - `Tabs`
    - `ToolTip`
    - `VerticalListMenu`
- #1084 [patch] Fix the icon alignment of `Expander`.
- #1085 [none] Some storybook fixes:
  - Fixed the favicon.
  - Put the lucid logo in the upper left side panel.
  - The document.title changes to reflect the story or document the use looks at
- #1079 #1078 #1072 [none] Add codesandbox build to lucid, there are still a couple lingering issues that we need to figure out before it's fully baked.
- #1075 [patch] Improve type signature for `createClass`.

https://github.com/appnexus/lucid/compare/5.2.0...v5.3.0

## 5.2.0

- #1065 [minor] Make `Checkbox` private, update `CheckboxLabeled` documentation.
- #1061 [minor] Add `BackUpArrowIcon`.
- #1077 [patch] Make `DangerLightIcon`, `InfoLightIcon`, and `WarningLightIcon` private.
- #1071 [patch] Update `LoadingIndicator` documentation.
- #1065 [patch] Update `Banner` documentation.
- #1068 [patch] Update chart color palette for better contrast.
- #1063 [patch] Fix `Collapsible` to prevent calling `setState` on an unmounted component.
- #1064 [patch] Update `FC` utility interface to include optional `notes` for documentation.
- #1057 [patch] Update `WarningIcon` path for better rendering at small sizes.
- #1060 [patch] Update `SuccessLightIcon` and `MinusCircleLightIcon` hover state colors.
- #1050 [patch] Update `OverlayWrapper` z-index to use `zindex-modal` var.
- #1062 [none] Add `index.less` as entrypoint for webpack for use in codepen.
- #1059 [none] Improve ordering of props in DocsPage.
- #1056 [none] Upgrade Storybook to v5.2.1 and implement DocsPage.

https://github.com/appnexus/lucid/compare/v5.1.2...5.2.0

## 5.1.2

- #1055 [none] Improve prop documentation for `fixedColumnCount` on `DataTablePanel`.
- #1053 [patch] Fix `onClick` for disabled `IconSelect`s.
- #1040 [patch] Bump _lodash_ for security patch.
- #1044 [patch] Fix hover/active/focus background styling for `Button` links.
- #1052 [patch] Fix padding on `SearchField` where text could flow under the magnifying glass icon.
- #1054 [patch] Fix regressing from TS conversion that broke Redux utils when `selectors` was `undefined`.

https://github.com/appnexus/lucid/compare/v5.1.1...v5.1.2

## 5.1.1

- #1051 [patch] Several major fixes to the TypeScript defintions of all converted components.
- #1041 [patch] Normalize the size of `EligibilityIcon` and `EligibilityLightIcon`.
- #1046 [patch] Maintain the order of children passed in with `Selection`.
- #1048 [patch] Adjust `Table` header's border and style behavior.

https://github.com/appnexus/lucid/compare/v5.1.0...v5.1.1

## 5.1.0

- #1013 [minor] TLDR; converted many components to TypeScript and upgraded Storybook
  - Converted the following to TypeScript:
    - `Axis`
    - `Badge`
    - `Banner`
    - `Bar`
    - `Breadcrumb`
    - `Button`
    - `CalendarMonth`
    - `Checkbox`
    - `CheckboxLabeled`
    - `Collapsible`
    - `ContextMenu`
    - `Dialog`
    - `DragCaptureZone`
    - `Expander`
    - `Grid`
    - `InfiniteSlidePanel`
    - `Line`
    - `Lines`
    - `LoadingIndicator`
    - `LoadingMessage`
    - `NotchedTag`
    - `Overlay`
    - `OverlayWrapper`
    - `Panel`
    - `Point`
    - `Points`
    - `Portal`
    - `ProgressBar`
    - `RadioButton`
    - `RadioButtonLabeled`
    - `Resizer`
    - `SidePanel`
    - `SlidePanel`
    - `SplitHorizontal`
    - `SplitVertical`
    - `StickySection`
    - `Switch`
    - `Tag`
    - `TextField`
    - `Typography`
    - `Underline`
    - `Validation`
    - `componentTypes`
    - `domHelpers`
  - Moved eslint configuration into lucid to aid getting new TypeScript rules setup.
  - Upgraded Storybook to v5.
  - Added Chromatic to the travis build pipeline but had to disable cause we have to pay up.
  - Removed private `PanelToggles` storybook addon.
  - Updated Babel and friends and configured it to strip TypeScript.
  - Restructured many examples.
  - Overhauled npm scripts and parallelized many tasks.
  - Upgraded `reselect` to v4.
  - Upgraded `eslint` to v6.
  - Upgraded `jest` to v24.

https://github.com/appnexus/lucid/compare/v5.0.0...v5.1.0

## 5.0.0

- #1037 [major] Replace `getDefaultProps` with `defaultProps` on all components in preparation for the move to FCs, ES6 classes, and TypeScript components.
- #1038 [patch] Fix `Banner` wanring close icon color.

https://github.com/appnexus/lucid/compare/v4.5.0...v5.0.0

## 4.5.0

- #1036 [patch] Fix issues with PR #1030.
- #1033 [patch] Update active multi line `Tab` styling.
- #1032 [patch] Fix `ToolTip` default carat border styling
- #1030 [patch] Fix issues with resizable columns with fixed header `DataTable`s.
- #1028 [patch] Fix prop warning on `DataTable`.
- #1026 [patch] Fix various small styling issues with `SingleSelect`.
- #1035 [minor] Improve `Bars` formatter props by passing the callback the entire data points.

https://github.com/appnexus/lucid/compare/v4.4.0...v4.5.0

## 4.4.0

- #1015 [minor] Add new `Flag` icon.
- #1025 [minor] Add `isFilled` with a default of `true` to `Banner`. This allows for an "outlined" variant of banners.
- #1024 [minor] Add a new `PALETTE_7` for chart colors and modified all our charts to use it as the default palette.
- #1018 [minor] Add `topOffset` prop to `StickySection`.
- #1022 [patch] Add a new `@color-secondary-5` variable and modified `NotchedTag` to use it be default. Just replacing coral with teal for the default style.
- #1019 [patch] Fix `DataTable`s resizable headers when used with fixed headers.
- #1010 [patch] Fix the color of `Icon`s in disabled `Button`s.
- #1021 [patch] Fix light `ToolTip` link color and dark `ToolTip` border color.

https://github.com/appnexus/lucid/compare/v4.3.0...v4.4.0

## 4.3.0

- #1016 [minor] Add `DraggableList` component for drag + drop lists.
- #1017 [minor] Add `FourSquaresIcon`.
- #1011 [minor] Update `DataTable` to have a disabled checkbox when the data is empty.
- #1014 [patch] Remove display hidden on document.body when SidePanel is unmounted.

https://github.com/appnexus/lucid/compare/v4.2.0...v4.3.0

## 4.2.0

- #1004 [minor] Add `Typography` component.
- #1006 [minor] Add `DotsIcon`.
- #1005 [patch] Update `SidePanel` drop-shadow styling.
- #1007 [patch] Fix `SidePanel.Header` selector making all icons gray. Only `CloseIcon` is selected now.

https://github.com/appnexus/lucid/compare/v4.1.0...v4.2.0

## 4.1.0

- #997 [minor] Add `color` prop to `Icon`.
- #997 [patch] Fix `SidePanel` position an sizing to correctly scroll content.
- #1003 [patch] Update `ToolTip` link styling to match Banners.
- #1002 [patch] Create indeterminate state for `DataTable` select all when only some rows are selected.
- #996 [patch] Update `SingleSelect` `isInvisible` styling.
- #1001 [patch] `SearchableSelect` `SearchableSingleSelect` `SearchableMultiSelect` now default the `autoComplete` attribute to off.
- #998 [patch] Fix some cases where font-weights were too bold. `SidePanel` close icon is now gray.

https://github.com/appnexus/lucid/compare/v4.0.0...v4.1.0

## 4.0.0

- Remove `primary` kind from `Banner`.
- Remove `hasIcon` from `Banner`.
- Remove `hasRoundedCorners` from `Banner`. All Banners are now square.
- Remove `isSmall` from `Banner`.
- Move `CloseIcon` to lucid. Shouldn't effect anx-react consumers.
- Add `NotchedTag`.
- Custom icons in `Banner` probably don't look quite right. Icons are now on a dark background.
- Remove `Info` `Success` `Warning` as `Button` `kind`.
- Remove the `inset-box-shadow` LESS mixin.
- Remove `@TextField-size-padding` from `TextField`'s LESS.
- Lot possible breakages to LESS mixins and variables. Will enumerate when done.
- Table defaults to `hasLightHeader`.
- Remove `border` prop from `Table.td`.
- Remove `isActionable` from `table`.
- Add `isTop` to `Tag`. Necessary only for tiered tags that are three levels deep. (Use at the top level).
- Add `isTop` to `Selection`. Necessary only for tiered selections. (Use at the top level).
- Add `isInvisible` to `SingleSelect`. We do not use a button under the hood for this component, but this simulates an invisible `Button`, styling-wise.
- Remove `kindOf` from `ToolTip`.
- Add `isLight` to `ToolTip`. The default now has dark styling, and this adds light styling.
- Add `isVariableCountWidth` to `Tabs`. Allows count badges to have fixed or variable widths.
- Add `isIncludeExclude` to `Switch`. Adds red/green styling.
- Remove `isBadge` from `Icon`. It was an ill conceived feature. All icons should not be allowed to be made circular via a prop.
- Return `responsiveMode` in `Selection` to original meaning: `small` means small device with large style, and `large` means large device with small style. This was temporarily reversed out of a misunderstanding of the meaning of the prop.
- Remove `BeakerIcon`.
- Remove `CaretIcon`, use `Chevron` or `Arrow` icons instead.
- Remove `CrossIcon` in favor of `CloseIcon`.
- Remove `DataViewIcon` in favor of `AnalyzeDataIcon`.
- Remove `DownloadTableDataIcon` in favor of `DownloadIcon`.
- Remove `EditPageIcon` in favor of `EditIcon`.
- Remove `FourSquaresIcon`.
- Rename `QuestionMarkCircleIcon` to `QuestionMarkIcon` since it no longer has a circle around it.
- Remove the `presetSize` prop from `SettingsIcon` since all our utility icons can now be scaled.
- Remove `TableGearIcon` in favor of `SettingsIcon`.
- Add `ViewTableIcon`.
- Remove `ChevronThinIcon` in favor of just `Chevron`.
- Add `topOffset` to `SidePanel`. This prop adds a top margin to the component.
- Add `isInvisible` to `SearchableSelect`.
- Add `hasHover` to `Table` for removing hover styling on tables.
- Adjust the default size of icons inside of `Button`s.
- Add `handleClose` to `Dialog`.
- Add `isComplex` to `Dialog`. Styling adjustments for a more complex `Dialog`.
- Add `CodeIcon`.

https://github.com/appnexus/lucid/compare/v3.2.2...v4.0.0
