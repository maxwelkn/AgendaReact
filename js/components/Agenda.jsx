import { useCallback, useEffect, useRef, useState } from 'react'
import { guardarContacto, obtenerContactos } from '../services/agenda.js'
import FormularioContacto from './FormularioContacto.jsx'
import ListaContactos from './ListaContactos.jsx'

export default function Agenda() {
  const [contactos, setContactos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [consultado, setConsultado] = useState(false)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')
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
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="./" aria-label="Agenda, inicio">
            <span className="brand-mark" aria-hidden="true">A</span>
            <span>Agenda<span className="brand-dot">.</span></span>
          </a>
          <span className="course-label">Programación Web · Tarea 4</span>
        </div>
      </header>

      <main className="page">
        <div className="intro">
          <span className="eyebrow">AGENDA REACT</span>
          <h1>Personas a un clic de distancia.</h1>
          <p>Consulta los contactos guardados y agrega uno nuevo con su nombre, apellido y teléfono.</p>
        </div>
        <div className="workspace">
          <FormularioContacto onGuardar={agregarContacto} />
          <ListaContactos
            contactos={contactos}
            cargando={cargando}
            consultado={consultado}
            error={error}
            busqueda={busqueda}
            onBuscar={setBusqueda}
            onActualizar={actualizarContactos}
          />
        </div>
      </main>

      <footer className="site-footer">Agenda de contactos · Programación Web</footer>
    </>
  )
}
