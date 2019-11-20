## unreleased

- Nothing at the moment.

## 5.2.0
- #1065 [minor] Make `Checkbox` private, update `CheckboxLabeled` documentation
- #1061 [minor] Add `BackUpArrowIcon`
- #1077 [patch] Make `DangerLightIcon`, `InfoLightIcon`, and `WarningLightIcon` private
- #1071 [patch] Update `LoadingIndicator` documentation
- #1065 [patch] Update `Banner` documentation
- #1068 [patch] Update chart color palette for better contrast
- #1063 [patch] Fix `Collapsible` to prevent calling `setState` on an unmounted component
- #1064 [patch] Update `FC` utility interface to include optional `notes` for documentation
- #1057 [patch] Update `WarningIcon` path for better rendering at small sizes
- #1060 [patch] Update `SuccessLightIcon` and `MinusCircleLightIcon` hover state colors
- #1050 [patch] Update `OverlayWrapper` z-index to use `zindex-modal` var
- #1062 [none] Add `index.less` as entrypoint for webpack for use in codepen
- #1059 [none] Improve ordering of props in DocsPage
- #1056 [none] Upgrade Storybook to v5.2.1 and implement DocsPage

https://github.com/appnexus/lucid/compare/v5.1.2...5.2.0

## 5.1.2

- #1055 [none] Improve prop documentation for `fixedColumnCount` on `DataTablePanel`
- #1053 [patch] Fix `onClick` for disabled `IconSelect`s
- #1040 [patch] Bump _lodash_ for security patch
- #1044 [patch] Fix hover/active/focus background styling for `Button` links
- #1052 [patch] Fix padding on `SearchField` where text could flow under the magnifying glass icon
- #1054 [patch] Fix regressing from TS conversion that broke Redux utils when `selectors` was `undefined`

https://github.com/appnexus/lucid/compare/v5.1.1...v5.1.2

## 5.1.1

- #1051 [patch] Several major fixes to the TypeScript defintions of all converted components
- #1041 [patch] Normalized the size of `EligibilityIcon` and `EligibilityLightIcon`
- #1046 [patch] Maintain the order of children passed in with `Selection`
- #1048 [patch] Adjust `Table` header's border and style behavior

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
  - Moved eslint configuration into lucid to aid getting new TS rules setup
  - Upgraded Storybook to v5
  - Added Chromatic to the travis build pipeline but had to disable cause we have to pay up
  - Removed private `PanelToggles` storybook addon
  - Updated Babel and friends and configured it to strip TypeScript
  - Restructured many examples
  - Overhauled npm scripts and parallelized many tasks
  - Upgraded `reselect` to v4
  - Upgraded `eslint` to v6
  - Upgraded `jest` to v24

https://github.com/appnexus/lucid/compare/v5.0.0...v5.1.0

## 5.0.0

- #1037 [major] Replace `getDefaultProps` with `defaultProps` on all components in preparation for the move to FCs, ES6 classes, and TypeScript components
- #1038 [patch] Fix `Banner` wanring close icon color

https://github.com/appnexus/lucid/compare/v4.5.0...v5.0.0

## 4.5.0

- #1036 [patch] Fix issues with PR #1030
- #1033 [patch] Update active multi line `Tab` styling
- #1032 [patch] Fix `ToolTip` default carat border styling
- #1030 [patch] Fix issues with resizable columns with fixed header `DataTable`s
- #1028 [patch] Fix prop warning on `DataTable`
- #1026 [patch] Fix various small styling issues with `SingleSelect`
- #1035 [minor] Improve `Bars` formatter props by passing the callback the entire data points

https://github.com/appnexus/lucid/compare/v4.4.0...v4.5.0

## 4.4.0

- #1015 [minor] Add new `Flag` icon.
- #1025 [minor] Add `isFilled` with a default of `true` to `Banner`. This allows for an "outlined" variant of banners.
- #1024 [minor] Add a new `PALETTE_7` for chart colors and modified all our charts to use it as the default palette.
- #1018 [minor] Add `topOffset` prop to `StickySection`
- #1022 [patch] Add a new `@color-secondary-5` variable and modified `NotchedTag` to use it be default. Just replacing coral with teal for the default style.
- #1019 [patch] Fix `DataTable`s resizable headers when used with fixed headers.
- #1010 [patch] Fix the color of `Icon`s in disabled `Button`s.
- #1021 [patch] Fix light `ToolTip` link color and dark `ToolTip` border color.

https://github.com/appnexus/lucid/compare/v4.3.0...v4.4.0

## 4.3.0

- #1016 [minor] Add `DraggableList` component for drag + drop lists
- #1017 [minor] Add `FourSquaresIcon`
- #1011 [minor] Update `DataTable` to have a disabled checkbox when the data is empty
- #1014 [patch] remove display hidden on document.body when SidePanel is unmounted

https://github.com/appnexus/lucid/compare/v4.2.0...v4.3.0

## 4.2.0

- #1004 [minor] Add `Typography` component
- #1006 [minor] Add `DotsIcon`
- #1005 [patch] Update `SidePanel` drop-shadow styling
- #1007 [patch] Fix `SidePanel.Header` selector making all icons gray.  Only `CloseIcon` is selected now

https://github.com/appnexus/lucid/compare/v4.1.0...v4.2.0

## 4.1.0

- #997 [minor] add `color` prop to `Icon`
- #997 [patch] fix `SidePanel` position an sizing to correctly scroll content
- #1003 [patch] update `ToolTip` link styling to match Banners
- #1002 [patch] create indeterminate state for `DataTable` select all when only some rows are selected
- #996 [patch] updates to `SingleSelect` `isInvisible` styling
- #1001 [patch] `SearchableSelect` `SearchableSingleSelect` `SearchableMultiSelect` now default the `autoComplete` attribute to off
- #998 [patch] Fixed some cases where font-weights were too bold. `SidePanel` close icon is now gray

https://github.com/appnexus/lucid/compare/v4.0.0...v4.1.0

## 4.0.0

- removed `primary` kind from `Banner`.
- removed `hasIcon` from `Banner`
- removed `hasRoundedCorners` from `Banner`.  All Banners are now square.
- removed `isSmall` from `Banner`.
- moved `CloseIcon` to lucid.  Shouldn't effect anx-react consumers.
- added `NotchedTag`
- custom icons in `Banner` probably don't look quite right.  Icons are now on a dark background
- removed `Info` `Success` `Warning` as `Button` `kind`
- removed the `inset-box-shadow` LESS mixin
- removed `@TextField-size-padding` from `TextField`'s LESS
- lot possible breakages to LESS mixins and variables.  Will enumerate when done.
- table now defaults to `hasLightHeader`
- removed `border` prop from `Table.td`
- removed `isActionable` from `table`
- added `isTop` to `Tag`. Necessary only for tiered tags that are three levels deep. (Use at the top level)
- added `isTop` to `Selection`. Necessary only for tiered selections. (Use at the top level)
- added `isInvisible` to `SingleSelect`. We do not use a button under the hood for this component, but this simulates an invisible `Button`, styling-wise.
- removed `kindOf` from `ToolTip`
- added `isLight` to `ToolTip`. The default now has dark styling, and this adds light styling.
- added `isVariableCountWidth` to `Tabs`. Allows count badges to have fixed or variable widths.
- added `isIncludeExclude` to `Switch`. Adds red/green styling.
- removed `isBadge` from `Icon`. It was an ill conceived feature. All icons should not be allowed to be made circular via a prop.
- returned `responsiveMode` in `Selection` to original meaning: `small` means small device with large style, and `large` means large device with small style. This was temporarily reversed out of a misunderstanding of the meaning of the prop.
- removed `BeakerIcon`
- removed `CaretIcon`, use `Chevron` or `Arrow` icons instead
- removed `CrossIcon` in favor of `CloseIcon`
- removed `DataViewIcon` in favor of `AnalyzeDataIcon`
- removed `DownloadTableDataIcon` in favor of `DownloadIcon`
- removed `EditPageIcon` in favor of `EditIcon`
- removed `FourSquaresIcon`
- renamed `QuestionMarkCircleIcon` to `QuestionMarkIcon` since it no longer has a circle around it
- removed the `presetSize` prop from `SettingsIcon` since all our utility icons can now be scaled
- removed `TableGearIcon` in favor of `SettingsIcon`
- added `ViewTableIcon`
- removed `ChevronThinIcon` in favor of just `Chevron`
- added `topOffset` to `SidePanel`. This prop adds a top margin to the component.
- added `isInvisible` to `SearchableSelect`
- added `hasHover` to `Table` for removing hover styling on tables.
- adjusted the default size of icons inside of `Button`s
- added `handleClose` to `Dialog`
- added `isComplex` to `Dialog`. Styling adjustments for a more complex `Dialog`.
- added `CodeIcon`

https://github.com/appnexus/lucid/compare/v3.2.2...v4.0.0
