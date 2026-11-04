const API_URL = 'https://www.raydelto.org/agenda.php'

function obtenerTexto(valor) {
  return String(valor ?? '').trim()
}

export async function obtenerContactos(signal) {
  const respuesta = await fetch(API_URL, { cache: 'no-store', signal })
  if (!respuesta.ok) throw new Error(`GET ${respuesta.status}`)

  const datos = await respuesta.json()
  if (!Array.isArray(datos)) throw new Error('Formato de respuesta inesperado')

  return datos
    .filter((contacto) => contacto && typeof contacto === 'object' && !Array.isArray(contacto))
    .map((contacto) => ({
      nombre: obtenerTexto(contacto.nombre),
      apellido: obtenerTexto(contacto.apellido),
      telefono: obtenerTexto(contacto.telefono),
    }))
}
