import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function SelectionList({
  options,
  label,
  value,
  setValue,
  handleAction,
}) {
  const handleChange = (event) => {
    handleAction(event.target.value);
    setValue(event.target.value);
  };

  return (
    <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-filled-label">{label}</InputLabel>
      <Select
        labelId="select-filled-label"
        id="demo-simple-select-filled"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
