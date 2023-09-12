import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ActionMenuProps {
  actionsOptions: {
    name: string;
    click: (id: string) => void;
  }[];
  postId: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ actionsOptions, postId }) => {
  return (
    <div className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
      <Menu as="div" className="relative">
        <Menu.Button className="-m-1.5 flex items-center p-1.5">
          <EllipsisVerticalIcon className="h-5 w-5 text-gray-400" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            {actionsOptions.map((action) => (
              <Menu.Item key={action.name}>
                {({ active }) => (
                  <span
                    onClick={() => action.click(postId)}
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    {action.name}
                  </span>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ActionMenu;
