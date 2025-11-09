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

			let hasDoublePair = false;
			let hasDoubleLetterWithSpace = false;
			const pairs = {};

			for (let i = 0; i < line.length - 1; i++) {
				if (hasDoublePair && hasDoubleLetterWithSpace) break;

				const char = line[i];
				const nextChar = line[i + 1];
				const nextNextChar = line[i + 2];

				if (!hasDoublePair) {
					const currentPair = pairs[`${char}${nextChar}`];
					if (currentPair != undefined && currentPair.secondIndex < i) {
						hasDoublePair = true;
					} else {
						pairs[`${char}${nextChar}`] = { firstIndex: i, secondIndex: i + 1 };
					}
				}

				if (!hasDoubleLetterWithSpace) {
					if (char === nextNextChar) hasDoubleLetterWithSpace = true;
				}
			}

			if (hasDoublePair && hasDoubleLetterWithSpace) niceWordsCount += 1;
		}

		if (finishedFile) break;
	}

	return niceWordsCount;
}

(async () => {
	console.log(await readFile(`${__dirname}/input.txt`));
})();
