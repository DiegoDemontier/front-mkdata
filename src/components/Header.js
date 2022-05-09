export default function Header({ title, subTitles, setToogle }) {
  return (
    <div className="header">
      <h1>{title}</h1>
      <button
        onClick={() => { setToogle(prev => !prev) }}
      >
        <p>{subTitles}</p>
      </button>
    </div>
  );
}
