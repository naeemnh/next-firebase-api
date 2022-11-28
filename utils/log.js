export const getLog = (data, reason) => {
  if (process.env.NODE_ENV == "development") {
    const line = trace();
    const lines = line.split("\n");
    console.log(
      "log: ",
      reason ? reason : "",
      "\n",
      data,
      "\n\t",
      lines ? lines[3] : null,
      ""
    );
  }
};

const trace = () => {
  const err = new Error();
  return err.stack;
};
