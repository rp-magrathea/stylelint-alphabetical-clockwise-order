# properties-alphabetical-clockwise-order

Specify the alphabetical order of properties within declaration blocks.

```css
a {
	color: pink;
	top: 0;
}
/** ↑
 * These properties */
```

Shorthand properties *must always* precede their longhand counterparts, even if that means they are not alphabetized.
(See also [`declaration-block-no-shorthand-property-overrides`](https://stylelint.io/user-guide/rules/declaration-block-no-shorthand-property-overrides/).)

Prefixed properties *must always* precede the unprefixed version.

**Shorthand properties whose values are specified in clockwise order (top, right, bottom, left) are, when used in their long-form, sorted in that order rather than alphabetically.** For example, `margin-top` precedes `margin-left`. This is the biggest difference between this particular plugin and the `stylelint-order/properties-alphabetical-order` from which it is forked. Aside from top/right/bottom/left ordering, all else remains alphabetical. This means that `border-right-color` still precedes `border-right-width`.

This rule ignores variables (`$sass`, `@less`, `--custom-property`).

- Options
	- (`true`)[#true]
- Optional secondary options
	- (`strictAlphabetical: true`)[#strictAlphabetical-true]
	- (`disableFix: true`)[#disableFix-true]

## Options

### `true`

The following patterns are considered warnings:

```css
a {
	top: 0;
	color: pink;
}
```

```css
a {
	border-bottom-color: pink;
	border-color: transparent;
}
```

```css
a {
	-moz-transform: scale(1);
	transform: scale(1);
	-webkit-transform: scale(1);
}
```

```css
a {
	margin-left: 1em;
	margin-top: 1em;
}
```

The following patterns are *not* considered warnings:

```css
a {
	color: pink;
	top: 0;
}
```

```css
a {
	border-color: transparent;
	border-bottom-color: pink;
}
```

```css
a {
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	transform: scale(1);
}
```

```css
a {
	-moz-transform: scale(1);
	-webkit-transform: scale(1);
	transform: scale(1);
}
```

```css
a {
	margin-top: 1em;
	margin-left: 1em;
}
```

## Optional secondary options

### `strictAlphabetical: true`

Ignores clockwise ordering and reverts to strictly alphabetical, matching the original `stylelint-order/properties-alphabetical-order`.

### `disableFix: true`

Disable autofixing. Autofixing is enabled by default if it's enabled in stylelint configuration.
