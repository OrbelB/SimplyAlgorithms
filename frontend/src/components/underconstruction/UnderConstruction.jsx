import image from '../../assets/under-construction.jpg';
import './UnderConstruction.css';

export default function UnderConstruction() {
  return (
    <div className="container mt-2">
      <div className="row d-flex justify-content-center">
        <div className="col-md-7">
          <div className="card border-white p-3 py-4">
            <div className="text-center">
              <div className="font text-align-center">
                <h2>This Page is under Construction!</h2>
              </div>
              <img
                src={image}
                height="100%"
                width="100%"
                alt="current profile"
                className="rounded-circle text-align-center"
              />
              <div className="font text-align-center">
                <h2>Come back at a later time.</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
