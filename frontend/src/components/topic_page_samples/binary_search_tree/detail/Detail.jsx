import './Detail.css';

export default function Detail({ children }) {
  return (
    <div className="detail text-center">
      <div className="top p-5">
        <h2>SEARCH STEPS</h2>
        <div className="size text-center">{children}</div>
      </div>
    </div>
  );
}
