import loadingIcon from '/loading.svg';

export default function Loading() {
  return (
    <div className="modal-overlay">
      <img className="loading" src={loadingIcon} alt="" width={200} />;
    </div>
  );
}
