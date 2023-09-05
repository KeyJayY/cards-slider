const container = document.querySelector('.slider-content');
const btnNext = document.querySelector('#nextbtn');
const btnPrev = document.querySelector('#prevbtn');

let cardWidth = document.querySelector('.slider-container ul li').offsetWidth;
let dragging = false, startPosition;

const innit = () => {
    container.classList.add('dragging')
    const cardWidth = document.querySelector('.slider-container ul li').offsetWidth;
    container.scrollLeft = 3*cardWidth;
    container.classList.remove('dragging')
}

innit();

const startdrag = (e) => {
    dragging = true;
    startPosition = (e.pageX || e.touches?.[0].pageX);
    container.classList.add('dragging')
}

const stopdrag = () => {
    dragging = false;
    container.classList.remove('dragging')
    scroll();
}

const scroll = () => {
    const cardWidth = document.querySelector('.slider-container ul li').offsetWidth;
    let s = container.scrollLeft;
    if(s%(cardWidth)<(cardWidth)/2)
        container.scrollLeft -= s%(cardWidth)
    else
        container.scrollLeft += cardWidth - s%(cardWidth)
    if(container.scrollLeft> cardWidth*11-5){
        setTimeout(() => {
        container.classList.add('dragging')
        container.scrollLeft -= cardWidth*8
        container.classList.remove('dragging')
        }, 50)
    }
    if(container.scrollLeft < 3){
        setTimeout(() => {
        container.classList.add('dragging')
        container.scrollLeft += cardWidth*8
        container.classList.remove('dragging')
        }, 50)
    }
    btnNext.disabled = false;
    btnPrev.disabled = false;
}

const scrollR = (x) => {
    container.scrollLeft -=  x;
    startPosition += x;
    const cardWidth = document.querySelector('.slider-container ul li').offsetWidth;
    if(container.scrollLeft> cardWidth*11-5){
        container.scrollLeft -= cardWidth*8
    }
}
const scrollL = (x) => {
    container.scrollLeft +=  x;
    startPosition -= x;
    const cardWidth = document.querySelector('.slider-container ul li').offsetWidth;
    if(container.scrollLeft> cardWidth*11-1){
        container.scrollLeft -= cardWidth*8
    }
    if(container.scrollLeft < 1){
        container.scrollLeft += cardWidth*8
    }
}

const drag = (e) => {
    if(!dragging) 
        return
    btnNext.disabled = true;
    btnPrev.disabled = true;
    startPosition - (e.pageX || e.touches?.[0].pageX) < 0 ? scrollR(Math.abs(startPosition - (e.pageX || e.touches?.[0].pageX))) : scrollL(Math.abs(startPosition - (e.pageX || e.touches?.[0].pageX)))
    if(container.scrollLeft> cardWidth*11-1)
        container.scrollLeft -= cardWidth*8
}

const next = () => {
    const cardWidth = document.querySelector('.slider-container ul li').offsetWidth;
    container.scrollLeft += cardWidth;
    btnNext.disabled = true;
    setTimeout(scroll, 350);
}

const prev = () => {
    const cardWidth = document.querySelector('.slider-container ul li').offsetWidth;
    container.scrollLeft -= cardWidth;
    btnPrev.disabled = true;
    setTimeout(scroll, 350);
}


container.addEventListener('mousedown', startdrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopdrag);

container.addEventListener('touchstart', startdrag);
document.addEventListener('touchmove', drag);
document.addEventListener('touchend', stopdrag);


document.addEventListener('resize', scroll)
btnNext.addEventListener('click', next)
btnPrev.addEventListener('click', prev)
