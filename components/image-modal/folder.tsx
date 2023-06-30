import FolderSvg from '@components/icons/folder';
import { MediaType } from '@ts-types/generated';
import { Dispatch } from 'react';

type IProps = {
  folder?: MediaType;
  onClick: Dispatch<any>;
};

export default function Folder({ folder, onClick }: IProps) {
  return (
    <li
      onClick={() => onClick(folder.id)}
      role="button"
      title={folder?.name}
      className="w-36 h-48 relative flex flex-col items-center p-5 hover:bg-blue-100 cursor-pointer"
    >
      <div className="border border-gray-300 flex justify-center bg-gray-100 items-center h-28 w-28 rounded">
        <div className="m-2">
          <FolderSvg width={55} height={55} />
        </div>
      </div>
      <span className="text-gray-500 mt-4 text-sm cut-line-2 break-all text-center capitalize">
        {folder?.name}
      </span>
    </li>
  );
}
