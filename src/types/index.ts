export type formTrip = {
    destination?: string,
    days: number,
    budget: string,
    travelers: number
}

export interface Trip {
    destination: string;
    duration: number;  // Duración del viaje en días
    budget: number;    // Presupuesto diario por persona
    people: number;    // Número de personas en el viaje
    hotels: Hotel[];   // Arreglo con la información de los hoteles sugeridos
    activities: Activity[]; // Arreglo con información de las actividades sugeridas
}

export interface Hotel {
    name: string;         // Nombre del hotel
    address: string;      // Dirección del hotel
    price: number;       // Precio por noche para 3 personas
    imageUrl: string;     // URL de la imagen del hotel
    website: string;      // URL del sitio web del hotel
    coordinates: string;  // Coordenadas geográficas del hotel
    description: string;  // Descripción breve del hotel
    rating: number;       // Calificación del hotel (de 1 a 5 estrellas)
    amenities: string[];  // Lista de servicios y comodidades ofrecidos por el hotel
}

export interface Activity {
    name: string;             // Nombre de la actividad
    details: string;          // Descripción de la actividad
    imageUrl: string;         // URL de la imagen de la actividad
    coordinates: string; // Coordenadas geográficas de la actividad
    ticketPrice: number;      // Precio de la entrada
    distanceFromHotel: number; // Distancia desde el hotel a la actividad
}

interface UserSelection {
    budget: string; // Presupuesto seleccionado por el usuario
    days: number; // Número de días seleccionados
    destination: string; // Destino seleccionado por el usuario
    travelers: number; // Número de viajeros seleccionados
}
interface UserTrip {
    trip: Trip;
    userEmail: string;
}

export interface AiTrip {
    idDoc: string; // ID del documento
    tripData: UserTrip; // Objeto que representa los detalles del viaje
    userEmail: string; // Correo del usuario
    userSelection: UserSelection; // Preferencias del usuario
}

export interface Data {
    textQuery: string
}

export interface User {
    email: string;
    family_name: string;
    given_name: string;
    id: string;
    name: string;
    picture: string;
    verified_email: boolean
}

export interface TokenInfo {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
}