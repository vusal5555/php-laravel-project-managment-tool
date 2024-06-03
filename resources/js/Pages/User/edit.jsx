import { Head, Link, useForm } from "@inertiajs/react";
import Authenticated from "../../Layouts/AuthenticatedLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import TextAreaInput from "@/Components/TextAreaInput";
import SelectInput from "@/Components/SelectInput";

export default function Edit({ auth, user }) {
  const { data, setData, post, errors } = useForm({
    name: user.data.name || "",
    email: user.data.email || "",
    password: "",
    password_confirmation: "",
    _method: "PUT",
  });

  console.log(user);
  const onSubmit = (e) => {
    e.preventDefault();

    post(route("user.update", user.data.id));
  };
  return (
    <Authenticated
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit User
          </h2>
        </div>
      }
    >
      <Head title="Edit User" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <form
                onSubmit={onSubmit}
                className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
              >
                <div className="mt-4">
                  <InputLabel
                    htmlFor="user_name"
                    value="User Name"
                  ></InputLabel>
                  <TextInput
                    id="user_name"
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
                    htmlFor="user_email"
                    value="User Email"
                  ></InputLabel>
                  <TextInput
                    id="user_email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("email", e.target.value)}
                  ></TextInput>
                  <InputError
                    message={errors.email}
                    className="mt-2"
                  ></InputError>
                </div>
                <div className="mt-4">
                  <InputLabel htmlFor="user_password" value="User Password" />
                  <TextInput
                    id="user_password"
                    type="text"
                    name="password"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("password", e.target.value)}
                  />

                  <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="mt-4">
                  <InputLabel
                    htmlFor="user_password_confirmation"
                    value="User Password"
                  />

                  <TextInput
                    id="user_password_confirmation"
                    type="text"
                    name="password_confirmation"
                    className="mt-1 block w-full"
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                  />

                  <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                  />
                </div>
                <div className="mt-4 text-right">
                  <Link
                    href={route("user.index")}
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
