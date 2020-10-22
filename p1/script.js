class Control {
  constructor (parentNode, tagName='div', className='', content=''){
    let el = document.createElement(tagName);
    el.className = className;
    el.textContent = content;
    parentNode.appendChild(el);
    this.node = el;
  }
  
  hide(){
    this.node.style='display:none';
  }

  show(){
    this.node.style='';
  }
}

class Button extends Control{
  constructor (parentNode, caption, onClick){
    super (parentNode, 'div', '', caption);
    this.isToggled;
    this.changeState(false);

    this.node.onclick = (e) => {
      this.changeState();
      onClick(e);
    } 
  }
  changeState(st){
    if (st===undefined){
      this.isToggled = !this.isToggled;
    } else {
      this.isToggled = st;
    }
    if (this.isToggled){
      this.node.style = 'background-color:#f00';  
    } else {
      this.node.style = 'background-color:#0f0';  
    } 
    return this.isToggled; 
  }
}

class RadioGroup extends Control{
  constructor (parentNode){
    super (parentNode);
    this.buttons = [];
    this.onSelect;
  }

  addButton(caption){
    let but = new Button (this.node, caption, ()=>{
      this.select(this.buttons.findIndex(it=>but==it));
    });
    this.buttons.push(but);
  }
  
  select(index){
    this.buttons.forEach(it=>it.changeState(false));
    this.buttons[index].changeState(true);  
    this.onSelect && this.onSelect(index);
  }
}






let mainNode = document.querySelector('#app');


let rad = new RadioGroup(mainNode);
for(let i  =0; i<10; i++){
  rad.addButton('but'+i);
}
rad.onSelect = (i)=> console.log('dfsdf '+i);


new Control(mainNode, 'div','','sdfsdfdsf');


let rad1 = new RadioGroup(mainNode);
for(let i  =0; i<4; i++){
  rad1.addButton('radio'+i);
}


let canvas = new Control(mainNode, 'canvas','','');
let prevImg = new Control(mainNode, 'img','','');
let ctx = canvas.node.getContext('2d');

let lastx=0;
let lasty=0;
canvas.node.onmousemove = (e)=>{
	ctx.beginPath();
	let ex = e.clientX - canvas.node.getBoundingClientRect().left;
	let ey = e.clientY - canvas.node.getBoundingClientRect().top;
	ctx.moveTo(lastx, lasty);
	ctx.lineTo(ex, ey);
	lastx=ex;
	lasty=ey;
	ctx.stroke();
}

let dwn = new Button(document.body, 'refresh download link',()=>{
  let ur = canvas.node.toDataURL();  
  prevImg.src = ur;
  lin.node.href = prevImg.src;
});

let lin = new Control(document.body, 'a','','download');

