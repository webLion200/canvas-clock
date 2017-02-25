var clock = document.getElementById('clock');
var ctx = clock.getContext('2d');
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var r = width / 2;
var rem = width / 200;
// 画背景
function drawBackground() {
	ctx.save();
	ctx.translate(r, r);
	ctx.beginPath();
	ctx.lineWidth = 10 * rem;
	ctx.arc(0, 0, r - ctx.lineWidth / 2, 2 * Math.PI, false);
	ctx.stroke();

	// 画数字
	var numbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
	numbers.forEach(function (number, index) {
		var rad = 2 * Math.PI / 12 * index;
		var x = (r - 30 * rem) * Math.cos(rad);
		var y = (r - 30 * rem) * Math.sin(rad);
		ctx.font = 18 * rem + 'px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(number, x, y);
	});

	// 画点
	for (var i = 0; i < 60; i++) {
		var rad = 2 * Math.PI / 60 * i;
		var x = Math.cos(rad) * (r - 18 * rem);
		var y = Math.sin(rad) * (r - 18 * rem);
		ctx.beginPath();
		if (i % 5 !== 0) {
			ctx.fillStyle = '#ccc';
		} else {
			ctx.fillStyle = '#000';
		}
		ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
		ctx.fill();
	}
}

// 画时针
function drawHour(hour, minute) {
	var rad = 2 * Math.PI / 12 * hour;
	var mRad = 2 * Math.PI / 60 / 12 * minute;
	ctx.save();
	ctx.beginPath();
	ctx.rotate(rad + mRad);
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -(r / 2 - 20 * rem));
	ctx.lineCap = 'round';
	ctx.lineWidth = 8 * rem;
	ctx.strokeStyle = '#333';
	ctx.stroke();
	ctx.restore();
}

// 画分针
function drawMinute(minute) {
	var rad = 2 * Math.PI / 60 * minute;
	ctx.save();
	ctx.beginPath();
	ctx.rotate(rad);
	ctx.moveTo(0, 10 * rem);
	ctx.lineTo(0, -(r / 2 - 5 * rem));
	ctx.lineCap = 'round';
	ctx.lineWidth = 5 * rem;
	ctx.stroke();
	ctx.restore();
}

// 画秒针
function drawSecond(second) {
	var rad = 2 * Math.PI / 60 * second;
	ctx.save();
	ctx.beginPath();
	ctx.rotate(rad);
	ctx.moveTo(-2 * rem, 10 * rem);
	ctx.lineTo(2 * rem, 10 * rem);
	ctx.lineTo(0, -(r / 2 + 20 * rem));
	ctx.fillStyle = '#f90';
	ctx.fill();
	ctx.restore();
}

// 画点
function drawDot() {
	ctx.beginPath();
	ctx.arc(0, 0, 2, 0, 2 * Math.PI, false);
	ctx.fillStyle = '#ccc';
	ctx.fill();
}

function run() {
	var now = new Date();
	var hour = now.getHours();
	var minute = now.getMinutes();
	var second = now.getSeconds();
	ctx.clearRect(0, 0, width, height);
	drawBackground();
	drawHour(hour, minute);
	drawMinute(minute);
	drawSecond(second);
	drawDot();
	ctx.restore();
}

run();
setInterval(run, 1000);