type NotificationCardType = {
  src?: string;
  text?: string | React.ReactNode;
  time?: string;
};

const NotificationCard: React.FC<NotificationCardType> = ({
  src,
  text,
  time
}) => {
  return (
    <a
      href="#"
      className="flex items-start border-b border-border-200 bg-light px-4 pt-4 pb-3 hover:bg-gray-50"
    >
      <img
        className="h-8 w-8 rounded-full object-cover me-3"
        src={src}
        alt="avatar"
      />

      <div className="-mt-1 flex flex-col">
        <p className="mb-1 text-sm text-body">{text}</p>
        <span className="text-sm text-muted">{time}</span>
      </div>
    </a>
  );
};

export default NotificationCard;
