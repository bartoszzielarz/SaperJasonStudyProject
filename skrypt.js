var sec = 0;
var rozmiarP = 0;
var bomby = 0;
var board = [];
var plansza;
var odkryteBomby = 0;


function time() {
    if (sec > -1) {
        $('#time').html(sec++);
    }
}


// Funkcje
function randomMines() {

    var tmp = 0;
    while (tmp < bomby) {
        var r = Math.floor((Math.random() * rozmiarP));
        var c = Math.floor((Math.random() * rozmiarP));
        var obj1 = document.getElementById([r] + '_' + [c]);

        if (obj1.value != -1) {
            obj1.value = -1;
            board[r][c] = -1;
            tmp++;
        }
    }
}

function countNeighbors() {

    for (var i = 0; i < rozmiarP; i++) {
        for (var j = 0; j < rozmiarP; j++) {
            var obj1 = document.getElementById([i] + '_' + [j]);
            if (obj1.value == -1) {
                MycountN(i, j);
            }
        }
    }
}

function MycountN(r, c) {
    for (var i = r - 1; i <= r + 1; i++) {
        for (var j = c - 1; j <= c + 1; j++) {
            if (i > -1 && j > -1 && i < rozmiarP && j < rozmiarP) {
                var obj1 = document.getElementById([i] + '_' + [j]);
                if (obj1.value != -1) {
                    board[i][j]++;
                }
            }
        }
    }
}

function cellClick(obj) {

    var id = obj.id;
    var idR = id.substring(0, id.indexOf('_'));
    var idC = id.substring(id.indexOf('_') + 1, id.length);

    if (board[idR][idC] == -1) {
        $('#' + id).addClass('mine');
    } else if (board[idR][idC] == 0) {
        $('#' + id).removeClass();
        $('#' + id).addClass('emptyN');

        for (var i = idR - 1; i <= idR + 1; i++) {
            for (var j = idC - 1; j <= idC + 1; j++) {
                if (i > -1 && j > -1 && i < rozmiarP && j < rozmiarP) {
                    if (board[i][j] == 0) {
                        $('#' + [i] + '_' + [j]).removeClass();
                        $('#' + [i] + '_' + [j]).addClass('emptyN');
                    }
                }
            }
        }
    } else {
        $('#' + id).removeClass();
        $('#' + id).addClass('empty');
        $('#' + id).html(board[idR][idC]);
    }

    if (board[idR][idC] == -1) {
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[i].length; j++) {

                if (board[i][j] == -1) {
                    $('#' + [i] + '_' + [j]).removeClass();
                    $('#' + [i] + '_' + [j]).html('-1');
                } else if (board[i][j] == 0) {
                    $('#' + [i] + '_' + [j]).removeClass();
                    $('#' + [i] + '_' + [j]).addClass('emptyN');
                } else {
                    $('#' + [i] + '_' + [j]).removeClass();
                    $('#' + [i] + '_' + [j]).addClass('empty');
                }
            }
        }

        $('td').removeAttr('onclick');
        $('td').removeAttr('ondblclick');
        alert('Koniec gry');
        $('#time').html(sec);
        sec = -1;
    }
}

function mine(obj) {
    var id = obj.id;
    var idR = id.substring(0, id.indexOf('_'));
    var idC = id.substring(id.indexOf('_') + 1, id.length);
    $('#' + id).removeClass();
    $('#' + id).addClass('black');
    if (board[idR][idC] == -1) {
        odkryteBomby++;
        console.log(odkryteBomby);
    }
    if (odkryteBomby == bomby) {
        alert('Wygrałeś! Kim jesteś? Jesteś zwycięzcą!');
    }
}

function Refresh() {
    zapelnijPlansze();
}

function zapelnijPlansze() {
    plansza = document.getElementById("plansza");
    plansza.innerHTML = '';
    sec = 0;

    rozmiarP = document.getElementById("wielkoscPlanszy").value;
    bomby = document.getElementById("bomby").value;
    pustePola = (rozmiarP * rozmiarP) - bomby;

    if (rozmiarP < 5) {
        alert('Wielkość planszy ma być >=5');
    } else {
        for (var i = 0; i < rozmiarP; i++) {
            var element1 = document.createElement("TR");
            board.push([rozmiarP]);
            for (var j = 0; j < rozmiarP; j++) {
                var wiersz = document.createElement("TD");
                wiersz.id = i + "_" + j;
                wiersz.setAttribute('onclick', 'mine(this)');
                wiersz.setAttribute('ondblclick', 'cellClick(this)');
                element1.appendChild(wiersz);
                board[i][j] = 0;
            }
            document.getElementById("plansza").appendChild(element1);
        }
        randomMines();
        countNeighbors();
        setInterval(function () {
            time()
        }, 1000);
    }
}