import { action, useAction, useSubmission } from "@solidjs/router";
import { createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { SidebarGunOnly } from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import Button from "~/components/input/Button";
import { TextField } from "~/components/input/TextField";
import { login } from "~/session.server";

const loginAction = action(login, "loginAction");

export default function LoginView() {
  // const submitForm = useAction(loginAction);
  const formSubmission = useSubmission(loginAction);
  const formErrors = createMemo(() => {
    try {
      if (formSubmission.result?.message) {
        return { _errors: [formSubmission.result.message] };
      }
    } catch {}
  });

  const [store, setStore] = createStore({ username: "", password: "" });

  return (
    <>
      <Toolbar />
      <div>
        <div class="flex space-x-2 mx-2 my-4">
          <SidebarGunOnly />
          <main class="space-y-4 px-2 bg-white">
            <div class="p-4">
              <form
                method="post"
                action={loginAction}
                encoding="multipart/form-data"
                class="w-full"
                classList={{
                  blur: formSubmission.pending,
                }}
                noValidate
              >
                <div>
                  {formErrors() && (
                    <div class="text-red-500">
                      {formErrors()?._errors.join("\n")}
                    </div>
                  )}
                  <div class="flex space-x-2 mx-2 my-4">
                    <TextField
                      label="Username"
                      value={store.username}
                      onInput={(event) => {
                        setStore("username", event.currentTarget.value);
                      }}
                      name="username"
                      error={undefined}
                      required
                    />
                  </div>
                  <div class="flex space-x-2 mx-2 my-4">
                    <TextField
                      type="password"
                      label="Password"
                      value={store.password}
                      onInput={(event) => {
                        setStore("password", event.currentTarget.value);
                      }}
                      name="password"
                      error={undefined}
                      required
                    />
                  </div>
                </div>
                <div class="py-2 flex items-center justify-end">
                  <Button
                    type="submit"
                    disabled={formSubmission.pending}
                    name="routePrefix"
                    value="default"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
