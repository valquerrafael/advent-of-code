const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const crypto = require('crypto');

function generateMd5Hash(input: string): string {
	return crypto.createHash('md5').update(input).digest('hex');
}

const rl = readline.createInterface({ input, output });
let positiveNumber = 1;
let shouldContinue = true;

rl.question('Input: ', (input: string) => {
	while (shouldContinue) {
		const md5Hash = generateMd5Hash(`${input}${positiveNumber}`);

		if (md5Hash.startsWith('000000')) {
			shouldContinue = false;
			break;
		} else {
			positiveNumber += 1;
		}
	}

	console.log(positiveNumber);

	rl.close();
});
