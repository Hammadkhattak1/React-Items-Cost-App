const ButtonTemplate = ({ buttonProps }) => {
  const { text, buttonType, handleClick } = buttonProps;

  return (
    <button className={`btn btn-${buttonType}`} onClick={handleClick}>
      {text}
    </button>
  );
};

export default ButtonTemplate;
