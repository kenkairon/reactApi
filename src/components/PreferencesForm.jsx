export default function PreferencesForm({ preferences, onChange, onSearchChange, searchValue }) {
  return (
    <section className="panel">
      <h2>Preferencias</h2>
      <div className="controls">
        <label>
          <span>Tu nombre</span>
          <input name="name" value={preferences.name} onChange={onChange} placeholder="Escribe tu nombre" />
        </label>
        <label>
          <span>Tema</span>
          <select name="theme" value={preferences.theme} onChange={onChange}>
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </label>
        <label>
          <span>Vista</span>
          <select name="view" value={preferences.view} onChange={onChange}>
            <option value="cards">Tarjetas</option>
            <option value="compact">Compacta</option>
          </select>
        </label>
        <label>
          <span>Buscar usuario</span>
          <input value={searchValue} onChange={(event) => onSearchChange(event.target.value)} placeholder="Nombre o correo" />
        </label>
      </div>
    </section>
  );
}
