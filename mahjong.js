while (1) {
	const input = prompt("select mode: s, e");
	if (input == "s") {
		break;
	}
	if (input == "e") {
		Deno.exit();
	}
}

const haiIDs = [];
for (let x = 0; x <= 127; x++) {
	haiIDs.push(x);
	console.log(x);
}

const dealer = Math.random() * 4;
console.log("dealer => " + dealer);
