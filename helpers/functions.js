// setting variables
const container = document.querySelector(".slider-content");
const btnNext = document.querySelector("#nextbtn");
const btnPrev = document.querySelector("#prevbtn");

let cardWidth = document.querySelector(".slider-container ul li").offsetWidth;
let dragging = false,
	startPosition;

// function innitializing dragging event
const startdrag = (e) => {
	dragging = true;
	startPosition = e.pageX || e.touches?.[0].pageX;
	container.classList.add("dragging");
};

// function finishing dragging event
const stopdrag = () => {
	dragging = false;
	container.classList.remove("dragging");
	scroll();
};

// function scrolling to closest card edge
const scroll = () => {
	const cardWidth = document.querySelector(
		".slider-container ul li"
	).offsetWidth;
	let s = container.scrollLeft;
	if (s % cardWidth < cardWidth / 2) container.scrollLeft -= s % cardWidth;
	else container.scrollLeft += cardWidth - (s % cardWidth);
	if (container.scrollLeft > cardWidth * 11 - 5) {
		setTimeout(() => {
			container.classList.add("dragging");
			container.scrollLeft -= cardWidth * 8;
			container.classList.remove("dragging");
		}, 50);
	}
	if (container.scrollLeft < 3) {
		setTimeout(() => {
			container.classList.add("dragging");
			container.scrollLeft += cardWidth * 8;
			container.classList.remove("dragging");
		}, 50);
	}
	btnNext.disabled = false;
	btnPrev.disabled = false;
};

// scrolling cards right while dragging
const scrollR = (x) => {
	container.scrollLeft -= x;
	startPosition += x;
	const cardWidth = document.querySelector(
		".slider-container ul li"
	).offsetWidth;
	if (container.scrollLeft > cardWidth * 11 - 5) {
		container.scrollLeft -= cardWidth * 8;
	}
};

// scrolling cards left while dragging
const scrollL = (x) => {
	container.scrollLeft += x;
	startPosition -= x;
	const cardWidth = document.querySelector(
		".slider-container ul li"
	).offsetWidth;
	if (container.scrollLeft > cardWidth * 11 - 1) {
		container.scrollLeft -= cardWidth * 8;
	}
	if (container.scrollLeft < 1) {
		container.scrollLeft += cardWidth * 8;
	}
};

// dragging cards function
const drag = (e) => {
	if (!dragging) return;
	btnNext.disabled = true;
	btnPrev.disabled = true;
	startPosition - (e.pageX || e.touches?.[0].pageX) < 0
		? scrollR(Math.abs(startPosition - (e.pageX || e.touches?.[0].pageX)))
		: scrollL(Math.abs(startPosition - (e.pageX || e.touches?.[0].pageX)));
	if (container.scrollLeft > cardWidth * 11 - 1)
		container.scrollLeft -= cardWidth * 8;
	if (container.scrollLeft < 5) container.scrollLeft += cardWidth * 8;
};

// next card function
const next = () => {
	const cardWidth = document.querySelector(
		".slider-container ul li"
	).offsetWidth;
	container.scrollLeft += cardWidth;
	btnNext.disabled = true;
	setTimeout(scroll, 350);
};

// previous card function
const prev = () => {
	const cardWidth = document.querySelector(
		".slider-container ul li"
	).offsetWidth;
	container.scrollLeft -= cardWidth;
	btnPrev.disabled = true;
	setTimeout(scroll, 350);
};

// function initializing slider
const innit = () => {
	container.classList.add("dragging");
	const cardWidth = document.querySelector(
		".slider-container ul li"
	).offsetWidth;
	container.scrollLeft = 3 * cardWidth;
	container.classList.remove("dragging");
};

// add eventListiners
const addEventListeners = () => {
	container.addEventListener("mousedown", startdrag);
	document.addEventListener("mousemove", drag);
	document.addEventListener("mouseup", stopdrag);

	container.addEventListener("touchstart", startdrag);
	document.addEventListener("touchmove", drag);
	document.addEventListener("touchend", stopdrag);

	document.addEventListener("resize", scroll);
	btnNext.addEventListener("click", next);
	btnPrev.addEventListener("click", prev);
};

export { innit, addEventListeners };
