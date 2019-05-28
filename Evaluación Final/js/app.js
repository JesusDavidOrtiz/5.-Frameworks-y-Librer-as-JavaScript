$(function(){
    iniciar();
    
    //Cambio de color del título “Match Game”
    function CambiarColor(selector) {
  	    $(".main-titulo").animate({
  			opacity: '1',
  		}, {
  			step: function () {
  				$(this).css('color', 'white');
  			},
  			queue: true
  		})
  		.animate({
  			opacity: '1'
  		}, {
  			step: function () {
  				$(this).css('color', 'yellow');
  			},
  			queue: true
  		}, 600)
  		.delay(1000)
  		.animate({
  			opacity: '1'
  		}, {
  			step: function () {
  				$(this).css('color', 'white');
  			},
  			queue: true
  		})
  		.animate({
  			opacity: '1'
  		}, {
  			step: function () {
  				$(this).css('color', 'yellow');
  				CambiarColor('h1.main-titulo');
  			},
  			queue: true
  		});
    }
  
    function iniciar() {
    	CambiarColor('h1.main-titulo');
    }
    //Finaliza el cambio de color del título “Match Game”

    //Inicia Función para llenar el tablero de dulces
    function LlenarTablero(){
        for (var i = 0; i <= 7; i++) {
            for (var j = 0; j < 7; j++) {
            var numero =Math.floor((Math.random()*4)+1);
            $(".col-"+i).append("<img class= 'elemento' src='image/"+numero+".png'>")
            }
        }
        Juego();
    }

    //Columnas de tres imagenes iguales
    function Columnas (){
        var ac = false
        for (var c = 1; c <= 7; c++) {
        for (var f = 1; f <= 7; f++) {
            imagen1 = $(".col-"+c).children("img:nth-child("+f+")").attr("src")
            imagen2 = $(".col-"+c).children("img:nth-child("+(f+1)+")").attr("src")
            imagen3 = $(".col-"+c).children("img:nth-child("+(f+2)+")").attr("src")
            if (imagen1 == imagen2 && imagen2 == imagen3) {
                $(".col-"+c).children("img:nth-child("+f+")").attr("class", "elemento igual")
                $(".col-"+c).children("img:nth-child("+(f+1)+")").attr("class", "elemento igual")
                $(".col-"+c).children("img:nth-child("+(f+2)+")").attr("class", "elemento igual")
                ac = true
            }
        }
        }
        return ac
    }

    //Filas de tres imágenes "Dulces" iguales
    function Filas (){
        var af = false
        for (var f = 1; f <= 7; f++) {
        for (var c = 1; c <= 7; c++) {
            imagen1 = $(".col-"+f).children("img:nth-child("+c+")").attr("src")
            imagen2 = $(".col-"+(f+1)).children("img:nth-child("+c+")").attr("src")
            imagen3 = $(".col-"+(f+2)).children("img:nth-child("+c+")").attr("src")
            if (imagen1 == imagen2 && imagen2 == imagen3) {
                $(".col-"+f).children("img:nth-child("+c+")").attr("class", "elemento igual")
                $(".col-"+(f+1)).children("img:nth-child("+c+")").attr("class", "elemento igual")
                $(".col-"+(f+2)).children("img:nth-child("+c+")").attr("class", "elemento igual")
                af = true
            }
        }
        }
        return af
    }

    //Borrar o suprimir tres o mas imágenes "Dulces" iguales
    function Juego() {
      anf = Filas()
      anc= Columnas()
      if (anf==true || anc==true) {
        BorrarDulces()
        }else {
        MoverDulces();
        }
    }
    
    //Obteniendo puntaje del juego
    var PuntajeTotal=0;
    function BorrarDulces (){
        $(".igual").hide("pulsate",1000, function () {
        var puntaje = $(".igual").length
        $("img").remove(".igual")
        PuntajeTotal= PuntajeTotal+puntaje
        $("#score-text").text(PuntajeTotal);
        setTimeout(DulcesNuevos, 400)
        })
    }

    function DulcesNuevos(){
        for (var c = 1; c <= 7; c++) {
            for (var f = 1; f <= 7; f++) {
                if ($(".col-"+f).children("img:nth-child("+c+")").html() == null) {
                    var numero = Math.floor((Math.random() * 4) + 1);
                    $(".col-"+f).prepend("<img class= 'elemento' src='image/"+numero+".png'>");
                }
            }
        }
        Juego();
    }

    //Obteniendo número de movimientos
    var MovimientoTotal=0;
    function MoverDulces(){
        var dulce1
        var dulce2
        var dulceSrc1
        var dulceSrc2
        $("img").draggable({
            revert: "valid",
            containment: ".panel-tablero",
            start: function (){
              dulce1 = this
              dulceSrc1 = $(this).attr("src")
            }
        })
        $("img").droppable({
            drop: function (){
                dulce2 = this
                dulceSrc2 = $(this).attr("src")
                $(dulce2).attr("src", dulceSrc1)
                $(dulce1).attr("src", dulceSrc2)
                MovimientoTotal = MovimientoTotal + 1
                $("#movimientos-text").html(MovimientoTotal)
                setTimeout(Juego, 500)
            }
        })
    }

    //Iniciar o reiniciar el juego con un temporizador
    var segundos = 0;
    var minuto = 2;

    function timer(){
        if (segundos == 0 && minuto > 0) {
            segundos = 59
            minuto --
        } else if (segundos !== 0 && minuto >= 0) {
            segundos --
        } else if (segundos == 0 && minuto == 0) {
            clearInterval(myTimer);
            TerminarJuego()
        }
        if(segundos>9){
            $("#timer").html("0"+minuto+":"+segundos)
        } else {
            $("#timer").html("0"+minuto+":0"+segundos)
        }
    }

    function TerminarJuego() {
        $(".panel-tablero").hide("slow")
        $(".panel-score").animate({
            width: "100%",
        }, "slow")
    }

    //Botón para reiniciar el juego
    $(".btn-reinicio").click(function() {
        var textoboton = $(this).text()
        LlenarTablero();
        $(this).text("Reiniciar");
        myTimer = setInterval(timer, 1000)
        if (textoboton=="Reiniciar") {
            location.reload()
        }
    })

});
