const express = require('express')
const bodyparser = require("body-parser")

let app = express()

// use bodyparser and static folder
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.static("public"))

// set port to 3000
let port = process.env.PORT || 3000


let elements = "vsa"
let final = "sav"
let side = "ARC"

app.get("/elements", (req, res) => {
	res.send({
			"first": elements,
			"second": final
	})
})

app.get("/side", (req, res) => {
	res.send({
		"side": side
	})
})

app.post("/proside", (req, res) => {
	side = req.body.side
})

app.post("/process", (req, res) => {
	elements = req.body.first
	final = ""

	if (elements.length != 3) {
		res.send("malformed input")
	}
	else {
		Array.prototype.map.call(elements, (char) => {
			if (char == "v") {
				final += "s";
			}
			else if (char == "s") {
				final += "a";
			}
			else if (char == "a") {
				final += "v";
			}
		})
		res.send({
			"first": elements,
			"second": final
		})
	}
})

app.listen(port)
console.log("listening on port " + port)