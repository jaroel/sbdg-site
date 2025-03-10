import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import background from "~/assets/background.gif";
import logo from "~/assets/logo.jpg";

export default function App() {
  return (
    <div
      class="h-screen divide-y divide-blue-400"
      style={{ "background-image": `url(${background})` }}
    >
      <div>
        <img
          class="px-4 py-2"
          src={logo}
          alt="Logo van de Schietbond Dinxperlo-Gendringen"
        />
      </div>

      <Router root={(props) => <Suspense>{props.children}</Suspense>}>
        <FileRoutes />
      </Router>

      <div class="text-center py-2 bg-blue-100">Het Superlekker CMS.</div>
      <div class="text-center py-2">
        <a href="/">Powered by Superlekker</a>
      </div>
    </div>
  );
}
