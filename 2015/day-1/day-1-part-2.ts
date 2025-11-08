const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

function countFloors(steps: string): number | undefined {
	let currentFloor = 0;

	for (let i = 0; i < steps.length; i++) {
		const step = steps[i];

		if (step === '(') currentFloor++;
		if (step === ')') currentFloor--;

		if (currentFloor === -1) return i + 1;
	}
}

const rl = readline.createInterface({ input, output });

rl.question('Input: ', (answer) => {
	console.log(countFloors(answer));

	rl.close();
});

