window.onload=function() {
	xl=new jsxl()
}

class jsxl {
	constructor() {
		this.ROWS=16
		this.COLS=16

		this.$=Array(this.ROWS).fill(0).map(x=>Array(this.COLS).fill(0)) //initializes the table
	}
	init() {
		document.getElementById("table")
		tr=document.createElement("tr")
		for (i of rows) {
			th=document.createElement("th")
			th.innerHTML=(i==0?"X":i-1)
			tr.appendChild(th)
		}
	}
}