const postcss = require('postcss');
const shorthandData = require('./shorthandData');
const clockwiseData = require('./clockwiseData');

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
	let firstClockwiseIndex = clockwiseData.findIndex((x) => x.test(firstPropData.unprefixedName));
	let secondClockwiseIndex = clockwiseData.findIndex((y) =>
		y.test(secondPropData.unprefixedName)
	);

	let firstShorthand = firstPropData.unprefixedName.slice(
		0,
		firstPropData.unprefixedName.search(clockwiseData[firstClockwiseIndex])
	);
	let secondShorthand = secondPropData.unprefixedName.slice(
		0,
		secondPropData.unprefixedName.search(clockwiseData[secondClockwiseIndex])
	);

	if (
		firstClockwiseIndex !== -1 &&
		secondClockwiseIndex !== -1 &&
		firstClockwiseIndex !== secondClockwiseIndex &&
		firstShorthand === secondShorthand
	) {
		return firstClockwiseIndex < secondClockwiseIndex;
	}

	return firstPropData.unprefixedName < secondPropData.unprefixedName;
};
