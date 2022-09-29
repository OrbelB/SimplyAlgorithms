import {NavLink} from "react-router-dom";
export default function NestedDropdownMenu({selection, title, links}) {
    return (
        <li>
            <a className="dropdown-item" href="#" role="button" unselectable={"off"}
               data-bs-toggle="dropdown"
               aria-expanded="false"
               >
                {title} &raquo;
            </a>
            <ul className={`dropdown-menu dropdown-submenu`}>
                {
                    selection?.map((topic, index) => (
                        <li key={index}><NavLink className="dropdown-item" to={links[index]}>{topic}</NavLink></li>
                    ))
                }
            </ul>
        </li>
    );

}