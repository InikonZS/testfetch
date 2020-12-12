import Control from './module.js';

let mainNode = document.querySelector('#app');

//fetch('https://jsonplaceholder.typicode.com/posts')
/*fetch('./assets/posts.json')
  .then(res=>res.json())
  .then(json=>{
    json.forEach((it, i)=>{
      let el = new Control (mainNode, 'div', 'item', it.title);
      el.node.addEventListener('click', ()=> {
        el.node.className = 'item_selected';
        console.log(i);
      });
    });
  });*/

window.app = mainNode;


function loadJson(url, onLoad, onError){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload=()=>{
    let json = JSON.parse(xhr.response);
    onLoad(json);
  }
  xhr.onerror=()=>{
    onError(xhr.response);
  }
  xhr.send();
}

loadJson('./assets/posts.json', (json)=>{
  json.forEach((it, i)=>{
    let el = new Control (mainNode, 'div', 'item', it.title);
    el.node.addEventListener('click', ()=> {
      el.node.className = 'item_selected';
      console.log(i);
    });
  });  
},
  (err)=>{
    console.log(err);  
  }
);
