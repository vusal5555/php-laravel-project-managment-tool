import { Head, Link, useForm } from "@inertiajs/react";
import Authenticated from "../../Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";

export default function Edit({ auth, task }) {
  const { data, setData, post, errors } = useForm({
    image: "",
    name: task.name || "",
    status: task.status || "",
    description: task.description || "",
    due_date: task.due_date || "",
    _method: "PUT",
  });
  const onSubmit = (e) => {
    e.preventDefault();

    post(route("task.update", task.id));
  };
  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Task
          </h2>
        </div>
      }
    >
      <Head title="Edit Task" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form
                onSubmit={onSubmit}
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
              >
                {task.image_path && (
                  <div className="mb-4">
                    <img src={task.image_path} className="w-64" alt="" />
                  </div>
                )}
                <div>
                  <InputLabel
                    htmlFor="task_image_path"
                    value="Task Image"
                  ></InputLabel>
                  <TextInput
                    id="task_image_path"
                    type="file"
                    name="image"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("image", e.target.files[0])}
                  ></TextInput>
                  <InputError
                    message={errors.image}
                    className="mt-2"
                  ></InputError>
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="task_name"
                    value="Task Name"
                  ></InputLabel>
                  <TextInput
                    id="task_name"
                    type="text"
                    name="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("name", e.target.value)}
                  ></TextInput>
                  <InputError
                    message={errors.name}
                    className="mt-2"
                  ></InputError>
                </div>
                <div className="mt-4 mb-4">
                  <InputLabel
                    htmlFor="task_description"
                    value="Task Description"
                  ></InputLabel>
                  <TextAreaInput
                    id="task_description"
                    name="description"
                    value={data.description}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("description", e.target.value)}
                  ></TextAreaInput>
                  <InputError
                    message={errors.description}
                    className="mt-2"
                  ></InputError>
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="task_due_date" value="Task Deadline" />

                  <TextInput
                    id="task_due_date"
                    type="date"
                    name="due_date"
                    value={data.due_date}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("due_date", e.target.value)}
                  />

                  <InputError message={errors.due_date} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="task_status" value="Task Status" />

                  <SelectInput
                    name="status"
                    id="task_status"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("status", e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </SelectInput>

                  <InputError message={errors.task_status} className="mt-2" />
                </div>
                <div className="mt-4 text-right">
                  <Link
                    href={route("task.index")}
                    className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2"
                  >
                    Cancel
                  </Link>
                  <button
                    className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
