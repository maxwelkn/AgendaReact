import { useCallback, useEffect, useRef, useState } from 'react'
import { guardarContacto, obtenerContactos } from '../services/agenda.js'
import FormularioContacto from './FormularioContacto.jsx'
import ListaContactos from './ListaContactos.jsx'

export default function Agenda() {
  const [contactos, setContactos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [consultado, setConsultado] = useState(false)
  const [error, setError] = useState('')
  const consultaActual = useRef(null)

  const cargarContactos = useCallback(() => {
    consultaActual.current?.abort()
    const controlador = new AbortController()
    consultaActual.current = controlador
    return obtenerContactos(controlador.signal)
      .then((datos) => {
        if (controlador.signal.aborted) return false
        setContactos(datos)
        setConsultado(true)
        return true
      })
      .catch(() => {
        if (!controlador.signal.aborted) {
          setError('No se pudieron cargar los contactos. Intenta actualizar la lista.')
        }
        return false
      })
      .finally(() => {
        if (!controlador.signal.aborted) setCargando(false)
      })
  }, [])

  useEffect(() => {
    cargarContactos()
    return () => consultaActual.current?.abort()
  }, [cargarContactos])

  function actualizarContactos() {
    setCargando(true)
    setError('')
    return cargarContactos()
  }

  async function agregarContacto(contacto) {
    await guardarContacto(contacto)
    return actualizarContactos()
  }

  return (
    <main>
      <h1>Agenda de contactos</h1>
      <p>Programación Web · Tarea 4 · React</p>
      <FormularioContacto onGuardar={agregarContacto} />
      <ListaContactos
        contactos={contactos}
        cargando={cargando}
        consultado={consultado}
        error={error}
      />
    </main>
  )
}
