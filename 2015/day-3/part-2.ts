const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

function move(step: string, position: { x: number, y: number }) {
	switch (step) {
		case '^':
			position.y = position.y + 1;
			break;
		case 'v':
			position.y = position.y - 1;
			break;
		case '>':
			position.x = position.x + 1;
			break;
		case '<':
			position.x = position.x - 1;
			break;
		default:
			break;
	}

	return position;
}

function countHouses(steps: string): number {
	const santaPos = { x: 0, y: 0 };
	const robotSantaPos = { x: 0, y: 0 };
	const visitedPos = {};
	let isSantaStep = true;

	visitedPos[`${santaPos.x}-${santaPos.y}`] = 2;

	for (const step of steps) {
		let currentPos;

		if (isSantaStep) {
			currentPos = move(step, santaPos);

			const { x, y } = currentPos;
			santaPos.x = x;
			santaPos.y = y;
		} else {
			currentPos = move(step, robotSantaPos);

			const { x, y } = currentPos;
			robotSantaPos.x = x;
			robotSantaPos.y = y;
		}

		if (visitedPos[`${currentPos.x}-${currentPos.y}`]) {
			visitedPos[`${currentPos.x}-${currentPos.y}`] = visitedPos[`${currentPos.x}-${currentPos.y}`] + 1;
		} else {
			visitedPos[`${currentPos.x}-${currentPos.y}`] = 1;
		}

		isSantaStep = !isSantaStep;
	}

	return Object.keys(visitedPos).length;
}

const rl = readline.createInterface({ input, output });

rl.question('Input: ', (answer) => {
	console.log(countHouses(answer));

	rl.close();
});

