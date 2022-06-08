## 8.16.0

- #1388 Remove optional chaining from `SearchField`.

  https://github.com/appnexus/lucid/compare/v8.15.0...v8.16.0

## 8.15.0

- #1387 Uncomment the `omitProps` method and repeating triangle Xandr pattern background so other libraries can use them.
- #1386 Update the settings icon to reflect what we use in XDS.
- #1384 Deprecate `omitProps` method.
- #1377, #1378, #1379, #1380, #1381, #1382, #1383, #1384 Update `Submarine`, `SplitVertical`, `Switch`, `SearchableMultiSelect`, `SideBar`, `IconSelect`, `SeparatorIcon` and `DraggableLineChart` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.

  https://github.com/appnexus/lucid/compare/v8.14.0...v8.15.0

## 8.14.0

- #1376 Update default values for `SidePanel` styling.
- #1375 Update `LineChart` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1374 CXP-3019: Set `SearchableSelect` autofocus to search field on open
- #1373 Update `InfiniteSidePanel` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1372 Reorder some component exports.
- #1371 Update `SplitVertical` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.

https://github.com/appnexus/lucid/compare/v8.13.0...v8.14.0

## 8.13.0

- #1370 BUDE-1755: Remove optional chaining due to compile issues.
- #1369 Update `VerticalTabls` and `Table` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1368 Update `ScrollTable` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1367 Update `StickySection` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1366 Update `SplitButton` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1365 Update `VerticalListMenu` and `SplitHorizontal` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1364 Update `SwitchLabeled` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1363 Update `Validation` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1362 Update `Portal` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1361 Update `Points` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1360 Update `SidePanel` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1359 Update `PieChart` and `ToolTip` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1358 Update `LoadingMessage` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1357 Update `SidePanel` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.

  https://github.com/appnexus/lucid/compare/v8.12.0...v8.13.0

## 8.12.0

- #1356 Add an optional title to `SingleSelect`.
- #1354 Update `TextFieldValidated` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1352 Add `Success` prop to `TextFieldValidated` that creates a custom 'success' error text and border color
- #1348 Update `ExpanderPanel` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1347 Bump `minimist` from 1.2.5 to 1.2.6 to fix a security vulnerability.
- #1346 Add unit test for `DropMenu` props.
- #1345 Update `DragCaptureZone` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1344 Update `Dialog` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1343 Update `DateSelect` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1342 Update `DataTable` stories to SB6 and replace deprecated omitProps method with explicit list of omitted props.
- #1341 Fix unit tests warnings for `sinon` and `redux.spec.ts` tests, add intellisense to the `cleanArgs` method, updated `sinon` package and its types.
- #1340 Update minor versions of babel and Storybook packages.
- #1339 Update outdated npm packages, fix console warnings for several unit tests, update contributing instructions for unit tests

  https://github.com/appnexus/lucid/compare/v8.11.0...v8.12.0

## 8.11.0

- #1338 General cleanup of warnings, typos and stories
  - Fix most of the warnings for unit tests;
  - Fix some broken unit test (take out .skip and .only);
  - Fix the console warnings for stories;
  - Fix missing or misformatted story descriptions
  - Remove sinon where deprecated;
  - Replace visible reference to Appnexus with Xandr;
  - Deprecate Appnexus triangle background pattern
- #1337 Replace omitProps method with explicit props list for `Tag`
- #1336 Update the CONTRIBUTING.md and PULL_REQUEST_TEMPLATE.md docs to require two approvals
- #1335 Replace omitProps method with explicit props list for `RadioGroup` and `ButtonGroup`.

  https://github.com/appnexus/lucid/compare/v8.10.0...v8.11.0

## 8.10.0

- #1334 Fix props for `SearchField`
- #1333 Fix props for `TextFieldValidated`
- #1331 Add data-test-id to lucid portals

  https://github.com/appnexus/lucid/compare/v8.9.0...v8.10.0

## 8.9.0

- #1330 Update development dependencies
- #1329 Remove redundant Storybook name stories properties
- #1327 Fix Storybook linting warnings
- #1326 Update production dependecies

  https://github.com/appnexus/lucid/compare/v8.8.0...v8.9.0

## 8.8.0

- #1325 Add white background to success and minus circle icons
- #1324 Fix Table Cursors so non-clickable rows don't look clickable
- #1323 Update padding for the dialog box to be consistent across all sides.
- #1321 Update switched to Storybook 6
- #1319, #1320, #1323 Update Padding on Grid and Dialog box to 20px on all sides.
- #1318 Update Icon Colors to add two new colors to prop validation.

  https://github.com/appnexus/lucid/compare/v8.7.0...v8.8.0

## 8.7.0

- #1292, #1294, #1295, #1296, #1298, #1299, #1300, #1307, #1315 Remove `omitProps` method for several components and replace it with lodash \_.omit or remove it entirely. Also, upgrade all the component stories to functional Storybook 6 stories.
- #1987 TVMP-9462 Fix issue with missing props.
- #1301 Update eslint plugins and fixed time locking.
- #1302 Upgrade Storybook to 6.4.9
- #1304 Update padding for `Panel`.
- #1306 Fix typo in the `border-color` css declaration.
- #1308 `Checkbox` consistency updates.
- #1310 `RadioButton` consistency updates.
- #1312 Updated padding in `Dialog` box.
- #1314 Auto disable text input on `Paginator`.

  https://github.com/appnexus/lucid/compare/v8.6.0...v8.7.0

## 8.6.0

- #1291 Fix propTypes for `SearchableMultiSelect`.
- #1290 Fix `less` bug to allow division calculations.
- #1289 Fix `SearchField` styling.
- #1288 Replaced `Object.keys` with `lodash` keys to fix `propType` checks in prod builds.
- #1287 Format `Storybook` story descriptions.
- #1286 Add `master.less` styles back into `Storybook`.

  https://github.com/appnexus/lucid/compare/v8.5.2...v8.6.0

## 8.5.2

- #1285 Make props optional for `Banner`.

  https://github.com/appnexus/lucid/compare/v8.5.0...v8.5.2

## 8.5.0

- #1284 Add the propType property and fix Stories for `Banner`.
- #1282 Remove components from nested categories in the navigation.

  https://github.com/appnexus/lucid/compare/v8.4.0...v8.5.0

## 8.4.0

- #1279 Update hover and active styling for `Tabs`.
- #1277 Removed `load-components` file and unused Storybook utilities.
- #1275 Converted remaining Storybook 5 stories to 6 with a script.
- #1274 Add `RolloverIcon`.
- #1273 Fix styling so a `Button` in a `Tooltip` appears on hover.
- #1271 Migrate `Banner` to Storybook 6.
- #1269 Migrate `Badge` to Storybook 6.

  https://github.com/appnexus/lucid/compare/v8.3.0...v8.4.0

## 8.3.0

- #1260 Added more types to `Paginator`
- #1259 & #1265 Update 'Selected' state UI for `ButtonGroup`, `SingleSelect`, `SearchableSelect`, `SearchableSingleSelect`, `IconSelect`, `VerticalTabs`, and `VerticalListMenu`.
- #1258 [patch] Changed generic tests to use render.
- #1250 to #1257 [minor] Update icons to Storybook 6.
- #1248 & 1249 [minor] Add `Megaphone`, `DoubleChevron` and `Pin` icons.
- #1247 [minor] Update the primary light color and some other minor styling issues.
- #1246 [bug] Fix react-syntax-highlighter bug.
- #1244 [patch] Update old react-syntax-highlighter dep to fix security issue.
- #1243 [pach] Migrate some DataTable stories to Storybook 6.

  https://github.com/appnexus/lucid/compare/v8.2.3...v8.3.0

## 8.2.3

- [patch] Fixed reactDocgen build of prop definitions.
  https://gist.github.com/shilman/036313ffa3af52ca986b375d90ea46b0#short-term
- [patch] Tweaked ITabsProps type.
- [patch] Tweaked ITabsProps type.
- [patch] Export more types definitions.

## 8.2.2

- [patch] Export more types.

## 8.2.1

- #1240 [patch] Export Typescript types in package.json.

## 8.2.0

- #1238 [patch] Small update to recent DataTable change.

  https://github.com/appnexus/lucid/pull/1238

- #1237 [minor] Add info prop to TextFieldValidated.

  https://github.com/appnexus/lucid/pull/1237

## 8.0.0

- #1231 [major] Updated storybook to v6.

  https://github.com/appnexus/lucid/pull/1231

## 7.2.0

- #1235 [minor] Exposing data table column width to child components.

  https://github.com/appnexus/lucid/pull/1235

## 7.1.0

- #1227 [minor] Updated build to create cjs and esm assets.

  https://github.com/appnexus/lucid/pull/1227

## 7.0.4

- #1223 [patch] Set type to module.

  https://github.com/appnexus/lucid/pull/1223

## 7.0.3

- #1220 [patch] Introduce YAxisTickFormatter prop for DraggableLineChart component.

  https://github.com/appnexus/lucid/compare/v7.0.2...v7.0.3

## 7.0.2

- #1222 [patch] Fixed typescript build.

  https://github.com/appnexus/lucid/compare/v7.0.1...v7.0.2

## 7.0.1

- #1221 [patch] Put the repeating triangle Xandr pattern background back.

  https://github.com/appnexus/lucid/compare/v7.0.0...v7.0.1

## 7.0.0

- #1218 [major] Updated Storybook minor version and converted Storybook files to TypeScript.
- #1216 and #1217 [patch] Fix some Skeleton issues.
- #1215 [minor] Add `SmallDataTableLoadingSkeleton`.
- #1214 [minor] Add `SingleLineSkeleton`.
- #1212 [minor] Add `SimpleTableSkeleton`.
- #1211 [minor] Add `LineChartLoadingSkeleton`.
- #1210 [minor] Add `HeaderLoadingSkeleton`.
- #1209 [minor] Add `GroupLoadingSkeleton`.
- #1208 [minor] Add `ComplexTableLoadingSkeleton`.
- #1207 [minor] Add `CardLoadingSkeleton`.
- #1206 [major] Massive TypeScript file conversion, part two.
- #1205 [minor] Add `BarChartLoadingSkeleton`.
- #1204 [major] Massive TypeScript file conversion, part one.
- #1203 [minor] Impove `LoadingSkeleton` sizing and header placement.
- #1202 [minor] Remove the Storybook background image.
- #1201 [manor] Migrate `utils` folder to TypeScript.
- #1200 [major] Convert remaining Icons to TypeScript.
- #1199 [major] Update eslint, prettier, jest and TypeScript to latest.
- #1198 [major] Update more vulnerable dependencies and update linting.
- #1197 [minor] Add `TextFieldPlain`.
- #1196 [patch] Update various vulnerable dependencies and update eslint.

  https://github.com/appnexus/lucid/compare/v6.0.0...v7.0.0

## 6.0.0

- #1195 [minor] Fix the background image for Anx-react library.
- #1194 [patch] Add Skeletons. Removed addBorder, SWAP-598 Added React-placeholder.
- #1192 [major] Convert `DraggableList` to TypeScript.

  https://github.com/appnexus/lucid/compare/v5.8.25...v6.0.0

## 5.8.25

- #1191 [patch] Add `ReportsIcon`, `BarChartIcon`, `TableIcon`, and `TicketIcon`.

## 5.8.24

- #1191 [patch] Add `ReportsIcon`, `BarChartIcon`, `TableIcon`, `TicketIcon`, `GlobeIcon`, `InheritedSettingsIcon`, `AddColumnIcon` and update `RunReportIcon`.
- #1190 [patch] Fixed class name binding on `VerticalListMenu`.
- #1189 [patch] BUDE-969: Add formatted-options example to `SearchableSingleSelect`.

  https://github.com/appnexus/lucid/compare/v5.8.23...v5.8.24

## 5.8.23

- #1187 [patch] BUDE-968: Toggle active class on `ClockIcon` on input focus.
- #1186 [patch] CXP-1038: Migrated `Autocomplete` to TypeScript.
- #1185 [patch] CXP-1042: Converted `SwitchLabeled` to TypeScript.
- #1184 [patch] CXP-695: Converted `DataTable` to TypeScript.
- #1183 [patch] CXP-694: Migrated `BarChart` to TypeScript.

  https://github.com/appnexus/lucid/compare/v5.8.22...v5.8.23

## 5.8.22

- #1181 [patch] BUDE-966: Add optional flag to truncate `Table` cell content.

  https://github.com/appnexus/lucid/compare/v5.8.21...v5.8.22

## 5.8.21

- [patch] Removing css `height` causing misalignment in `SwitchLabelled`.

  https://github.com/appnexus/lucid/compare/v5.8.20...v5.8.21

## 5.8.20

- [patch] Fixing bug with `DraggableLineChart` and selecting first row.

  https://github.com/appnexus/lucid/compare/v5.8.19...v5.8.20

## 5.8.19

- [patch] Removing unneeded prop from `DraggableLineChart`.

  https://github.com/appnexus/lucid/compare/v5.8.18...v5.8.19

## 5.8.18

- [patch] Adding helper text box for `DraggableLineChart`.

  https://github.com/appnexus/lucid/compare/v5.8.17...v5.8.18

## 5.8.17

- [patch] Fixing less on `TimeSelect`.

  https://github.com/appnexus/lucid/compare/v5.8.16...v5.8.17

## 5.8.16

- [patch] Fixing issue with `TimeSelect`.

  https://github.com/appnexus/lucid/compare/v5.8.15...v5.8.16

## 5.8.15

- [patch] Fixing a less value for `TimeSelect`.

  https://github.com/appnexus/lucid/compare/v5.8.14...v5.8.15

## 5.8.14

- [patch] Fixing a default max Y value for `DraggableLineChart`.

  https://github.com/appnexus/lucid/compare/v5.8.13...v5.8.14

## 5.8.13

- #1178 [patch] BUDE-848: Building out a preselect for the `DraggableLineChart`.

  https://github.com/appnexus/lucid/compare/v5.8.12...v5.8.13

## 5.8.12

- #1177 [patch] BUDE-634: Building out a new time selector.

  https://github.com/appnexus/lucid/compare/v5.8.11...v5.8.12

## 5.8.11

- #1176 [patch] BUDE-479: Fix scroll locked content.

  https://github.com/appnexus/lucid/compare/v5.8.10...v5.8.11

## 5.8.10

- #1175 [patch] BUDE-479: Add option to `LoadingIndicator` and `OverlayWrapper` to center loading message and prevent scrolling.

  https://github.com/appnexus/lucid/compare/v5.8.9...v5.8.10

## 5.8.9

- #1174 [patch] BUDE-811: Tweak spacing with inputs and graph padding.
- #1173 [patch] BUDE-811: Update color of point in `DraggableLineChart`.
- #1172 [patch] Added `Wrench`, `Share`, `Lightbulb` and `Hosted` icons.

  https://github.com/appnexus/lucid/compare/v5.8.8...v5.8.9

## 5.8.8

- #1171 [patch] Cleaned up the new `DraggableLineChart` component.

  https://github.com/appnexus/lucid/compare/v5.8.7...v5.8.8

## 5.8.7

- #1169 [patch] We have updated our test cases for `DraggableLineChart`. We have also added span as a type to `Typography` so users can have a div under them.

  https://github.com/appnexus/lucid/compare/v5.8.6...v5.8.7

## 5.8.6

- #1166 [patch] Updated the new `DraggableLineChart` to be able to take foreign React component.
- #1163 [none] Improve the GH upload script to work with https.
- #1160 [patch] Fix `SearchableSingleSelect` warnings.

  https://github.com/appnexus/lucid/compare/v5.8.5...v5.8.6

## 5.8.5

- #1159 [patch] Added a new `DraggableLineChart` component.

  https://github.com/appnexus/lucid/compare/v5.8.4...v5.8.5

## 5.8.4

- #1158 [patch] Added an on rest callback for `Collapsible` and `ExpanderPanel`.

  https://github.com/appnexus/lucid/compare/v5.8.3...v5.8.4

## 5.8.3

- #1153 [patch] Removed the props and state re-exports from the index file. This may technically break some folks but it should never have been introduced in the first place it since it isn't compatible with Babel TypeScript compilation.

https://github.com/appnexus/lucid/compare/v5.8.2...v5.8.3

## 5.8.2

- #1154 [patch] BUDE-121: Upgrated react-transition-group library. This required changes to `Banner`, `Overlay`, `OverlayWrapper`, `SwitchLabeled`.

https://github.com/appnexus/lucid/compare/v5.8.1...v5.8.2

## 5.8.1

- #1151 [patch] BUDE-420: Update `Bars` props.
- #1149 [patch] add `Bell`, `Dot` and `Calculator` icons and remove some svgs.
  https://github.com/appnexus/lucid/compare/v5.8.0...v5.8.1

## 5.8.0

- #1138 [none] Min-width added for `Table`.
- #1140 [none] correct some of the releasing steps.
- #1141 [patch] Add HTML attributes to `Tabs` component.
- #1142 [none] Update `Table` cursor icon.
- #1144 [none] Use `donutWidth` prop to control width of a `Donut` chart.
- #1145 [minor] TypeScript convert `LineChart`.
- #1146 [patch] extend `DropMenu` props to include div element passthroughs.
- #1147 [none] bump acorn from 5.7.3 to 5.7.4.
- #1148 [patch] expose component interfaces.

https://github.com/appnexus/lucid/compare/v5.7.0...v5.8.0

## 5.7.0

- #1139 [minor] Add new `HamburgerMenuIcon`.
- #1136 [minor] Add a prop to allow a vertical orientation to `DotsIcon`.
- #1135 [minor] Add a check so that Chromatic tests do not try to load the proprietary Xandr font faces.
- #1134 [minor] Convert `Bars` to TypeScript.
- #1130 [minor] Add a new `ResponsiveGrid` component.
- #1133 [minor] Remove content from `RadioButtonLabeled` example.
- #1129 [minor] Convert `ScrollTable` to TypeScript.
- #1128 [none] Fix the `ToolTips` on `Chart`.
- #1127 [none] Updated the `Releasing.md` instructions.
- #1131 [none] Update the docs for `Tag`.

https://github.com/appnexus/lucid/compare/v5.6.1...v5.7.0

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

https://github.com/appnexus/lucid/compare/v5.5.0...v5.6.1

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
