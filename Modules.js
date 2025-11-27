//Core module
//fs(file system)



//const fs = require('fs')

//synchonize
/*
try{                                            //UTF-8 = Unicode Transformation Format - 8 bit รองรับทุกภาษา ในโลก: ไทย, จีน, ญี่ปุ่น, อาหรับ, Emoji 
    const data = fs.readFileSync('hello.txt', 'utf-8')
    console.log(data)
}catch (err){
    console.err(err)
} */

//asynchonize
/*
const content = 'Hello, NodeJS'
    //create the file name Greeting.txt with text's content in it
fs.writeFile('Greeting.txt', content, err => {
    if(err){
        console.error(err)
    return
    }
    console.log('File written successfully')
}) */
// path module
/*
const path = require('path')

const filePath = path.join('users', 'john' ,'document', 'report.pdf')
console.log(filePath)
*/

//os (operating system)
/*
const os = require('os')

console.log(`OS Platform ${os.platform()}`)
console.log(`Total Memory ${os.totalmem()} bytes`)
console.log(`Free Memory ${os.freemem()} bytes`)
console.log(`Uptime ${os.uptime()} seconds`)
*/