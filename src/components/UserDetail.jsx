export default function UserDetail({ user }) {
  if (!user) {
    return (
      <section className="panel">
        <p>Selecciona un usuario para ver su detalle.</p>
      </section>
    );
  }

  return (
    <section className="panel user-detail">
      <div className="profile">
        <img className="avatar" src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
        <div>
          <h2>{`${user.name.first} ${user.name.last}`}</h2>
          <p>{user.email}</p>
          <span className="badge">{user.location.city}</span>
        </div>
      </div>
      <div>
        <p><strong>Teléfono:</strong> {user.phone}</p>
        <p><strong>País:</strong> {user.location.country}</p>
        <p><strong>Edad:</strong> {user.dob.age}</p>
      </div>
    </section>
  );
}
