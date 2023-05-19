const express = require('express')
const app = express()
app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'Note content 1',
    date: new Date().toString(),
    important: true
  },
  {
    id: 2,
    content: 'Note content 2',
    date: new Date().toString(),
    important: false
  }
]

app.get('/', (request, response) => {
  response.send('<h1>hello world</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log({ id })
  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.post('/api/notes/', (request, response) => {
  const note = request.body
  const newId = Math.max(...notes.map(note => note.id))

  if (!note && !note.content) {
    response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const newNote = {
    id: newId + 1,
    content: note.content,
    date: new Date().toISOString(),
    important: typeof note.important !== 'undefined' ? note.important : false
  }
  notes = [...notes, newNote]
  response.status(201).json(newNote)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const newNote = request.body
  const note = notes.filter(note => note.id === id)
  notes = notes.map(note => note.id === id ? { ...note, ...newNote } : note)
  console.log(note)

  response.json(notes)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
