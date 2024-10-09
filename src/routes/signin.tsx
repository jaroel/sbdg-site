import { action, useAction, useSubmission } from "@solidjs/router";
import { createSignal } from "solid-js";
import { SidebarGunOnly } from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import Button from "~/components/input/Button";
import { signIn } from "~/passkeys/auth";
import { signin } from "~/session.server";

const signinAction = action(signin, "signinAction");

export default function SigninView() {
  const formSubmission = useSubmission(signinAction);
  const submitForm = useAction(signinAction);

  const [status, setStatus] = createSignal("Not signed in.");

  return (
    <>
      <Toolbar />
      <div>
        <div class="flex space-x-2 mx-2 my-4">
          <SidebarGunOnly />
          <main class="space-y-4 px-2 bg-white">
            <div class="p-4">
              <h1 class="text-2xl">Signin into your account</h1>
              <p id="status">{status()}</p>
              <h2 class="text-xl">Sign in</h2>
              <form
                encoding="multipart/form-data"
                class="w-full"
                classList={{
                  blur: formSubmission.pending,
                }}
                noValidate
                onSubmit={async (event) => {
                  event.preventDefault();
                  const user = await signIn();
                  const kek = new FormData();
                  kek.set("userId", user.userId);
                  kek.set("username", user.username);
                  const result = await submitForm(kek);
                  setStatus(
                    `You're signed up as ${user.username} (user ID: ${user.userId}) (result: ${result}).`,
                  );
                }}
              >
                {/* <button class="border bg-gray-400 m-2">
                  Sign up with passkeys
                </button> */}
                <div class="px-4 py-2 flex items-center justify-end gap-x-6">
                  <Button
                    type="submit"
                    name="signin"
                    label="Sign in with passkeys"
                  >
                    Sign in with passkeys
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
