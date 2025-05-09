// La carpeta "services" va a contener todos los servicios de nuestro proyecto.
// Por "servicios", nos referimos a cualquier funcionalidad que nuestros componentes o código en general puedan necesitar.
// Este servicio de "Supabase" solo va instanciar el cliente y exportarlo.
import { createClient } from '@supabase/supabase-js';

// Definimos las claves de nuestra API.
// Las pueden obtener en el link "View API settings" cerca de "Project API" de su dashboard del proyecto.
// Cámbienlas por las de su proyecto :D
const SUPABASE_URL = "https://nsgzxocjqqlrwylduqop.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zZ3p4b2NqcXFscnd5bGR1cW9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzODQzMzIsImV4cCI6MjA1OTk2MDMzMn0.KjNtnazpu0RnRrMhMMT8gbYpnCqe5rUTHXxJZCn0YII";

// Creamos el cliente.
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;