import './MeetTeam.css';
import image1 from '../../assets/Orbel.jpg';
import image2 from '../../assets/Jefferson.jpg';
import image3 from '../../assets/Kevin.jpg';
import image4 from '../../assets/Joey.jpg';

export default function MeetTeam() {
  return (
    <div className="teampage">
      <div className="teampage-top">
        <h1 className="teampage-title">MEET THE TEAM</h1>
        <br />
        <div className="title-description">
          Thank you for visiting the Simply Algorithms website. SA is our senior
          project for class Comp 490 & 491 at the California State University,
          Northridge. Our goal for this website is to create a one stop shop for
          learning all things algorithms. Our team would not have been able to
          achieve so much without the help of our professor, Afshin Amini. Our
          website aims to help beginners who have just started learning about
          computer science by providing them with all of the necessary tools for
          studying. Students have access to our wiki / topic page where they can
          read and visualize the information. Students can continue their
          education by asking questions on our forums, testing their knowledge
          by taking quizzes, and tracking their progress using the dashboard.
          Lastly and most importantly, students have access to a private
          notebook which they can take notes, share notes, and save public
          notes. Additionally, verified users (teachers) and admins are given
          the ability to create new topic pages, quizzes, and public notes for
          all students to use and learn from. We hope you enjoy your visit.
        </div>
      </div>
      <div className="team-members">
        <div className="bio-space">
          <h2 className="member-name n1">Orbel Baghdasian</h2>
          <div className="description-1">
            <img className="portrait" alt="beautiful face pic" src={image1} />
            <div className="member-bio">
              For this project Orbel took the role of Project Manager where he
              managed the team`s schedule using Jira, as well as holding weekly
              meetings where he and the team discussed their progress. Orbel
              managed the workflow by assigning tasks to his fellow team members
              and monitoring their progress. Also, as a project manager he was
              responsible for general administrative tasks. His second role in
              the team was as a backend developer where he researched and
              developed the backend portion of the quizzes, notes, universal
              reports, and other minor features. Orbel aimed to create flexible
              and dynamic code which can be added on to or handle increased
              load. Lastly, he also contributed to minor front end development.
            </div>
            <div className="member-bio">
              Outside the project, Orbel is a graduate of California State
              university, Northridge (CSUN) with a bachelors in Computer
              Science. His career goal is to attain a role working with data
              science and machine learning. Orbel am grateful to everyone who
              has supported him thus far.
            </div>
            <a href="https://github.com/OrbelB">
              <button className="glow-on-hover g1" type="button">
                <h2>Github</h2>
              </button>
            </a>
            <br />
            <br />
            <a href="https://www.linkedin.com/in/orbel-baghdasian/">
              <button className="glow-on-hover g1" type="button">
                <h2>Linkedin</h2>
              </button>
            </a>
          </div>
        </div>
        <div className="bio-space">
          <h2 className="member-name n2">Jefferson Perez Diaz</h2>
          <div className="description-2">
            <img className="portrait" alt="beautiful face pic" src={image2} />
            <div className="member-bio">
              For this project Jefferson took the role of Fullstack Developer
              where he worked on both the frontend and backend functionalities.
              His responsibilites included determining the design of many of the
              site`s features, as well as integrating the frontend with the
              backend to ensure that all features worked efficiently.
            </div>
            <div className="member-bio">
              Jefferson is a full stack developer with expertise in Java, Spring
              Boot, JavaScript, AWS, and ReactJS. He is passionate about
              creating innovative solutions that meet user needs and business
              requirements. He thrives on solving complex problems and
              continuously improving my skills in an environment that is
              constantly evolving and working with the latest technologies.
            </div>
            <a href="https://github.com/PDJefferson">
              <button className="glow-on-hover g2" type="button">
                <h2>Github</h2>
              </button>
            </a>
            <br />
            <br />
            <a href="https://www.linkedin.com/in/pdjefferson/">
              <button className="glow-on-hover g2" type="button">
                <h2>Linkedin</h2>
              </button>
            </a>
          </div>
        </div>
        <div className="bio-space">
          <h2 className="member-name n3">Kevin Flores</h2>
          <div className="description-3">
            <img className="portrait" alt="beautiful face pic" src={image3} />
            <div className="member-bio">
              For this project, Kevin took the role of frontend developer where
              he worked on the UI design for functionalities like the user
              dashboard and quizzes, as well as implementing these components in
              the frontend. kevin should add more stuff about himself here
            </div>
            <a href="https://github.com/floreskevin87">
              <button className="glow-on-hover g3" type="button">
                <h2>Github</h2>
              </button>
            </a>
            <br />
            <br />
            <a href="https://www.linkedin.com/in/kevin-flores-2005a0173">
              <button className="glow-on-hover g3" type="button">
                <h2>Linkedin</h2>
              </button>
            </a>
          </div>
        </div>
        <div className="bio-space">
          <h2 className="member-name n4">Joseph Wang</h2>
          <div className="description-4">
            <img className="portrait" alt="beautiful face pic" src={image4} />
            <div className="member-bio">
              For this project, Joseph took the role of frontend developer where
              he worked on the implementation of components such as the forums
              and wiki. Additionally, he also worked on the design of the site,
              which includes the themes and colors of the user interfaces.
              Secondly, Joseph also worked on some of the UI designs for these
              components with the other members to ensure the interfaces would
              be simple and accessible to the users.
            </div>
            <div className="member-bio">
              Joseph is a graduate of CSUN and hopes to work as a frontend
              developer as a career.
            </div>
            <a href="https://github.com/joey-codes">
              <button className="glow-on-hover g4" type="button">
                <h2>Github</h2>
              </button>
            </a>
            <br />
            <br />
            <a href="https://www.linkedin.com/in/joseph-wang-642258274/">
              <button className="glow-on-hover g4" type="button">
                <h2>Linkedin</h2>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
