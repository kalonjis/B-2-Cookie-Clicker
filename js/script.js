(() => {
  // Variable global au projet
  const btnClick = document.getElementById('click');
  const counter = document.getElementById('counter');

  if (localStorage.getItem('counter') === null) {
    localStorage.setItem('counter', 0);
  }
  counter.innerText = localStorage.getItem('counter');

  btnClick.addEventListener('click', () => {
    let count = localStorage.getItem('counter');
    counter.innerText = ++count;
    localStorage.setItem('counter', count);
  });

})();