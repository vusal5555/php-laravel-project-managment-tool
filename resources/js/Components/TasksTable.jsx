import React, { useEffect } from "react";
import TableHeading from "./TableHeading";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import {
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
} from "@/constants";
import Pagination from "./Pagination";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

const TasksTable = ({
  tasks,
  queryParams = null,
  hideProjectColumn = false,
}) => {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("task.index"), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("task.index"), queryParams);
  };

  useEffect(() => {
    // Clear URL parameters on component mount
    const url = new URL(window.location);
    url.search = "";
    window.history.replaceState({}, document.title, url);
  }, []);

  const deleteTask = (taskId) => {
    if (confirm("Are you sure you want to delete this task?")) {
      router.delete(route("task.destroy", taskId));
    }
  };

  return (
    <>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sortChanged={sortChanged}
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
              >
                ID
              </TableHeading>
              <th className="px-3 py-2">Image</th>
              {!hideProjectColumn && (
                <th className="px-3 py-2">Project Name</th>
              )}

              <TableHeading
                name="name"
                sortChanged={sortChanged}
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
              >
                Name
              </TableHeading>
              <TableHeading
                name="status"
                sortChanged={sortChanged}
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
              >
                Status
              </TableHeading>
              <TableHeading
                name="priority"
                sortChanged={sortChanged}
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
              >
                Priority
              </TableHeading>
              <TableHeading
                name="created_at"
                sortChanged={sortChanged}
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
              >
                Created At
              </TableHeading>
              <TableHeading
                name="due_date"
                sortChanged={sortChanged}
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
              >
                Due Date
              </TableHeading>
              <th className="px-3 py-2">Created By</th>
              <th className="px-3 py-2">Updated By</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.name}
                  placeholder="Task Name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                ></TextInput>
              </th>
              <th className="px-3 py-2">
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.status}
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-3 py-2">
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.priority}
                  onChange={(e) =>
                    searchFieldChanged("priority", e.target.value)
                  }
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>
              </th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2 text-right"></th>
              <th className="px-3 py-2 text-right"></th>
              <th className="px-3 py-2 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.data.map((task) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-3 py-2">{task.id}</td>
                  <td className="px-3 py-2">
                    <img
                      src={task.image_path}
                      style={{ width: "60px" }}
                      alt=""
                    />
                  </td>
                  {!hideProjectColumn && (
                    <td className="px-3 py-2">{task.project.name}</td>
                  )}
                  <Link href={route("task.show", task.id)}>
                    <td className="px-3 py-2">{task.name}</td>
                  </Link>

                  <td className="px-3 py-2">
                    <span
                      className={
                        "px-2 py-1 rounded text-white text-nowrap " +
                        TASK_STATUS_CLASS_MAP[task.status]
                      }
                    >
                      {TASK_STATUS_TEXT_MAP[task.status]}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={
                        "px-2 py-1 rounded text-white " +
                        TASK_PRIORITY_CLASS_MAP[task.priority]
                      }
                    >
                      {TASK_PRIORITY_TEXT_MAP[task.priority]}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                  <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                  <td className="px-3 py-2">{task.createdBy?.name}</td>
                  <td className="px-3 py-2">{task.updatedBy?.name}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center">
                      <Link
                        href={route("task.edit", task.id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={(e) => {
                          deleteTask(task.id);
                        }}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links}></Pagination>;
    </>
  );
};

export default TasksTable;
