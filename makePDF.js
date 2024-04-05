const fs = require('fs');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument({layout : 'landscape'});
// console.log(process.argv);
doc.pipe(fs.createWriteStream('myFile.pdf')); // write to PDF
// doc.pipe(res);                            // HTTP response

const fullW = 792;
const fullH = 612;
const headerH = 100;
const footerH = 100;
const padding = 10;

//mark out header and footer
	doc.font('Courier')

	doc.rect(0, 0, fullW, headerH)
//	   .fill("yellow")
//	   .stroke()
	doc.text("header area",0, 0, {
		width: fullW,
		align:"center"
		})
		doc.text(`You can put an organization's logo over here. It can be ${headerH} pts high and ${fullW/3} pts wide. (Note: points are different from pixels)`,2*(fullW/3),padding,{
			width: fullW/3,
			align: "left"
		});
		/*
		doc.text(`Does this wrap? It DOES! Even at the right place relative to what came before`,{
			width: fullW/3,
			align: "left"
		});
		*/
		doc.text(`version 1100F29Mar2024`,padding, headerH-padding, {
			width: fullW/3,
			align: "left",
			baseline: "bottom"
		});
	
	doc.rect(0, fullH-footerH, fullW, footerH)
//	   .fill("green")
//	   .stroke()

		doc.text("footer area" ,0 , fullH-footerH, {
					width: fullW,
					align:"center",
//					baseline: "bottom"
					})
/*
There is something about the automatic adding of a page that screws this up.  Come back.					
		doc.text(`infinitecanvas.org logo`, padding, fullH-(footerH/2),{
			width: fullW/3,
			align: "left"
		});	
		
		doc.text(`the coach's logo`, fullW/3, fullH-(footerH/2),{
			width: fullW/3,
			align: "center"
		});
		doc.text(` "inspired by" IEQ9`, 2*(fullW/3), fullH-(footerH/2),{
			width: fullW/3,
			align: "right"
		});
*/

// populate the header and footer
				
	//add 'Integrative' to header
		doc.fontSize(24);
		doc.font('./fonts/Shantell_Sans/static/ShantellSans-Regular.ttf')
		doc.text('Integrative',40, headerH/2,{ 
			width:(fullW/3),
			align: 'left',
			baseline: 'bottom'	
		})

	//add 'Enneagram' to header
		doc.fontSize(30);
		doc.font('./fonts/Shantell_Sans/static/ShantellSans-ExtraBold.ttf')
		doc.text('Enneagram',10, headerH/2+10,{ 
			width:(fullW/3),
			align: 'left',
			baseline: 'middle'	
		})
// This is too fiddly, and changing the headerH will impact the spacing.  Leave for now, but come back.


// Fill in the particulars
const { colors } = require('./public/TypeColorCodes.js')

for  (coreType = 1; coreType < 10; coreType++){
	const yourColor = colors[Number(coreType)-1].colorName;
	const yourCode = colors[Number(coreType)-1].hexCode;

	doc.rect(0, headerH, (fullW/9)*coreType, ((fullH-headerH-footerH)/9)*coreType)
	   .strokeColor(yourCode)
	   .stroke()

	doc.fontSize(18);
	doc.font('./fonts/Shantell_Sans/static/ShantellSans-Regular.ttf')
	   .fill(yourCode)
	   .text(`Enneagram ${coreType} = ${yourColor}`, 0, headerH+((fullH-headerH-footerH)/9)*(Number(coreType)-1), {
		   width:(fullW/9)*coreType,
		   align: 'center'
	   })

}

/*		
doc.fontSize(30);
doc.font('./fonts/Shantell_Sans/static/ShantellSans-ExtraBold.ttf')
doc.fill(`${process.argv[3]}`)
 
doc.text(`Hello ${process.argv[2]}!`, fullW/2, fullH/2)

// doc.text('This is where the image would be')
// doc.image('images/Key.png', {width: 800})
*/
// finalize the PDF and end the stream
doc.end();