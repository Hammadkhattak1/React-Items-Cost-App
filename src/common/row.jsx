const Row = ({ children, rowProps = {} }) => {
  const { extraRowClasses } = rowProps;

  return <div className={`row ${extraRowClasses}`}>{children}</div>;
};

export default Row;
