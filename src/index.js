import Control from './module.js';

let mainNode = document.querySelector('#app');

//fetch('https://jsonplaceholder.typicode.com/posts')
fetch('./assets/posts.json')
  .then(res=>res.json())
  .then(json=>{
    json.forEach((it, i)=>{
      let el = new Control (mainNode, 'div', 'item', it.title);
      el.node.addEventListener('click', ()=> {
        el.node.className = 'item_selected';
        console.log(i);
      });
    });
  });

window.app = mainNode;
/*let xhr = new XMLHttpRequest();
xhr.open('GET', './assets/posts.json', true);
xhr.onload=()=>{
  console.log(JSON.parse(xhr.response));
}
xhr.send();*/
