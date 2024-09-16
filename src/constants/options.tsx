export const selectTraverlList = [
    {
        id: 1,
        title: 'Just me',
        desc: 'A sole travels in exploration',
        icon: '✈️',
        people: 1
    },
    {
        id: 2,
        title: 'A couple',
        desc: 'Two travels in tandem',
        icon: '🥂',
        people: 2
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adventure',
        icon: '🏕️',
        people: 3
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of thrill-seekes',
        icon: '👯',
        people: 4
    },
]

export const selectBudgetOption = [
    {
        id: 1,
        title: '5000 a 7000',
        desc: 'Stay conscious of costs',
        icon: '💲'
    },
    {
        id: 2,
        title: '7000 a 12000',
        desc: 'Keep costs on the average side',
        icon: '💳'
    },
    {
        id: 3,
        title: '12000 a 20000',
        desc: 'Dont worry about costs',
        icon: '💰💰💰'
    },
]

export const ai_prompt = "Generar para un viaje a {location} por {days} dias, para {travelers} personas, con {budget} pesos argentinos diarios. Necesito opciones de hoteles con: nombre, direccion, precio por dia, url de imagen del hotel, url sitio web del hotel, coordenadas geograficas, descripcion, rating, y sugerir sitios interesantes que incluya: detalles, url con una imagen del lugar, geo coordenadas, precio del ticket, distancia del hotel. En formato JSON"