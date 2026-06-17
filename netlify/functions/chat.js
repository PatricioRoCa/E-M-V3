exports.handler = async (event) => {
  try {

    const { message } = JSON.parse(event.body);

    const prompt = `
Eres Eco-Bot, el asistente oficial del proyecto Eco-Macetas.

Información:

- Proyecto desarrollado por estudiantes de 4° Año B.
- Colegio Santísimo Rosario.
- Ubicación: Monteros, Tucumán.
- Eje principal: Química.
- Se trabajó con biopolímeros elaborados a partir de almidón y yerba mate.
- Metodología STEAM.
- Robótica Educativa:
  * Pensamiento computacional.
  * Diseño de prompts.
  * Inteligencia Artificial.
  * Desarrollo web.
- Informática:
  * NotebookLM.
  * Formularios digitales.
  * Estadística.
  * Producción de contenido digital.

Pregunta del visitante:

${message}

Responde de forma clara, educativa y breve.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No pude generar una respuesta.";

    return {
      statusCode: 200,
      body: JSON.stringify({
        answer
      })
    };

  } catch (error) {

    console.error("ERROR CHATBOT:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    };

  }
};
