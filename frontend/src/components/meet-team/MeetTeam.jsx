import './MeetTeam.css';
import image1 from '../../assets/Orbel.jpg';
import image2 from '../../assets/Jefferson.jpg';
import image3 from '../../assets/person-fill.png';
import image4 from '../../assets/Joey.jpg';

export default function MeetTeam() {
  return (
    <div className="teampage">
      <div className="teampage-top">
        <h1 className="teampage-title">MEET THE TEAM</h1>
        <br />
        <div className="title-description">
          Simply Algorithms was created by a team of 4 college students with the
          goal of making a one-stop shop platform for all things algorithms.
          Below you can find information about each team member with links to
          their other projects.
        </div>
      </div>
      <div className="team-members">
        <div className="bio-space">
          <h2 className="member-name n1">Orbel Baghdasian</h2>
          <div className="description-1">
            <img className="portrait" alt="beautiful face pic" src={image1} />
            <div className="member-bio">
              Meet Orbel, the one and only! This larger-than-life personality is
              a force to be reckoned with. With a personality that is as
              flamboyant as his rainbow-colored hair, Orbel is impossible to
              ignore. From a young age, Orbel was destined for greatness. Born
              into a family of circus performers, he was a natural-born
              entertainer. He quickly mastered every act, from tightrope walking
              to juggling flaming torches. But Orbel was never content with just
              being a performer - he wanted to be a star. He also became a
              social media sensation, dancing for millions of followers on
              TikTok. He is a dirty immigrant.
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
            <img className="portrait" alt="beautiful face pic" src={image2} />
            <div className="member-bio">
              Meet Jefferson, the world-record holder for the longest time spent
              staring at a wall. That`s right, Jefferson has spent a whopping
              273 hours staring at a blank wall without moving or blinking. Born
              and raised in a small town, Jefferson always knew he was destined
              for greatness. But he didn`t quite know how to achieve it until he
              discovered his talent for staring at walls. It started as a joke -
              he was bored one day and decided to see how long he could stare at
              a wall without blinking. The rest, as they say, is history. When
              he`s not staring at walls, Jefferson enjoys counting the number of
              times his cat blinks in a minute.
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
            <img className="portrait" alt="beautiful face pic" src={image3} />
            <div className="member-bio">
              Kevin is a mysterious figure who was born without a face. He has
              been the subject of much speculation and rumor. Some say he`s a
              figment of people`s imaginations, while others claim to have seen
              him in person. He`s said to communicate through gestures and
              written notes, as he`s unable to speak. Many who have supposedly
              encountered him describe him as having an otherworldly presence.
              Some skeptics believe that the rumors about him are simply a
              product of the internet age, where information -and
              misinformation- can spread quickly and easily. Despite the doubts
              and speculation, we are somewhat confident Kevin actually exists.
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
            <img className="portrait" alt="beautiful face pic" src={image4} />
            <div className="member-bio">
              Joey is not your average college student. In fact, he`s not really
              a college student at all. Joey is a highly trained spy, working
              for a secret Chinese intelligence network embedded within the
              college system. Masquerading as a college student, Joey has
              infiltrated several universities across the country. His mission
              is to gather intelligence on the inner workings of the American
              education system. Despite his covert operations, Joey has managed
              to maintain a low profile on campus. He`s known by his classmates
              as a nice and dedicated student. Little do they know that he`s
              actually gathering information that will be used to achieve
              China`s geopolitical dominance.
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
