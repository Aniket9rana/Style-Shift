const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GENERATION_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}`;

async function transformImage(base64Image, stylePrompt, negativePrompt) {
  const base64Data = base64Image.includes(',')
    ? base64Image.split(',')[1]
    : base64Image;

  const mimeMatch = base64Image.match(/data:([^;]+);/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';

  const instruction =
    `Transform this image into the following style: ${stylePrompt}. ` +
    `Avoid: ${negativePrompt}. ` +
    `Keep the same subject and composition, only change the visual style.`;

  const body = {
    contents: [{
      parts: [
        { text: instruction },
        { inline_data: { mime_type: mimeType, data: base64Data } }
      ]
    }],
    generationConfig: {
      responseModalities: ['IMAGE', 'TEXT']
    }
  };

  const res = await fetch(GENERATION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const status = res.status;
    if (status === 429) {
      throw new Error('QUOTA_EXCEEDED');
    }
    throw new Error(err?.error?.message || `Gemini API error: ${status}`);
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts || [];

  for (const part of parts) {
    if (part.inline_data?.data) {
      const mime = part.inline_data.mime_type || 'image/png';
      return `data:${mime};base64,${part.inline_data.data}`;
    }
  }

  throw new Error('Gemini did not return an image');
}

module.exports = { transformImage };
