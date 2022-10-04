import NestedDropdownMenu from "./NestedDropdownMenu";

export default function DropdownMenu({
                                         dropdownTitle,
                                         nestedDropdownSelections,
                                     }) {
    return (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle bg-primary text-white rounded-4" role="button"
               data-bs-toggle="dropdown"
               aria-expanded="false"
               unselectable={"off"}
            >
                {dropdownTitle}
            </a>
            <ul className="dropdown-menu">
                {
                    nestedDropdownSelections.map((nestedDropdown, index) => (
                        <NestedDropdownMenu key={index} title={nestedDropdown.title} selection={nestedDropdown.selections} links={nestedDropdown.links}/>
                    ))
                }
            </ul>
        </li>

    );
}