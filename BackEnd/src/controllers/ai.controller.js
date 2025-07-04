const aiService = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    const { code, language } = req.body;

    if (!code) {
        return res.status(400).json({ message: "Code is required" });
    }

    if (!language) {
        // While the frontend should always send it, good to have a check.
        // Defaulting to 'javascript' or could return an error.
        // For now, let's make it required for clarity, aligning with frontend sending it.
        return res.status(400).json({ message: "Language is required" });
    }

    try {
        const response = await aiService(code, language);
        res.send(response);
    } catch (error) {
        console.error("Error in AI controller getting review:", error);
        // Send a generic error message or more specific if available and safe
        res.status(500).json({ message: "Failed to get code review due to an internal server error." });
    }
};