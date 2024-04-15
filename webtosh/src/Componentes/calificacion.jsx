// Datos de ejemplo

// Función para calcular la calificación promedio
export const calcularStart = () => {
// function calcularStart (votantes) {
  // Inicializar la suma total y el número total de votantes
  const votantes = [
    { calificacion: 3, cantidad: 15 },
    { calificacion: 1, cantidad: 14 },
    { calificacion: 4, cantidad: 10 },
    { calificacion: 5, cantidad: 300 },
    { calificacion: 2, cantidad: 30 }
  ];
  let sumaTotal = 0;
  let totalVotantes = 0;

  // Recorrer cada votante
  votantes.forEach(votante => {
    // Multiplicar la calificación por la cantidad de votantes que la otorgaron
    const subtotal = votante.calificacion * votante.cantidad;
    // Sumar al total
    sumaTotal += subtotal;
    // Sumar la cantidad de votantes
    totalVotantes += votante.cantidad;
  });

  // Calcular la calificación promedio dividiendo la suma total por el número total de votantes
// Verificar si hay votantes antes de calcular la calificación promedio
let calificacionPromedio;
if (totalVotantes > 0) {
  // Calcular la calificación promedio dividiendo la suma total por el número total de votantes
  calificacionPromedio = Math.round((sumaTotal / totalVotantes) * 1000) / 1000;
} else {
  // Si no hay votantes, la calificación promedio es 0
  calificacionPromedio = 0;
}
return calificacionPromedio;
}
