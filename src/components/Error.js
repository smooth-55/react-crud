export const Error = (props) => {
  const { Message } = props;
  return (
    <>
      <p style={{ fontSize: "12px", color: "red", padding: "0px" }}>
        *{Message}
      </p>
    </>
  );
};
