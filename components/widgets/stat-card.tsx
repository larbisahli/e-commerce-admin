import classNames from 'classnames';

const StatCard = ({ className, title, count, loading }) => {
  return (
    <li
      className={classNames(
        'group flex h-[65px] flex-col items-center justify-center border hover:bg-blue-100',
        className
      )}
    >
      {loading ? (
        <div className="animated-background h-8 max-w-[20px] rounded-sm blur-[1px]" />
      ) : (
        <div
          className={
            'text-2xl font-light text-gray-800 group-hover:text-blue-700'
          }
        >
          {count ?? 0}
        </div>
      )}
      <div className="text-xs text-gray-600 group-hover:text-blue-700">
        {title}
      </div>
    </li>
  );
};

export default StatCard;
