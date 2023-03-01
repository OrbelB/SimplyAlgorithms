import './WikiHome.css';

export default function WikiHome({ title, Top, Bottom }) {
  return (
    <div className="wikibody">
      <div className="wikititle">{title}</div>
      <div className="wiki-section">
        <div className="row gutters-sm">
          <div className="col-md-4 d-none d-md-block">
            <div className="card">
              <div className="card-body">
                <nav className="nav flex-column nav-pills nav-gap-y-1 nav-size">
                  {/* Specific wiki topic pages will be implemented later, to be added in topics folder */}
                  {Top}
                </nav>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header border-bottom mb-3 d-flex d-md-none" />
              <div className="card-body tab-content">
                <div className="tab-pane active" id="profile">
                  {Bottom}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
