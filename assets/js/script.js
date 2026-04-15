//-------Animação de Scroll-----------------

//lógica
// 1- Selecionar elementos que devem ser animados 
// 2- Criar função de animação
// 2.1- Verificar a distancia entre a barra de scroll e o topo do site 
// 3- Ativar animação toda vez que o usuario der scroll no site

// Debounce do Lodash
const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
      const context = this;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
};

const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3.5) / 4);
    target.forEach(function(e){
        if(windowTop > e.offsetTop){
            e.classList.add(animationClass);
        }else{
            e.classList.remove(animationClass);
        }
    })
}

animeScroll();

if(target.length){
    window.addEventListener('scroll', debounce(function(){
        animeScroll();
    }, 200))
}

//-------------Menu Responsivo--------------


function aparecemenu(){
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-responsivo").classList.toggle("change");
    
}