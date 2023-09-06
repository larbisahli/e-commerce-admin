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
      className="relative flex h-48 w-36 cursor-pointer flex-col items-center p-5 hover:bg-blue-100"
    >
      <div className="flex h-28 w-28 items-center justify-center rounded border border-gray-300 bg-gray-100">
        <div className="m-2">
          <FolderSvg width={55} height={55} />
        </div>
      </div>
      <span className="cut-line-2 mt-4 break-all text-center text-sm capitalize text-gray-500">
        {folder?.name}
      </span>
    </li>
  );
}
