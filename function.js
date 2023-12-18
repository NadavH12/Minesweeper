//The function append a line break (node) to the body of the document <br/>.
function create_line_break(){
	const node = document.createElement("br")
    document.body.appendChild(node)
}

//The function append a button (node) to the body of the document <button>
function create_button(){
	const node = document.createElement("button")
    document.body.appendChild(node)
}