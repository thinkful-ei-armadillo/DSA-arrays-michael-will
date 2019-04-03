/* eslint-disable strict */

const Memory = require('./memory');

let memory = new Memory();

class myArray {
  constructor() {
    this.length = 0;
    this.capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  // push value
  push(value) {
    if (this.length >= this.capacity) {
      this.resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  // pop value
  pop() {
    if (this.length === 0) {
      throw new Error('Index doesn\'t exist');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  // resize value
  resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this.capacity = size;
  }

  // get value
  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index doesn\'t exist');
    }
    return memory.get(this.ptr + index);
  }

  // insert value
  insert(index, value) {
    if (this.length >= this.capacity) {
      this.resize((this.length + 1) * Array.SIZE_RATIO);
    }
    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  // remove value
  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index doesn\'t exist');
    }
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}

Array.SIZE_RATIO = 3;

module.exports = myArray;


function main() {

  myArray.SIZE_RATIO = 3;
  let arr = new myArray();


  // What is the length, capacity and memory address of your array?
  arr.push(3);
  console.log(arr);
  // myArray { length: 1, capacity: 3, ptr: 0 }


  // What is the length, capacity and memory address of your array? Explain the result of your program after adding the new lines of code.
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  console.log(arr);
  // myArray { length: 6, capacity: 12, ptr: 3 }


  // What is the length, capacity, and address of your array? Explain the result of your program after adding the new lines of code.
  arr.pop();
  arr.pop();
  arr.pop();
  console.log(arr);
  // myArray { length: 3, capacity: 12, ptr: 3 }


  // Print the 1st item in the array arr. *COME BACK
  console.log(arr[1]); 

  // Empty the array and add just 1 item: arr.push("tauhida");
  arr.remove(2);
  arr.remove(1);
  arr.remove(0);
  // myArray { length: 0, capacity: 12, ptr: 3 }
  console.log(arr);

  arr.push('tauhida');
  console.log(arr);
  // myArray { length: 1, capacity: 12, ptr: 3 }

  // Print this 1 item that you just added. What is the result? Can you explain your result?
  console.log(memory.get(3));
  // Its at index of 3, but returning NaN

  // What is the purpose of the _resize() function in your Array class?
  // changes the size of the array in correspondence to the function call.

}



// main();

//5. URLify a string

function urlChange(str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] === ' ') {
      result += '%20';
    } else {
      result += str[i];
    }
  }
  return result;
}

// console.log(urlChange('tauhida parveen'));
// console.log(urlChange('www.thinkful.com /tauh ida parv een'));s 

//6.  Filter
// input = [3, 4, 5, 6, 7], output = [6, 7]

function filterArray(array){
  let newArray = [];
  for (let i = 0; i < array.length; i++){
    if (array[i] > 4){
      newArray.push(array[i]);
    }
  }
  return newArray;
}

// console.log(filterArray([3,4,5,6,7]));

//7.  Max sum in the array

/* input = [4, 6, -3, 5, -2, 1]
output = 12 */

function maxSum (arr){
  let largest = 0;
  let current = 0;
  for (let i = 0; i < arr.length; i++) {
    if (current > largest) {
      largest = current;
    }
    current += arr[i];
  }
  return largest;
}

// console.log(maxSum([4, 6, -3, 5, -2, 1, 7, -4]));

/* 8 Merge Arrays
 input = [1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10], output = [1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]*/

// const input = [1, 3, 6, 8, 11];
// const output = [1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11];

function mergeArrays (arr1, arr2){
  let newArray = [...arr1, ...arr2];
  let left = newArray[0];
  let right = newArray[newArray.length - 1];
  // while (right > left){
  //   while (left < right){
  //     left++;
  //   }
  //   while (right > left){
  //     right--;
  //   }
  //   if (right < left){
  //     swap(left, right);
  //   }
  //   left++;
  //   right++;
  // }

  return newArray.sort(function (a,b){return a - b;});
}

// console.log(mergeArrays(input, output));


// 9. Remove characters

// Input:'Battle of the Vowels: Hawaii vs. Grozny', 'aeiou', 
// Output: 'Bttl f th Vwls: Hw vs. Grzny' *

function remove(string, letters){
  
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!letters.includes(string[i])) {
      result += string[i];
    }
  }
  return result;

  
}







// console.log(remove('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));

//10 Products

/* Input:[1, 3, 9, 4], Output:[108, 36, 12, 27] */

// let array = [1, 3, 9, 4];

function massProduct(array){
  let product = [];
  let pro = 1;
  for (let i = 0; i < array.length; i++){
    pro = pro * array[i];
  }
  for (let i = 0; i < array.length; i++){
    product.push(pro / array[i]);
  }

  return product;


}

// console.log(massProduct(array));

//11.  2D Array

/* [[1,0,1,1,0],
[0,1,1,1,0],
[1,1,1,1,1],
[1,0,1,1,1],
[1,1,1,1,1]];

Output: [[0,0,0,0,0],
[0,0,0,0,0],
[0,0,1,1,0],
[0,0,0,0,0],
[0,0,1,1,0]]; */

function newMaze(array){
  for (let i = 0; i < array.length; i++){
    if (array[i] + array[i+1] <  2){
      array[i] = array[i] * 0;
    }
  }
  return array;
}

console.log(newMaze([1, 1, 0, 1, 1]));


// console.log(urlChange('tauhida parveen'));








// class Array {
//   constructor() {
//     this.length = 0;
//     this._capacity = 0;
//     this.ptr = memory.allocate(this.length);
//   }

//   push(value) {
//     if (this.length >= this._capacity) {
//       this._resize((this.length + 1) * Array.SIZE_RATIO);
//     }
//     memory.set(this.ptr + this.length, value);
//     this.length++;
//   }

//   _resize(size) {
//     const oldPtr = this.ptr;
//     this.ptr = memory.allocate(size);
//     if (this.ptr === null) {
//       throw new Error('Out of memory');
//     }
//     memory.copy(this.ptr, oldPtr, this.length);
//     memory.free(oldPtr);
//     this._capacity = size;
//   }

//   get(index) {
//     if (index < 0 || index >= this.length) {
//       throw new Error('Index error');
//     }
//     return memory.get(this.ptr + index);
//   }

//   pop() {
//     if (this.length === 0) {
//       throw new Error('Index error');
//     }
//     const value = memory.get(this.ptr + this.length - 1);
//     this.length--;
//     return value;
//   }

//   insert(index, value) {
//     if (index < 0 || index >= this.length) {
//       throw new Error('Index error');
//     }

//     if (this.length >= this._capacity) {
//       this._resize((this.length + 1) * Array.SIZE_RATIO);
//     }

//     memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
//     memory.set(this.ptr + index, value);
//     this.length++;
//   }

//   remove(index) {
//     if (index < 0 || index >= this.length) {
//       throw new Error('Index error');
//     }
//     memory.copy(
//       this.ptr + index,
//       this.ptr + index + 1,
//       this.length - index - 1
//     );
//     this.length--;
//   }
// }

// Array.SIZE_RATIO = 3;
