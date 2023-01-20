import axios from "../axios.jsx";
import React from "react";
import "./List.css";
import { useQuery } from "react-query";

const List = () => {
  const getTodos = async () => {
    try {
      let res = await axios.get("/todo");
      return res.data;
    } catch (error) {}
  };
  const { isLoading, error, data } = useQuery("list", getTodos);

  if (isLoading) {
    return (
      <>
        <div style={{ display: "grid", placeItems: "center" }}>
          <h4>Loading...</h4>
        </div>
      </>
    );
  }
  if (error) {
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
            {data?.data.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.task}</td>
                  <td>{item.is_completed ? "Done" : "Pending"}</td>
                  <td>
                    <div className="completed__status">
                      <button
                        style={{
                          marginRight: "10px",
                          padding: "10px",
                          font: "20px",
                          backgroundColor: "#005a18",
                          cursor: "pointer",
                          color: "#ffffff",
                        }}
                      >
                        {" "}
                        Mark as {item.is_completed ? "Pending" : "Done"}{" "}
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
