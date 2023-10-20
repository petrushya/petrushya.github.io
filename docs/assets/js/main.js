
const confirmBtn = document.getElementById("confirmBtn");
const myHeading = document.querySelector("hgroup h1");
const myInput = document.getElementById("insertName");
const showDialog = document.getElementById("showDialog");
const repWord = document.querySelector(".replace");
const namedialog = document.querySelector("dialog");
const cancelbtn = document.querySelector(".cancel");
const regexInput = /^[A-ZА-Яа-яa-z][-_A-ZА-Яа-яa-z\d]*[A-ZА-Яа-яa-z\d]$/iu;
const startInputReg = /[^A-ZА-Яа-яa-z]/iu;
const endInputReg = /[^A-ZА-Яа-яa-z\d]/iu;
const errorRegex = /[^A-Za-zА-Яа-я-_\d]/iu;
const helchange = document.querySelector(".changed");

myInput.onfocus = () => {
  if (myInput.value && !regexInput.test(myInput.value)) {
    myInput.style.boxShadow = "0 0 5px 3px crimson";
  } else {
    myInput.style.boxShadow = "";
  }

  window.addEventListener("load", () => {
    if (!regexInput.test(myInput.value)) {
      myInput.style.boxShadow = "0 0 5px 3px crimson";
    } else {
      myInput.style.boxShadow = "";
    }
  });

  myInput.addEventListener("input", () => {
    if (!regexInput.test(myInput.value)) {
      myInput.style.boxShadow = "0 0 5px 3px crimson";
    } else {
      myInput.style.boxShadow = "";
    }
  });
};

myInput.onblur = () => {
  myInput.style.boxShadow = "";
};

showDialog.onclick = (e) => {
  e.preventDefault();
	if(!localStorage.getItem("name")){
		namedialog.showModal();
	} else {
		myHeading.textContent = `Успехов, ${localStorage.getItem("name")}!`;
	  repWord.textContent = "земляне";
	  helchange.textContent = " ";
		showDialog.textContent = "представитесь.";
    showDialog.blur();
		setTimeout(() => {
		  myHeading.textContent = "Привет, мир!";
		}, 2000);
		localStorage.removeItem("name");
	}
}

confirmBtn.onclick = (e) => {
  e.preventDefault();
  if(!myInput.value){
  	myInput.focus();
  	myInput.style.boxShadow = "0 0 5px 3px crimson";
  }else if (regexInput.test(myInput.value)) {
    localStorage.setItem("name", myInput.value.replace(myInput.value.slice(0,1),myInput.value.slice(0,1).toUpperCase()));
		myHeading.textContent = `Привет, ${localStorage.getItem("name")}!`;
		repWord.textContent = `${localStorage.getItem("name")}`;
		showDialog.textContent = "попрощаться.";
 	  helchange.textContent = " представитесь. А при выходе не забудьте ";
    myInput.value = "";
    namedialog.close();
    showDialog.blur();
  } else {
    if (myInput.value[0].match(startInputReg)) {
      myInput.setSelectionRange(0, 1);
      myInput.focus();
    } else if(myInput.value[myInput.value.length - 1].match(endInputReg)){
      myInput.setSelectionRange(
        myInput.value.length - 1,
        myInput.value.length
        );
      myInput.focus();
    } else {
      myInput.setSelectionRange(
        myInput.value.match(errorRegex).index,
        myInput.value.match(errorRegex).index + 1
  	    );
      myInput.focus();
    }
  }
};

cancelbtn.onclick = (e) => {
	e.preventDefault();
	myInput.value = "";
	namedialog.close();
}

if (localStorage.getItem("name")) {
  myHeading.textContent = `Привет, ${localStorage.getItem("name")}!`;
  repWord.textContent = `${localStorage.getItem("name")}`;
  showDialog.textContent = "попрощаться.";
  helchange.textContent = " представитесь. А при выходе не забудьте ";
} else {
  myHeading.textContent = "Привет, мир!";
  repWord.textContent = "земляне";
	showDialog.textContent = "представитесь.";
  helchange.textContent = " ";
}


