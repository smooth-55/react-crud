import "./Create.css";
import { useFormik } from "formik";
import { Schema } from "../schemas";
import { Error } from "../components/Error";
import { useCreateTodoMutation } from "../services";

const Create = () => {
  const initialValues = {
    task: "",
    is_completed: false,
  };

  const { mutate: mutateTodo } = useCreateTodoMutation()


  const formik = useFormik({
    validationSchema: Schema,
    initialValues: initialValues,
    onSubmit: (values, action) => {
      mutateTodo(values)
      action.resetForm()
    },
  });

  return (
    <>
      <div className="form_container">
        <form className="form" onSubmit={formik.handleSubmit}>
          <h2>Create Todo</h2>
          <div className="Wrap Inputs">
            <input
              type="text"
              id="task"
              name="task"
              value={formik.values?.task}
              onChange={formik.handleChange}
            />
            <input
              className="btn"
              type="submit"
              id="submit"
              value="Create Task"
            />
            {formik.errors.task ? <Error Message={formik.errors.task} /> : null}
          </div>
        </form>
      </div>
    </>
  );
};

export default Create;
