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



main();








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
