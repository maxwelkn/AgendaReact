export default function ListaContactos({
  contactos, cargando, consultado, error, busqueda, onBuscar, onActualizar,
}) {
  const consulta = busqueda.trim().toLocaleLowerCase('es')
  const visibles = contactos.filter((contacto) =>
    `${contacto.nombre} ${contacto.apellido} ${contacto.telefono}`
      .toLocaleLowerCase('es').includes(consulta))

  let mensaje = `Mostrando ${contactos.length} contactos.`
  if (consulta) mensaje = `Mostrando ${visibles.length} de ${contactos.length} contactos.`
  if (visibles.length === 0) mensaje = 'No hay contactos que coincidan con la búsqueda.'
  if (contactos.length === 0) mensaje = 'Todavía no hay contactos guardados.'
  if (!consultado) mensaje = ''
  if (error) mensaje = error
  if (cargando) mensaje = 'Cargando contactos...'

  return (
    <section className="panel contacts-panel" aria-labelledby="contacts-title">
      <div className="contacts-heading">
        <div>
          <p className="section-label">DIRECTORIO</p>
          <h2 id="contacts-title">
            Contactos <span className="count">{consultado ? contactos.length : '—'}</span>
          </h2>
        </div>
        <button className="button button-secondary" type="button" disabled={cargando} onClick={onActualizar}>
          Actualizar lista
        </button>
      </div>
      <label className="search-label" htmlFor="search">Buscar por nombre, apellido o teléfono</label>
      <div className="search-wrap">
        <span aria-hidden="true">⌕</span>
        <input id="search" type="search" placeholder="Buscar contacto..." autoComplete="off"
          value={busqueda} onChange={(evento) => onBuscar(evento.target.value)} />
      </div>
      <p className="list-status" role="status" aria-live="polite" data-state={error ? 'error' : ''}>
        {mensaje}
      </p>
      <ul className="contact-list" aria-label="Contactos guardados" aria-busy={cargando}>
        {visibles.map((contacto, indice) => (
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
