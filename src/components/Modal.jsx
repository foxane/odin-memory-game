export default function Modal({ text, setModal }) {
  return (
    <div className="modal">
      <h3>{text}</h3>
      <button onClick={() => setModal('')}>Confirm</button>
    </div>
  );
}
