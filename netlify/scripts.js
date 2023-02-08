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
	init: () => {
		// Add Event listener to button
		document.querySelector('button').addEventListener('click', (e) => {
			const userInput = document.querySelector('input').value;
			app.sortAlphabetically(userInput);
		});
	},
};

// This regex pattern is used to match English sentences that end with !, . , or ?.
app.sentenceEndingRegex = /[.?!]+\s+/;

// This regex pattern is used to match any that is NOT a number, letter, space, period, question mark, exclamation point, apostrophe or comma.
app.punctuationRegex = /[^0-9a-zA-Z\s.?!\']/g;

//
app.sortAlphabetically = (userInputText) => {
	// store in an array
	const textToBeSorted = [userInputText];

	// remove punctuation like double quotes, brackets, hyphens (see `punctuationRegex` above)
	const textWithoutPunctuation = textToBeSorted[0].replace(
		app.punctuationRegex,
		' '
	);

	// Split the text into sentances ending with . ? ! (see `sentenceEndingRegex` above)
	const splitText = textWithoutPunctuation.split(app.sentenceEndingRegex);

	// If  the corresponding letters are compared and sentanceA comes before sentance B, sentenceA comes first. Compares all letters in the first word only.
	const sortedText = splitText.sort((sentenceA, sentenceB) => {
		if (sentenceA.toLowerCase() < sentenceB.toLowerCase()) return -1;
		if (sentenceA.toLowerCase() > sentenceB.toLowerCase()) return +1;
		return 0;
	});

	// Append sentences to the page
	document.querySelector('.sortedText').innerHTML = '';
	sortedText.forEach((sentence) => {
		sentence = `<p>${sentence}</p>`;
		document
			.querySelector('.sortedText')
			.insertAdjacentHTML('beforeend', sentence);
	});

	console.table(sortedText);
	return sortedText;
};

// Initialize our app
app.init();

// module.exports = app;
