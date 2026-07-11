export default function Header({ title, subtitle }) {
  return (
    <header className="hero panel">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  );
}
