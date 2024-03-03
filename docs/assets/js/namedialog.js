
const confirmBtn = document.getElementById("confirmBtn");
const myHeading = document.querySelector("hgroup h1");
const myInput = document.getElementById("insertName");
const showDialog = document.getElementById("showDialog");
const namedialog = document.querySelector("dialog");
const cancelbtn = document.querySelector(".cancel");
const helchange = document.querySelector(".changed");
const repWord = document.querySelector(".replace");
const regexInput = /^[-\p{Alpha}\d][-\p{Alpha}\d]*[-\p{Alpha}\d\s]$/u;
const errorRegex = /[^\p{Alpha}\d-]/ug;
const error = myInput.previousElementSibling;

myInput.onfocus = () => {
	if(myInput.value && !regexInput.test(myInput.value)) {
		myInput.setAttribute("class", "errStyle");
    error.className = "error active color";
    error.textContent = "В слове можно использовать буквы, цифры и дефис!";
	};
  myInput.addEventListener("input", () => {
		if(myInput.value.length > 1 && !regexInput.test(myInput.value)){
    	error.textContent = "Ой-ой, спецсимволы и пробелы в слове нельзя!";
      myInput.setAttribute("class", "errStyle");
	    error.className = "error active";
    } else if(myInput.value && regexInput.test(myInput.value) && !myInput.value.match(/\p{L}/u)) {
      myInput.setAttribute("class", "errStyle");
      error.className = "error active";
    	error.textContent = "Ох, без букв не обойтись!";
    } else {
	    myInput.removeAttribute("class");
	    error.textContent = "";
	    error.className = "error";
    }
  });
};

myInput.onblur = () => {
  myInput.removeAttribute("class");
};

showDialog.onclick = (e) => {
  e.preventDefault();
	if(!localStorage.getItem("name")){
		namedialog.showModal();
	} else {
		myHeading.textContent = `Успехов, ${localStorage.getItem("name")}!`;
	  repWord.textContent = "земляне";
	  helchange.innerHTML = 'Сохраняем традиции знакомства с <abbr lang="en">HTML</abbr>, но вы можете персонализировать приветствие, если';
	  showDialog.textContent = "представитесь";
    showDialog.blur();
		setTimeout(() => {
		  myHeading.textContent = "Привет, мир!";
		}, 2000);
		localStorage.removeItem("name");
	}
};

confirmBtn.onclick = (e) => {
  e.preventDefault();
  if(!myInput.value){
  	myInput.focus();
  	myInput.setAttribute("class", "errStyle");
		error.textContent = "Вы ничего не написали.";
  	error.className = "error active";
  } else if((myInput.value.length === 1 || myInput.value.replace(/\s/g, "").length <= 1) && (!errorRegex.test(myInput.value) || /\s/g.test(myInput.value))) {
  	myInput.focus();
    myInput.setAttribute("class", "errStyle");
		error.textContent = "Не менее 2-х символов без пробелов!";
    error.className = "error active color";
 	} else if (!regexInput.test(myInput.value)) {
 	  myInput.focus();
    myInput.setSelectionRange(
      myInput.value.search(errorRegex),
      myInput.value.search(errorRegex) + 1
    );
    myInput.setAttribute("class", "errStyle");
    error.className = "error active color";
 	  error.textContent = "Удалите спецсимволы или пробелы из слова!!!";
  } else if(!/\p{L}/u.test(myInput.value)){
  	myInput.focus();
    myInput.setAttribute("class", "errStyle");
    error.className = "error active color";
   	error.textContent = "В слове должны быть буквы!";
  } else if (regexInput.test(myInput.value) && /\p{L}/u.test(myInput.value)) {
    localStorage.setItem("name", myInput.value.replace(/\s/g, "").replace(myInput.value.match(/\p{L}/u)[0], myInput.value.match(/\p{L}/u)[0].toUpperCase()));
		myHeading.textContent = `Привет, ${localStorage.getItem("name")}!`;
		repWord.textContent = `${localStorage.getItem("name")}`;
		showDialog.textContent = "попрощаться";
 	  helchange.textContent = "При выходе не забудьте ";
    myInput.value = "";
    namedialog.close();
    showDialog.blur();
  } else {
  	myInput.focus();
    myInput.removeAttribute("class");
    error.textContent = "";
    error.className = "error";
  }
};

cancelbtn.onclick = () => {
	namedialog.close();
};

namedialog.addEventListener("close", () => {
	myInput.value = "";
  myInput.removeAttribute("class");
  error.className = "error";
  error.textContent = "";
	showDialog.blur();
});

if (localStorage.getItem("name")) {
  myHeading.textContent = `Привет, ${localStorage.getItem("name")}!`;
  repWord.textContent = `${localStorage.getItem("name")}`;
  showDialog.textContent = "попрощаться";
  helchange.textContent = "При выходе не забудьте ";
} else {
  myHeading.textContent = "Привет, мир!";
  repWord.textContent = "земляне";
	showDialog.textContent = "представитесь";
  helchange.innerHTML = 'Сохраняем традиции знакомства с <abbr lang="en">HTML</abbr>, но вы можете персонализировать приветствие, если';
};
