import app from "./index.js";

const PORT = process.env.PORT || 5000; // Render provides process.env.PORT

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
