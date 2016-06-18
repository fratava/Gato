var maquina = function(pos) {

    this.movePosition = pos;
    this.minimaxVal = 0;

    this.applyTo = function(state) {
        var siguiente = new State(state);
        siguiente.board[this.movePosition] = state.turn;

        if(state.turn === "O")
            siguiente.oMovesCount++;
        siguiente.advanceTurn();
        return siguiente;
    }
};

maquina.sube = function(primero, segundo) {
    if(primero.minimaxVal < segundo.minimaxVal)
        return -1;
    else if(primero.minimaxVal > segundo.minimaxVal)
        return 1;
    else
        return 0;
}

maquina.baja = function(primero, segundo) {
    if(primero.minimaxVal > segundo.minimaxVal)
        return -1;
    else if(primero.minimaxVal < segundo.minimaxVal)
        return 1;
    else
        return 0;
}


var Computadora = function(nivel) {

    var Niveldeinteligencia = nivel;
    var game = {};

    function valorminimax(state) {
        if(state.isTerminal()) {
            return Game.score(state);
        }
        else {
            var punestado;

            if(state.turn === "X")
                punestado = -1000;
            else
                punestado = 1000;

            var posposible = state.emptyCells();
            var sigespos = posposible.map(function(pos) {
                var movimiento = new maquina(pos);

                var sigestado = movimiento.applyTo(state);

                return sigestado;
            });

            sigespos.forEach(function(nextState) {
                var sigpun = valorminimax(nextState);
                if(state.turn === "X") {
                    if(sigpun > punestado)
                        punestado = sigpun;
                }
                else {
                    if(sigpun < punestado)
                        punestado = sigpun;
                }
            });

            return punestado;
        }
    }

    function movmaquina(turn) {
        var disponible = game.currentState.emptyCells();

        var accionesdisp = disponible.map(function(pos) {
            var mov =  new maquina(pos);
            var siguiente = mov.applyTo(game.currentState);
            mov.minimaxVal = valorminimax(siguiente);
                                          
            return mov;
        });

        if(turn === "X")
            accionesdisp.sort(maquina.baja);
        else

            accionesdisp.sort(maquina.sube);

        
        var elegir = accionesdisp[0];
        var siguiente = elegir.applyTo(game.currentState);

        ui.insertAt(elegir.movePosition, turn);
        game.advanceTo(siguiente);
    }

    this.plays = function(_game){
        game = _game;
    };

    this.notify = function(turn) {
        switch(Niveldeinteligencia) {
            case "alto": movmaquina(turn); break;
        }
    };
};
