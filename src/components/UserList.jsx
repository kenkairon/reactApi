export default function UserList({ users, selectedUserId, onSelect, loading, error, viewMode }) {
  if (loading) {
    return <section className="panel"><p>Cargando usuarios...</p></section>;
  }

  if (error) {
    return <section className="panel"><p>{error}</p></section>;
  }

  return (
    <section className="panel">
      <h2>Usuarios</h2>
      <div className="user-list">
        {users.length === 0 ? (
          <p>No se encontraron usuarios.</p>
        ) : users.map((user) => (
          <article
            key={user.login.uuid}
            className={`user-card ${selectedUserId === user.login.uuid ? 'active' : ''}`}
            onClick={() => onSelect(user)}
          >
            <img className="avatar" src={user.picture.thumbnail} alt={`${user.name.first} ${user.name.last}`} />
            <div>
              <strong>{`${user.name.first} ${user.name.last}`}</strong>
              <div>{user.email}</div>
              {viewMode === 'compact' ? <span className="badge">Vista compacta</span> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
