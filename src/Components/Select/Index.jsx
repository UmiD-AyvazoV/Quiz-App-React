import './Select.css';

const Select = ({ data, setData }) => {
  return (
    <div className="Select">
      <select onChange={(e) => setData(e.target.value)}>
        {data.map((d, i) => (
          <option value={d} key={i}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;