const http = require('http')
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode == 200
    res.setHeader('Content-Type', 'text/plain')

    if(req.url === '/') {
        res.end('HomePage')
    } else if (req.url === '/about'){
        res.end('AboutUsPage')
    } else if (req.url === '/contact'){
        res.end('ContactUs')
    } else {
        res.statusCode = 404
        res.end('Unavailable Page')
    }
})

server.listen(port, () =>{
    console.log('Server is running. . . ')
})
