// function throttle(func, wait = 500) {
//     let timer = null;
//     return (...args) => {
//       if (timer === null) {
//         timer = setTimeout(() => {
//           func.apply(this, args);
//           timer = null;
//         }, wait);
//       }
//     };
//   }


function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}
  
  const visibleArea = (el, pad) => {
    const padded = pad || 0;
    const windowHeight = window.innerHeight;
    const elemTop = el.getBoundingClientRect().top - padded;
    const elemBottom = el.getBoundingClientRect().bottom + padded;
    const elemHeight = elemBottom - elemTop;
    if (elemTop > windowHeight) {
      // Not viewable, below viewport
      return 0;
    }
    if (elemBottom <= 0) {
      // Not viewable, above the viewport
      return 0;
    }
    if (elemTop >= 0 && elemBottom <= windowHeight) {
      return 1;
    }
    if (elemTop < 0 && elemBottom > windowHeight) {
      // Top and bottom of element truncated
      // return windowHeight / elemHeight
      return 1;
    }
    if (elemTop < 0 && elemBottom <= windowHeight) {
      // mất phần trên
      return -(elemBottom / elemHeight);
    }
    if (elemTop >= 0 && elemBottom > windowHeight) {
      // mất phần dưới
      return (windowHeight - elemTop) / elemHeight;
    }
    return 0;
  };
  
  export default {
    inserted(el, bind) {
      let f,page = 1;
      function visible() {
        if (visibleArea(el, bind.value.padded)) {
          if (bind.value.callback) {
            let store = { 
              ...bind.value.store, 
              //page: page++ 
            };
            bind.value.callback(store);
          }
          //console.log("loadmore : " , page);
          if (!bind.value.loop) {
            window.removeEventListener("scroll", f);
            return true;
          }
        }
        return false;
      }
      f = debounce(visible, 500);
  
      if (!visible()) {
        window.addEventListener("scroll", f);
      }
    }
  };
  