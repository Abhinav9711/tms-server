require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();

const { connectDb } = require('./dbConnection/connect');
const userRouter = require('./router/userRouter')

const port = process.env.port || 5000;
app.use(cors());
app.use(express.json());
app.use('/user', userRouter);
app.use('/test', userRouter);
app.use('/', (req, res) => {
  res.send("Welcome to the Task Management System");
})

const start =  async() => {
  try {
    await connectDb();
    app.listen(port, function () {
      console.log(`server is running on port: `, port);
    })
  }
  catch (error) {
    console.log(error);
  }
}

start();









//const id =1;
// https.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`, (resp) => {
//   let data = '';

//   // A chunk of data has been received.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
    
//     const d = JSON.parse(data);
//     console.log("parsing data: ", d);
//     console.log("Title data: ",d[0].title);
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });






// axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
// .then(res => {
//     console.log("Title data: ",res.data[0]);
// })
// .catch(error => {
//     console.log('eror: ', error);
// })


// const f = async() => {
//     const res =  await axios.get(`https://jsonplaceholder.typicode.com/posts?id=${id}`)
//     console.log('rr:',res.data[0])
// }



//async function fetch2() {
    // const res = await fetch(`https://jsonplaceholder.typicode.com/posts?id=${id}`, {method:"GET"})
    // console.log('fetch2: : ', await res.json() )


//     const res  = await fetch(`https://node-project.cyclic.app/user/signin`, {method: "POST",
//     body: JSON.stringify({
//         "username": "abhinavgupta",
//         "password": "abcd123"
//     }),

//     headers: {
//         "Content-Type": "application/json"
//       },

// })

// const res = await axios.post('https://node-project.cyclic.app/user/signin', 
//         {
//             "username": "abhinavgupta",
//             "password": "abcd123"
//         },
//         {
//         headers :{
//             "content-type" : "application/json",
//            "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFiaGluYXZndXB0YSIsInBhc3N3b3JkIjoiYWJjZDEyMyIsImVtYWlsIjoiYWJoaW5hdmptYWluQGdtYWlsLmNvbSIsImlhdCI6MTY3ODQzOTA5MywiZXhwIjoxNjc4NDM5NjkzfQ.q5khGBSuHgSf3iJEGxbZiZaWqChITw4U2yfcS8tOmHw"
//         }})


// console.log(res.data);

//}

