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
        const stream = await aiService(code, language);
        if (!stream) {
            // If the stream is not created, it implies a failure in the service layer
            // that was caught and handled, but we still need to send a response.
            return res.status(500).json({ message: "Failed to get code review due to a service error." });
        }
        res.setHeader('Content-Type', 'text/plain');

        for await (const chunk of stream) {
            res.write(chunk.text());
        }
        res.end();
        
    } catch (error) {
        console.error("Error in AI controller getting review:", error);
        res.status(500).json({ message: "Failed to get code review due to an internal server error." });
    }
};