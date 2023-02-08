const { app } = require('./scripts');

describe('app.sortAlphabetically', () => {
	//
	it('sorts the sentances in alphabetic order', () => {
		const test =
			'hello. this is a test! lets see how it goes. which one comes first? I guess ill find out. aaron is my name.';
		const expected =
			'aaron is my name,hello,I guess ill find out,lets see how it goes,this is a test,which one comes first';
		const result = app.sortAlphabetically(test);
		expect(result).toBe(expected);
	});

	it('handles special characters in sentance endings', () => {
		const test =
			'sentance ending with numbers 123. sentance ending with special characters! sentance ending with question marks? sentance. Another sentance.';
		const expected =
			'Another sentance.,sentance ending with numbers 123,sentance ending with special characters,sentance ending with question marks,sentance';
		debugger;
		const result = app.sortAlphabetically(test);
		expect(result).toBe(expected);
	});

	it('app.sentenceEndingRegex should match English sentences that end with ., !, or ?', () => {
		expect('. this is a sentence.'.match(app.sentenceEndingRegex)).toEqual([
			'.',
		]);
		expect('! this is a sentence!'.match(app.sentenceEndingRegex)).toEqual([
			'!',
		]);
		expect('? this is a sentence?'.match(app.sentenceEndingRegex)).toEqual([
			'?',
		]);
	});

	it('app.punctuationRegex should match any character that is not a number, letter, space, period, question mark, exclamation point, apostrophe or comma', () => {
		expect('a1 b!'.match(app.punctuationRegex)).toBeNull();
		expect('!@#$%^&*'.match(app.punctuationRegex)).toEqual([
			'@',
			'#',
			'$',
			'%',
			'^',
			'&',
			'*',
		]);
	});

	// it('handles sentance endings in middle of a word', () => {
	// 	const test =
	// 		'Mr. Smith is here. Ms. Doe is coming. Mrs. Brown is waiting.';
	// 	const expected =
	// 		'Mrs. Brown is waiting. Ms. Doe is coming. Mr. Smith is here.';
	// 	const result = app.sortAlphabetically(test);
	// 	expect(result).toBe(expected);
	// });
});

// doesnt handle incorrect punctuation.
// doesn't handle sentance endings in the middle of a word
