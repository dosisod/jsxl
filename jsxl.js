window.onload=function() {
	xl=new jsxl()
	xl.init()
}

class jsxl {
	constructor() {
		this.table=document.getElementById("table")
	
		this.ROWS=16
		this.COLS=16

		this.$=Array(this.ROWS).fill(0).map(x=>Array(this.COLS).fill(0)) //initializes the table
	}
	init() {
		//does top header
		var temptr=document.createElement("tr")
		for (var i=0;i<=this.COLS+1;i++) {
			var tempth=document.createElement("th")
			if (i==0) { //if its 0, print an 'x'
				tempth.innerHTML="x"
				tempth.id="all"
			}
			else { //else print the index
				tempth.innerHTML=(i-1)
				tempth.id="C"+(i-1)
			}
			temptr.appendChild(tempth) //append it to table
		}
		this.table.appendChild(temptr)

		/* old code for creating table, will delete later
		document.getElementById("table")
		tr=document.createElement("tr")
		for (i of rows) {
			th=document.createElement("th")
			th.innerHTML=(i==0?"X":i-1)
			tr.appendChild(th)
		}
		*/
	}
}