import './MeetTeam.css';
import image from '../../assets/under-construction.jpg';

export default function MeetTeam() {
  return (
    <div className="teampage">
      <div className="teampage-top">
        <h1 className="teampage-title">MEET THE TEAM</h1>
        <div className="title-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae et
          leo duis ut diam quam nulla porttitor.
        </div>
      </div>
      <div className="team-members">
        <div className="bio-space">
          <h2 className="member-name n1">Orbel Baghdasian</h2>
          <div className="description-1">
            <img className="portrait" alt="beautiful face pic" src={image} />
            <div className="member-bio">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
              et leo duis ut diam quam nulla porttitor. Sed turpis tincidunt id
              aliquet risus feugiat in ante metus. Malesuada fames ac turpis
              egestas sed tempus. Consectetur purus ut faucibus pulvinar
              elementum integer enim. Sit amet consectetur adipiscing elit duis
            </div>
            <a href="https://github.com/OrbelB">
              <button className="glow-on-hover g1" type="button">
                <h2>Github</h2>
              </button>
            </a>
          </div>
        </div>
        <div className="bio-space">
          <h2 className="member-name n2">Jefferson Perez Diaz</h2>
          <div className="description-2">
            <img className="portrait" alt="beautiful face pic" src={image} />
            <div className="member-bio">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
              et leo duis ut diam quam nulla porttitor. Sed turpis tincidunt id
              aliquet risus feugiat in ante metus. Malesuada fames ac turpis
              egestas sed tempus. Consectetur purus ut faucibus pulvinar
              elementum integer enim. Sit amet consectetur adipiscing elit duis
            </div>
            <a href="https://github.com/PDJefferson">
              <button className="glow-on-hover g2" type="button">
                <h2>Github</h2>
              </button>
            </a>
          </div>
        </div>
        <div className="bio-space">
          <h2 className="member-name n3">Kevin Flores</h2>
          <div className="description-3">
            <img className="portrait" alt="beautiful face pic" src={image} />
            <div className="member-bio">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
              et leo duis ut diam quam nulla porttitor. Sed turpis tincidunt id
              aliquet risus feugiat in ante metus. Malesuada fames ac turpis
              egestas sed tempus. Consectetur purus ut faucibus pulvinar
              elementum integer enim. Sit amet consectetur adipiscing elit duis
            </div>
            <a href="https://github.com/floreskevin87">
              <button className="glow-on-hover g3" type="button">
                <h2>Github</h2>
              </button>
            </a>
          </div>
        </div>
        <div className="bio-space">
          <h2 className="member-name n4">Joseph Wang</h2>
          <div className="description-4">
            <img className="portrait" alt="beautiful face pic" src={image} />
            <div className="member-bio">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae
              et leo duis ut diam quam nulla porttitor. Sed turpis tincidunt id
              aliquet risus feugiat in ante metus. Malesuada fames ac turpis
              egestas sed tempus. Consectetur purus ut faucibus pulvinar
              elementum integer enim. Sit amet consectetur adipiscing elit duis
            </div>
            <a href="https://github.com/joey-codes">
              <button className="glow-on-hover g4" type="button">
                <h2>Github</h2>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
