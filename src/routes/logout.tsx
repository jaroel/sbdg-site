import { action, useSubmission } from "@solidjs/router";
import { SidebarGunOnly } from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";
import Button from "~/components/input/Button";
import { logout } from "~/session.server";

const logoutAction = action(logout, "logoutAction");

export default function LoginView() {
  const formSubmission = useSubmission(logoutAction);

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
                action={logoutAction}
                encoding="multipart/form-data"
                class="w-full"
                classList={{
                  blur: formSubmission.pending,
                }}
                noValidate
              >
                <div class="py-2 flex items-center justify-end">
                  <Button
                    type="submit"
                    disabled={formSubmission.pending}
                    name="routePrefix"
                    value="default"
                  >
                    Logout
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
