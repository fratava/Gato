var globals = {};
$(".start").click(function() {
    var dificultad = "alto";
    if(typeof dificultad !== "undefined") {
        var maquina = new Computadora(dificultad);
        globals.game = new Game(maquina);
        maquina.plays(globals.game);
        globals.game.start();
    }
});

$(".cell").each(function() {
     var $this = $(this);
     $this.click(function() {
         if(globals.game.status === "running" && globals.game.currentState.turn === "X" && !$this.hasClass('occupied')) {
             var indx = parseInt($this.data("indx"));

             var next = new State(globals.game.currentState);
             next.board[indx] = "X";

             ui.insertAt(indx, "X");

             next.advanceTurn();

             globals.game.advanceTo(next);

         }
     })
 });


$(".reiniciar").click(function () {
      location.reload();
});