const keyboard = {
    elements : {
        main:null,
        keyContainer:null,
        keys:[]
    },
    eventHandlers:{
        oninput:null,
        onclose:null
    },
    properties:{
        value:"",
        capsLock:false
    },

    init(){

        //creating main element 
        this.elements.main = document.createElement('div');
        this.elements.keyContainer = document.createElement('div');

        //setup main elements 
        this.elements.main.classList.add('keyboard','1keyboard--hidden');
        this.elements.keyContainer.classList.add('keyboard__keys');

        // adding to dom 
        this.elements.main.appendChild(this.elements.keyContainer);
        document.body.appendChild(this.elements.main);

    console.log(document.body);


    },
    _createKeys(){

    },
    _triggerEvent(handlerName){
        console.log("Event triggered :Event namae:",+handlerName);
    },
    _toggleCapsLock(){
        console.log("caps Lock Toggled");
    },
    open(initialValue,oninput,onclose){

    },
    close(){

    }
}

document.addEventListener('DOMContentLoaded',function(){
    keyboard.init();
})