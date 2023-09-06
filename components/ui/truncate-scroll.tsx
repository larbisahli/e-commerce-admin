type ReadMoreProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText?: string;
  character: number;
  children: string;
  hideButton?: boolean;
};

const Truncate: React.FC<ReadMoreProps> = ({
  children,
  onClick,
  character = 200,
  buttonText = 'See More',
  hideButton = false
}) => {
  if (!children) return null;

  return (
    <>
      {children && children.length < character
        ? children
        : children.substring(0, character) + '...'}
      {!hideButton && children.length > character && (
        <>
          ...
          <button
            className="text-sm font-semibold text-accent outline-none ms-1 hover:text-accent-hover focus:outline-none"
            onClick={onClick}
          >
            {buttonText}
          </button>
        </>
      )}
    </>
  );
};

export default Truncate;
