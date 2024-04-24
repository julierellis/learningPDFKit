// set up an express server on the local machine, on port 8888.
const express = require('express');
const app = express();
const port = 8888;

app.listen(port, ()=>{
	console.log(`Server is listening on port ${port}`)
});

app.use(express.static('public'));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false})); //I really do not understand this. yet.

const PDFDocument = require('pdfkit');
const lib = require("./makePDF.fn");

// does this command execute?  or does the index.html in /public do it?  
// depends on whether the app.use() line is present or not.
app.get('/',(req,res)=>{
	console.log(req.method);
	console.log(__dirname);
	res.send("GET request")
});

app.post('/', (req, res)=>{
	const clientName = req.body.name;
	const coreType = req.body.coreType;
	const subType = req.body.subType;
	
	console.log(`${clientName} is an Enneagram${coreType} with subtype ${subType}`)
 
	const doc = new PDFDocument({layout : 'landscape'});
	lib.makePDF(clientName, coreType, subType, doc, res);
	// create the header
	// create the footer
	// add the coreType images
	// add the subType images
	// ask/confirm social and conflict styles
	// add social and conflict styles
	//

	doc.end(); // this closes the doc, ends the stream, AND closes the response
});


