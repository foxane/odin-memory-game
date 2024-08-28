export default function Modal({ text, setModal }) {
  return (
    <div className="modal">
      <div className="modal-overlay" onClick={() => setModal('')}></div>
      <div className="modal-content">
        <h3>{text}</h3>
        <button onClick={() => setModal('')}>Confirm</button>
      </div>
    </div>
  );
}
