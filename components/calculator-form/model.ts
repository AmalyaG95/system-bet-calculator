import * as yup from "yup";

import { generateInitialEvents } from "@/utils";

export type TFormState = {
  systemType: string;
  totalStake: number;
  events: TEvent[];
};

export const generateInitialValues = (
  systemType: TSystemTypeData
): TFormState => ({
  systemType: `${systemType.pick}/${systemType.from}`,
  totalStake: 0,
  events: generateInitialEvents(systemType.from),
});

export const generateValidationSchema = (): yup.ObjectSchema<any> =>
  yup.object({
    systemType: yup.string(),
    totalStake: yup
      .number()
      .required("Please enter the Total stake")
      .min(1, "Please enter a positive number"),
    events: yup.array().of(
      yup.object().shape({
        id: yup.string(),
        rate: yup
          .number()
          .required("Please enter the Rate")
          .min(1, "Please enter the Rate greater than 1"),
        status: yup.string().required("Please choose Event Status"),
      })
    ),
  });
