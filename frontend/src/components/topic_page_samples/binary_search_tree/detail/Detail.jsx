import './Detail.css';

export default function Detail({ children }) {
  return (
    <div className="detail text-center">
      <div className="size">{children}</div>
    </div>
  );
}
