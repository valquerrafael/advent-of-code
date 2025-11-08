import fs from 'fs';

function findAreaToOrder(l: number, w: number, h: number): number {
	const area1 = l * w;
	const area2 = w * h;
	const area3 = h * l;

	const surface = 2 * area1 + 2 * area2 + 2 * area3;

	const smallestArea = area1 < area2
		? area1 < area3
			? area1
			: area3
		: area2 < area3
			? area2
			: area3;

	return surface + smallestArea;
}

async function readFile(filePath: string) {
	const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

	let totalAreaToOrder = 0;
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

			totalAreaToOrder += findAreaToOrder(l, w, h);
		}

		if (finishedFile) break;
	}

	return totalAreaToOrder;
}

(async () => {
	console.log(await readFile(`${__dirname}/input.txt`));
})();
