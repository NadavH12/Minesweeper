class Minesweeper {

	bombs = 10
	cells = []
	rows = 0
	columns = 0

	
	static get SIZE()  { return 15; }
	static get BOMB()  { return "B"; }
	static get EMPTY() { return "E"; }


    constructor(rows = this.constructor.SIZE, columns = this.constructor.SIZE, probability_chance = 0.1){

		if (rows > 0) {this.rows = rows} else this.rows = this.constructor.SIZE
		if(columns > 0) {this.columns = columns} else this.columns = this.constructor.SIZE

		var table = document.createElement("table")

		for (var i = 0; i < this.rows; i++) {
			var row = table.insertRow();
			var cellRow = []
			for (var j = 0; j < this.columns; j++) {
				var button = document.createElement('button')
				
				button = row.insertCell(button);
				
				button.addEventListener("contextmenu", this._flag)
				button.setAttribute("class", "Mine_Button")

				var xCoord = i
				xCoord = i.toString()
				var yCoord = j
				yCoord = j.toString()
				var id = xCoord + "," + yCoord
				button.setAttribute("id",id)

				button.addEventListener("click", this.explore.bind(this, xCoord, yCoord))
				button.addEventListener("click", this._open)

				
				var randomNumber = Math.random()

				if(randomNumber < probability_chance) { 
					button.setAttribute("mine","true")
				}

				else { 
					button.setAttribute("mine","false")
				}
				button.style.color = "blue"
				cellRow.push(button)
			}
			this.cells.push(cellRow)
		}
		document.body.appendChild(table)
		this.init_board()
    }
    

    init_board(){
		var buttons = document.getElementsByClassName("Mine_Button")
		buttons = Array.from(buttons)

		buttons.forEach(button => {
			button.setAttribute("closed","true")
			button.setAttribute("flagged","false")
			button.innerText = "?"
			button.addEventListener("mouseenter", function(){
				button.style.background = "yellow"
			})
			button.addEventListener("mouseleave", function(){
				const closed = button.getAttribute("closed")
				if(closed == "true") button.style.background = "#999999"
				else button.style.background = "#333333"
			})
		});
		this.lock()
		
		var startButton = document.getElementById("start")
		startButton.removeEventListener("click", this.init_board)
		startButton.addEventListener("click",this.unlock)
		startButton.innerText = "Start"

		const body = document.getElementsByTagName("body")[0]
		body.style.background = "black"
		body.style.color = "#DDDDDD"
		body.style.fontFamily = "courier new"
		body.style.textAlign = "center"

		const td = document.getElementsByTagName("td")
		for (let i = 0; i < td.length; i++){
			td[i].style.width = "30px"
			td[i].style.height = "30px"
			td[i].style.textAlign = "center"
			td[i].style.border = "1px solid white"
			td[i].style.background = "#999999"
		}

		const button = document.getElementsByTagName("button")
		for (let i = 0; i < button.length; i++){
			button[i].style.margin = "12px"
		}

		const table = document.getElementsByTagName("table")
		for (let i = 0; i < table.length; i++){
			table[i].style.border = "1px solid black"
			table[i].style.marginLeft = "auto"
			table[i].style.marginRight = "auto"
		}

	}
	

	lock(){
		var buttons = document.getElementsByClassName("Mine_Button")
		buttons = Array.from(buttons)
		buttons.forEach(button => {
			document.createAttribute("locked")
			button.setAttribute("locked","true")
		});
	}

	
	unlock(){
		var buttons = document.getElementsByClassName("Mine_Button")
		buttons = Array.from(buttons)
		buttons.forEach(button => {
			button.setAttribute("locked","false")
		});
		var startButton = document.getElementById("start")
		
		if(startButton.innerText != "Reset") {
			startButton.innerText = "Reset"
		}
		else {
			
			buttons.forEach(button => {
				button.setAttribute("closed","true")
				button.setAttribute("flagged","false")
				button.innerText = "?"
				button.style.color = "blue"
				button.style.background = "#999999"
			});
			const header = document.getElementById("resetMessage")
			header.remove()
		}
	}
	
	
	_flag(){
		var closed = this.getAttribute("closed")
		if (closed == "false") return

		var flagged = this.getAttribute("flagged")

		if (flagged == "true") {
			this.innerText = "F"
			this.setAttribute("flagged", "false")
		}
		
		else{ 
			this.innerText = "f"
			this.style.color = "pink"
			this.setAttribute("flagged", "true")
		}
	}
	
	
	_open(){
		var locked = this.getAttribute("locked")
		if(locked == "true") return
		var closed = this.getAttribute("closed")
		if(closed == "true"){ 
			this.setAttribute("closed", "false")
			this.style.background = "#333333"
		}

		var mined = this.getAttribute("mine")
		if (mined == "true"){
			this.style.color = "red"
			this.innerText = "X"

			var buttons = document.getElementsByClassName("Mine_Button")
			buttons = Array.from(buttons)
			buttons.forEach(button => {
				button.setAttribute("locked","true")
			});

			const lost = document.createElement("h3")
			const node = document.createTextNode("You lost.")
			lost.appendChild(node)
			lost.style.color = "red"
			lost.style.display = "inline"
			lost.setAttribute("id","resetMessage")
			const start = document.getElementById("start")
			start.insertAdjacentElement('afterend', lost)
		}

		else {
			this.style.color = "green"
			var buttons = document.getElementsByClassName("Mine_Button")
			buttons = Array.from(buttons)

			var gameOver = true;

			buttons.forEach(button => {
				var closed = button.getAttribute("closed")
				var mined = button.getAttribute("mine")
				if(closed == "true" && mined == "false"){ 
					gameOver = false 
				}
			});

			if (gameOver == true) {
				const won = document.createElement("h3")
				const node = document.createTextNode("You won!")
				won.appendChild(node)
				won.style.color = "red"
				won.style.display = "inline"
				won.setAttribute("id","resetMessage")
				const start = document.getElementById("start")
				start.insertAdjacentElement('afterend', won)
			}
		}
	}


	flood_fill(){
		const id = this.getAttribute("id")

        //Parse id
        const coords = id.split(',')

		var clickedX = coords[0]
		clickedX = parseInt(clickedX)

		var clickedY = coords[1]
		clickedY = parseInt(clickedY)

		var bombCount = 0

		for(var i = 0; i < 3; i++){
			var x = clickedX - 1 + i
			x = x.toString()
			for(var j = 0; j < 3; j++){
				var y = clickedY - 1 + j
				y = y.toString()

				if(x == clickedX && y == clickedY) continue

				var button = document.getElementById(x + "," + y)
				if(button != null){
					var mined = button.getAttribute("mine")
					if(mined == "true"){
						bombCount++
					}
				}
			}
		}
		this.setAttribute("value",bombCount)
	}

	
	explore(x, y){
        

		//validate that x,y corresponds to an actual cell
		var xString = x.toString()
		var yString = y.toString()
		var id = xString + "," + yString
		var cell = document.getElementById(id)
		if (cell == null) return

		x = parseInt(x)
		y = parseInt(y)

		//validate that x,y is not locked
		var locked = cell.getAttribute("locked")
		if(locked == "true") return

		//validate that x,y is not mined
		var mined = cell.getAttribute("mine")
		if (mined == "true") return

		//validate that x,y is not flagged
		var flagged = cell.getAttribute("flagged")
		if(flagged == "true") return

		//validate that x,y has not already been opened
		var closed = cell.getAttribute("closed")
		if(closed == "false") return

		//find and set the number of mine neighbors of x,y
		const newflood = this.flood_fill.bind(cell)
		newflood()
		var bombNeighbors = cell.getAttribute("value")
		cell.innerText = bombNeighbors

		//mark x,y as opened
		cell.setAttribute("closed","false")
		cell.style.color = "green"
		cell.style.background = "#333333"

		//validate that x,y has 0 bomb neighbors
		if(bombNeighbors != 0) return

		//explore neighbors
		this.explore(x-1,y-1)
		this.explore(x-1,y+1)

		this.explore(x,y-1)
		this.explore(x,y+1)

		this.explore(x+1,y-1)
		this.explore(x+1,y)
		this.explore(x+1,y+1)
	}


	//The method returns true if all non-bomb cells opened otherwise false
	is_winning_choice(){
		var rows = this.cells
		for (var i = 0; i < rows.length; i++){
			var cellRow = rows[i]
			for (var j = 0; j < cellRow.length; j++){
				var cell = cellRow[j]
				var mined = cell.getAttribute("mine")
				var closed = cell.getAttribute("closed")
				if (mined == "false" && closed == "true")
					return false
			}
		}
		return true
	}
}