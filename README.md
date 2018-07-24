### Description
A command-line application that takes a
planet name from the Star Wars universe and returns a list of
people that are from that planet.

### Install
`npm install`

### Run
`npm start`

### Input
Enter a star war planet name

### Ouput
[Object]: planet name as key, residents list as value

Example: 

`{ Alderaan: [ 'Leia Organa', 'Bail Prestor Organa', 'Raymus Antilles' ] }`

### Improvement
- Keep prompt running, instead of only take one planet name
- Error Handling
- Decoupling promise, shouldn't keep everything in `app.js`
- Make Promise part code clean and efficient, not very familiar with Promise so far.