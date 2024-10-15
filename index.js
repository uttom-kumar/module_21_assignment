import app from "./app.js"
import { PORT } from "./src/config/config.js"



app.listen(PORT, () => {
    console.log(`server run successfully at http://localhost:${PORT}/api`)
})
