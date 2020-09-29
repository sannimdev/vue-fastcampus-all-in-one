/*
    비동기적 코드
    async await
*/

// # 예제 1
// function a() {
//   console.log('a');
// }
// function b() {
//   console.log('b');
// }

// a(); // a
// b(); // b

// # 예제 2
// function a() {
//   setTimeout(function() {
//     console.log('a');
//   }, 1000);
// }

// function b() {
//   console.log('b');
// }

// a();
// b();
// // b
// // a

// 예제 3
// function a(cb) {
//   setTimeout(function() {
//     console.log('a');
//     cb();
//   }, 1000);
// }

// function b() {
//   console.log('b');
// }

// a(function() {
//   console.log('a 완료!!!');
// });
// b();
// a
// b

//#예제 4. 콜백헬

// function a(cb) {
//   setTimeout(function() {
//     console.log('a');
//     cb();
//   });
// }
// function b(cb) {
//   setTimeout(function() {
//     console.log('b');
//     cb();
//   });
// }
// function c(cb) {
//   setTimeout(function() {
//     console.log('c');
//     cb();
//   });
// }

// function d(cb) {
//   setTimeout(function() {
//     console.log('d');
//     cb();
//   });
// }

// a(function() {
//   b(function() {
//     c(function() {
//       d();
//     });
//   });
// });

// 예제 5: ES6 Promise

// function a() {
//   return new Promise(resolve => {
//     setTimeout(function() {
//       console.log('a');
//       resolve();
//     }, 1000);
//   });
// }

// function b() {
//   return new Promise(resolve => {
//     setTimeout(function() {
//       console.log('b');
//       resolve();
//     }, 1000);
//   });
// }

// function c() {
//   return new Promise(resolve => {
//     setTimeout(function() {
//       console.log('c');
//       resolve();
//     }, 1000);
//   });
// }

// function d() {
//   return new Promise(resolve => {
//     setTimeout(function() {
//       console.log('d');
//       resolve();
//     }, 1000);
//   });
// }

// // a()
// //   .then(() => b())
// //   .then(() => c())
// //   .then(() => d());

// // ES2018 (ES7)
// // async await

// async function asyncFunc() {
//   await a();
//   await b();
//   await c();
//   await d();
//   console.log('done');
// }

// asyncFunc();

//예제 6: reject
function a() {
  return new Promise((resolve, reject) => {
    const isError = false;
    if (isError) {
      reject('ERROR: Test Error message');
      return;
    }
    setTimeout(() => {
      console.log('a');
      resolve('done!');
    }, 1000);
  });
}

// a()
//   .then(res => {
//     console.log(res);
//   })
//   .catch(e => {
//     console.log('error:', e);
//   });

async function asyncFunc() {
  try {
    const res = await a();
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('done!!!');
  }
}

asyncFunc();
