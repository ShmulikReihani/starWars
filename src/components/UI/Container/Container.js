const ContainerStyle = {
  width: "90%",
  margin: "50px auto",
  textAlign: "center",
};

function Container({ children }) {
  return <div style={ContainerStyle}>{children}</div>;
}

export default Container;
