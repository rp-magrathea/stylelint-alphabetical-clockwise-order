const prefix = 'alphaClockOrder';

module.exports = function namespace(ruleName) {
	return `${prefix}/${ruleName}`;
};
