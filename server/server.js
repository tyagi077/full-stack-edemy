import app from "./index.js";

const PORT = process.env.PORT || 10000; // Ensure you use Render's assigned port

app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
