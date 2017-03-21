function display(frame) {
  for (var row = 0; row < frame.length; row++){
    displayString = ''
    for (var col = 0; col < frame[row].length; col++) {
      if (frame[row][col]) {
        displayString += 'O'
      }
      else {
        displayString += '_'
      }
    }
    console.log(displayString);
  }
}
// var randomBoolean = Math.random() >= 0.5
// widthArr.push(randomBoolean);

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
function neighborCount(myArray, outer, inner) {
  count = 0;
  if ((outer === 0) && (inner === 0)) {
    if (myArray[outer][inner+1]) {
      count++
    }
    if (myArray[outer+1][inner]) {
      count++
    }
    if (myArray[outer+1][inner+1]) {
      count++
    }
  }
  else if ((outer === myArray.length) && (inner === 0)) {
    if (myArray[outer-1][inner+1]) {
      count++
    }
    if (myArray[outer-1][inner]) {
      count++
    }
    if (myArray[outer][inner+1]) {
      count++
    }
  }
  else if (outer === 0) {
    if (myArray[outer][inner+1]) {
      count++
    }
    if (myArray[outer][inner-1]) {
      count++
    }
    if (myArray[outer+1][inner]) {
      count++
    }
    if (myArray[outer+1][inner+1]) {
      count++
    }
    if (myArray[outer+1][inner-1]) {
      count++
    }
  }
  else if ((outer === myArray.length) && (inner === myArray.length)) {
    if (myArray[outer-1][inner]) {
      count++
    }
    if (myArray[outer-1][inner-1]) {
      count++
    }
    if (myArray[outer][inner-1]) {
      count++
    }
  }
  else if (inner === 0) {
    if (myArray[outer][inner+1]) {
      count++
    }
// error @ line71. need to fix up for when outer+1 is out of bounds.
// outer +1 cannot be greater than myArray.length. same goes for inner+1.
    if ((myArray[outer+1] !== undefined) && (myArray[outer+1][inner])) {
      count++
    }
    if (myArray[outer-1][inner]) {
      count++
    }
    if ((myArray[outer+1] !== undefined) && (myArray[outer+1][inner+1])) {
      count++
    }
    if (myArray[outer-1][inner+1]) {
      count++
    }
  }

  else if ((outer > 0) && (inner > 0)) {
    if (myArray[outer][inner+1]) {
      count++
    }
    if (myArray[outer][inner-1]) {
      count++
    }
    if ((myArray[outer+1] !== undefined) && (myArray[outer+1][inner])) {
      count++
    }
    if (myArray[outer-1][inner]) {
      count++
    }
    if ((myArray[outer+1] !== undefined) && (myArray[outer+1][inner+1])) {
      count++
    }
    if (myArray[outer-1][inner-1]) {
      count++
    }
    if ((myArray[outer+1] !== undefined) && (myArray[outer+1][inner-1])) {
      count++
    }
    if (myArray[outer-1][inner+1]) {
      count++
    }
  }
  return count;
  }
// }
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
    display(newBoard);
  };
// what about a randomly placed values...
// start it w/ a glider
// what do I want to do now????? i've got display...
// well what can I do with the functions that I have?

// Now. I need to have a board generated and then have a function
// that takes that board and gives the next frame

// initializes the board...
// then...
// i need to place true values in the board...
// and then I need that function to step the frame forward...
// and then I need to console.log the board...
// all in one go...

// my problem...where do i want to place the true values...
// and how?

// I can create a matrix w/ false values
// I can
// now I've got an array newBoard, what more do I need?
// i need to display it. i need to be able to do another frame.
// i need to print the board to the console.
// in the console i want to print each false value as a | and each true value
// as an O.
// i want to convert each row into a string.
// make a new variable gameString = ''
// recycle the same for loop but this time if true
// concatenate a '|'

// for every element in each array run neighborCount
// if neighborCount is 3 and current element is false
// then put true in newBoard in such a way that row & col are the same.
// i can't use 'newBoard[row][col] w/o there being those indexes in newBoard'
// how to place values in new array...
// in the first loop, i can create an array and push all the values into it
// 3 hours to solve this problem...
// this push needs to happen after each iteration of an array.
// for each array in arr make a var new[col(?)/row(?)]
// then for each in each array in arr push that value into new[col/row]
// if (neighborCount = 3) && cell !== true
// .push() it into new array in same position
// Makes 'board' by length and width
// with all values default to false.

// for each object in each array in arr {
// if the object is equal to false

// on 19 start writing conditions for the case that there is something false
// if false
// count surrounding neighbors to see if they're alive


// what counts as a neighbor
// same array index +1 or index -1
// same index array +1 or array -1
// array -1 index -1 index +1
// array +1 index -1 index -1

// what about in the case that
// index or outer array is 0?
// if that's the case

// do I make a new array for the changed
// board?

// if I decide to make a new board,
// will I keep the old board?
// Will I just keep making new boards?

// It can go either way...
// }

// so what do I do to find

// goals tomorrow

// write loop that goes through
// each element in each array in arr
// and then pushes a new value into a new array
// which will be the next step in the board

// would I use .filter() to go through
// the entire set of arrays?

// newArray[row][col] = true/false
//
// for the record it would be funny to say that
// half white women marginalized themselves when they
