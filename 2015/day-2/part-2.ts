import fs from 'fs';

function findLengthToOrder(l: number, w: number, h: number): number {
	let length = 2 * l + 2 * w + 2 * h;

	const biggestDimension = l > w
		? l > h
			? l
			: h
		: w > h
			? w
			: h;

	const volume = l * w * h;

	return length - (2 * biggestDimension) + volume;
}

async function readFile(filePath: string) {
	const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

	let totalLengthToOrder = 0;
	let finishedFile = false;

	for await (const chunk of readStream) {
		const lines = chunk.split('\n');

		for (const line of lines) {
			if (line == '') {
				finishedFile = true;
				break;
			}

			const l = parseInt(line.split('x')[0]);
			const w = parseInt(line.split('x')[1]);
			const h = parseInt(line.split('x')[2]);

			totalLengthToOrder += findLengthToOrder(l, w, h);
		}

		if (finishedFile) break;
	}

	return totalLengthToOrder;
}

(async () => {
	console.log(await readFile(`${__dirname}/input.txt`));
})();
