import app from "./app";
import "dotenv";

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
