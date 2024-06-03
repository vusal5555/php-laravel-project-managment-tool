import { Head, Link, router } from "@inertiajs/react";
import Authenticated from "../../Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constants";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { useEffect } from "react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, projects, queryParams, success }) {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index"), queryParams);
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

    router.get(route("project.index"), queryParams);
  };

  const deleteProject = (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      router.delete(route("project.destroy", id));
    }
  };

  console.log(projects);

  useEffect(() => {
    // Clear URL parameters on component mount
    const url = new URL(window.location);
    url.search = "";
    window.history.replaceState({}, document.title, url);
  }, []);

  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Projects
          </h2>
          <Link
            href={route("project.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Create
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      {success && (
        <div className="bg-emerald-500  py-2 px-4 text-white rounded shadow">
          {success}
        </div>
      )}

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
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
                          placeholder="Project Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        ></TextInput>
                      </th>
                      <th className="px-3 py-2">
                        <SelectInput
                          className="w-full"
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChanged("status", e.target.value)
                          }
                        >
                          <option value="">Select Status</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data.map((project) => {
                      return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-3 py-2">{project.id}</td>
                          <td className="px-3 py-2">
                            <img
                              src={project.image_path}
                              style={{ width: "60px" }}
                              alt=""
                            />
                          </td>
                          <td className="px-3 py-2 text-white hover:underline">
                            <Link href={route("project.show", project.id)}>
                              {project.name}
                            </Link>
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={
                                "px-2 py-1 rounded text-white text-nowrap " +
                                PROJECT_STATUS_CLASS_MAP[project.status]
                              }
                            >
                              {PROJECT_STATUS_TEXT_MAP[project.status]}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {project.created_at}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {project.due_date}
                          </td>
                          <td className="px-3 py-2">
                            {project.createdBy?.name}
                          </td>
                          <td className="px-3 py-2">
                            {project.updatedBy?.name}
                          </td>

                          {project.createdBy.id === auth.user.id && (
                            <td className="px-3 py-2">
                              <div className="flex items-center">
                                <Link
                                  href={route("project.edit", project.id)}
                                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={(e) => {
                                    deleteProject(project.id);
                                  }}
                                  className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <Pagination links={projects.meta.links}></Pagination>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
