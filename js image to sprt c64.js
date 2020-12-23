let catchimage = [];
let sprite = [];
let bit = 7;
let scnt = 0;
let x = 0;
let y = 0;
let z = 0;
let rd = 0;
let gr = 0;
let bl = 0;
let dt = 0;
let col = 0;
var typeTexts;
var pout = '';
function setup() {
  // Create Canvas of given size  
     var cvs = createCanvas(240, 210); 
       
      
    // Set the background color 
    background(200,200,200); 
    
    // Set the text position 
    textAlign(CENTER); 
      
    // Set the font size 
    textSize(24); 
      
    // Set the text color 
    fill('white'); 
      
    // Display the text on the screen 
    text('Drop file from device', width / 2, height / 2); 
      
    // Function to drop the file 
    cvs.drop(gotFile); 
}

function draw() {
  if (img) { 
    image(img, 0, 0, width, height); 
  } 
} 
  
function gotFile(file) { 
  img = createImg(file.data).hide(); 
}
function gotFile(file) {
  // If it's an image file
  if (file.type === 'image') {
    // Create an image DOM element but don't show it
    const img = createImg(file.data).hide();
	    // Draw the image onto the canvas		
	image(img,0,0,24,21);
    z=0;
	for(y = 0;y<21;y++){
		for(x = 0;x<24;x+=1){
			rd = red(get(x,y));
			gr= green(get(x,y));
			bl = blue(get(x,y));
			dt=0;
			if (rd>100){dt = 1;}
			if (gr>100){dt = 1;}
			if (bl>100){dt = 1;}
			catchimage[z] = dt;        
        dt=0;z+=1;
		}
	}
	for (scnt = 0;scnt<63;scnt+=1){sprite[scnt] = 0;}
	scnt = 0;
	bit = 7;
	ncnt = 0;
	pout = 'data ';
    z=0;
	
      for (y = 0;y<21;y+=1){
      for (x = 0;x<24;x+=1){
      if(catchimage[z] == 0){fill(0,0,0);sprite[scnt] = sprite[scnt] + pow(2,bit);}
      if(catchimage[z] == 1){fill(200,200,200);}
	  rect(x * 10,y*10,10,10);
	  	  bit = bit -1;
	  if (bit == -1){bit = 7;
	  ncnt = ncnt + 1;
	  if (ncnt <8){pout = pout + String(sprite[scnt])+',';}
	  if (ncnt == 8){pout = pout + String(sprite[scnt])+'<br>';ncnt = 0;pout = pout + 'data '}
	 scnt = scnt +1;}
      z +=1;}
	  }	 
	  pout = pout + 0;
    document.getElementById("dump").innerHTML = pout;
	//typeTexts.position(80, 210);	
	
  } else {
    console.log('Not an image file!');
}}
