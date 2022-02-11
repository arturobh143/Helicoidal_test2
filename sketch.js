// Horarios  -------------------------
let x_hor = 50; 
let y_hor = 75; 
let input1; //Input de temperatura de agua
let button1;
let button2;
let is_insert_par;
let num_hor;
let horarios = ['0811', '0813', '0814', '0815', '0816'];
let temp_table = [5, 10, 15, 20, 25, 30, 35, 40];
let dens_table = [999.9, 999.7, 999.1, 998.0, 997.0, 996.0, 994.0, 992.1];
let vis_table = [1.519, 1.307, 1.138, 1.002, 0.891, 0.798, 0.720, 0.653];

// Datos ------------------------------------------------
let x_dat = 420; //Valor x del alarma
let y_dat = 75; //Valor y del alarma (665)
let slider1; //Flujo de agua fria
let slider2; //Flujo de agua caliente
let slider3; //Potencia en la resistencia

// Modulo de visualizacion (dashboard)------------------
let x_dash = 50; 
let y_dash = 285;
let button3;
let vista;

// Valores ---------------------------------------------------
let temp_fria_in;
let temp_fria_out;
let temp_caliente_in;
let temp_caliente_out;
let temp_caliente_in_ob;
let temp_caliente_out_ob;
let dens_fria_in;
let vis_fria_in;
let flujo_fria;
let flujo_caliente;
let potencia;
let potencia_max = 100;

function preload() {
    logo_pucp = loadImage('https://raw.githubusercontent.com/arturobh143/Helicoidal_test2/gh-pages/img1.jpg');
	logo_laben = loadImage('https://raw.githubusercontent.com/arturobh143/Helicoidal_test2/gh-pages/img2.jpg');
	end_view = loadImage('https://raw.githubusercontent.com/arturobh143/Helicoidal_test2/gh-pages/end_view.png');
	tube_view = loadImage('https://raw.githubusercontent.com/arturobh143/Helicoidal_test2/gh-pages/tube_view.png');
	//half_view = loadImage('half_view.png');
}

function setup() {

    createCanvas(950, 950);
    textAlign(CENTER, CENTER);
    logo_pucp.resize(150, 50);
    logo_laben.resize(150, 50);
	angleMode(DEGREES);
	
	input1 = createInput();
    input1.position(x_hor + 70, y_hor + 63);
    input1.style('width', '50px');
	input1.attribute('disabled','');
	
	button1 = createButton('Ingresar T1');
    button1.position(x_hor + 230, y_hor + 130);
	button1.size(100,50);
	button1.mousePressed(in_pa);
	button1.attribute('disabled','');
	num_hor = 0;
	button2 = createButton(horarios[num_hor]);
    button2.position(x_hor + 230, y_hor + 55);
    button2.size(100,50);
	button2.mousePressed(ch_hor);
	vista = true;
	button3 = createButton('Vista');
    button3.position(x_dash + 18, y_dash + 280);
    button3.size(100,50);
	button3.mousePressed(ch_vista);
	
	slider1 = createSlider(0.5,2.5,0.5,0.25);
    slider1.position(x_dat+20, y_dat+110);
    slider1.style('width', '180px'); 
	slider1.attribute('disabled','');
	
	slider2 = createSlider(0.5,2.5,0.5,0.25);
    slider2.position(x_dat+280, y_dat+110);
    slider2.style('width', '180px'); 
	
	slider3 = createSlider(0,100,70,10);
    slider3.position(x_dash+360, y_dash+210);
    slider3.style('width', '180px'); 
	slider3.attribute('disabled','');
	
	//Valores iniciales
	temp_fria_in = 25;
	temp_caliente_in = 70;
	flujo_fria = slider1.value();
	flujo_caliente = slider2.value();
	potencia = slider3.value();
	
	temp_fria_out = -0.6461*pow(flujo_caliente,2) + 4.5015*flujo_caliente + 26.968;
	temp_caliente_out = -1.8535*pow(flujo_caliente,2) + 9.4992*flujo_caliente + 50.091;
	temp_fria_out_ob = temp_fria_out;
	temp_caliente_out_ob = temp_caliente_out;
	dens_fria_in = 997.0;
	vis_fria_in = 0.891; //*10(-3)	
}

function draw() {

    background(220);
    fill(255);
    rect(50, 5, 850, 60);
    fill(0);
    image(logo_pucp, 60, 10);
    image(logo_laben, 740, 10);
	
	//Posición X y Y (para desarrollo)
	//text('X_dash = ', 470 , 20);
	//text(mouseX-x_dash, 510 , 20);//mouseX
    //text('Y_dash =  ', 470 , 40);//mouseY
	//text(mouseY-y_dash, 510 , 40);
	
	flujo_fria = slider1.value();
	flujo_caliente = slider2.value();
	potencia = slider3.value();
	temp_fria_out_ob = -1.3851*pow(flujo_caliente,2) + 8.9107*flujo_caliente + 30.467;
	temp_caliente_out_ob = -1.4462*pow(flujo_caliente,2) + 6.9574*flujo_caliente + 57.537;
	
	if((temp_fria_out>temp_fria_out_ob)&&(abs(temp_fria_out-temp_fria_out_ob)>0.001)){
		temp_fria_out = temp_fria_out - 0.001;
	}else if((temp_fria_out<temp_fria_out_ob)&&(abs(temp_fria_out-temp_fria_out_ob)>0.001)){
		temp_fria_out = temp_fria_out + 0.001;
	}
	
	if((temp_caliente_out>temp_caliente_out_ob)&&(abs(temp_caliente_out-temp_caliente_out_ob)>0.001)){
		temp_caliente_out = temp_caliente_out - 0.001;
	}else if((temp_caliente_out<temp_caliente_out_ob)&&(abs(temp_caliente_out-temp_caliente_out_ob)>0.001)){
		temp_caliente_out = temp_caliente_out + 0.001;
	}
    //Funciones de dibujo
    dib_hor(); //Box de horarios
	dib_dat(); // Boz de datos
    dib_dashboard(); // Box del ensayo
}

function mousePressed() {
}

function mouseReleased() {
}

function in_pa() {
	iv1 = float(input1.value());
	if (iv1 >= 5 && iv1 <= 40 && iv1 != '') {
		/*temp_fria_in = float(input1.value()); //Temperatura
		for(i=0; i<9; i++){
			if(temp_fria_in==temp_table[i]){
				dens_fria_in = dens_table[i];
				vis_fria_in = vis_table[i];
			}
		}
		for(i=0; i <8; i++){
			if(temp_fria_in > temp_table[i]){
				if(temp_fria_in < temp_table[i+1]){
					vis_fria_in = (((vis_table[i+1]-vis_table[i])/(temp_table[i+1]-temp_table[i]))*(temp_fria_in-temp_table[i]))+vis_table[i];
					dens_fria_in = (((dens_table[i+1]-dens_table[i])/(temp_table[i+1]-temp_table[i]))*(temp_fria_in-temp_table[i]))+dens_table[i];
				}
			}
		}*/
	}
	input1.value('');
}

function ch_hor() {
    num_hor= num_hor + 1;
    if (num_hor > horarios.length-1) {
        num_hor = 0;
    }
    button2.html(horarios[num_hor]);
}

function ch_vista() {
    if(vista){
		vista = false;
	}else{
		vista = true;
	}
}

function dib_hor() {
	push();
	translate(x_hor,y_hor);
    fill(250);
    strokeWeight(1);
    rect(0, 0, 360, 200);
	
	//----------------------------------------------------------------------
    line(200, 10, 200, 120);
	line(200, 120, 350, 120);
    // Texto
    fill('black');
    textStyle(BOLD);
    textSize(14);
    text('PARÁMETROS', 100 , 20);
    text('DE PUNTO 1', 100 , 40);
    text('SELECCIONAR ', 280, 20);
    text('HORARIO ', 280, 40);

    fill(0);
    textStyle(BOLD);
    rect(20, 60, 30, 30);
    rect(20, 100, 30, 30);
    rect(20, 140, 30, 30);

    textSize(14);
    fill(0, 255, 0);
    text('Ta', 35, 75); //Temperatura agua
    text('ρ', 35, 115); //densidad
    text('μ', 35, 155); //viscosidad dinamica
	
	// Unidades
    fill(0);
	text(nf(dens_fria_in,3,2), 95, 115);
	text(nf(vis_fria_in,1,3), 90, 155);
    text('°C', input1.x  + 50, 75);
    text('kg/m^3', input1.x  + 40, 115);
	text('x10^(-3)', input1.x +20, 155);
    text('Pa.s', input1.x  + 70, 155);

    text(round(temp_fria_in,1), input1.x + 25, 75);
	fill(0);
    textSize(12);
	//----------------------------------------------------------------------
	pop();
}

function dib_dat() {
	push();
	translate(x_dat,y_dat);
    fill(250);
    strokeWeight(1);
    rect(0, 0, 480, 200);
	fill('black');
    textStyle(BOLD);
    textSize(14);
    text('CONTROL DE', 240 , 20);
    text('VARIABLES', 240 , 40);
	text('FLUJO 1-2', 110 , 80);
	text('FLUJO 3-4', 370 , 80);
	//Indicadores---------------
	push();
	fill('black');
	rect(50, 150, 30, 30); //Flujo frio
	rect(90,150,90,30);
	rect(310, 150, 30, 30); //Flujo caliente
	rect(350,150,90,30);
	
	fill(0, 255, 0);
    textSize(14);
    textStyle(BOLD);
	text('Vf', 65, 165); // Flujo frio
	text(round(flujo_fria,2),115,165);
	text('l/s',155,165);
	text('Vc', 325, 165); // Flujo frio
	text(round(flujo_caliente,2),375,165);
	text('l/s',415,165);
	pop();
	pop();
}

function dib_dashboard() {
	push();
	translate(x_dash,y_dash);
    fill(255);
    strokeWeight(1);
    rect(0 , 0, 850, 655);
	if(vista){
		image(end_view,80,10,220,600,480,0,220,600);
	}else{
		image(tube_view,80,10,220,600,480,0,220,600);
	}
	push();
	strokeWeight(0.5);
	//Tanque
	fill('grey');
	rect(570,70,200,230);
	triangle(570,70,670,50,770,70);
	fill(255,255-potencia*255/potencia_max,255-potencia*255/potencia_max);
	rect(550,270,150,5);
	for(let i=0; i<5; i++){
		push();
		translate(698,170+i*20);
		rotate(-10);
		rect(0,0,-55,5);
		pop();
	}
	for(let i=0; i<5; i++){
		push();
		translate(698,190+i*20);
		rotate(10);
		rect(0,0,-55,5);
		pop();
	}
	rect(550,170,150,5);
	//Salida de fria
	fill(230,120,55);
	rect(105,88.5,-40,8);
	arc(65,96.5,16,16,180,270);
	rect(65,96.5,-8,60);
	//Ingreso de fria
	fill(230,120,55);
	rect(285,524.5,100,8);
	rect(465,524.5,50,8);
	//Ingreso de caliente
	fill(200,190,190);
	arc(254,40,16,16,180,270);
	rect(254,40,26,-8);
	arc(280,40,16,16,270,0);
	rect(280,40,8,335);
	arc(288,375,16,16,90,180);
	rect(288,375,50,8);
	rect(368,375,100,8);
	rect(590,355,50,8);
	arc(640,355,16,16,0,90);
	rect(640,355,8,-65);
	//Salida de caliente
	fill(200,190,190);
	rect(138,580,8,20);
	arc(146,600,16,16,90,180);
	rect(146,600,654,8);
	arc(800,600,16,16,0,90);
	rect(800,600,8,-570);
	arc(800,30,16,16,270,0);
	rect(800,30,-80,-8);
	arc(720,30,16,16,180,270);
	rect(720,30,-8,50);
	//Bomba
	fill('blue');
	triangle(468,340,468,410,550,410);
	ellipse(550,360,100,100);
	//Valvula de fria
	fill(0);
	triangle(385,508.5,385,548.5,435,528.5);
	triangle(415,528.5,465,508.5,465,548.5);
	rect(415,528.5,20,-30);
	fill('red');
	rect(385,498.5,80,-10);
	//Valvula de caliente
	fill(0);
	triangle(335,358.5,335,398.5,385,378.5);
	triangle(365,378.5,415,358.5,415,398.5);
	rect(365,378.5,20,-30);
	fill('red');
	rect(335,348.5,80,-10);
	//AGUA
	fill(145,230,240,102);
	rect(570,120,200,180);
	if(flujo_caliente>0){
		rect(712,78,8,42);
	}
	//-------------------------------------
	//Termopares
	fill('grey');
	//T1 - Ingreso fria
	rect(310,523,15,-5);
	rect(315,518,5,-10);
	//T2 - Salida fria
	rect(70,87,15,-5);
	rect(75,82,5,-10);
	//T3 - Ingreso caliente
	rect(287,80,5,15);
	rect(292,85,10,5);
	//T4 - Salida caliente
	rect(710,600,15,-5);
	rect(715,595,5,-10);
	//Indicadores---------------
	push();
	fill('black');
	rect(270, 450, 30, 30); //T1
	rect(310,450,80,30);
	rect(10, 15, 30, 30); //T2
	rect(50,15,80,30);
	rect(310, 70, 30, 30); //T3
	rect(350,70,80,30);
	rect(660, 550, 30, 30); //T4
	rect(700,550,80,30);
	
	fill(0, 255, 0);
    textSize(14);
    textStyle(BOLD);
	text('T1', 285, 465); // T1
	text(round(temp_fria_in,2),335,465);
	text('°C',375,465);
	text('T2', 25, 30); // T2
	text(round(temp_fria_out,2),75,30);
	text('°C',115,30);
	text('T3', 325, 85); // T3
	text(round(temp_caliente_in,2),375,85);
	text('°C',415,85);
	text('T4', 675, 565); // T4
	text(round(temp_caliente_out,2),725,565);
	text('°C',765,565);
	pop();
	//-------------------------------------
	fill(0);
	textSize(14);
	text('SALIDA', 60, 180);
	text('INGRESO', 550, 528.5);
	pop();
	push();
	fill('black');
    textStyle(BOLD);
    textSize(14);
	text('POTENCIA DE RESISTENCIAS', 450 , 190);
	fill('black');
	rect(400, 240, 30, 30); //Potencia
	rect(440,240,80,30);
	fill(0, 255, 0);
    textSize(14);
    textStyle(BOLD);
	text('We', 415, 255); // Potencia
	text(round(potencia,2),465,255);
	text('%',505,255);
	pop();
	pop();
}