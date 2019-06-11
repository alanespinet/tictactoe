(function($){
    "use strict"

    // DOM references
    var dom_boardgame = $('#app_boardgame');
    
    // referential variables
    var playValues = [5, 20];
    var playIimages = ['assets/img/circle.png', 'assets/img/cross.png'];

    // state variables
    var crossPlaying = true;
    var squaresFilled = 0;

    // phisical variables
    var gameboard = {
        dimensions: 3,
        squares: [],
        setup: function(){
            for( var i = 0; i < this.dimensions; i++ ){
                this.squares[i] = [];
                for( var j = 0; j < this.dimensions; j++ ){
                    this.squares[i][j] = 0;
                    dom_boardgame.append( createSquareImage(i, j) );
                }
            }
        }
    };

    // helpers
    function createSquareImage(i, j){
        var simg = '<img class="img_square" src="assets/img/blank.png" alt="" />';
        var $simgWrapper = $('<div class="img_square-wrapper" data-i="' + i + '" data-j="' + j + '" data-played=""></div>');
        
        $simgWrapper.append( $(simg) );
        return $simgWrapper;
    }

    function checkForTables(){
        if( squaresFilled >= (gameboard.dimensions * gameboard.dimensions) ){
            return true;
        }
        return false;
    }

    function checkForWin(){
        var crossWins = gameboard.dimensions * 20;
        var circleWins = gameboard.dimensions * 5;

        var sumRow = 0;
        var sumCol = 0;
        var sumDiag = 0;

        // first check: rows
        for( var i = 0; i < gameboard.dimensions; i++ ){
            sumRow = 0;
            for( var j = 0; j < gameboard.dimensions; j++ ){
                sumRow += gameboard.squares[i][j];
            }
            if( sumRow === crossWins ) { return 'cross'; }
            if( sumRow === circleWins ) { return 'cirlce'; }
        }

        // second check: columns
        for( var i = 0; i < gameboard.dimensions; i++ ){
            sumCol = 0;
            for( var j = 0; j < gameboard.dimensions; j++ ){
                sumCol += gameboard.squares[j][i];
            }
            if( sumCol === crossWins ) { return 'cross'; }
            if( sumCol === circleWins ) { return 'cirlce'; }
        }

        // last check: diagonals
        sumDiag = gameboard.squares[0][0] + gameboard.squares[1][1] + gameboard.squares[2][2];
        if( sumDiag === crossWins ) { return 'cross'; }
        if( sumDiag === circleWins ) { return 'cirlce'; }

        sumDiag = gameboard.squares[0][2] + gameboard.squares[1][1] + gameboard.squares[2][0];
        if( sumDiag === crossWins ) { return 'cross'; }
        if( sumDiag === circleWins ) { return 'cirlce'; }

        return "";
    }

    // DOM events
    $('body').on('click', '.img_square-wrapper', function(){
        var played = Boolean( $(this).attr('data-played') );

        if( !played ){
            var coord_i = $(this).attr('data-i');
            var coord_j = $(this).attr('data-j');

            $(this).find('.img_square').attr('src', playIimages[Number(crossPlaying)]);
            
            gameboard.squares[coord_i][coord_j] = playValues[Number(crossPlaying)];
            squaresFilled++;
            
            crossPlaying = !crossPlaying;
            $(this).attr('data-played', 'true');

            var someoneWin = checkForWin();
            if( !someoneWin ){
                if( checkForTables() ){
                    $('#app_result').text('Good Job: game is even');  
                    return;
                }
            } else {
                $('#app_result').text(someoneWin + ' wins!!!!'); 
            }
        } else {
            alert("Can't play in a full spot!");
        }
    })

    // board creation
    gameboard.setup();
    
})(jQuery)