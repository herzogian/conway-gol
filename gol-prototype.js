// creates a matrix of false values
function createPlainBoard(length, width) {
  var length = length || 10
  var width = width || 10
  var rows = new Array(length)
  for (var row = 0; row < length; row++) {
    var rowArray = new Array(width);
    rows[row] = rowArray
    for (var column = 0; column < width; column++) {
      rows[row][column] = false
    }
  }
  return rows;
}
// creates a matrix of random boolean values
function randomBoard(length, width) {
    length = length || 10
    width = width || 10
    var rows = new Array(length)
    for (var row = 0; row < length; row++) {
      var rowArray = new Array(width);
      rows[row] = rowArray
      for (var column = 0; column < width; column++) {
        rows[row][column] = Math.random() >= 0.5
      }
    }
    return rows;
}
// counts all live neighbors of every 'cell' in the matrix
function neighborCount(matrix, x, y) {
  count = 0;
  if ((x === 0) && (y === 0)) {
    if (matrix[x][y+1]) {
      count++
    }
    if (matrix[x+1][y]) {
      count++
    }
    if (matrix[x+1][y+1]) {
      count++
    }
  }
  else if ((x === matrix.length) && (y === 0)) {
    if (matrix[x-1][y+1]) {
      count++
    }
    if (matrix[x-1][y]) {
      count++
    }
    if (matrix[x][y+1]) {
      count++
    }
  }
  else if (x === 0) {
    if (matrix[x][y+1]) {
      count++
    }
    if (matrix[x][y-1]) {
      count++
    }
    if (matrix[x+1][y]) {
      count++
    }
    if (matrix[x+1][y+1]) {
      count++
    }
    if (matrix[x+1][y-1]) {
      count++
    }
  }
  else if ((x === matrix.length) && (y === matrix.length)) {
    if (matrix[x-1][y]) {
      count++
    }
      if (matrix[x-1][y-1]) {
        count++
      }
    if (matrix[x][y-1]) {
      count++
    }
  }
  else if (y === 0) {
    if (matrix[x][y+1]) {
      count++
    }
    if ((matrix[x+1] !== undefined) && (matrix[x+1][y])) {
      count++
    }
    if (matrix[x-1][y]) {
      count++
    }
    if ((matrix[x+1] !== undefined) && (matrix[x+1][y+1])) {
      count++
    }
    if (matrix[x-1][y+1]) {
      count++
    }
  }

  else if ((x > 0) && (y > 0)) {
    if (matrix[x][y+1]) {
      count++
    }
    if (matrix[x][y-1]) {
      count++
    }
    if ((matrix[x+1] !== undefined) && (matrix[x+1][y])) {
      count++
    }
    if (matrix[x-1][y]) {
      count++
    }
    if ((matrix[x+1] !== undefined) && (matrix[x+1][y+1])) {
      count++
    }
    if (matrix[x-1][y-1]) {
      count++
    }
    if ((matrix[x+1] !== undefined) && (matrix[x+1][y-1])) {
      count++
    }
    if (matrix[x-1][y+1]) {
      count++
    }
  }
  return count;
  }

// here the board matrix is passed to loop array and
// applies john horton conway's rules for the game of life(1970)
function loopArray(board) {
  var newBoard = [];
  for (var row = 0; row < board.length; row++){
    var newRow = [];
    for (var col = 0; col < board[row].length; col++) {
      var nCount = neighborCount(board, row, col);
      if ((nCount === 3) && (board[row][col] === false)) {
        newRow.push(true)
      }
      else if ((nCount > 3) && (board[row][col])) {
        newRow.push(false)
      }
      else if (((nCount > 1) && (nCount < 4)) && (board[row][col])) {
        newRow.push(true)
      }
      else {
        newRow.push(false);
      }
    }
    newBoard.push(newRow);
    }
    return(newBoard);
  };
// creates a matrix of random values
var PlainBoard = createPlainBoard()
// changes the values on board matrix
function changeValue(board) {
  var x = board[0]
  var y = board[1]
  if (PlainBoard[x][y]) {
    PlainBoard[x][y] = false
  }
  else {
    PlainBoard[x][y] = true
  }
}

var next = function() {
  PlainBoard = loopArray(PlainBoard)
  nextCount = -1
  for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++) {
      nextCount++
      // the live and dead cells are rendered below
      if (PlainBoard[x][y]) {
        $('#container').children('div').eq(nextCount).attr('class', 'liveunit')
      }
      else {
        $('#container').children('div').eq(nextCount).attr('class', 'unit')
      }
    }
  }
}

// two closures to be accessed in the child scope of
// the two .click jQuery functions
var myInterval;
var intervalFlag = false

function stringCoor(x, y) {
  var xString = x.toString()
  var yString = y.toString()
  return xString + ', ' + yString
}


// calls next function every 1/2 second
$(document).ready(function() {
  $('#play').click(function() {
      if (intervalFlag == false) {
      myInterval = setInterval(next, 500)
      intervalFlag = true
      };
  });
// line stops the repeated execution of 'next'
  $('#pause').click(function() {
      if (intervalFlag) {
      clearInterval(myInterval)
      intervalFlag = false
      };
  });
  // below the the board matrix is rendered
  for (var x = 0; x < 10; x++) {
    for (var y = 0; y < 10; y++) {
      var stringID = stringCoor(x, y)
      if (PlainBoard[x][y]) {
        $("<div>").addClass("liveunit").addClass("unit").addClass("cell").attr('id', stringID).appendTo('#container')
      }
      else {
        $("<div>").addClass("unit").addClass("cell").attr('id', stringID).appendTo('#container')
      }
    }
  };
  // line 226's .click changes values on the board matrix and toggles classes of divs
  $('.unit').click(function (e) {
    var elem = document.elementFromPoint(e.pageX, e.pageY)
    var $elem = $(elem)
    $elem.toggleClass('liveunit')
    $elem.addClass('unit')
    var coor = $elem.attr('id').split(', ')
    var coorArray = coor.map(function(l) {return parseInt(l)})
    changeValue(coorArray)
  })
})
