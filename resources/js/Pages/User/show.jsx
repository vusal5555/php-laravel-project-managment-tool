import { Head } from "@inertiajs/react";
import Authenticated from "../../Layouts/AuthenticatedLayout";
import TasksTable from "@/Components/TasksTable";

export default function Show({ auth, user }) {
  console.log(user);
  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`User "${user.data.name}"`}
          </h2>
          {/* <Link
            href={route("user.edit", user.id)}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Edit
          </Link> */}
        </div>
      }
    >
      <Head title={`User "${user.data.name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <label className="font-bold text-lg">User ID</label>
                  <p className="mt-1">{user.data.id}</p>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg">User Name</label>
                  <p className="mt-1">{user.data.name}</p>
                </div>
                <div className="mt-4">
                  <label className="font-bold text-lg">User Email</label>
                  <p className="mt-1">{user.data.email}</p>
                </div>

                <div className="mt-4">
                  <label className="font-bold text-lg">Create Date</label>
                  <p className="mt-1">{user.data.created_at}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                tasks={tasks}
                queryParams={queryParams}
                hideUserColumn={false}
              />
            </div>
          </div>
        </div>
      </div> */}
    </Authenticated>
  );
}
