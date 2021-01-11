export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  export const debounce = function(fn, wait) {
    let t;
    return function() {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, arguments), wait);
    };
};



  