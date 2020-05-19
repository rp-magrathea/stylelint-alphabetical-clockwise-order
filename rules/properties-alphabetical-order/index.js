let stylelint = require('stylelint');
let postcssSorting = require('postcss-sorting');
let { namespace, getContainingNode, isRuleWithNodes } = require('../../utils');
let checkNode = require('./checkNode');

let ruleName = namespace('properties-alphabetical-order');

let messages = stylelint.utils.ruleMessages(ruleName, {
	expected: (first, second) => `Expected ${first} to come before ${second}`,
});

function rule(actual, options = {}, context = {}) {
	return function ruleBody(root, result) {
		let validOptions = stylelint.utils.validateOptions(
			result,
			ruleName,
			{
				actual,
				possible: Boolean,
			},
			{
				actual: options,
				possible: {
					allowClockwise: Boolean,
					disableFix: Boolean,
				},
				optional: true,
			}
		);

		if (!validOptions) {
			return;
		}

		let allowClockwise = options.allowClockwise || false;

		let disableFix = options.disableFix || false;

		if (context.fix && !disableFix) {
			postcssSorting({ 'properties-order': 'alphabetical' })(root);

			return;
		}

		let processedParents = [];

		root.walk(function processRulesAndAtrules(input) {
			let node = getContainingNode(input);

			// Avoid warnings duplication, caused by interfering in `root.walk()` algorithm with `getContainingNode()`
			if (processedParents.includes(node)) {
				return;
			}

			processedParents.push(node);

			if (isRuleWithNodes(node)) {
				checkNode(node, result, allowClockwise, ruleName, messages);
			}
		});
	};
}

rule.ruleName = ruleName;
rule.messages = messages;

module.exports = rule;
