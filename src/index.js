import './stylus/test.styl'
// import './stylus/style.css'
// import printMe from './print'
import { cube } from './math'
console.log(echarts)
console.log(222)
console.log(333)
// console.log(4)

function component() {
  var element = document.createElement('pre');
  var btn = document.createElement('button');
  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
  ]
  element.classList.add('hello')

  return element;
}

document.body.appendChild(component());

const Leioy = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve(1)
  },1000)
})
setTimeout(() => {
  Leioy.then(res => console.log(res))
},2000)
const arr = [1,2,3]
console.log(arr.includes(1))