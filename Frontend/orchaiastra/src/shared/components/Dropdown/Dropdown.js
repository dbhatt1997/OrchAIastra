import { useStyles } from "./styles";

export const Dropdown = ({ label, value, onChange, options }) => {
  const classes = useStyles();
  console.log(options);
  return (
    <label>
      {label}
      <select
        className={classes.dropdown}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option key={"Select-0"} value={"Select"}>
          Select
        </option>
        {options.map((item, index) => (
          <option key={`${item.value}-${index}`} value={item.value}>
            {item.value}
          </option>
        ))}
      </select>
    </label>
  );
};
