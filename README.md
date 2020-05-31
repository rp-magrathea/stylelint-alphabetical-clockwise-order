# stylelint-alphabetical-clockwise-order

A derivation and fork of [`stylelint-order`](https://github.com/hudochenkov/stylelint-order). Provides one rule, `properties-alphabetical-clockwise-order`, which sorts all properties alphabetically except long-form properties containing `-top`, `-right`, `-bottom`, or `-left`, which are sorted in that order.

Autofixing is still enabled, but still corrects to strictly alphabetical ordering. (TODO: #1 Update autofix to handle alpha-clockwise)

## Installation

1. If you haven't, install [stylelint]:

```
npm install stylelint --save-dev
```

2.  Install `stylelint-alphabetical-clockwise-order`:

```
npm install stylelint-alphabetical-clockwise-order --save-dev
```

## Usage

Add `stylelint-alphabetical-clockwise-order` to your stylelint config `plugins` array, then add the `plugin/properties-alphabetical-clockwise-order` rule to the rules list (note the namespace).

```json
{
	"plugins": [
		"stylelint-alphabetical-clockwise-order"
	],
	"rules": {
		"plugin/properties-alphabetical-clockwise-order": true
	}
}
```

## Rules

* [`properties-alphabetical-clockwise-order`](./rules/properties-alphabetical-clockwise-order/README.md): Specify the alphabetical-clockwise order of properties within declaration blocks.

## Autofixing

Autofixing is enabled by default if it's enabled in stylelint's configuration file. It can be disabled on a per rule basis using the secondary option `disableFix: true`. Here's an example:

```json
	"rules": {
		"plugin/alphabetical-clockwise-order": [
			true,
			{
				"disableFix": true
			}
		]
	}
```

Less may work but isn't officially supported.

[npm]: https://www.npmjs.com/package/stylelint-alphabetical-clockwise-order
[stylelint]: https://stylelint.io/
[postcss-sorting]: https://github.com/hudochenkov/postcss-sorting
