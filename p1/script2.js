class Control {
  constructor (parentNode, tagName='div', className='', content=''){
    let el = document.createElement(tagName);
    el.className = className;
    el.textContent = content;
    parentNode.appendChild(el);
    this.node = el;
  }
}

function swapPositions(a, b){
  let c = {x:a.x, y:a.y, v:a.v}
  a.x=b.x;
  a.y=b.y;
  a.v=b.v;
  b.x=c.x;
  b.y=c.y;
  b.v=c.v;
}

function isPossible(pos, size){
  return !(pos.x<0||pos.y<0||pos.y>=size||pos.x>=size);
}

function cycle(a,am){
  return a>=0?a%am:am-(1+ -(a+1)%am)
}

function moveBlock(blockPosition, emptyPosition){
  if (((Math.abs(blockPosition.x-emptyPosition.x)==1)&&(Math.abs(blockPosition.y-emptyPosition.y)==0))||
  ((Math.abs(blockPosition.x-emptyPosition.x)==0)&&(Math.abs(blockPosition.y-emptyPosition.y)==1))){
    swapPositions(blockPosition, emptyPosition);
    return true;
  }
  return false;
}



class Field {
  constructor(size){
    this.moves = [{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}];
    this.size=size;
    this.blocks = [];
    this.history = [];
    this.historyMoves = [];
    for (let i = 0; i<this.size; i++){
      for (let j = 0; j<this.size; j++){
        this.blocks.push({x:j, y:i, v: i*this.size+j});
      }  
    }
    this.empty = this.blocks.pop();
  }

  step(direction){
    let moves = this.moves; 
    let found = this.blocks.find(it=>{
      return (it.x==this.empty.x+moves[direction].x && it.y==this.empty.y+moves[direction].y);
    });
    if (found){
      this.history.push(JSON.stringify(this.blocks));
      this.historyMoves.push((direction+2)%4);
      swapPositions(found, this.empty);
    }
  }

  randomize(count=100){
    let lastReverse;
    for (let i=0; i<count; i++){
      let rand= Math.trunc(Math.random()*4);
      if (lastReverse===rand){
        rand = cycle(rand+Math.random()<0.5?1:-1, 4);
      }
      lastReverse = (rand+2)%4;
      field.step(rand);
    }
  }
}

class FieldView extends Control{
  constructor (parentNode, size) {
    super(parentNode);
    this.size = size;
    this.blocks = [];
  }

  refresh(field, size){
    this.size = size;
    this.node.innerHTML='';
    this.blocks = [];
    field.forEach((it, i)=>{
      if (i%this.size==0){
        new Control(this.node, 'br');
      }
      let block = new Control (this.node, 'div', '', it.v);
      block.node.style='display:inline-block; width:30px;';
      
      this.blocks.push(block);
    });
  }
}

let field = new Field(4);

let vField = new FieldView(document.body, 4);

function getReverseSequence(sequence){
  let res = [];
  let seq = [...sequence];
  while (seq.length){
    last = seq.pop();
    let ind = seq.indexOf(last);
    if (ind!=-1){
      while ((seq.length)!=ind){
        seq.pop();
      } 
    }
    res.push(last);
  }
  return res;
}


let canvas = new Control(document.body, 'canvas');
let ctx = canvas.node.getContext('2d');

let matrix1 = [
'0000000000000000',
'0000000000000000',
'0000000000000000',
'0000000000000000',
'0000000000000000',
'0000000000000000',
'0000000000000000',
'0000000000000000',
'0000000000000000',
'0000000000000000',
'0000000000000000',
];

let matrix2 = [
  '0000000000000000',
  '0000000001000000',
  '0000001001000000',
  '0000001001000000',
  '0000001001000000',
  '0000001001000000',
  '0000001001000000',
  '0000001000000000',
  '0000001000000000',
  '0000000000000000',
  '0000000000000000',
];

let matrix3 = [
  '0000000000000000',
  '0000000000000000',
  '0000000111000000',
  '0001111101110000',
  '0001000000010000',
  '0001100000010000',
  '0000100000010000',
  '0000100000010000',
  '0000111111110000',
  '0000000000000000',
  '0000000000000000',
];
const sz = 10;
function drawMatrix(ctx, matrix){
  ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
  matrix.forEach((it, i)=>{
    it.split('').forEach((jt, j)=>{
      if (jt==='0'){
        ctx.fillStyle="#f99";
      } else {
        ctx.fillStyle="#99f";  
      }
      ctx.fillRect(i*sz, j*sz, sz-1, sz-1);
    });
  });
}

/*function waveStep(waveFront, dest, matrix){
  if (point.x==dest.x && point.y==dest.y){
    return point.gen;
  }
  let moves=[{x:1, y:0, price:1}, {x:0, y:1, price:1}, {x:-1, y:0, price:1},{x:0, y:-1, price:1}];
  let st = false;
  waveFront.forEach(point=>{

  
  for (let i=0; i<moves.length; i++){
    //console.log(point.gen);
    //
      if (matrix[point.y+moves[i].y]&& matrix[point.y+moves[i].y][point.x+moves[i].x] && matrix[point.y+moves[i].y][point.x+moves[i].x]>point.gen){
        //let gen = matrix[point.y+moves[i].y][point.x+moves[i].y];
        matrix[point.y+moves[i].y][point.x+moves[i].x]=point.gen;
        ctx.fillStyle="#ff9";
        ctx.fillRect(point.y*sz, point.x*sz, sz-1, sz-1);
        console.log(moves[i])
        
        let mst = waveStep({y:point.y+moves[i].y, x:point.x+moves[i].x, price:point.price+moves[i].price, gen:point.gen+1}, dest, matrix);
        st = mst||st;
        if (mst){return mst}
      } else {
        //return false;
      }
    }  
  });
  return false;
}
*/

stm = (hist)=>{
  if (hist.length){
      console.log(hist.pop());
      setTimeout(()=>{stm(hist)}, 1000)
}
}
//stm('123456789'.split(''));

function waveStepSlow(waveFront, dest, matrix, gen){
  let moves=[{x:1, y:0, price:1}, {x:0, y:1, price:1}, {x:-1, y:0, price:1},{x:0, y:-1, price:1}];
  let newFront =[];
  console.log(gen)
  for (i=0; i<waveFront.length; i++){
    ctx.fillStyle="#9f9";
    ctx.fillRect(waveFront[i].y*sz, waveFront[i].x*sz, sz-1, sz-1);
    for (j=0; j<moves.length; j++){
      let point = {x:waveFront[i].x+moves[j].x, y:waveFront[i].y+moves[j].y};
      if (point.x==dest.x && point.y==dest.y){
        return gen;
      }
      if (matrix[point.y]&& matrix[point.y][point.x] && matrix[point.y][point.x]>gen){
        matrix[point.y][point.x]=gen;
        newFront.push(point);
        ctx.fillStyle="#ff9";
        ctx.fillRect(point.y*sz, point.x*sz, sz-1, sz-1);
      }
    }
  };
  if (newFront.length){
    return setTimeout(()=>waveStepSlow(newFront, dest, matrix, gen+1), 1000);
  } else {
    return false;
  }
}


function waveStep(waveFront, dest, matrix, gen){
  let moves=[{x:1, y:0, price:1}, {x:0, y:1, price:1}, {x:-1, y:0, price:1},{x:0, y:-1, price:1}, 
    {x:1, y:1, price:1}, {x:-1, y:1, price:1}, {x:-1, y:-1, price:1},{x:1, y:-1, price:1}];
  let newFront =[];
  console.log(gen)
  for (i=0; i<waveFront.length; i++){
    ctx.fillStyle="#9f9";
    ctx.fillRect(waveFront[i].y*sz, waveFront[i].x*sz, sz-1, sz-1);
    for (j=0; j<moves.length; j++){
      let point = {x:waveFront[i].x+moves[j].x, y:waveFront[i].y+moves[j].y};
      if (point.x==dest.x && point.y==dest.y){
        return gen;
      }
      if (matrix[point.y]&& matrix[point.y][point.x] && matrix[point.y][point.x]>gen){
        matrix[point.y][point.x]=gen;
        newFront.push(point);
        ctx.fillStyle="#ff9";
        ctx.fillRect(point.y*sz, point.x*sz, sz-1, sz-1);
      }
    }
  };
  if (newFront.length){
    return waveStep(newFront, dest, matrix, gen+1);
  } else {
    return false;
  }
}


function getTrace(end, matrix){
  //let moves=[{x:1, y:0, price:1}, {x:0, y:1, price:1}, {x:-1, y:0, price:1},{x:0, y:-1, price:1}];
  let moves=[
    {x:1, y:0, price:1}, 
    {x:0, y:1, price:1}, 
    {x:-1, y:0, price:1},
    {x:0, y:-1, price:1}, 
    {x:1, y:1, price:1}, {x:-1, y:1, price:1}, {x:-1, y:-1, price:1},{x:1, y:-1, price:1}];
  let gen = matrix[end.y][end.x];
  let trace = [];
  let mingen = gen;
  let end_ = {x:end.x, y:end.y}
  for(i=0; i<gen; i++){
    for (j=0; j<moves.length; j++){
      let point = {x:end_.x+moves[j].x, y:end_.y+moves[j].y};
      if (mingen>matrix[point.y][point.x] && matrix[point.y][point.x]>0){
        ctx.fillStyle="#f0f";
        ctx.fillRect(point.y*sz, point.x*sz, sz-1, sz-1);
        mingen = matrix[point.y][point.x]
        trace.push(point);
        end_ = point;
        break;
      }
    }  
  }
  return trace;
}

let mtx = matrix3.map(it=>{
  return it.split('').map(jt=>jt==='0'?99999:'-1');
})
console.log(mtx);



drawMatrix(ctx, matrix3);
let dest = {x:12,y:6};
/*let gen = waveStep([{x:1,y:1,gen:0}], dest, mtx, 0);
console.log(gen);
if (gen){
  getTrace(dest, mtx);
};*/

ctx.fillStyle="#f00";
ctx.fillRect(dest.y*sz, dest.x*sz, sz-1, sz-1);


let pixList = [];
for (let i=0; i<10; i++){
  let pix = new Control (document.body, 'div', 'pix');
  pix.flag = false;
  pixList.push(pix);
}

pixList.forEach((it, i, ls)=>{
  
 /* if (ls[i+1]){
    it.node.ontransitionend=()=>{
      ls[i+1].flag=!ls[i+1].flag;
      if (ls[i+1].flag){
        ls[i+1].node.style.transform = 'translate(50px, 0px)';
      } else {
        ls[i+1].node.style.transform = 'translate(0px, 0px)';  
      }
    }
  }*/
 let next = ls[i+1] || ls [0];
 if (next){
    it.node.ontransitionend=()=>{
      next.flag=!next.flag;
      if (next.flag){
        next.node.style.transform = 'translate(50px, 0px)';
      } else {
        next.node.style.transform = 'translate(0px, 0px)';  
      }
    }
  }
});

function beginAni(ls){
  ls.flag=!ls.flag;
  if (ls.flag){
    ls.node.style.transform = 'translate(50px, 0px)';
  } else {
    ls.node.style.transform = 'translate(0px, 0px)';  
  }
}