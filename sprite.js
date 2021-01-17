let catchimage = [];let sprite = [];let bit = 7;let scnt = 0;
let x = 0;let y = 0;let z = 0;
let rd = 0;let gr = 0;let bl = 0;
let dt = 0;
let lum = 0;
let n = 0;
let col = 0;
var typeTexts;
let cnt=0;
function setup() {  
    var cvs = createCanvas(500, 210); // Create Canvas of given size    
    background(200,200,200); // Set the background color 
    textAlign(CENTER); // Set the text position    
    textSize(24); // Set the font size           
    fill('white'); // Set the text color           
    text('Drop image file here', width / 2, height / 2); // Display the text on the screen     
    cvs.drop(gotFile); // Function to drop the file 
}

function draw() {if (img) {image(img, 0, 0, width, height);}}   
function gotFile(file) {img = createImg(file.data).hide();}
function gotFile(file) {  
	if (file.type === 'image') {// If it's an image file
		const img = createImg(file.data).hide();// Create an image DOM element but don't show it
		image(img,0,0,24,21);// Draw the image onto the canvas
		z=0;
		for(y = 0;y<21;y++){
			for(x = 0;x<24;x+=1){			
				rd = red(get(x,y));
				gr= green(get(x,y));
				bl = blue(get(x,y));
				lum = (rd + gr + bl)/3
				dt=0;n = 0;
				if (lum < 100){n = 1;}
				if (lum > 100){n = 0;}
				if (n == 1){dt=1;}
				if (n == 0){dt=0;}
				catchimage[z] = dt;        
				z+=1;
			}//end of for(x)
		}//end of for (y)
		for (scnt = 0;scnt<63;scnt+=1){sprite[scnt] = 0;}
		scnt = 0;
		bit = 7;
		ncnt = 0;
		pout = 'data ';
		hout = 'byte ';
		poutR ='data ';
		houtR ='byte ';
		z=0;
		for (y = 0;y<21;y+=1){
			for (x = 0;x<24;x+=1){
				if(catchimage[z] == 0){stroke(255,255,255);fill(255,255,255);}
				if(catchimage[z] == 1){stroke(0,0,0);fill(0,0,0);sprite[scnt] = sprite[scnt] + pow(2,bit);} 	  
				rect(x * 10,y*10,10,10);
				if(catchimage[z] == 1){stroke(255,255,255);fill(255,255,255);}
				if(catchimage[z] == 0){stroke(0,0,0);fill(0,0,0);} 	  
				rect(25*10+x * 10,y*10,10,10);
				bit = bit - 1;
				if (bit < 0){bit = 7;
					ncnt = ncnt + 1;
					if (ncnt <8){
						pout = pout + String(sprite[scnt])+',';hout = hout + hex(sprite[scnt],2)+',';
						poutR = poutR + String(255-sprite[scnt])+',';houtR = houtR + hex(255+sprite[scnt],2)+',';}
						if (ncnt == 8){
							pout = pout + String(sprite[scnt])+'<br>';hout = hout + hex(sprite[scnt],2)+'<br>';ncnt = 0;pout = pout + 'data ';hout = hout + 'byte '
							poutR = poutR + String(255-sprite[scnt])+'<br>';houtR = houtR + hex(255-sprite[scnt],2)+'<br>';poutR = poutR + 'data ';houtR = houtR + 'byte '}
							scnt = scnt +1;}
						z +=1;
			}//end of for(x)
		}//end of for(y)
		pout = pout + '.';hout = hout + '.'
		poutR = poutR +'.';houtR = houtR +'.'
		pout = splitTokens(pout,',.');hout = splitTokens(hout,',.')
		poutR = splitTokens(poutR,',.');houtR = splitTokens(houtR,',.')
		document.getElementById("dump").innerHTML = pout;
		document.getElementById("dump2").innerHTML = hout;
		document.getElementById("dumpR").innerHTML = poutR;
		document.getElementById("dumpR2").innerHTML = houtR;	
	} else {
    console.log('Not an image file!');
	}
}