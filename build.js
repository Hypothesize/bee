const { execSync } = require("child_process")
const process = require("process")

function rebuild() {
	console.log("---")
	console.log(`Rebuilding... (${new Date().toLocaleString()})`)

	const commands = [
		`npx esbuild src/index.js --bundle --outfile=dist/bee.min.js --minify`,
		`npx esbuild src/index.js --bundle --outfile=dist/bee.js`,
		`npx esbuild src/index.js --bundle --outfile=demo/bee.js`,
	]

	commands.forEach(command => {
		execSync(command, { encoding: "utf8" })
	})

	console.log(`\nRebuilt! (${new Date().toLocaleString()})\n`)
}


rebuild()
