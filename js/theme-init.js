/* Applies the saved light/dark choice before the page paints, so there is no flash. */
(function(){try{if(localStorage.getItem('px-theme')==='light')document.documentElement.setAttribute('data-px-theme','light');}catch(e){}})();
