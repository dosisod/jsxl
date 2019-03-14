window.onload=function() {
	xl=new jsxl(16,16)
	xl.init()
}

class jsxl {
	constructor(y, x) {
		this.table=document.getElementById("table")
		this.txt=document.getElementById("txt")

		this.txt.onkeydown=e=>{
			if (e.keyCode==9){ //if tab is pressed
				var x=txt.value
				var s=e.target.selectionStart
				var d=e.target.selectionEnd
				    
				this.txt.value=x.substring(0, s)+"\t"+x.substring(s) //add a tab character
					
				e.target.setSelectionRange(s+1, d+1) //move cursor back
				e.preventDefault() //stop from tabbing down
			}
			if (e.keyCode==13) { //on enter, and newline but keep same indent
				var x=txt.value
				var s=e.target.selectionStart
				var d=e.target.selectionEnd

				//get whitespace from current line
				var str=x.substring(0, s).split("\n").pop().match(/^[\t ]*/g)[0]

				this.txt.value=x.substring(0, s)+"\n"+str+x.substring(s) //add newline with padding
				
				e.target.setSelectionRange(s+str.length+1, d+str.length+1) //move cursor back
				e.preventDefault() //stop from adding enter
			}
		}
	
		this.ROWS=y
		this.COLS=x

		//fills table in with empty data
		this.data=this.newarr(this.ROWS,this.COLS)
		this.$=new Proxy(this.data, {}) //allows for using this.$ over this.data

		this.control=this.shift=this.space=false

		document.body.onkeydown=e=>{
			if (e.keyCode==17) this.control=true
			if (e.keyCode==16) this.shift=true
			if (e.keyCode==32) this.space=true
			this.runner() //checks if all the above keys are pressed
		}
		
		document.body.onkeyup=e=>{ //unset keys if they are not being held
			if (e.keyCode==17) this.control=false
			if (e.keyCode==16) this.shift=false
			if (e.keyCode==32) this.space=false
		}
	}
	init() {
		this.redraw()
	}
	update(html) { //takes an id of whats being updated and changes it in the table
		var cell=html.target.id.substr(5).split(":")
		this.data[cell[0]][cell[1]]=html.target.value
	}
	run() {
		this.control=this.shift=this.space=false //resets keys

		this.f=new Function( //converts to function
			"var $=this;"+ //allows for $.stuff instead of this.stuff
			document.getElementById("txt").value //whatever is in textarea
		)
		this.f() //have to use "this" to allow for grabbing from class
		delete(this.f)
		
		this.redraw() //updates table
	}
	runner() { //captures ctr+shift+x
		if (this.control&&this.shift&&this.space) this.run()
	}
	resize(y, x) { //change size of data table (relatively)
		this.newsize(this.ROWS+y, this.COLS+x)
	}
	newsize(y, x) { //changes the size of the internal data table (absolute)
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
		for (var i=0;i<=this.COLS+1;i++) {
			var tempth=document.createElement("th")
			if (i==0) { //if its 0, print an 'x'
				tempth.innerHTML="x"
				tempth.id="JSXL_:"
			}
			else if (i==this.COLS+1) { //prints the "- +" to change table size
				var tempspan=document.createElement("span")
				tempspan.innerHTML="- "
				tempspan.onclick=()=>this.resize(0,-1)
				tempth.appendChild(tempspan)
				
				var tempspan=document.createElement("span")
				tempspan.innerHTML="+"
				tempspan.onclick=()=>this.resize(0,1)
				tempth.appendChild(tempspan)
			}
			else { //else print the index
				tempth.innerHTML=(i-1)
				tempth.id="JSXL_:"+(i-1)
			}
			temptr.appendChild(tempth) //append it to table
		}
		this.table.appendChild(temptr)

		//makes all the rows
		for (var y=0;y<=this.ROWS;y++) { //for every row
			var temptr=document.createElement("tr") //make a new tr
			for (var x=0;x<=this.COLS;x++) { //fill each col with input box
				if (x==0 && y!=this.ROWS) { //only prints row header
					var temptd=document.createElement("th")
					temptd.innerHTML=y
					temptd.id="JSXL_"+y+":"
				}
				else if (x==0 && y==this.ROWS) { //only prints table adder/remover
					var temptd=document.createElement("th")
					var tempspan=document.createElement("span")
					tempspan.innerHTML="-<br>"
					tempspan.onclick=()=>this.resize(-1,0)
					temptd.appendChild(tempspan)
					
					tempspan=document.createElement("span")
					tempspan.innerHTML="+"
					tempspan.onclick=()=>this.resize(1,0)
					temptd.appendChild(tempspan)
				}
				else if (y!=this.ROWS) { //else just print the inner input boxes
					var temptd=document.createElement("td")
					var input=document.createElement("input")
					input.id="JSXL_"+y+":"+(x-1)
					input.onchange=e=>this.update(e) //updates internal table when cell changes
					input.value=this.data[y][x-1]
					temptd.appendChild(input)
				}
				temptr.appendChild(temptd)
			}
			this.table.appendChild(temptr)
		}
	}
	newarr(y, x) { //makes a new empty array
		var arr=new Array(y).fill(0)
		for (var i in arr) arr[i]=new Array(x).fill("")
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
	unpack(cord1, cord2) { //makes 2d array of values given range
		var range=[...this.safety(cord1), ...this.safety(cord2)]
		var ret=this.newarr(Math.abs(range[0]-range[2])+1,Math.abs(range[1]-range[3])+1)
		for (var y in ret)
			for (var x in ret[y])
				ret[y][x]=this.data[y][x]
				
		return ret
	}
	SUM(startcord, endcord) {
		var arr=this.unpack(startcord, endcord)
		var total=0
		for (var y in arr)
			for (var x in arr[y])
				total+=Number(arr[y][x])
				
		return total
	}
}







