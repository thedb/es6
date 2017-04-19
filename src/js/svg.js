let path = document.querySelector('.path');
let length = path.getTotalLength();
let l = path.pathLength;//svg2新API？

console.log(length);
console.log(l)

path.setAttribute('stroke-dasharray',length+'px');
path.setAttribute('stroke-dashoffset',length+'px');
console.log(path.getAttribute('stroke-dasharray'));
console.log(path.getAttribute('stroke-dashoffset'));
