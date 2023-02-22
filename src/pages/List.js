import { useDeleteTodoMutation, useFetchTodoQuery, useUpdateStatusMutation } from "../services";
import "./List.css";

const List = () => {

  const { isLoading, data, isError, error } = useFetchTodoQuery()
  const { mutate: deleteMutate } = useDeleteTodoMutation()
  const { mutate: updateMutate } = useUpdateStatusMutation()

  if (isLoading) {
    return (
      <>
        <div style={{ display: "grid", placeItems: "center" }}>
          <h4>Loading...</h4>
        </div>
      </>
    );
  }
  if (isError) {
    return (
      <>
        <div style={{ display: "grid", placeItems: "center" }}>
          <h4>Something went wrong, {error.message}</h4>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="my__todos">
        <h2>My TODOS</h2>
        <h2>Total data: {data?.data?.count}</h2>

        <table>

          <thead>
            <tr>
              <th>S.N</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.is_completed ? "Done" : "Pending"}</td>
                  <td>
                    <div className="completed__status">
                      <button
                        onClick={() => {
                          updateMutate(
                            { id: item.id, is_completed: !item.is_completed })
                        }}
                        style={{
                          marginRight: "10px",
                          padding: "10px",
                          font: "20px",
                          backgroundColor: "#005a18",
                          cursor: "pointer",
                          color: "#ffffff",
                        }}
                      >
                        Mark as {item.is_completed ? "Pending" : "Done"}
                      </button>
                      <button
                        style={{
                          marginRight: "10px",
                          padding: "10px",
                          font: "20px",
                          backgroundColor: "#cf0000",
                          cursor: "pointer",
                          color: "#ffffff",
                        }}
                        onClick={() => {
                          deleteMutate(item.id)
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default List;
