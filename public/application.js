var queue = ""

function queue_element(element) {
	if (queue.length >= 3) {
		queue = ""
	}
	queue += element
}

function submit_queue() {
	let data = {"first": queue}
	$.post("/process", data, (out) => {
		console.log(out)
	})
	queue = ""
}

function draw(letter, id) {
	let ctx = document.getElementById(id).getContext("2d")
	if (letter == "v") {
		ctx.fillStyle = "purple"
	}
	else if (letter == "s") {
		ctx.fillStyle = "orange"
	}
	else if (letter == "a") {
		ctx.fillStyle = "blue"
	}
	else {
		ctx.fillStyle = "black"
	}
	ctx.fillRect(75, 0, 150, 75)
}

function update_elements() {
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
}

setInterval(update_elements, 3000)