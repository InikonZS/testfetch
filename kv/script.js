class PageBox{

}

let rg = new RadioGroup(app, 'pagebox_marks', 'pagebox_mark pagebox_mark__active', 'pagebox_mark');
for (let i = 0; i <10; i++){
  rg.addButton(i);
}
rg.onSelect =  (ind)=> {console.log(ind);}