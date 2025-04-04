const express = require('express')
const path = require('path')

const main = () => {
    const startServer = (options) => {
        const { port } = options

        const app = express()

        app.use(express.static(path.join(__dirname, '../dist')))

        app.get('', (req, res) => {
            res.sendFile(path.join(__dirname + '../dist', 'index.html'))
        })

        app.listen(port, () => {
            console.log(`corriendo el servidor en el puerto ${port}`)
        })
    }

    startServer({ port: 3000 })
}

(async () => {
    main()
})()