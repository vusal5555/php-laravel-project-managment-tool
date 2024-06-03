import { Head, Link, router } from "@inertiajs/react";
import Authenticated from "../../Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import { useEffect } from "react";
import TableHeading from "@/Components/TableHeading";

export default function Index({ auth, users, queryParams, success }) {
  queryParams = queryParams || {};

  console.log(users);

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("user.index"), queryParams);
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

    router.get(route("user.index"), queryParams);
  };

  const deleteUser = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      router.delete(route("user.destroy", id));
    }
  };

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
            Users
          </h2>
          <Link
            href={route("user.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Create
          </Link>
        </div>
      }
    >
      <Head title="Users" />

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
                      <TableHeading
                        name="name"
                        sortChanged={sortChanged}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                      >
                        Name
                      </TableHeading>
                      <TableHeading
                        name="email"
                        sortChanged={sortChanged}
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                      >
                        Email
                      </TableHeading>

                      <th className="px-3 py-2">Created At</th>
                      <th className="px-3 py-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.name}
                          placeholder="User Name"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        ></TextInput>
                      </th>
                      <th className="px-3 py-2">
                        <TextInput
                          className="w-full"
                          defaultValue={queryParams.email}
                          placeholder="User Email"
                          onBlur={(e) =>
                            searchFieldChanged("email", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("email", e)}
                        ></TextInput>
                      </th>
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.data.map((user) => {
                      return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-3 py-2">{user.id}</td>
                          <td className="px-3 py-2 text-white hover:underline">
                            <Link href={route("user.show", user.id)}>
                              {user.name}
                            </Link>
                          </td>
                          <td className="px-3 py-2">{user.email}</td>
                          <td className="px-3 py-2 text-nowrap">
                            {user.created_at}
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center justify-end">
                              <Link
                                href={route("user.edit", user.id)}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={(e) => {
                                  deleteUser(user.id);
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

              <Pagination links={users.meta.links}></Pagination>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
