export default function Header({ score, highScore }) {
  return (
    <div className="header">
      <div className="header-title">
        <h1>What was that pokemon?</h1>
        <p>
          Get point by clicking on image but dont click on any more than once!
        </p>
      </div>
      <div className="scores">
        <p>
          Score :<span className="value"> {score}</span>
        </p>
        <p>
          High score :<span className="value"> {highScore}</span>
        </p>
      </div>
    </div>
  );
}
