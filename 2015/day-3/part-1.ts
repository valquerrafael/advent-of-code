const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

function countHouses(steps: string): number {
	const currentPos = { x: 0, y: 0 };
	const visitedPos = {};

	visitedPos[`${currentPos.x}-${currentPos.y}`] = 1;

	for (const step of steps) {
		switch (step) {
			case '^':
				currentPos.y = currentPos.y + 1;
				break;
			case 'v':
				currentPos.y = currentPos.y - 1;
				break;
			case '>':
				currentPos.x = currentPos.x + 1;
				break;
			case '<':
				currentPos.x = currentPos.x - 1;
				break;
			default:
				break;
		}

		if (visitedPos[`${currentPos.x}-${currentPos.y}`]) {
			visitedPos[`${currentPos.x}-${currentPos.y}`] = visitedPos[`${currentPos.x}-${currentPos.y}`] + 1;
		} else {
			visitedPos[`${currentPos.x}-${currentPos.y}`] = 1;
		}
	}

	return Object.keys(visitedPos).length;
}

const rl = readline.createInterface({ input, output });

rl.question('Input: ', (answer) => {
	console.log(countHouses(answer));

	rl.close();
});
