// change names
// set randomization with seed

let palette = [
	[[38, 70, 83], [233, 196, 106], [231, 111, 81]],
	[[42, 157, 143], [233, 196, 106], [244, 162, 97]],
	[[230, 57, 70], [168, 218, 220], [29, 53, 87]],
	[[241, 250, 238], [168, 218, 220], [69, 123, 157]],
	[[142, 202, 230], [2, 48, 71], [251, 133, 0]],
	[[33, 158, 188], [2, 48, 71], [255, 183, 3]],
	[[0, 0, 0], [252, 163, 17], [255, 255, 255]],
	[[20, 33, 61], [252, 163, 17], [229, 229, 229]],
	[[244, 241, 222], [61, 64, 91], [242, 204, 143]],
	[[224, 122, 95], [61, 64, 91], [129, 178, 154]],
	[[255, 205, 178], [229, 152, 155], [109, 104, 117]],
	[[255, 180, 162], [229, 152, 155], [181, 131, 141]],
	[[0, 109, 119], [237, 246, 249], [226, 149, 120]],
	[[131, 197, 190], [237, 246, 249], [255, 221, 210]],
	[[51, 92, 103], [224, 159, 62], [84, 11, 14]],
	[[255, 243, 176], [224, 159, 62], [158, 42, 43]],
	[[142, 154, 175], [239, 211, 215], [222, 226, 255]],
	[[203, 192, 211], [239, 211, 215], [254, 234, 250]],
	[[0, 48, 73], [247, 127, 0], [234, 226, 183]],
	[[214, 40, 40], [247, 127, 0], [252, 191, 73]],
	[[0, 129, 167], [253, 252, 220], [240, 113, 103]],
	[[0, 175, 185], [253, 252, 220], [254, 217, 183]],
	[[246, 189, 96], [245, 202, 195], [242, 132, 130]],
	[[247, 237, 226], [245, 202, 195], [132, 165, 157]],
	[[255, 159, 28], [255, 255, 255], [46, 196, 182]],
	[[255, 191, 105], [255, 255, 255], [203, 243, 240]],
	[[43, 45, 66], [237, 242, 244], [217, 4, 41]],
	[[141, 153, 174], [237, 242, 244], [239, 35, 60]],
	[[95, 15, 64], [251, 139, 36], [15, 76, 92]],
	[[154, 3, 30], [251, 139, 36], [227, 100, 20]],
	[[53, 80, 112], [181, 101, 118], [234, 172, 139]],
	[[109, 89, 122], [181, 101, 118], [229, 107, 111]]
];

let colVert, colHori;
let probFactor = 0.75;
let margin;
let rects = [];
var seed = 0;

function setup() {
	createCanvas(528, 528);
	noStroke();
}

function draw() {
	clear();
	Math.seedrandom(seed);
	let colors = random(palette);
	shuffle(colors, true);
	fill(colors[0]);
	rect(0, 0, width, height);
	colVert = colors[1];
	colHori = colors[2];
	margin = width/(32 + 1);
	divide(width-margin, margin, margin, 32, 1);
	divide(width-margin, margin, margin, 16, 1);
	if (random() < 0.5) shuffle(rects, true);
	drawRects();
	noLoop();
}

function mousePressed() {
	seed++;
	rects = [];
	loop();
}

function divide(size, x, y, n, probDivide) {
	if ((random() < probDivide) && (n > 8)) {
		let newProbDivide = probDivide*probFactor;
		if ((n > 4) && (random() < 0.5)) {
			divide(size/2, x+size/4, y+size/4, n/2, newProbDivide);
			divide(size/4, x, y, n/4, newProbDivide*probFactor);
			divide(size/4, x+size/4, y, n/4, newProbDivide*probFactor);
			divide(size/4, x+2*size/4, y, n/4, newProbDivide*probFactor);
			divide(size/4, x+3*size/4, y, n/4, newProbDivide*probFactor);
			divide(size/4, x, y+size/4, n/4, newProbDivide*probFactor);
			divide(size/4, x+3*size/4, y+size/4, n/4, newProbDivide*probFactor);
			divide(size/4, x, y+2*size/4, n/4, newProbDivide*probFactor);
			divide(size/4, x+3*size/4, y+2*size/4, n/4, newProbDivide*probFactor);
			divide(size/4, x, y+3*size/4, n/4, newProbDivide*probFactor);
			divide(size/4, x+size/4, y+3*size/4, n/4, newProbDivide*probFactor);
			divide(size/4, x+2*size/4, y+3*size/4, n/4, newProbDivide*probFactor);
			divide(size/4, x+3*size/4, y+3*size/4, n/4, newProbDivide*probFactor);
		} else {
			divide(size/2, x, y, n/2, newProbDivide);
			divide(size/2, x+size/2, y, n/2, newProbDivide);
			divide(size/2, x, y+size/2, n/2, newProbDivide);
			divide(size/2, x+size/2, y+size/2, n/2, newProbDivide);
		}
	} else {
		makeSquare(n, x, y);
	}
}

function makeSquare(n, x0, y0) {
	let d = margin * (n - 1);
	let vertical = (random() < 0.5);
	for (let i = 0; i < n; i += 2) {
		if (!vertical) {
			rects.push({
				x: x0,
				y: y0+i*margin,
				w: d,
				h: margin,
				col: colHori
			});
		} else {
			rects.push({
				x: x0+i*margin,
				y: y0,
				w: margin,
				h: d,
				col: colVert
			});
		}
	}
}

function drawRects() {
	for (let r of rects) {
		fill(r.col);
		rect(r.x, r.y, r.w, r.h);
	}
}
