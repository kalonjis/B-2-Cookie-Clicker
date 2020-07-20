(() => {
  // Variable global au projet
  
  const btnClick = document.getElementById('click');
  const counter = document.getElementById('counter');
  const mult = document.getElementById('mult');
  const multPrice = document.getElementById('mult-price');
  const multBy = document.getElementById('mult-by');
  const autoPrice = document.getElementById('auto-price');
  const autoRate = document.getElementById('auto-rate');
  const autoClick = document.getElementById('auto-click');

  
  const varInit = { multPrice : 20, autoPrice : 100};


  const reset = document.getElementById('reset');

  if (localStorage.getItem('counter') === null) {
    init();
    
  }else {
    refresh();
  }

  btnClick.addEventListener('click', () => {
    let count = parseInt(localStorage.getItem('counter'));
    const mult = parseInt(localStorage.getItem('mult') );
    count +=  mult;
    localStorage.setItem('counter', count);
    refresh();
  });
  reset.addEventListener('click', () => {
    init();
  });
  function refresh() {
    counter.innerText = localStorage.getItem('counter');
    //section mult
    multPrice.innerText = "Price : "+ fmultPrice();
    multBy.innerText = "Mult By : "+localStorage.getItem('mult');
    //section auto
    autoPrice.innerText = "Price : "+ fautoPrice();
    autoRate.innerText = "per sec :"+ localStorage.getItem('auto-rate');


  }
  function init() {
    localStorage.setItem('counter', 0);
    localStorage.setItem('mult', 1);
    localStorage.setItem('auto-rate', 0);
    refresh();
  }

  mult.addEventListener('click', () => {
    let count = parseInt(localStorage.getItem('counter'));
    if  (count >= fmultPrice()){
      let mult = parseInt(localStorage.getItem('mult'));
      count-= fmultPrice();
      localStorage.setItem('counter',count);
      mult += 1;
      localStorage.setItem('mult', mult);
      
    }
    refresh();
  });
  autoClick.addEventListener('click', () => {
    
    let count = parseInt(localStorage.getItem('counter'));
    if  (count >= fautoPrice()){
      let auto = parseInt(localStorage.getItem('auto-rate'));
      count-= fautoPrice();
      localStorage.setItem('counter',count);
      auto += 1;
      localStorage.setItem('auto-rate', auto);    
    }
    refresh();
  });
  function fautoPrice () {
    let auto = parseInt(localStorage.getItem('auto-rate'));
    return Math.ceil(varInit.autoPrice * Math.pow(1.15, auto));
  }

  function fmultPrice () {
    let mult = parseInt(localStorage.getItem('mult'));
    return Math.ceil(varInit.multPrice * Math.pow(1.15, mult));
  }
  function timer() {
    let count = parseInt(localStorage.getItem('counter'));
    let auto = parseInt(localStorage.getItem('auto-rate'));
    count += auto;
    localStorage.setItem('counter',count);
    refresh();
  }
    setInterval(timer, 1000);
 

})();