window.onload=function() {
	//xl=new jsxl(16,16)
	xl=new jsxl(2,2)
	xl.init()
}

class jsxl {
	constructor(y,x) {
		this.table=document.getElementById("table")
	
		this.ROWS=y
		this.COLS=x

		this.data=this.newarr(this.ROWS,this.COLS)
	}
	init() {
		this.redraw()
	}
	update(html) {
		var cell=html.target.id.substr(5).split(":")
		this.data[cell[0]][cell[1]]=html.target.value
	}
	resize(y, x) { //changes the size of the internal data table
		if (x>this.COLS) //append empty data to table if larger
			for (var i=0;i<this.ROWS;i++)
				this.data[i].push(...Array(x-this.COLS).fill(""))
				
		else if (x<this.COLS) //remove data if table smaller
			for (var i=0;i<this.ROWS;i++)
				this.data[i]=this.data[i].splice(0,x)

		this.COLS=x //rows need updated value of columns
		
		if (y>this.ROWS) //add more rows if larger
			for (var i=0;i<y-this.ROWS;i++)
				this.data[this.ROWS+i]=Array(this.COLS).fill("")

		else if (y<this.ROWS) //delete rows if smaller
			for (var i=0;i<this.ROWS-y;i++)
				this.data.pop()
		
		this.ROWS=y

		this.redraw()
	}
	redraw() { //redraws the table but keeps data
		table.innerHTML="" //clears current table

		//does top header
		var temptr=document.createElement("tr")
		for (var i=0;i<=this.COLS;i++) {
			var tempth=document.createElement("th")
			if (i==0) { //if its 0, print an 'x'
				tempth.innerHTML="x"
				tempth.id="JSXL_:"
			}
			else { //else print the index
				tempth.innerHTML=(i-1)
				tempth.id="JSXL_:"+(i-1)
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
					temptd.id="JSXL_"+i+":"
				}
				else {
					var temptd=document.createElement("td")
					var input=document.createElement("input")
					input.id="JSXL_"+i+":"+(j-1)
					input.onchange=(e)=>{this.update(e)} //updates internal table when cell changes
					input.value=this.data[i][j-1]
					temptd.appendChild(input)
				}
				temptr.appendChild(temptd)
			}
			this.table.appendChild(temptr)
		}
	}
	newarr(y,x) {
		var arr=new Array(y).fill(0)
		for (var i in arr) { arr[i]=new Array(x).fill("") }
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
		var range=[...this.safety(cord1), ...this.safety(cord2)]
		var ret=this.newarr(Math.abs(range[0]-range[2])+1,Math.abs(range[1]-range[3])+1)
		for (var y in ret)
			for (var x in ret[y])
				ret[y][x]=this.data[y][x]
				
		return ret
	}
	SUM(cord1, cord2) {
		var arr=this.unpack(cord1, cord2)
		var total=0
		for (var y in arr)
			for (var x in arr[y])
				total+=Number(arr[y][x])
				
		return total
	}
}