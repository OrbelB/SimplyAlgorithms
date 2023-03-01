import { NavLink, useParams } from 'react-router-dom';
import WikiHome from '../components/wiki/WikiHome';

const links = {
  link: 'What Are ALgorithms',
  title: 'What Are ALgorithms',
  pages: [
    {
      link: 'sorting',
      title: 'Sorting',
    },
    {
      link: 'trees',
      title: 'Trees',
    },
    {
      link: 'graphs',
      title: 'Graphs',
    },
    { link: 'datastructures', title: 'Data Structures' },
  ],
};

function Top() {
  return (
    <>
      <NavLink
        to={`/wiki/${links.title}`}
        data-toggle="tab"
        className="nav-item nav-link has-icon nav-link-faded fs"
      >
        {links.link}
      </NavLink>
      {links.pages.map((link) => (
        <NavLink
          key={link.link}
          to={`/wiki/${link.link}`}
          data-toggle="tab"
          className="nav-item nav-link has-icon nav-link-faded indent fs"
        >
          {link.title}
        </NavLink>
      ))}
    </>
  );

  /* <NavLink
        to="/wiki"
        data-toggle="tab"
        className="nav-item nav-link has-icon nav-link-faded fs"
      >
        WHAT ARE ALGORITHMS?
      </NavLink>
      <br />
      <NavLink
        to="/sorting"
        data-toggle="tab"
        className="nav-item nav-link has-icon nav-link-faded indent fs"
      >
        Sorting
      </NavLink>
      <NavLink
        to="/trees"
        data-toggle="tab"
        className="nav-item nav-link has-icon nav-link-faded indent fs"
      >
        Trees
      </NavLink>
      <NavLink
        to="/graphs"
        data-toggle="tab"
        className="nav-item nav-link has-icon nav-link-faded indent fs"
      >
        Graphs
      </NavLink>
      <NavLink
        to="/datastructures"
        data-toggle="tab"
        className="nav-item nav-link has-icon nav-link-faded indent fs"
      >
        Data Structures
      </NavLink> */
}

function Bottom() {
  return (
    <>
      <h3>What Are Algorithms?</h3>
      <h5>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur
      </h5>
      <br />
      <h3>How Do They Work?</h3>
      <h5>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur
      </h5>
      <br />
      <h3>Complexity</h3>
      <h5>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur
      </h5>
      <br />
      <h3>Some Examples</h3>
      <h5>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur
      </h5>
      <br />
      <h3>For Further Reference</h3>
      <h5>google.com</h5>
    </>
  );
}

// //form for creating a new page
// function CreateWiki() {
//   return (
//     <div>
//       <h1>Create a new wiki page</h1>
//       <form>
//         <label htmlFor="title">
//           Title:
//           <input type="text" id="title" name="title" />
//         </label>
//         <label htmlFor="content">
//           Content:
//           <input type="text" id="content" name="content" />
//         </label>
//         <label htmlFor="pages">
//           Pages:
//           <input type="text" name="pages" />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     </div>
//   );
// }

export default function WikiPage() {
  const { wikiName } = useParams();
  return <WikiHome title={wikiName} Top={<Top />} Bottom={<Bottom />} />;
}
