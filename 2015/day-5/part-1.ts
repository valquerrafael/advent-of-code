import fs from 'fs';

async function readFile(filePath: string) {
	const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

	let niceWordsCount = 0;
	let finishedFile = false;

	for await (const chunk of readStream) {
		const lines = chunk.split('\n');

		for (const line of lines) {
			if (line == '') {
				finishedFile = true;
				break;
			}

			const naughtyPairs = {
				'a': 'b',
				'c': 'd',
				'p': 'q',
				'x': 'y',
			}
			let hasNaughtyPair = false;

			let doubleLetter = false;

			const vowels = 'aeiou';
			let vowelsCount = 0;

			for (let i = 0; i < line.length - 1; i++) {
				const char = line[i];
				const nextChar = line[i + 1];

				if (nextChar === naughtyPairs[char]) hasNaughtyPair = true;

				if (char === nextChar) doubleLetter = true;

				if (i === 0 && vowels.includes(char)) vowelsCount += 1;
				if (vowels.includes(nextChar)) vowelsCount += 1;
			}

			if (!hasNaughtyPair && vowelsCount >= 3 && doubleLetter) niceWordsCount += 1;
		}

		if (finishedFile) break;
	}

	return niceWordsCount;
}

(async () => {
	console.log(await readFile(`${__dirname}/input.txt`));
})();
