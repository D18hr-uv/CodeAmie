require('dotenv').config()
const app = require('./src/app')



app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
})