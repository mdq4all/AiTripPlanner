import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);
  
    async function uploadToGemini(path, mimeType) {
    const uploadResult = await fileManager.uploadFile(path, {
      mimeType,
      displayName: path,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
  }
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
    export const chatSession = model.startChat({
      generationConfig,
   
      history: [
        {
          role: "user",
          parts: [
            {text: "Generar para un viaje a mar del plata por 2 dias, para 3 personas, con 20000 pesos argentinos diarios. Necesito opciones de  hoteles con: nombre, direccion, precio por dia, url de imagen del hotel, url sitio web del hotel, coordenadas geograficas, descripcion, rating, y sugerir sitios interesantes  que incluya: detalles, url con una imagen del lugar, geo coordenadas, precio del ticket, distancia del hotel. En formato JSON"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"trip\": {\n    \"destination\": \"Mar del Plata\",\n    \"duration\": 2,\n    \"budget\": 20000,\n    \"people\": 3,\n    \"hotels\": [\n      {\n        \"name\": \"Hotel Costa Galana\",\n        \"address\": \"Av. Constitución 5700, Mar del Plata\",\n        \"price\": 15000,\n        \"imageUrl\": \"https://www.hoteles.com/im/Photos/262450/262450_1_R.jpg\",\n        \"website\": \"https://www.hotelcostagalana.com.ar/\",\n        \"coordinates\": \"-38.0106, -57.5427\",\n        \"description\": \"Hotel familiar con una excelente ubicación en la zona céntrica de Mar del Plata, a pocas cuadras de la playa.\",\n        \"rating\": 4.5,\n        \"amenities\": [\"Piscina\", \"Restaurante\", \"Bar\", \"Wi-Fi gratuito\", \"Estacionamiento\"]\n      },\n      {\n        \"name\": \"Hotel Gran Bristol\",\n        \"address\": \"Av. Independencia 2555, Mar del Plata\",\n        \"price\": 18000,\n        \"imageUrl\": \"https://www.hoteles.com/im/Photos/119774/119774_1_R.jpg\",\n        \"website\": \"https://www.hotelgranbristol.com.ar/\",\n        \"coordinates\": \"-38.0095, -57.5395\",\n        \"description\": \"Hotel elegante con vistas al mar, ubicado en el centro de la ciudad. Ofrece habitaciones modernas y servicios de alta calidad.\",\n        \"rating\": 4,\n        \"amenities\": [\"Piscina climatizada\", \"Spa\", \"Restaurante gourmet\", \"Wi-Fi gratuito\", \"Estacionamiento\"]\n      }\n    ],\n    \"activities\": [\n      {\n        \"name\": \"Playa Bristol\",\n        \"details\": \"Una de las playas más famosas de Mar del Plata, ideal para disfrutar del sol, la arena y el mar. \",\n        \"imageUrl\": \"https://www.mardelplata.gob.ar/images/fotos/fotos_playa_bristol.jpg\",\n        \"coordinates\": \"-38.0094, -57.5385\",\n        \"ticketPrice\": \"Gratis\",\n        \"distanceFromHotel\": \"0.5 km (Hotel Costa Galana), 1 km (Hotel Gran Bristol)\"\n      },\n      {\n        \"name\": \"Puerto Mar del Plata\",\n        \"details\": \"Un lugar lleno de vida, donde se puede disfrutar de paseos en barco, restaurantes y la vista del mar.\",\n        \"imageUrl\": \"https://www.turismomardelplata.gob.ar/sites/default/files/styles/noticias_destacada/public/puerto_mar_del_plata.jpg\",\n        \"coordinates\": \"-38.0131, -57.5384\",\n        \"ticketPrice\": \"Gratis\",\n        \"distanceFromHotel\": \"2 km (Hotel Costa Galana), 2.5 km (Hotel Gran Bristol)\"\n      },\n      {\n        \"name\": \"Acuario Mar del Plata\",\n        \"details\": \"Un lugar fascinante donde se pueden observar diversas especies marinas. \",\n        \"imageUrl\": \"https://www.turismo.mardelplata.gob.ar/sites/default/files/styles/noticias_destacada/public/acuario_mar_del_plata.jpg\",\n        \"coordinates\": \"-38.0157, -57.5442\",\n        \"ticketPrice\": \"1500 ARS (adultos), 750 ARS (niños)\",\n        \"distanceFromHotel\": \"3 km (Hotel Costa Galana), 3.5 km (Hotel Gran Bristol)\"\n      },\n      {\n        \"name\": \"Museo de Arte Contemporáneo\",\n        \"details\": \"Un espacio donde se puede apreciar la obra de artistas argentinos e internacionales.\",\n        \"imageUrl\": \"https://www.mardelplata.gob.ar/images/fotos/fotos_museo_arte_contemporaneo.jpg\",\n        \"coordinates\": \"-38.0101, -57.5378\",\n        \"ticketPrice\": \"Gratis\",\n        \"distanceFromHotel\": \"1 km (Hotel Costa Galana), 1.5 km (Hotel Gran Bristol)\"\n      }\n    ]\n  }\n}\n```\n\n**Explicación del JSON:**\n\n* **trip**: Objeto principal que contiene información general del viaje.\n    * **destination**: Nombre del destino.\n    * **duration**: Duración del viaje en días.\n    * **budget**: Presupuesto diario por persona.\n    * **people**: Número de personas en el viaje.\n* **hotels**: Arreglo con información de los hoteles sugeridos.\n    * **name**: Nombre del hotel.\n    * **address**: Dirección del hotel.\n    * **price**: Precio por noche para 3 personas.\n    * **imageUrl**: URL de la imagen del hotel.\n    * **website**: URL del sitio web del hotel.\n    * **coordinates**: Coordenadas geográficas del hotel.\n    * **description**: Descripción breve del hotel.\n    * **rating**: Calificación del hotel (de 1 a 5 estrellas).\n    * **amenities**: Lista de servicios y comodidades ofrecidos por el hotel.\n* **activities**: Arreglo con información de las actividades sugeridas.\n    * **name**: Nombre de la actividad.\n    * **details**: Descripción de la actividad.\n    * **imageUrl**: URL de la imagen de la actividad.\n    * **coordinates**: Coordenadas geográficas de la actividad.\n    * **ticketPrice**: Precio de la entrada.\n    * **distanceFromHotel**: Distancia desde cada hotel a la actividad.\n\n**Nota:** Los precios, imágenes y detalles de los hoteles y actividades son solo ejemplos. Es recomendable consultar las páginas web oficiales para obtener la información actualizada. \n"},
          ],
        },
      ],
    });
  
  
  
