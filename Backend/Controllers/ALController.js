const { generateContent } = require('../services/ai.service');

exports.generateData = async (req, res) => {
    const { title, type } = req.body;

    const response = await generateContent(title, type);
    if (!response) {
        res.status(400).json({ message: "Response is not P" });
    }
    res.status(200).json({ data: response });
}