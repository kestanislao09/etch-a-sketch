const cont = document.querySelector('.container');
const slider = document.querySelector('#slider');
const output = document.querySelector('#output');
const resetBtn = document.querySelector('.reset');
const regularBtn = document.querySelector('.regular');
const randomBtn = document.querySelector('.random');
const darkenBtn = document.querySelector('.darken');
let currentStyle = 'regular';
let boxes = document.querySelectorAll('.smol');

makeDivs(output.value);

//Some code to set up the slider
slider.addEventListener('input', (e) => output.value = e.target.value);
slider.addEventListener('mouseup', () => reset());
output.addEventListener('input', (e) => {
    slider.value = e.target.value;
    reset();
});

//Converts rgb color format to hexadecimal, thanks google.
function rgbToHex(col)
{
    if(col.charAt(0)=='r')
    {
        col=col.replace('rgb(','').replace(')','').split(',');
        var r=parseInt(col[0], 10).toString(16);
        var g=parseInt(col[1], 10).toString(16);
        var b=parseInt(col[2], 10).toString(16);
        r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
        var colHex='#'+r+g+b;
        return colHex;
    };
};

const hexArray = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
function randomColor() {
    let randomColorString = '#';
    for (let i = 0; i < 6; i++) {
        let value = hexArray[Math.floor(Math.random() * 16)];
        randomColorString += value;
    }
    return randomColorString
};

//Some code for darkening(or lightening) a color by an amount
//Some interesting bitshifting magicks going on here that I don't
//fully understand.. yet.. but it is dope af.
function darkenColor(color, amount) {
    let usePound = false;
    if (color[0] == '#') {
        color = color.slice(1);
        usePound = true;
    }

    let num = parseInt(color,16);
    
    let r = (num >> 16) + amount;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00FF) + amount;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000FF) + amount;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?'#':'') + String('000000' + (g | (b << 8) | (r << 16)).toString(16)).slice(-6);
};

function makeDivs(rows) {
    if (rows > 100) {
        return makeDivs(prompt('Please select a number between 1-100'))
    } else {
        for (i=1; i<=rows * rows; i++) {
            let width = 480 / rows;
            const div = document.createElement('div');
            div.classList.add('smol');
            div.id = 'box' + i;
            div.style.width = `${width}px`;
            div.style.height = `${width}px`;
            cont.appendChild(div);
        };
    };
};

function fillBoxes() {
    currentStyle = 'regular';
    boxes = document.querySelectorAll('.smol');
    boxes.forEach((div) => {
        div.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = 'black';
        });
    });
};

function fillDarken() {
    currentStyle = 'darken';
    boxes = document.querySelectorAll('.smol');
    boxes.forEach((div) => div.style.backgroundColor = '#FFFFFF');
    boxes.forEach((div) => {
        div.addEventListener('mouseover', (e) => {
            let currentColor = e.target.style.backgroundColor;
            currentColor = rgbToHex(currentColor);
            e.target.style.backgroundColor = `${darkenColor(currentColor, -30)}`;
        });
    });
};

function fillRandom() {
    currentStyle = 'random';
    boxes = document.querySelectorAll('.smol');
    boxes.forEach((div) => {
        div.addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = `${randomColor()}`;
        });
    });
};

function removeBoxes() {
    boxes = document.querySelectorAll('.smol');
    boxes.forEach((div) => {
        div.remove();
    });
};

function reset() {
    removeBoxes();
    makeDivs(output.value);
    switch(currentStyle) {
        case('regular'):
            fillBoxes();
            break;
        case('darken'):
            fillDarken();
            break;
        case('random'):
            fillRandom();
            break;
        default:
            console.log('Something went wrong!');
    };
};


resetBtn.addEventListener('click', () => reset());

regularBtn.addEventListener('click', () => {
    removeBoxes();
    makeDivs(output.value);
    fillBoxes();
});

darkenBtn.addEventListener('click', () => {
    removeBoxes();
    makeDivs(output.value);
    fillDarken();
});

randomBtn.addEventListener('click', () => {
    removeBoxes();
    makeDivs(output.value);
    fillRandom();
});

fillBoxes();
