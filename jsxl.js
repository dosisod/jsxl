window.onload=function() {
	xl=new jsxl(16,16)
	xl.init()
}

class jsxl {
	constructor(y,x) {
		this.table=document.getElementById("table")
	
		this.ROWS=y
		this.COLS=x

		this.$=Array(this.ROWS).fill(0)
		for (var i in this.$) { this.$[i]=Array(this.COLS).fill("") }
	}
	init() {
		//does top header
		var temptr=document.createElement("tr")
		for (var i=0;i<=this.COLS;i++) {
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

		//makes all the rows
		for (var i=0;i<this.ROWS;i++) { //for every row
			var temptr=document.createElement("tr") //make a new tr
			for (var j=0;j<=this.COLS;j++) { //fill each col with input box
				if (j==0) {
					var temptd=document.createElement("th")
					temptd.innerHTML=i
					temptd.id="R"+i
				}
				else {
					var temptd=document.createElement("td")
					var input=document.createElement("input")
					input.id="R"+i+"-C"+(j-1)
					temptd.appendChild(input)
				}
				temptr.appendChild(temptd)
			}
			this.table.appendChild(temptr)
		}
	}
	newarr(y,x) {
		var arr=Array(y).fill(0)
		for (var i in arr) { arr[i]=Array(x).fill("") }
		return arr
	}
	safety(cord) { //prevents out of bound
		return [
			cord[0]<0?0:
			cord[0]>=this.ROWS-1?this.ROWS-1:cord[0],
			cord[1]<0?0:
			cord[1]>=this.COLS-1?this.COLS-1:cord[1]
		]
	}
	unpack(cord1, cord2) {
		console.log(cord1,cord2)
		var range=[...this.safety(cord1), ...this.safety(cord2)]
		var ret=this.newarr(Math.abs(range[0]-range[2])+1,Math.abs(range[1]-range[3])+1)
		console.log(ret)
		for (var y in ret)
			for (var x in y)
				ret[y][x]=this.$[y][x]
				
		return ret
	}
}