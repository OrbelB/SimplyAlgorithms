import {NavLink} from "react-router-dom";
export default function NestedDropdownMenu({selection, title, links}) {
    return (
        <li>
            <i className="dropdown-item"  role="button" unselectable={"off"}
               data-toggle={"dropdown"}
               aria-expanded="false"
               >
                {title}
            </i>
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