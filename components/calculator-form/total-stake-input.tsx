import { TInput } from "./types";

const TotalStakeInput = ({
  register,
  handleChange,
  errors,
}: TInput) => {
  return (
    <div className="flex items-center">
      <label htmlFor="totalStake" className="mb-6">
        Total Stake
      </label>
      <div className="flex flex-col">
        <input
          {...register("totalStake")}
          name="totalStake"
          type="number"
          onChange={(e) => handleChange(e, "totalStake")}
        />

        <div
          className={`error-message h-6 ${
            errors.totalStake ? "" : "invisible"
          } text-red-600`}
        >
          {errors.totalStake?.message}
        </div>
      </div>
    </div>
  );
};

export default TotalStakeInput;
