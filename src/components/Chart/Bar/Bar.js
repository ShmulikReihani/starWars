function Bar({ height, name, population }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <div style={{ marginBottom: "15px", fontSize: "small" }}>
        {population}
      </div>
      <div
        style={{
          height: height,
          width: "80px",
          background: "lightskyblue",
          border: "solid 1px black",
          boxSizing: "border-box",
        }}
      ></div>
      <div style={{ marginTop: "15px" }}>{name}</div>
    </div>
  );
}

export default Bar;
