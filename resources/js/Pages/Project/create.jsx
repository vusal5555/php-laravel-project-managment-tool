import { Head, Link, useForm } from "@inertiajs/react";
import Authenticated from "../../Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";

export default function Create({ auth }) {
  const { data, setData, post, errors } = useForm({
    image: "",
    name: "",
    status: "",
    description: "",
    due_date: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();

    console.log(data.image);

    post(route("project.store"));
  };
  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Create Project
          </h2>
        </div>
      }
    >
      <Head title="Create Project" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form
                onSubmit={onSubmit}
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
              >
                <div>
                  <InputLabel
                    htmlFor="project_image_path"
                    value="Project Image"
                  ></InputLabel>
                  <TextInput
                    id="project_image_path"
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
                    htmlFor="project_name"
                    value="Project Name"
                  ></InputLabel>
                  <TextInput
                    id="project_name"
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
                    htmlFor="project_description"
                    value="Project Description"
                  ></InputLabel>
                  <TextAreaInput
                    id="project_description"
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
                  <InputLabel
                    htmlFor="project_due_date"
                    value="Project Deadline"
                  />

                  <TextInput
                    id="project_due_date"
                    type="date"
                    name="due_date"
                    value={data.due_date}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("due_date", e.target.value)}
                  />

                  <InputError message={errors.due_date} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="project_status" value="Project Status" />

                  <SelectInput
                    name="status"
                    id="project_status"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("status", e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </SelectInput>

                  <InputError
                    message={errors.project_status}
                    className="mt-2"
                  />
                </div>
                <div className="mt-4 text-right">
                  <Link
                    href={route("project.index")}
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
