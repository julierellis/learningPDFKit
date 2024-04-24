//set up an express http server on the local machine, on port 8080.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('node:path');

const port = 8080;

//set up a place to receive the file
const pathForPDF = path.join(__dirname, './public');
console.log(pathForPDF)

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false})); //I really do not understand this. yet.

const lib = require("./makePDF.fn");

//the following command never executes if there is a index.html file in public
app.get('/',(req,res)=>{
	console.log(req.method);
//	console.log(__dirname);
	res.send("GET request")
})

app.post('/', (req, res, next)=>{
	const guest = req.body.name;
	const coreType = req.body.coreType
	lib.makePDF(guest, coreType, path.join(pathForPDF, "Rattempt"))
	next()
},	(req, res, next)=>{
	res.sendFile(__dirname + '/public/Rattempt.pdf');	
})

//	res.set('Content-Type', 'application/pdf')
//	res.send(`i made a file for ${guest}, a ${coreType}: hopeful.pdf`) // this works, sending the headers and the message to the client
//	res.sendFile('/Users/julierellis/Desktop/Enneagraphic/learningPDFKit/hopeful.txt');		

//	(req, res, next) => {
//	res.sendFile('/Users/julierellis/Desktop/Enneagraphic/learningNodejs/public/HWHaiku.html');	
//	res.sendFile('/Users/julierellis/Desktop/Enneagraphic/learningPDFKit/TEMP.hopeful.pdf');	
//	})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
