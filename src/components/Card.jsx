export default function Card({ data, clickHandler }) {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <div id={data.id} className="card" onClick={() => clickHandler(data.name)}>
      <img src={data.imgSrc} alt={data.name} width={200} />
      <p>{capitalize(data.name)}</p>
    </div>
  );
}
