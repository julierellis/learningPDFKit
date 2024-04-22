//  const	fs = require('fs');
//	const path = require('node:path');

// const PDFDocument = require('pdfkit');

function  makePDF(clientName, coreType, subType, doc, res) {
	
	doc.pipe(res)
/*
	doc.moveTo(0, 20)                               // set the current point
	    .lineTo(100, 160)                            // draw a line
	   .stroke();
	doc.text(`${clientName} is a ${coreType} with subtype ${subType}`);	// add some text
*/	
	const 	fullW = 792;
	const 	fullH = 612;
	const 	headerH = 100;
	const 	footerH = 100;
	const 	padding = 10;

	doc.font('Courier')

	doc.rect(0, 0, fullW, headerH)
		.fillAndStroke('#ffffed', '#eeeeee')
		.stroke()
	
	// text always in black for now

	doc.fill('#000000');
	doc.text(`header area`,0, 0, {
		width: fullW,
		align:"center"
		});
	
	doc.fill('#000000');
	doc.text(`version 1200S21Apr2024`,padding, headerH-padding, {
		width: fullW/3,
		align: "left",
		baseline: "bottom"
		});
					
// populate the header 	
	//add 'Integrative Enneagram' to header
	doc.fill(`#000000`)
	doc.fontSize(24);
	doc.font('./fonts/Shantell_Sans/static/ShantellSans-Regular.ttf')
	doc.text('Integrative',40, headerH/2,{ 
		width:(fullW/3),
		align: 'left',
		baseline: 'bottom'	
	})	
	doc.fontSize(30);
	doc.text('Enneagram',10, headerH/2+10,{ 
		width:(fullW/3),
		align: 'left',
		baseline: 'middle'	
	})
// This is too fiddly, and changing the headerH will impact the spacing.  Leave for now, but come back.
	
//Add the client's name, with the right color, at an appropriate fontSize
	const { colors } = require('./public/TypeColorCodes')	
	const clientCode = colors[coreType-1].hexCode;
	console.log(`we will use color ${clientCode}`)
	console.log(typeof clientCode)
	
	doc.font('./fonts/Shantell_Sans/static/ShantellSans-Bold.ttf')
	let nameFontSize = 18;
	while (nameFontSize < 49){
		doc.fontSize(nameFontSize)
		if (doc.widthOfString(clientName) > fullW/3 ) break;
		nameFontSize++
	}
	console.log(nameFontSize)
	

	const ellipseXrad = doc.widthOfString(clientName)/2+ 2*padding;
	const ellipseYrad = (headerH-padding)/2;	 
	doc.ellipse(fullW/2, (headerH-padding), ellipseXrad, ellipseYrad)
	doc.fill(clientCode);  // it seems so weird that this goes AFTER the creation of the ellipse.  Is it like stroke()?
		
	doc.fill(`#ffffff`) // name is always white
	doc.text(clientName,padding , (headerH-padding),{ 
		width:(fullW-padding),
		align: 'center',
		baseline: 'middle',
	})

// add the first image
doc.image(`./images/Type_${coreType}.cropped.png`, padding, headerH+padding,{
		width: fullW/2
});
doc.image(`./images/Type_${coreType} Finish.cropped.png`, 0.45*fullW, headerH+padding,{
	width: 0.55*fullW,
	height: fullH-headerH-footerH
});

}
module.exports = {makePDF}