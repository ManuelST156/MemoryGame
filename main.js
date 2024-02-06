//Variables
let tarjetasDestapadas=0;
let numeros=[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
console.log(numeros);
numeros=numeros.sort(()=>{return Math.random()-0.5});
let tarjeta1=null;
let tarjeta2=null;
let movimientos=0;
let aciertos=0;
let temporizador=false;
let timer=60;
let tiempoRegresivoId=null;
let timerInicial=60;


//Apuntando a documento html
let mostrarmovimientos=document.getElementById('movimientos');
let mostraraciertos=document.getElementById('aciertos');
let mostrartiempo= document.getElementById('t-restante');
let mostrarReiniciar=document.getElementById('Reiniciar');

//SOnidos

let lose= new Audio("./sounds/lose.wav");
let win= new Audio("./sounds/win.wav");
let backgroundMusic= new Audio("./sounds/backgorundMusic.wav");
let correct= new Audio("./sounds/correct.wav");
let incorrect= new Audio("./sounds/incorrect.wav");







//Funciones

function reiniciar()
{   
    clearInterval(tiempoRegresivoId);
    timer=60;
    tarjeta1.innerHTML= '';
    tarjeta2.innerHTML= '';
    tarjetasDestapadas=0;
    numeros=numeros.sort(()=>{return Math.random()-0.5});
    temporizador=false;
    movimientos=0;
    mostrarmovimientos.innerHTML=`Movimientos: ${movimientos}`;
    backgroundMusic.currentTime=0;
    backgroundMusic.pause();
    console.log(backgroundMusic);
    aciertos=0;
    mostraraciertos.innerHTML=`Aciertos: ${aciertos}`;
    timerInicial=60;
    tarjeta1=null;
    tarjeta2=null;
    tarjetasDestapadas=0;
    

    

    for(let i=0; i<=15; i++)
    {
        let tarjetaBloqueada=document.getElementById(i);
        tarjetaBloqueada.disabled=false;
        tarjetaBloqueada.innerHTML='';
    }

    
}


function contarTiempo()//Funcion para iniciar cronometro cuando el jugador haga la primera eleccion
{
    tiempoRegresivoId=setInterval(()=>{
        timer--;
        mostrartiempo.innerHTML= `Tiempo: ${timer} segundos`;
        backgroundMusic.play();
        backgroundMusic.volume=0.2;
        if(timer==0)
        {
        clearInterval(tiempoRegresivoId); //Funcion para parar el contador  de set interval cuando timer llegue a 0
        bloquearTarjetas();
        lose.play();
        backgroundMusic.pause();

        }
    },1000);
}



function bloquearTarjetas(){ //funcion para mostrar las tarjetas
    for(let i=0; i<=15; i++)
    {
        let tarjetaBloqueada=document.getElementById(i);
        tarjetaBloqueada.innerHTML=`<img src="./image/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled=true;
    }
}


function destapar(id){

    if(temporizador==false)//if para iniciar el cronometro cuando se presione el boton de numeros y no haya iniciado
    {
        contarTiempo();
        temporizador=true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas==1)
    {
        //Mostrar el primer numero
        tarjeta1=document.getElementById(id);
        primerResultado=numeros[id];
        tarjeta1.innerHTML=`<img src="./image/${primerResultado}.png" alt="">`;

        tarjeta1.disabled=true;
        mostrarReiniciar.disabled=true;

    }
    else if(tarjetasDestapadas==2)
    {
        tarjeta2=document.getElementById(id);
        segundoResultado=numeros[id];
        tarjeta2.innerHTML=`<img src="./image/${segundoResultado}.png" alt="">`;;

        tarjeta2.disabled=true;
        movimientos++;
        mostrarmovimientos.innerHTML=`Movimientos: ${movimientos}`;
        mostrarReiniciar.disabled=false;

        if(primerResultado==segundoResultado){
            tarjetasDestapadas=0;
            aciertos++;
            mostraraciertos.innerHTML=`Aciertos: ${aciertos}`;
            correct.play();

            if(aciertos==8)
            {
                mostraraciertos.innerHTML=`Aciertos: ${aciertos} 👌`;
                mostrarmovimientos.innerHTML=`Movimientos: ${movimientos} 👍`;
                mostrartiempo.innerHTML=`Has tardado: ${timerInicial-timer} segundos 🕐`;
                clearInterval(tiempoRegresivoId);
                win.play();
                backgroundMusic.pause();
            }
        }
        else{
            setTimeout(()=>{
                tarjeta1.innerHTML= '';
                tarjeta2.innerHTML= '';
                tarjeta1.disabled=false;
                tarjeta2.disabled=false;
                tarjetasDestapadas=0;
                incorrect.play();
            },500);
        }
    }
}

