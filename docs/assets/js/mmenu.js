const mmbutton = document.querySelector(".mobile-menu");
const mmenu = document.getElementById("main-nav");
const mybody = document.querySelector("body");

mmbutton.onclick = (e) => {
	e.stopPropagation();
	if(document.body.clientWidth < 601 && mmenu.style.visibility !== "visible") {mmenu.style.visibility = "visible";}
	else {mmenu.style.visibility = "hidden";}
};

window.onclick = () => {
	if(mmenu.style.visibility === "visible" && document.body.clientWidth < 601){mmenu.style.visibility = "hidden";}
}

window.onresize = () => {
	if(mybody.clientWidth < 601) {mmenu.style.visibility = "hidden";}
	else {mmenu.style.visibility="visible";}
}