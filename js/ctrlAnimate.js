function animateCache() {
	for (allBoxes = window.document.documentElement.querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++) allBoxes[i].attributes["style"] ? allBoxes[i].setAttribute("animate-style-cache", allBoxes[i].attributes["style"].value) : allBoxes[i].setAttribute("animate-style-cache", " "), allBoxes[i].style.visibility = "hidden"
}

function animatefn(a) {
	clearAnimate();
	var b = a.querySelectorAll(".ani");
	for (i = 0; i < b.length; i++) b[i].style.visibility = "visible", effect = b[i].attributes["animate-effect"] ? b[i].attributes["animate-effect"].value : "", b[i].className = b[i].className + "  " + effect + " " + "animated", style = b[i].attributes["style"].value, duration = b[i].attributes["animate-duration"] ? b[i].attributes["animate-duration"].value : "", duration && (style = style + "animation-duration:" + duration + ";-webkit-animation-duration:" + duration + ";"), delay = b[i].attributes["animate-delay"] ? b[i].attributes["animate-delay"].value : "", delay && (style = style + "animation-delay:" + delay + ";-webkit-animation-delay:" + delay + ";"), b[i].setAttribute("style", style)
}

function clearAnimate() {
	for (allBoxes = window.document.documentElement.querySelectorAll(".ani"), i = 0; i < allBoxes.length; i++) allBoxes[i].attributes["animate-style-cache"] && allBoxes[i].setAttribute("style", allBoxes[i].attributes["animate-style-cache"].value), allBoxes[i].style.visibility = "hidden", allBoxes[i].className = allBoxes[i].className.replace("animated", " "), allBoxes[i].attributes["animate-effect"] && (effect = allBoxes[i].attributes["animate-effect"].value, allBoxes[i].className = allBoxes[i].className.replace(effect, " "))
}