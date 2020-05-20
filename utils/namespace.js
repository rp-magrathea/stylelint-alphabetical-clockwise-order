const prefix = 'plugin';

module.exports = function namespace(ruleName) {
	return `${prefix}/${ruleName}`;
};
