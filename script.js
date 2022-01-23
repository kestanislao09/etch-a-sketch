const cont = document.querySelector('.container');

function makeDivs(rows) {
    for (i=1; i<=rows * rows; i++) {
        let width = 480 / rows;
        const div = document.createElement('div');
        div.classList.add('smol');
        div.id = 'box' + i;
        div.style.width = `${width}px`;
        div.style.height = `${width}px`;
        cont.appendChild(div);
    }
};


makeDivs(16);

const boxes = document.querySelectorAll('.smol');

boxes.forEach((div) => {
    div.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = 'black';
    });
});
