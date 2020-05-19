const postcss = require('postcss');
const shorthandData = require('./shorthandData');
const clockwiseData = require('./properties-alphabetical-order/clockwiseData');

function isClockwiseException(a, b) {
	const aIndex = clockwiseData.findIndex((x) => x.test(a));
	const bIndex = clockwiseData.findIndex((y) => y.test(b));

	const aShorthand = a.slice(0, a.search(clockwiseData[aIndex]));
	const bShorthand = b.slice(0, b.search(clockwiseData[bIndex]));

	return (
		aIndex !== -1 && // ignore prop that isn't defined clockwise in shorthand
		bIndex !== -1 && // ignore prop that isn't defined clockwise in shorthand
		aIndex !== bIndex && // border-right-color and border-right-width should be handled alphabetically
		aShorthand === bShorthand // border-left and margin-top should be handled alphabetically
	);
}

function isShorthand(a, b) {
	const longhands = shorthandData[a] || [];

	return longhands.includes(b);
}

module.exports = function checkAlphabeticalOrder(
	firstPropData,
	secondPropData,
	allowClockwise = false
) {
	// OK if the first is shorthand for the second:
	if (isShorthand(firstPropData.unprefixedName, secondPropData.unprefixedName)) {
		return true;
	}

	// Not OK if the second is shorthand for the first:
	if (isShorthand(secondPropData.unprefixedName, firstPropData.unprefixedName)) {
		return false;
	}

	// If unprefixed prop names are the same, compare the prefixed versions
	if (firstPropData.unprefixedName === secondPropData.unprefixedName) {
		// If first property has no prefix and second property has prefix
		if (
			!postcss.vendor.prefix(firstPropData.name).length &&
			postcss.vendor.prefix(secondPropData.name).length
		) {
			return false;
		}

		return true;
	}

	// If shorthand uses clockwise ordering, OK for longhand to be ordered -top < -right < -bottom < -left
	if (
		allowClockwise &&
		isClockwiseException(firstPropData.unprefixedName, secondPropData.unprefixedName)
	) {
		return (
			clockwiseData.findIndex((x) => x.test(firstPropData.unprefixedName)) <
			clockwiseData.findIndex((y) => y.test(secondPropData.unprefixedName))
		);
	}

	return firstPropData.unprefixedName < secondPropData.unprefixedName;
};
