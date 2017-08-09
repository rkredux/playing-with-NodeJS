const fs = require("fs"); 

// file system 

exports.fileCompare = function(file1, file2){
	let arr = []; 
	let content1, content2; 
	fs.readFile(file1, (err, data) => {
	content1 = data;
	fs.readFile(file2, (err,data) =>{
	content2 = data;
	if(Buffer.compare(content1, content2) == 0){
		arr.push([file2, file1]); 
	} 
	console.log(arr); 
	return arr; 
	}); 
}); 
}; 

// fileCompare("./summer.html", "./winter.html"); 

