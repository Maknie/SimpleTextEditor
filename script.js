
let output = document.getElementById('output');
let buttons = document.getElementsByClassName('tool--btn');
for (let btn of buttons) {
	btn.addEventListener('click', () => {
		let cmd = btn.dataset['command'];
		if(cmd === 'createlink') {
			let url = prompt("Enter the link here: ", "http:\/\/");
			document.execCommand(cmd, false, url);
		} else {
			document.execCommand(cmd, false, null);
		}
	})
}

function fontEditor(fontName) {
    document.execCommand("fontName", false, fontName);
}

document.getElementById("openFile").addEventListener('change', function(){
	let fr = new FileReader();
	fr.onload = function() {
		document.getElementById("output").textContent = this.result;
	}
	fr.readAsText(this.files[0]);
})

function save() {
	let data = document.getElementById("output").textContent;
	let filename = "Untitled.txt";
	let type = "text/plain";
	download(data, filename, type)
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // Internet Explorer support 10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}