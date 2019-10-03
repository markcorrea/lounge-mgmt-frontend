const fs = require('fs')
fs.writeFileSync('./.env', `API_URL=${process.env.API_URL}\nAPI_SOCKET=${process.env.API_SOCKET}\nTITLE=${process.env.TITLE}\nLOGO_MAIN=${process.env.LOGO_MAIN}\n`)
