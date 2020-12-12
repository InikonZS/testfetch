class Observer{
  constructor(){
    this.listeners = [];
  }

  addListener(name, callback){
    let id = {};
    this.listeners.push({id, name, callback});
    return id;
  }
  
  addOnceListener(name, callback){
    let id = {};
    this.listeners.push({id, name, callback:()=>{
      callback();
      this.removeListener(id);
    }});
    return id;
  }

  removeListener(id){
    this.listeners = this.listeners.filter(it=>it.id!=id);  
  }
  
  dispath(name){
    this.listeners.filter(it=>it.name==name).forEach(it=>it.callback());
  }

}

class Control extends Observer {
  constructor(parentNode, tagName = 'div', className = '', content = '') {
    super();
    const el = document.createElement(tagName);
    el.className = className;
    el.textContent = content;
    parentNode.appendChild(el);
    this.node = el;
  }
}

class Toggle extends Control{
  constructor (parentNode, activeClass, inactiveClass, caption, onClick){
    super (parentNode, 'div', inactiveClass, caption);
    this.activeClass = activeClass;
    this.inactiveClass = inactiveClass;
    this.onClick = onClick;
    this.isToggled;
    this.changeState(false);

    this.node.onclick = () => {
      this.changeState();
      this.onClick && this.onClick(this.isToggled);
    } 
  }

  changeState(state){
    if (state===undefined){
      this.isToggled = !this.isToggled;
    } else {
      this.isToggled = state;
    }
    this.node.className = this.isToggled ? this.activeClass : this.inactiveClass;
    this.onChange && this.onChange(this.isToggled);
    this.dispath('change');
    return this.isToggled; 
  }
}

class RadioGroup extends Control{
  constructor (parentNode, wrapperClass, activeItemClass, inactiveItemClass){
    super (parentNode, 'div', wrapperClass);
    this.activeItemClass = activeItemClass;
    this.inactiveItemClass = inactiveItemClass;
    this.buttons = [];
    this.onSelect;
  }

  addButton(caption){
    let but = new Toggle (this.node, this.activeItemClass, this.inactiveItemClass, caption, ()=>{
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