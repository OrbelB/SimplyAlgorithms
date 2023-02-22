import { Button } from '@mui/material';
import NestedDropdownMenu from './NestedDropdownMenu';

export default function DropdownMenu({
  dropdownTitle,
  nestedDropdownSelections,
}) {
  return (
    <li className="nav-item dropdown p-3">
      <Button
        sx={{
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
          fontWeight: 400,
          fontSize: 20,
          padding: '0.5rem 1rem',
        }}
        className="nav-link dropdown-toggle rounded-pill bg-primary text-white"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        unselectable="off"
      >
        {dropdownTitle}
      </Button>
      <ul className="dropdown-menu dropdown-center text-center">
        {nestedDropdownSelections.map((nestedDropdown) => (
          <NestedDropdownMenu
            key={`${nestedDropdown.title}`}
            title={nestedDropdown.title}
            selection={nestedDropdown.selections}
            links={nestedDropdown.links}
          />
        ))}
      </ul>
    </li>
  );
}
