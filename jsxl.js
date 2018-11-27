rows=16
columns=16

window.onload=function() {
	document.getElementById("table")
	tr=document.createElement("tr")
	for (i of rows) {
		th=document.createElement("th")
		th.innerHTML=(i==0?"X":i-1)
		tr.appendChild(th)
	}
}
