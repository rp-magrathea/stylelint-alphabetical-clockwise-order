const postcss = require('postcss');
const shorthandData = require('./shorthandData');
const clockwiseOrder = require('./clockwiseData');

function isShorthand(a, b) {
	const longhands = shorthandData[a] || [];

	return longhands.includes(b);
}

module.exports = function checkAlphabeticalOrder(firstPropData, secondPropData) {
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
		clockwiseOrder.includes(firstPropData.unprefixedName) &&
		clockwiseOrder.includes(secondPropData.unprefixedName)
	) {
		return (
			clockwiseOrder.indexOf(firstPropData.unprefixedName) <
			clockwiseOrder.indexOf(secondPropData.unprefixedName)
		);
	}

	return firstPropData.unprefixedName < secondPropData.unprefixedName;
};
