
const confirmBtn = document.getElementById("confirmBtn");
const myHeading = document.querySelector("hgroup h1");
const myInput = document.getElementById("insertName");
const showDialog = document.getElementById("showDialog");
const repWord = document.querySelector(".replace");
const namedialog = document.querySelector("dialog");
const cancelbtn = document.querySelector(".cancel");
const regexInput = /^[-\wа-я][-\wа-я]*[-\wа-я\s]$/iu;
const errorRegex = /[^\wа-я-]/iug;
const helchange = document.querySelector(".changed");
const error = myInput.previousElementSibling;
let errStyle = "box-shadow: 0 0 5px 3px crimson;border-color: crimson;border-style: solid;"

myInput.onfocus = () => {
	if(myInput.value && !regexInput.test(myInput.value)) {
		myInput.focus();
		myInput.style = errStyle;
    error.className = "error active";
	};
  myInput.addEventListener("input", () => {
		if(!myInput.value){
			myInput.focus();
			myInput.style = errStyle;
			error.textContent = "Вы ничего не написали.";
			error.className = "error active";
		} else if(myInput.value.length === 1 && !errorRegex.test(myInput.value)){
	    myInput.style = "";
	    error.textContent = "Не менее 2-х символов!";
	    error.className = "error active";
  	} else if(myInput.value && !regexInput.test(myInput.value)){
    	error.textContent = "Ой-ой, спецсимволы и пробелы в слове нельзя!";
      myInput.style = errStyle;
	    error.className = "error active";
    } else if(myInput.value && regexInput.test(myInput.value) && !myInput.value.match(/\p{L}/u)) {
      myInput.style = errStyle;
      error.className = "error active";
    	error.textContent = "Ох, без букв не обойтись!";
    } else {
	    myInput.style = "";
	    error.textContent = "";
	    error.className = "error";
    }
  });
};

myInput.onblur = () => {
  myInput.style = "";
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
  	myInput.style = errStyle;
  	error.className = "error active";
  } else if(myInput.value.length === 1 && !errorRegex.test(myInput.value)) {
    myInput.style = "";
    error.className = "error active color";
    myInput.focus();
 	} else if (!regexInput.test(myInput.value)) {
    myInput.setSelectionRange(
      myInput.value.search(errorRegex),
      myInput.value.search(errorRegex) + 1
    );
    myInput.style = errStyle;
    error.className = "error active color";
 	  error.textContent = "Удалите спецсимволы или пробелы из слова!!!";
    myInput.focus();
  } else if(!/\p{L}/u.test(myInput.value)){
    myInput.style = errStyle;
    error.className = "error active color";
   	error.textContent = "В слове должны быть буквы!";
    myInput.focus();
  } else if (regexInput.test(myInput.value) && /\p{L}/u.test(myInput.value)) {
    localStorage.setItem("name", myInput.value.replace(myInput.value.match(/\p{L}/u)[0], myInput.value.match(/\p{L}/u)[0].toUpperCase()).replace(/\s/g, ""));
		myHeading.textContent = `Привет, ${localStorage.getItem("name")}!`;
		repWord.textContent = `${localStorage.getItem("name")}`;
		showDialog.textContent = "попрощаться.";
 	  helchange.textContent = " представитесь. А при выходе не забудьте ";
    myInput.value = "";
    namedialog.close();
    showDialog.blur();
  } else {
    myInput.style = "";
    error.textContent = "";
    error.className = "error";
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


