let catchimage = [];
let sprite = [];let bit = 7;
let scnt = 0;
let x = 0;let y = 0;let z = 0;
let rd = 0;let gr = 0;let bl = 0;
let dt = 0;
let n = 0;
let col = 0;
let typeTexts;
let cnt=0;
function setup() {  
    var cvs = createCanvas(240, 210); // Create Canvas of given size                   
    background(200,200,200); // Set the background color         
    textAlign(CENTER); // Set the text position           
    textSize(24); // Set the font size           
    fill('white'); // Set the text color           
    text('Drop image file here', width / 2, height / 2);// Display the text on the screen           
    cvs.drop(gotFile);// Function to drop the file 
}
function draw() {
  if (img) {image(img, 0, 0, width, height);} 
}  
function gotFile(file) {img = createImg(file.data).hide();}   
function gotFile(file) {
    if (file.type === 'image') {// If it's an image file
    const img = createImg(file.data).hide();// Create an image DOM element but don't show it	    		
	image(img,0,0,240,210);// Draw the image onto the canvas
    z=0;
	for(y = 0;y<21;y++){// sprite y color picker vector
		for(x = 0;x<12;x++){// sprite x color picker vector			
			rd =   red(get(10+(10*2)*x,5+(10*y)));
			gr = green(get(10+(10*2)*x,5+(10*y)));
			bl =  blue(get(10+(10*2)*x,5+(10*y)));
			n = 0;dt=0
			if (rd>100){n = n + pow(2,0);}
			if (gr>100){n = n + pow(2,1);}
			if (bl>100){n = n + pow(2,2);}
			if (n == 1){dt=1;}
			if (n == 2){dt=2;}
			if (n == 4){dt=3;}
			if (n == 0){dt=3;}
			catchimage[z] = dt;z+=1;
		}
	}
	for (scnt = 0;scnt<63;scnt+=1){sprite[scnt] = 0;}
	scnt = 0;
	bit = 7;
	ncnt = 0;
	pout = 'data ';
	hout = 'byte ';
    z=0;
    for (y = 0;y<21;y+=1){
		for (x = 0;x<12;x+=1){
			if(catchimage[z] == 0){stroke(255,255,255);fill(255,255,255);}
			if(catchimage[z] == 1){stroke(200,0,0);fill(200,0,0);sprite[scnt] = sprite[scnt] + pow(2,bit);}
			if(catchimage[z] == 2){stroke(0,200,0);fill(0,200,0);sprite[scnt] = sprite[scnt] + pow(2,bit-1);}
			if(catchimage[z] == 3){stroke(0,0,200);fill(0,0,200);sprite[scnt] = sprite[scnt] + pow(2,bit)+pow(2,bit-1);}		
			rect(x * 10 * 2,y*10,20,10);
			bit = bit - 2;
			if (bit <= 0){
				bit = 7;
				ncnt = ncnt + 1;
				if (ncnt <8){pout = pout + String(sprite[scnt])+',';hout = hout + hex(sprite[scnt],2)+',';}
				if (ncnt == 8){pout = pout + String(sprite[scnt])+'<br>';hout = hout + hex(sprite[scnt],2)+'<br>';ncnt = 0;pout = pout + 'data ';hout = hout + 'byte '}
				scnt = scnt +1;
			}
			z +=1;
		}			  		
	}
	stroke(255,255,0);
	strokeWeight(4);
	noFill();
	rect(0,0,240,210);
	pout = pout + '.';hout = hout + '.'
	pout = splitTokens(pout,',.')
	hout = splitTokens(hout,',.')
    document.getElementById("dump").innerHTML = pout;
	document.getElementById("dump2").innerHTML = hout;
	} else {console.log('Not an image file!');}
}
