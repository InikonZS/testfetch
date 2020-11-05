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


/*{ "step": 6, "data": { "type": "obstacle", "data": { "value": 0 } } },
{ "step": 14, "data": { "type": "obstacle", "data": { "value": 5 } } },
{ "step": 17, "data": { "type": "coin", "data": { "value": 1 } } },
{ "step": 20, "data": { "type": "coin", "data": { "value": 2 } } },
{ "step": 25, "data": { "type": "coin", "data": { "value": 3 } } },
{ "step": 30, "data": { "type": "coin", "data": { "value": 5 } } },
{ "step": 35, "data": { "type": "coin", "data": { "value": 10 } } },
{ "step": 40, "data": { "type": "coin", "data": { "value": 25 } } },
{ "step": 45, "data": { "type": "coin", "data": { "value": 50 } } },
{ "step": 50, "data": { "type": "coin", "data": { "value": 100 } } },
{ "step": 60, "data": { "type": "chacha" , "data": { "value": 5 } } },
{ "step": 70, "data": { "type": "scroll" } },
{ "step": 80, "data": { "type": "chest", "data": { "type": 0 } } },
{ "step": 85, "data": { "type": "chest", "data": { "type": 1 } } },
{ "step": 90, "data": { "type": "chest", "data": { "type": 2 } } },
{ "step": 95, "data": { "type": "chest", "data": { "type": 3 } } },
*/

const coins = [1,1,1,1,1,1,1];
function getConfig(length, step, angle){
  let res = [];
  let cc=0;
  let height=0;
  for (let i=0; i<length/step; i++){
    let rec ={};
    rec.step = i*step;
    rec.atAlt = height;
    let rand = Math.trunc(Math.random()*8);
    //if (i<100){
      switch (rand){
        case 0: 
        rec.data = { "type": "obstacle", "data": { "value": 10 } };
        break;
        case 1: rec.data = { "type": "chacha", "data": { "value": 5 } };
        break;
        case 3: rec.data = { "type": "scroll"};
        break;
        default: rec.data = { "type": "coin", "data": { "value": coins[cc]||1 } };
          cc++;
      }
    //}
    height=height+step*0.8;//((Math.random()+1)/1.6);

    res.push(rec);
  }
  res[res.length-1].atAlt = height;
  return res;
}



/*switch (selectedIndex) {
                case 0:
                    promise = this.loadDemoConfig("/assets/demoConfigurations/democonfig.json");
                    break;
                case 1:
                    promise = this.loadDemoConfig("/assets/demoConfigurations/democonfig1.json");
                break;
                case 2:
                    promise = this.loadDemoConfig("/assets/demoConfigurations/democonfig2.json");
                    break;
                case 3:
                    promise = this.loadDemoConfig("/assets/demoConfigurations/democonfig3.json");
                    break;
                case 4:
                    promise = this.loadDemoConfig("/assets/demoConfigurations/democonfig4.json");
                    break;
                case 5:
                    promise = this.loadDemoConfig("/assets/demoConfigurations/democonfig5.json");
                    break;
            }*/