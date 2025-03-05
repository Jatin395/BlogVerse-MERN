const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateContent(title, type) {
    let systemInstruction = '';
    let prompt = '';

    if (type === 'description') {
        systemInstruction = `You are a content generator for a blog platform. You will generate only a description based on the given title.`;
        prompt = `Title: ${title}\nGenerate a compelling description for the blog post based on the given title.`;
    } else if (type === 'meta') {
        systemInstruction = `You are a content generator for a blog platform. You will generate a meta description that not only summarizes the blog post but also includes a brief exploration of the key points, trends, or predictions discussed in the article. The meta description should be informative, concise, and reflect the content's key themes.`;
        prompt = `Title: ${title}\nGenerate a meta description that explores the future of the topic in the title and includes emerging technologies, trends, or predictions in a concise sentence.`;

    } else if (type === 'content') {
        systemInstruction = `You are a content generator for a blog platform. You will generate only the content for the given title.`;
        prompt = `Title: ${title}\nGenerate content for the blog post based on the given title.`;
    } else {
        throw new Error('Invalid type. Please use "description", "meta", or "content".');
    }

    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: systemInstruction,
    });

    const result = await model.generateContent(prompt);

    return result.response.text();
}

async function onGenerateContentClick(title, type) {
    try {
        const generatedContent = await generateContent(title, type);        
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { generateContent };