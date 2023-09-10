const Col = ({ children, colProps = {} }) => {
  const { extraColClasses } = colProps;

  return <div className={`col-6 ${extraColClasses} `}>{children}</div>;
};

export default Col;
