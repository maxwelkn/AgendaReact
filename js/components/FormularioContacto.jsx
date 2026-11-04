import { useRef, useState } from 'react'

const CAMPOS_VACIOS = { nombre: '', apellido: '', telefono: '' }

export default function FormularioContacto({ onGuardar }) {
  const [campos, setCampos] = useState(CAMPOS_VACIOS)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [estado, setEstado] = useState('')
  const envioEnCurso = useRef(false)

  function cambiarCampo(evento) {
    setCampos({ ...campos, [evento.target.name]: evento.target.value })
  }

  async function enviarContacto(evento) {
    evento.preventDefault()
    if (envioEnCurso.current) return

    const contacto = {
      nombre: campos.nombre.trim(),
      apellido: campos.apellido.trim(),
      telefono: campos.telefono.trim(),
    }

    if (!contacto.nombre || !contacto.apellido || !contacto.telefono) {
      setMensaje('Completa el nombre, apellido y teléfono.')
      setEstado('error')
      return
    }

    envioEnCurso.current = true
    setGuardando(true)
    setMensaje('Guardando contacto...')
    setEstado('')

    try {
      const actualizado = await onGuardar(contacto)
      setCampos(CAMPOS_VACIOS)
      setMensaje(actualizado
        ? 'Contacto guardado correctamente.'
        : 'Contacto guardado, pero la lista no se pudo actualizar.')
      setEstado('success')
    } catch {
      setMensaje('No se pudo guardar el contacto. Inténtalo de nuevo.')
      setEstado('error')
    } finally {
      envioEnCurso.current = false
      setGuardando(false)
    }
  }

  return (
    <section className="panel form-panel" aria-labelledby="form-title">
      <div className="panel-heading">
        <span className="panel-icon" aria-hidden="true">+</span>
        <div>
          <p className="section-label">NUEVO CONTACTO</p>
          <h2 id="form-title">Agregar a la agenda</h2>
        </div>
      </div>
      <p className="panel-description">Completa los tres campos para guardar el contacto.</p>
      <form onSubmit={enviarContacto} aria-busy={guardando}>
        <div className="field">
          <label htmlFor="first-name">Nombre</label>
          <input id="first-name" name="nombre" type="text" autoComplete="given-name" maxLength={60}
            placeholder="Ej. Ana" required disabled={guardando} value={campos.nombre} onChange={cambiarCampo} />
        </div>
        <div className="field">
          <label htmlFor="last-name">Apellido</label>
          <input id="last-name" name="apellido" type="text" autoComplete="family-name" maxLength={60}
            placeholder="Ej. Pérez" required disabled={guardando} value={campos.apellido} onChange={cambiarCampo} />
        </div>
        <div className="field">
          <label htmlFor="phone">Teléfono</label>
          <input id="phone" name="telefono" type="tel" autoComplete="tel" inputMode="tel" maxLength={30}
            placeholder="Ej. 809-555-1234" required disabled={guardando} value={campos.telefono} onChange={cambiarCampo} />
        </div>
        <button className="button button-primary" type="submit" disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar contacto'} <span aria-hidden="true">↗</span>
        </button>
        <p className="form-status" role="status" aria-live="polite" data-state={estado}>{mensaje}</p>
      </form>
    </section>
  )
}
