const http = require('http')
let notes = [
    {
        "id":1,
        "content": 'Note content 1',
        "date" : new Date().toString(),
        "important": true
    }
]
const app = http.createServer((request,response) => {
    response.writeHead(200, {"Content-Type": "application/json"})
    response.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on ${PORT}`)