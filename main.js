const cp = require('node:child_process')
const os = require('node:os')
const fs = require('node:fs')
const path = require('node:path')
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const multer = require('multer')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 /* kb */ * 1024 /* mb */ },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(null, false)
      return
    }

    if (!file.mimetype === 'image/webp') {
      cb(null, false)
      return
    }

    cb(null, true)
  },
})

const app = express()

app.use(morgan('dev'))
app.use(cors())

app.post('/', upload.single('image'), (req, res) => {
  const directoryPath = fs.mkdtempSync(path.join(os.tmpdir(), 'images'))
  const random = Math.random().toString(36).substring(2)
  const filePath = path.join(directoryPath, `${random}_${req.file.filename}`)
  fs.writeFileSync(filePath, req.file.buffer)
  cp.execSync(`convert ${filePath} ${filePath}.webp`)
  res.setHeader('content-type', 'image/webp')
  const readStream = fs.createReadStream(`${filePath}.webp`)
  readStream.on('end', () => fs.rmSync(directoryPath, { recursive: true }))
  readStream.pipe(res)
})

app.listen(80, () => console.log('app listening on port 80'))
