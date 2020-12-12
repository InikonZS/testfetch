

class PageBox extends Control{
  constructor(parentNode){
    // передать обьект со стилям css
    super(parentNode, 'div', "pagebox_wrapper");
    this.itemWrapper = new Control(this.node, 'div', 'pagebox_main');
    this.items = [];
    this.lists = [];
    this.pagination = new RadioGroup(this.node, 'pagebox_marks', 'pagebox_mark pagebox_mark__active', 'pagebox_mark');
    this.pagination.onSelect = (index)=>{
      this.items.forEach((it, i)=>it.node.style.display = (i!=index) ? 'none':'');// может цсс-класс-модификатор
    };
  }

  addItem(caption, content){
    //здесь можно подумать о том что в айтемы пишем и как
    //может передаем класс, может снаружи заполняем..
    let page = new Control(this.itemWrapper.node, 'div', 'pagebox_page', '');

    let list = new RadioGroup(page.node, 'list_wrapper', 'list_item list_item__selected', 'list_item');
    for (let i = 0; i <50; i++){
      list.addButton(Math.random()*1000);
    }

    this.items.push(page);
    this.lists.push(list);
    this.pagination.addButton(caption);
  }
  //можно селект прокинуть повыше и эвенты
}


let rg = new PageBox(app);

for (let i = 0; i <10; i++){
  rg.addItem(i, i);
}
rg.pagination.select(0);