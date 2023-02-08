/* Pseudocode sortAlphabetically
      store user input value inside an array called `userInputText`
      make copy of array called `textToBeSorted`
      split `textToBeSorted` using regex pattern that handles all sentence endings and punctuation
      for each sentence in `textToBeSorted` check if charcter at index 0 of sentenceA is greater than or less than sentenceB
         if sentenceA[0].toLowercase < sentenceB[0].toLowercase
            return -1
         if sentenceA[0].toLowercase > sentenceB[0].toLowercase
            return +1
         if sentenceA === sentenceB
            return 0
      return `textToBeSorted`
      */

/* Tests
   sort the sentances in alphabetic order
   regex pattern should handle different cases for sentence endings and punctuation
*/

/** ** ** */

// Namespace
const app = {
	init: function () {
		// add event listener for sort button
		document.querySelector('button').addEventListener('click', (e) => {
			const userInput = document.querySelector('input').value;
			app.sortAlphabetically(userInput);
		});
		// add event listener for copyToClipboard
		document
			.querySelector('.sortedText')
			.addEventListener('click', () => app.copyToClipboard());
	},

	printToPage: function (text) {
		// if the value in the input is empty don't run
		if (!document.querySelector('input').value) return;

		document.querySelector('.sortedText').innerHTML = '';
		text.forEach((sentence) => {
			sentence = `<p>${sentence}</p>`;
			document
				.querySelector('.sortedText')
				.insertAdjacentHTML('beforeend', sentence);
		});
	},

	copyToClipboard: async function () {
		let text = document.querySelector('.sortedText').textContent;
		try {
			await navigator.clipboard.writeText(text);
			alert('Content copied to clipboard!');
		} catch (err) {
			alert('Failed to copy: ', err);
		}
	},

	// This regex pattern is used to match English sentences that end with !, . , or ?.
	punctuationRegex: /[^0-9a-zA-Z\s.?!\']/g,

	// This regex pattern is used to match any that is NOT a number, letter, space, period, question mark, exclamation point, apostrophe or comma.
	sentenceEndingRegex: /[.?!]+\s+/,

	sortAlphabetically: function (userInputText) {
		// if the value in userInputText is empty don't run
		if (!document.querySelector('input').value) return;

		// store in an array
		let textToBeSorted = [userInputText];

		// remove punctuation like double quotes, brackets, hyphens (see `punctuationRegex` above)
		const textWithoutPunctuation = textToBeSorted[0].replace(
			app.punctuationRegex,
			''
		);

		// Split the text into sentances ending with . ? ! (see `sentenceEndingRegex` above)
		const splitText = textWithoutPunctuation.split(app.sentenceEndingRegex);

		// If  the corresponding letters are compared and sentanceA comes before sentance B, sentenceA gets lower index and placed first. Compares all letters in the first word only.
		const sortedText = splitText.sort((sentenceA, sentenceB) => {
			if (sentenceA.toLowerCase() < sentenceB.toLowerCase()) return -1;
			if (sentenceA.toLowerCase() > sentenceB.toLowerCase()) return +1;
			return 0;
		});

		// Append sentences to the page
		app.printToPage(sortedText);

		console.table(sortedText);
		return sortedText;
	},
};

// Initialize our app
app.init();

// module.exports = app;
