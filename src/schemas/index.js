import * as Yup from "yup";

export const Schema = Yup.object({
  task: Yup.string().required("Required"),
});
