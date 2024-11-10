import { UseFormRegister } from "react-hook-form";
import { TFormState } from "./model";

type SelectSystemTypeProps = {
  register: UseFormRegister<TFormState>;
  handleSelectChange: THandleChangeEvent;
  systemTypes: TSystemTypeData[];
};

const SelectSystemType = ({
  handleSelectChange,
  register,
  systemTypes,
}: SelectSystemTypeProps) => (
  <div className="flex items-center">
    <label htmlFor="systemType" className="min-w-28">
      System Type
    </label>
    <div className="pr-3 border border-gray-300 rounded-md bg-white">
      <select
        className="block w-full px-4 py-3 bg-white border-none shadow-sm focus:outline-none"
        id="systemType"
        {...register("systemType")}
        onChange={handleSelectChange}
      >
        {systemTypes.map(({ id, from, pick }) => (
          <option
            key={id}
            value={`${pick}/${from}`}
          >{`${pick} from ${from}`}</option>
        ))}
      </select>
    </div>
  </div>
);

export default SelectSystemType;
