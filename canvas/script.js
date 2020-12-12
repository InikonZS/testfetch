class Control {
  constructor (parentNode, tagName='div', className='', content=''){
    let el = document.createElement(tagName);
    el.className = className;
    el.textContent = content;
    parentNode.appendChild(el);
    this.node = el;
  }
}

class Redux{
  constructor (reducer, initialState){
    this.state = initialState;
    this.listeners = [];  
    this.reducer = reducer;
  }

  dispatch(event){
    this.state = this.reducer(this.state, event);
    this.listeners.forEach(it=>{
     // if (it.event == event){
        it.callback(this.state);
     // }
    });
  }

  subscribe(event, callback){
    let id = {};
    this.listeners.push({
      event: event,
      callback: callback,
      id: id
    });
    return id;
  }

  getState(){
    return this.state;
  }
}

function myReducer(state, event){
  let newState = state;
  switch (event){
    case 'ev1':
      console.log('eve1', state);
      newState = {a:state.a--, ...state};
    break;

    case 'ev2':
      console.log('eve2', state);
      newState = {a:state.a++, ...state};
    break;
  }
  return newState;
}

let redx = new Redux(myReducer, {a:0, b:0});

let cn1 = new Control (document.body, 'div', '', 'btn1');
cn1.node.addEventListener('click', ()=>{
  redx.dispatch('ev1');
})
let cn2 = new Control (document.body, 'div', '', 'btn1');
cn2.node.addEventListener('click', ()=>{
  redx.dispatch('ev2');
})
let cn3 = new Control (document.body, 'div', '', 'out');
redx.subscribe('ev1', (state)=>{
  cn3.node.textContent=state.a;
});
redx.subscribe('ev2', (state)=>{
  cn3.node.textContent=state.a;
})

redx.dispatch('');

let canvas = new Control (document.body, 'canvas');
canvas.node.width=640;
canvas.node.height=480;
let ctx = canvas.node.getContext('2d');

class Rect {
  constructor (left, top, width, height){
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }
  
  isPointIn(px, py){
    return (px>this.left && py>this.top && px<(this.left+this.width) && py<(this.top+this.height));
  }
}

class CanvasControl {
  constructor (context, left, top, width, height){
    this.context = context;
    this.rect = new Rect(left, top, width, height); 
    this.color = '#000';
    this.checked = false;
    this.onHover=()=>{};
    this.onLeave=()=>{};
    this.onClick=()=>{};
  }

  handlePointer(event){
    if (event.type=='mousemove'){
      if (!this.rect.isPointIn(event.clientX, event.clientY)){
        this.onLeave();
      } else {
        this.onHover();
      }
    }
    if (event.type=='click'){
      console.log('sdsf')
      if (this.rect.isPointIn(event.clientX, event.clientY)){
        this.onClick();
      }
    }
  }

  render(deltaTime){
    this.context.fillStyle = this.color;
    if (this.checked){
      this.context.fillStyle = '#00f';
    }
    this.context.fillRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height);  
  }
}

let lastTime = 0;
function renderFrame(timeStamp){
  let deltaTime = 0;
  if (lastTime){
    deltaTime = timeStamp-lastTime;
  }
  lastTime = timeStamp;
  render(deltaTime);
  requestAnimationFrame(renderFrame);
}
requestAnimationFrame(renderFrame);

var renderList = [];

for (let i=0; i< 10; i++){
  let ob = new CanvasControl(ctx, i*42, 40, 40, 40);
  ob.onHover = () =>{
    ob.color = '#f00';
  }
  ob.onLeave = () =>{
    ob.color = '#000';
  }
  ob.onClick = ()=>{
    window.location.hash=i;
    renderList.forEach(it=>it.checked=false);
    ob.checked=true;
  }
  renderList.push(ob);
}

window.onpopstate = ()=>{
  let hs = window.location.hash.slice(1);
  renderList.forEach((it, i)=>{
      it.checked= +i == hs;
  })
}




canvas.node.addEventListener('mousemove',(ev)=>{
  renderList.forEach(it=>it.handlePointer(ev));   
});

canvas.node.addEventListener('click',(ev)=>{
  renderList.forEach(it=>it.handlePointer(ev));   
});

function render(deltaTime){
  ctx.clearRect(0,0, 1000,1000);
  renderList.forEach(it=>it.render(deltaTime));  
}

function getMapPosition(lon, lat){
  let Yc = M * Rsr * (Math.PI/2 - Bm);
  let a = Math.atan(W/(2*Yc));
}