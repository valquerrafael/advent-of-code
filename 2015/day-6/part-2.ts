import fs from 'fs';

class Light {
	brightness: number = 0;

	public turnOn() {
		this.brightness += 1;
	}

	public turnOff() {
		if (this.brightness <= 1) this.brightness = 0;
		else this.brightness -= 1;
	}

	public toggle() {
		this.brightness += 2;
	}
}

async function readFile(filePath: string) {
	const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

	let finishedFile = false;

	const grid: Light[][] = Array.from({ length: 1000 }, () => (Array.from({ length: 1000 }, () => ((new Light())))));
	let totalBrightness = 0;

	for await (const chunk of readStream) {
		const lines = chunk.split('\n');

		for (const line of lines) {
			if (line == '') {
				finishedFile = true;
				break;
			}

			const command = line.substring(0, line.search(/\d/)).trim();
			const lightsCorners = line.substring(line.search(/\d/), line.length).split(' through '); // ['XYZ,XYZ', 'XYZ,XYZ']
			const lightsXAxis = [lightsCorners[0].split(',')[0].trim(), lightsCorners[1].split(',')[0].trim()]; // ['XYZ', 'XYZ']
			const lightsYAxis = [lightsCorners[0].split(',')[1].trim(), lightsCorners[1].split(',')[1].trim()];

			for (let x = parseInt(lightsXAxis[0]); x <= parseInt(lightsXAxis[1]); x++) {
				for (let y = parseInt(lightsYAxis[0]); y <= parseInt(lightsYAxis[1]); y++) {
					const currentLight = grid[x][y];

					if (command === 'turn on') currentLight.turnOn();
					if (command === 'turn off') currentLight.turnOff();
					if (command === 'toggle') currentLight.toggle();
				}
			}
		}

		if (finishedFile) break;
	}

	for (const row of grid) {
		for (const light of row) {
			totalBrightness += light.brightness;
		}
	}

	return totalBrightness;
}

(async () => {
	console.log(await readFile(`${__dirname}/input.txt`));
})();

