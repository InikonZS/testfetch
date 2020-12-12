const mainNode = document.querySelector('#app');

let colors = ['#ccf', '#fcf', '#fcc'];

function blink(color, onEnd){
	document.body.style.backgroundColor=color;
	setTimeout(()=>{
		document.body.style.backgroundColor="#000";
			onEnd && onEnd();		
	},1000);
}

function blinks(colors, onEndAll){
	if (!colors.length){
		onEndAll();
		return;
	}
	let stack = colors.concat([]);
	blink(stack.pop(), ()=>{
		blinks(stack, onEndAll)
	});
}


const ly = [
  0.0000,
  0.0620,
  0.1240,
  0.1860,
  0.2480,
  0.3100,
  0.3720,
  0.4340,
  0.4958,
  0.5571,
  0.6176,
  0.6769,
  0.7346,
  0.7903,
  0.8435,
  0.8936,
  0.9394,
  0.9761,
  1.0000
];

const lx = [
  1.0000,
  0.9986,
  0.9954,
  0.9900,
  0.9822,
  0.9730,
  0.9600,
  0.9427,
  0.9216,
  0.8962,
  0.8679,
  0.8350,
  0.7986,
  0.7597,
  0.7186,
  0.6732,
  0.6213,
  0.5722,
  0.5322
]

function lerp (a, b, p){
  return (b-a)*p +a;
}

function getMapPosition(lon, lat){
  let step = 5;
  let scalerIndex = Math.trunc(Math.abs(lat) / step);
  let sectorAmount = Math.abs((lat % step) / step);

  let normalX = lerp(
    lx[scalerIndex], 
    lx[scalerIndex +1], 
    sectorAmount
  ) * lon/360;

  let normalY = lerp(
    ly[scalerIndex]*Math.sign(lat), 
    ly[scalerIndex+1]*Math.sign(lat), 
    sectorAmount
  ) / 2;

  return {x:(normalX + 0.5), y:(normalY + 0.5)}
}

function cycle(a,am){
  return a>=0?a%am:am-(1+ -(a+1)%am)
}

function setPoint(lat, lon, canvasContext){
  let ctx  = canvasContext;
  let {x, y} = getMapPosition(cycle(lon - 10+180, 360)-180, -lat);

  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.arc(x * ctx.canvas.width, y * ctx.canvas.height, 2, 0, Math.PI*2);
  ctx.stroke();  

  let val = Math.random() * Math.PI*2;
  ctx.strokeStyle = '#f0f';
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.arc(x * ctx.canvas.width, y * ctx.canvas.height, 15, 0, val);
  ctx.stroke(); 

  ctx.strokeStyle = '#0ff';
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.arc(x * ctx.canvas.width, y * ctx.canvas.height, 15, val, Math.PI*2);
  ctx.stroke(); 
}

let img = document.getElementById('img');
let lay = new Control(document.getElementById('overlay'), 'canvas');
img.onload = ()=>{
  
  lay.node.width = img.width;
  lay.node.height = img.height;
  let ctx = lay.node.getContext('2d');
ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
  ctx.strokeStyle = '#f00';
  ctx.lineWidth = 3;

  //33 18

 /* let count = 140;
  for (let i = 0; i<count+1; i++){
    for (let j = 0; j<count+1; j++){
      //console.log(i,j);{x:i/count * ctx.canvas.width, y:j/count * ctx.canvas.height} 
      let {x, y} = getMapPosition(i*360/count - 180, 1*(j*180/count - 90), ctx);
      //console.log(x, y)
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI*2);
      ctx.stroke();
    }  
  }*/

  setPoint(-34.6227489,19.5870559, ctx);
  setPoint(51.5294699, 0, ctx);
  setPoint(41.2936248,140.2848691, ctx);
  setPoint(60.0139718,-141.3453621, ctx);
  setPoint(66.0053604,-170.7760189, ctx);
  setPoint(65.4366704,-166.3327288, ctx);
  
  setPoint(53.8845581,27.4529433, ctx);
  setPoint(-65.8337242,53.8272287, ctx);
  
}

window.onresize = img.onload;
