import { action, useAction, useSubmission } from "@solidjs/router";
import { createSignal } from "solid-js";
import { SidebarGunOnly } from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import Button from "~/components/input/Button";
import { signUp } from "~/passkeys/auth";
import { signup } from "~/session.server";

const signupAction = action(signup, "signupAction");

export default function SignupView() {
  const formSubmission = useSubmission(signupAction);
  const submitForm = useAction(signupAction);

  const [status, setStatus] = createSignal("Not signed in.");

  return (
    <>
      <Toolbar />
      <div>
        <div class="flex space-x-2 mx-2 my-4">
          <SidebarGunOnly />
          <main class="space-y-4 px-2 bg-white">
            <div class="p-4">
              <h1 class="text-2xl">Signup for an account</h1>
              <p id="status">{status()}</p>
              <h2 class="text-xl">Sign up</h2>
              <form
                encoding="multipart/form-data"
                class="w-full"
                classList={{
                  blur: formSubmission.pending,
                }}
                noValidate
                onSubmit={async (event) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const username = formData.get("username");
                  if (typeof username !== "string" || username.length < 1)
                    return;
                  const user = await signUp(username);
                  const kek = new FormData();
                  kek.set("userId", user.userId);
                  kek.set("username", user.username);
                  const result = await submitForm(kek);
                  setStatus(
                    `You're signed up as ${user.username} (user ID: ${user.userId}) (result: ${result}).`,
                  );
                }}
              >
                <label for="username">Username</label>
                <input
                  id="username"
                  name="username"
                  value="roel"
                  class="border bg-gray-100 m-2"
                />
                <br />
                {/* <button class="border bg-gray-400 m-2">
                  Sign up with passkeys
                </button> */}
                <div class="px-4 py-2 flex items-center justify-end gap-x-6">
                  <Button
                    type="submit"
                    name="signup"
                    label="Sign up with passkeys"
                  >
                    Sign up with passkeys
                  </Button>
                </div>
              </form>
              <hr />
              {/* <h2 class="text-xl">Sign in</h2>
              <form id="login-form">
                <button class="border bg-gray-400 m-2">
                  Sign in with passkeys
                </button>
              </form>
              <hr /> */}
              {/* <h2 class="text-xl">Stored users</h2>
              <p>Credential IDs and public keys are encoded in base64url.</p>
              <table>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Credential ID</th>
                    <th>Public key</th>
                  </tr>
                </thead>
                <tbody id="stored-users-tbody"></tbody>
              </table>
              <button id="clear-db-button" class="border bg-gray-400 m-2">
                Clear local storage
              </button>
              <hr /> */}
              <p>
                Make sure to clear your passkeys stored in your device as well.
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
