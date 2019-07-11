## unreleased

- fix `SidePanel` position an sizing to correctly scroll content [#997](https://github.com/appnexus/lucid/pull/997)

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
