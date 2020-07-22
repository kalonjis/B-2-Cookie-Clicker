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
  const bonusPrice = document.getElementById('bonus-price');
  const bonusTimer = document.getElementById('bonus-timer');
  const bonus = document.getElementById('bonus');

  
  const varInit = { multPrice : 20, autoPrice : 100, bonusPrice: 1}; 
  let bonusTime = null;

  const reset = document.getElementById('reset');

  if (window.localStorage.getItem('counter') === null) {
    init();
    
  }else {
    refresh();
  }

  btnClick.addEventListener('click', () => {
    const mult = parseInt(window.localStorage.getItem('mult') )+1;
   addCounter(mult);
  });
  reset.addEventListener('click', () => {
    init();
  });
  function refresh() {
    counter.innerText = window.localStorage.getItem('counter');
    //section mult
    multPrice.innerText = "Price : "+ fmultPrice();
    multBy.innerText = "Mult By : "+(parseInt(window.localStorage.getItem('mult')) +1);
    //section auto
    autoPrice.innerText = "Price : "+ fautoPrice();
    autoRate.innerText = "Per sec : "+ window.localStorage.getItem('auto-rate');
    bonusPrice.innerText = "Price : " + fbonusPrice();
    bonusTimer.innerText = "Timer : " + fbonusTimer();
    buttonCheck();
  }
  function buttonCheck() {
    count = window.localStorage.getItem('counter');
    mult.disabled = count < fmultPrice();
    autoClick.disabled = count < fautoPrice();
    bonus.disabled = count < fbonusPrice() || bonusTime != null;
  }
  function init() {
    window.localStorage.setItem('counter', 0);
    window.localStorage.setItem('mult', 0);
    window.localStorage.setItem('auto-rate', 0);
    window.localStorage.setItem('bonus-rate', 0);
    refresh();
  }

  mult.addEventListener('click', () => {
    let count = parseInt(window.localStorage.getItem('counter'));
    if  (count >= fmultPrice()){
      let mult = parseInt(window.localStorage.getItem('mult'));
      count-= fmultPrice();
      window.localStorage.setItem('counter',count);
      mult += 1;
      window.localStorage.setItem('mult', mult);
      
    }
    refresh();
  });
  autoClick.addEventListener('click', () => {
    
    let count = parseInt(window.localStorage.getItem('counter'));
    if  (count >= fautoPrice()){
      let auto = parseInt(window.localStorage.getItem('auto-rate'));
      count-= fautoPrice();
      window.localStorage.setItem('counter',count);
      auto += 1;
      window.localStorage.setItem('auto-rate', auto);    
    }
    refresh();
  });
  bonus.addEventListener('click', () => {
    let count = parseInt(window.localStorage.getItem('counter'));
    if  (count >= fbonusPrice()){
      let bonus = parseInt(window.localStorage.getItem('bonus-rate'));
      count-= fbonusPrice();
      window.localStorage.setItem('counter',count);
      bonus += 1;
      window.localStorage.setItem('bonus-rate', bonus);
      bonusTime = Date.now() ;
    }
    refresh();
  });
  function fautoPrice () {
    let auto = parseInt(window.localStorage.getItem('auto-rate'));
    return Math.ceil(varInit.autoPrice * Math.pow(1.15, auto));
  }

  function fmultPrice () {
    let mult = parseInt(window.localStorage.getItem('mult'));
    return Math.ceil(varInit.multPrice * Math.pow(1.15, mult));
  }
  function fbonusPrice () {
    let bonus = parseInt(window.localStorage.getItem('bonus-rate'));
    return Math.ceil(varInit.bonusPrice * Math.pow(1, bonus));
  }
  function timer() {
    let auto = parseInt(window.localStorage.getItem('auto-rate'));
    addCounter(auto);
  }
    setInterval(timer, 1000);

    function addCounter(value) {
      let count = parseInt(window.localStorage.getItem('counter'));
      count += value * fbonus() ;
      window.localStorage.setItem('counter',count);
      refresh();
    }
    function fbonus() {
      return bonusTime != null? 2: 1;
      
    }
    function fbonusTimer(){
      if (bonusTime != null) {
        let seconds = Math.floor((10000 -  (Date.now() - bonusTime))/1000);
        if (seconds <= 0){
          bonusTime = null;
          seconds = 0;
        }
        return seconds + " sec";

      }
      return "30 sec";
    }

 

})();