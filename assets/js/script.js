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


  const varInit = { multPrice: 20, autoPrice: 100, bonusPrice: 250 };
  let bonusTime = null;

  const reset = document.getElementById('reset');

  if (window.localStorage.getItem('counter') === null) {
    init();
  } else {
    refresh();
  }

  btnClick.addEventListener('click', () => {
    const mult = parseInt(window.localStorage.getItem('mult')) + 1;
    addCounter(mult);
  });
  reset.addEventListener('click', () => {
    init();
  });

  function init() {
    window.localStorage.setItem('counter', 0);
    window.localStorage.setItem('mult', 0);
    window.localStorage.setItem('auto-rate', 0);
    window.localStorage.setItem('bonus-rate', 0);
    refresh();
  }
  function refresh() {
    counter.innerText = window.localStorage.getItem('counter');
    //section mult
    multPrice.innerText = "Price : " + fmultPrice();
    multBy.innerText = "Mult By : " + (parseInt(window.localStorage.getItem('mult')) + 1);
    //section auto
    autoPrice.innerText = "Price : " + fautoPrice();
    autoRate.innerText = "Per sec : " + window.localStorage.getItem('auto-rate');
    //section bonus
    bonusPrice.innerText = "Price : " + fbonusPrice();
    bonusTimer.innerText = "Timer : " + fbonusTimer();
    //Affichage des boutons si disabled
    buttonCheck();
  }
  function buttonCheck() {
    count = window.localStorage.getItem('counter');
    mult.disabled = count < fmultPrice();
    autoClick.disabled = count < fautoPrice();
    bonus.disabled = count < fbonusPrice() || bonusTime != null;
  }

  mult.addEventListener('click', () => {
    buy(fmultPrice, 'mult');
  });
  autoClick.addEventListener('click', () => {
    buy(fautoPrice, 'auto-rate');
  });
  bonus.addEventListener('click', () => {
    if (buy(fbonusPrice, 'bonus-rate')) {
      bonusTime = Date.now();
    }
  });

  function buy(fPrice, rate) {
    let count = parseInt(window.localStorage.getItem('counter'));
    if (count >= fPrice()) {
      let value = parseInt(window.localStorage.getItem(rate));
      count -= fPrice();
      window.localStorage.setItem('counter', count);
      value += 1;
      window.localStorage.setItem(rate, value);
      refresh();
      return true;
    }
    return false;
  };

  // Affichage du prix d'amélioration
  function fPrice(id, coef, priceInit) {
    let rate = parseInt(window.localStorage.getItem(id));
    return Math.ceil(priceInit * Math.pow(coef, rate));
  }
  function fautoPrice() {
    return fPrice('auto-rate', 1.15, varInit.autoPrice);
  }

  function fmultPrice() {
    return fPrice('mult', 1.15, varInit.multPrice);
  }
  function fbonusPrice() {
    return fPrice('bonus-rate', 2, varInit.bonusPrice);
  }


  function timer() {
    let auto = parseInt(window.localStorage.getItem('auto-rate'));
    addCounter(auto);
  }
  setInterval(timer, 1000);

  function addCounter(value) {
    let count = parseInt(window.localStorage.getItem('counter'));
    count += value * fbonus();
    window.localStorage.setItem('counter', count);
    refresh();
  }

  function fbonus() {
    return bonusTime != null ? 2 : 1;
  }
  function fbonusTimer() {
    if (bonusTime != null) {
      let seconds = Math.floor((30000 - (Date.now() - bonusTime)) / 1000);
      if (seconds <= 0) {
        bonusTime = null;
        seconds = 0;
      }
      return seconds + " sec";

    }
    return "30 sec";
  }



})();