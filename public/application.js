var queue = ""

let void_purple = "#a400eb"
let solar_orange = "#f86000"
let arc_blue = "#0b7dd3"

function queue_element(element) {
	queue += element
	if (queue.length >= 3) {
		submit_queue()
		queue = ""
	}
}

function submit_queue() {
	let data = {"first": queue}
	$.post("/process", data, (out) => {
		console.log(out)
	})
	queue = ""
}

function send_side(side) {
	let data = {"side": side}
	$.post("/proside", data)
}

function draw(letter, id) {
	let ctx = document.getElementById(id).getContext("2d")
	if (letter == "v") {
		ctx.strokeStyle = void_purple
		ctx.fillStyle = void_purple
	}
	else if (letter == "s") {
		ctx.strokeStyle = solar_orange
		ctx.fillStyle = solar_orange
	}
	else if (letter == "a") {
		ctx.strokeStyle = arc_blue
		ctx.fillStyle = arc_blue
	}
	else {
		ctx.strokeStyle = "#000000"
		ctx.fillStyle = "#000000"
	}
	ctx.beginPath()
	ctx.arc(150,75,50,0,2*Math.PI)
	ctx.closePath()
	ctx.fill()
	ctx.stroke()
	//ctx.fillRect(75, 0, 150, 75)
}

function update() {
	$.get("/elements", (data) => {
		let first = data.first
		let second = data.second
		let first1 = first.substring(0, 1)
		let first2 = first.substring(1, 2)
		let first3 = first.substring(2, 3)

		let second1 = second.substring(0, 1)
		let second2 = second.substring(1, 2)
		let second3 = second.substring(2, 3)

		draw(first1, "first1")
		draw(first2, "first2")
		draw(first3, "first3")
		draw(second1, "second1")
		draw(second2, "second2")
		draw(second3, "second3")
	})

	$.get("/side", (data) => {
		document.getElementById("side").innerText = data.side
	})
}

setInterval(update, 500)