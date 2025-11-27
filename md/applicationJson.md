const http = require('http')
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode == 200
    res.setHeader('Content-Type', 'application/json')

    const data = {
        message: 'Hello World',
        data: {
            name: 'NodeJS Server',
            version: '1.0'
        }
    }
    //convert object into string
    res.end(JSON.stringify(data))
    
})

server.listen(port, () =>{
    console.log('Server is running. . . ')
})
