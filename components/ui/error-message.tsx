interface Props {
  message?: string | undefined;
}

export const Error = ({ message }: Props) => {
  return <p className="my-2 text-start text-xs text-red-500">{message}</p>;
};

const ErrorMessage = ({ message }: Props) => {
  return (
    <p className="mx-auto mt-16 min-w-min max-w-sm rounded-sm bg-red-400 p-5 text-center text-lg font-semibold text-light">
      {message}
    </p>
  );
};

export default ErrorMessage;
