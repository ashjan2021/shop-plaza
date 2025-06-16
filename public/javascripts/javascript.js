setTimeout(() => {
    const flash = document.getElementsByClassName('flash-message');
    if(flash){
      flash.remove();
    }
  }, 2000); // 2 seconds