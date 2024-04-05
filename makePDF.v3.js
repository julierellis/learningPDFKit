const fs = require('fs');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument({layout : 'landscape'});
// console.log(process.argv);
doc.pipe(fs.createWriteStream('myFile2.pdf')); // write to PDF
// doc.pipe(res);                            // HTTP response

const fullW = 792;
const fullH = 612;
const headerH = 100;
const footerH = 100;
const padding = 10;

const { colors } = require('./public/TypeColorCodes.js')


// PDFKit uses a pen plotter kind of approach.
//mark out header and footer
	doc.font('Courier')

	doc.rect(0, 0, fullW, headerH)
//		.fill('#aaffaa')
		.stroke()
	
	doc.text("header area",0, 0, {
		width: fullW,
		align:"center"
		})
		doc.text(`You can put an organization's logo over here.`	+
			`It can be ${headerH} pts high and ${fullW/4} pts wide. ` +
			`(Note: points are different from pixels)`, 3*(fullW/4),padding,{
				width: fullW/4,
				align: "left"
			});
		/*
		doc.text(`Does this wrap? It DOES! Even at the right place relative to what came before`,{
			width: fullW/3,
			align: "left"
		});
		*/
		doc.text(`version 0700F05Apr2024`,padding, headerH-padding, {
			width: fullW/3,
			align: "left",
			baseline: "bottom"
		});
	
		doc.text("footer area" ,0 , fullH-footerH, {
			width: fullW,
			align:"center",
//			baseline: "bottom"

		})
/*
// There is something about the automatic adding of a page that screws this up.  Come back.						
		doc.text(`infinitecanvas.org logo`, padding, fullH-(footerH/2),{
			width: fullW/3,
			align: "left"
		});	
//		doc.moveUp();
		doc.text(`the coach's logo`, fullW/3, fullH-(footerH/2),{
			width: fullW/3,
			align: "center"
		});
//		doc.moveUp();
		doc.text(` "inspired by" IEQ9`, 2*(fullW/3), fullH-(footerH/2),{
			width: fullW/3-padding,
			align: "right"
		});					
		doc.rect(0, fullH-footerH, fullW, footerH)
//			.fill('#228822') 
			.stroke()
*/ 
					
// populate the header 
	
	//add 'Integrative' to header
		doc.fontSize(24);
		doc.font('./fonts/Shantell_Sans/static/ShantellSans-Regular.ttf')
		doc.fill(`#000000`)
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

//Add the client's name, with the right color, at an appropriate fontSize
const clientType = process.argv[3]; // need to test for valid input
		
const clientCode = colors[clientType-1].hexCode;
 //doc.fillColor(clientCode);

const clientName = process.argv[2];

doc.font('./fonts/Shantell_Sans/static/ShantellSans-Bold.ttf')
let nameFontSize = 18;
while (nameFontSize < 49){
	doc.fontSize(nameFontSize)
	if (doc.widthOfString(clientName) > fullW/3 ) break;
	nameFontSize++
}
console.log(nameFontSize)
	 
const ellipseXrad = doc.widthOfString(clientName)/2;

doc.ellipse(fullW/2, (headerH-padding), ellipseXrad+2*padding, (headerH-padding)/2)
	.fill(clientCode)
    .stroke()
doc.fill(`#ffffff`)
doc.text(`${process.argv[2]}`,padding , (headerH-padding),{ 
	width:(fullW-padding),
	align: 'center',
	baseline: 'middle',
})
// add the first image
doc.image(`./images/Type_${clientType}.cropped.png`, padding, headerH+padding,{
		width: fullW/2
});
doc.image(`./images/Type_${clientType} Finish.cropped.png`, 0.45*fullW, headerH+padding,{
	width: 0.55*fullW,
	height: fullH-headerH-footerH
});
/*
// Fill in the particulars

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
*/

// finalize the PDF and end the stream
doc.end();