export default function ListaContactos({ contactos, cargando, consultado, error }) {
  let mensaje = `Mostrando ${contactos.length} contactos.`
  if (contactos.length === 0) mensaje = 'Todavía no hay contactos guardados.'
  if (!consultado) mensaje = ''
  if (error) mensaje = error
  if (cargando) mensaje = 'Cargando contactos...'

  return (
    <section className="panel contacts-panel" aria-labelledby="contacts-title">
      <h2 id="contacts-title">
        Contactos <span className="count">{consultado ? contactos.length : '—'}</span>
      </h2>
      <p className="list-status" role="status" aria-live="polite" data-state={error ? 'error' : ''}>
        {mensaje}
      </p>
      <ul className="contact-list" aria-label="Contactos guardados" aria-busy={cargando}>
        {contactos.map((contacto, indice) => (
          <li className="contact-item" key={indice}>
            <span className="avatar" aria-hidden="true">
              {((contacto.nombre[0] ?? '') + (contacto.apellido[0] ?? '')).toUpperCase() || '?'}
            </span>
            <div className="contact-info">
              <div className="contact-name">
                {`${contacto.nombre} ${contacto.apellido}`.trim() || 'Sin nombre'}
              </div>
              <div className="phone-text">{contacto.telefono || 'Sin teléfono'}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
