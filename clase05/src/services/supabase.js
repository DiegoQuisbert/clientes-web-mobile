// La carpeta "services" va a contener todos los servicios de nuestro proyecto.
//Por "servicios" nos referimos a cualquier funcionalidad que  nuestros componentes o código en general pueden necesitar.
//Este servicio de "Supabase" solo va a instanciar el cliente y exportarlo
import {createClient} from '@supabase/supabase-js';

//Definimos las claves de nuestra API.
//Las pueden obtener en el link "View API settings" cerca de "Project API"  de su dashboard del proyecto.
//anachei
const Supabase_URL = "https://becbnoeursseoigctrbh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlY2Jub2V1cnNzZW9pZ2N0cmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzODQ2NjQsImV4cCI6MjA1OTk2MDY2NH0.yTBjTQHERS0EeskGSz9yU6pyBN7yQLK3SKExZkiE2so";

//Creamos el clienet
const supabase = createClient(Supabase_URL, SUPABASE_KEY);

export default supabase;