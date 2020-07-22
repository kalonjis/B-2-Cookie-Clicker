(() => {
  // Variable global au projet
  //section principale
  const btnClick = document.getElementById('click');
  const counter = document.getElementById('counter');
  //section multiplicator
  const mult = document.getElementById('mult');
  const multPrice = document.getElementById('mult-price');
  const multBy = document.getElementById('mult-by');
  const multAnim = document.getElementById("mult-anim")
  //section autoclick
  const autoPrice = document.getElementById('auto-price');
  const autoRate = document.getElementById('auto-rate');
  const autoClick = document.getElementById('auto-click');
  //section bonus
  const bonusPrice = document.getElementById('bonus-price');
  const bonusTimer = document.getElementById('bonus-timer');
  const bonus = document.getElementById('bonus');
  //btn reset
  const reset = document.getElementById('reset');
  //Prix Initiaux
  const varInit = { multPrice: 20, autoPrice: 100, bonusPrice: 250 };
  let bonusTime = null;
  
  //verifie s'il y a déjà une session enregistrée
  if (window.localStorage.getItem('counter') === null) {
    init();
  } else {
    refresh();
  }
  //Evenements click sur les boutons
  //bouton principal
  btnClick.addEventListener('click', () => {
    const mult = parseInt(window.localStorage.getItem('mult')) + 1;
    addCounter(mult);
  });
  //bouton reset
  reset.addEventListener('click', () => {
    init();
  });
  //bouton multiplicator
  mult.addEventListener('click', () => {
    buy(fmultPrice, 'mult');
  });
  //bouton autoclick
  autoClick.addEventListener('click', () => {
    buy(fautoPrice, 'auto-rate');
  });
  //bouton bonus
  bonus.addEventListener('click', () => {
    if (buy(fbonusPrice, 'bonus-rate')) {
      bonusTime = Date.now();
    }
  });

  //fonctions
  //initialisaton des informations du clicker
  function init() {
    window.localStorage.setItem('counter', 0);
    window.localStorage.setItem('mult', 0);
    window.localStorage.setItem('auto-rate', 0);
    window.localStorage.setItem('bonus-rate', 0);
    refresh();
  }
  // Affichage des informations
  function refresh() {
    counter.innerText = window.localStorage.getItem('counter');
    //section mult
    multPrice.innerText = "Price : " + fmultPrice();
    multBy.innerText = "Mult By : " + (parseInt(window.localStorage.getItem('mult')) + 1);
    multAnim.innerHTML = "x" + (parseInt(window.localStorage.getItem('mult')) + 1);
    //section auto
    autoPrice.innerText = "Price : " + fautoPrice();
    autoRate.innerText = "Per sec : " + window.localStorage.getItem('auto-rate');
    //section bonus
    bonusPrice.innerText = "Price : " + fbonusPrice();
    bonusTimer.innerText = "Timer : " + fbonusTimer();
    //Affichage des boutons si disabled
    buttonCheck();
  }
  //Active les boutons
  function buttonCheck() {
    count = window.localStorage.getItem('counter');
    mult.disabled = count < fmultPrice();
    autoClick.disabled = count < fautoPrice();
    bonus.disabled = count < fbonusPrice() || bonusTime != null;
  }
  //Achete une option
  function buy(funcPrice, rate) {
    let count = parseInt(window.localStorage.getItem('counter'));
    if (count >= funcPrice()) {
      let value = parseInt(window.localStorage.getItem(rate));
      count -= funcPrice();
      window.localStorage.setItem('counter', count);
      value += 1;
      window.localStorage.setItem(rate, value);
      refresh();
      return true;
    }
    return false;
  };
  // retourne le prix d'une option
  function fPrice(id, coef, priceInit) {
    let rate = parseInt(window.localStorage.getItem(id));
    return Math.ceil(priceInit * Math.pow(coef, rate));
  }
  // retourne le prix de l'option autoclick
  function fautoPrice() {
    return fPrice('auto-rate', 1.15, varInit.autoPrice);
  }
  // retourne le prix de l'option multiplicator
  function fmultPrice() {
    return fPrice('mult', 1.15, varInit.multPrice);
  }
  // retourne le prix de l'option bonus
  function fbonusPrice() {
    return fPrice('bonus-rate', 2, varInit.bonusPrice);
  }
  // mise à jour du counter
  function addCounter(value) {
    let count = parseInt(window.localStorage.getItem('counter'));
    count += value * fbonus();
    window.localStorage.setItem('counter', count);
    refresh();
  }
  //retourne le multiplicateur du bonus
  function fbonus() {
    return bonusTime != null ? 2 : 1;
  }
  // calcul du décompte du bonus
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
  // mise à jour de counter par l'autoclick
  function timer() {
    let auto = parseInt(window.localStorage.getItem('auto-rate'));
    addCounter(auto);
  }
  //mise à jour toutes les secondes
  setInterval(timer, 1000);
})();