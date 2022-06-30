//traemos el canvas para dibujar
const canvas = document.querySelector('canvas'), 
      context = canvas.getContext('2d');

//función dibujar lineas
function draw(xi,yi,xf,yf) 
{
    context.beginPath();
    context.lineWidth = 3;
    context.moveTo(xi, yi);
    context.lineTo(xf, yf);
    context.stroke();
}

draw(200,199,400,199); //base
draw(230,200,230,0); //poste
draw(230,1,360,1); //techo
draw(360,0,360,30); //cuerda
draw(360,70,360,130); //cuerpo
draw(360,130,380,170); //pierna derecha
draw(360,130,340,170); //pierna derecha
draw(360,80,380,120); //brazo derecho
draw(360,80,340,120); //brazo izquierdo

//dibujar cabeza
context.beginPath();
context.arc(360,50,20,0,2*Math.PI);
context.stroke();





