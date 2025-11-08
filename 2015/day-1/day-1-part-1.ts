const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

function countFloors(steps: string): number {
	let currentFloor = 0;

	for (const step of steps) {
		if (step === '(') currentFloor++;
		if (step === ')') currentFloor--;
	}

	return currentFloor;
}

const rl = readline.createInterface({ input, output });

rl.question('Input: ', (answer) => {
	console.log(countFloors(answer));

	rl.close();
});
