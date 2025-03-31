import { A, Router, Route, Navigate } from "@solidjs/router";
import { AuthProvider, useAuth } from "./components/AuthProvider";
import { Show } from "solid-js"
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Signout from "./pages/SignOut";
import Signup from "./pages/SIgnUp";
import Events from "./pages/Events";

export default function App() {
  return (
    <AuthProvider>
      <Router root={Layout}>
        <Route path="/" component={Home}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signout" component={Signout}/>
        <Route path="/events" component={Events}/>
        <Route path="/error" component={Error}/>
        <Route path="/signup" component={Signup}/>
        <Route path="*" component={()=> <Navigate href="/error"/>}/>



      </Router>

    </AuthProvider>
  );
}

function Layout(props) {
  const appName = import.meta.env.VITE_APP_NAME;

  const user = useAuth();


  return(
    <div class="min-h-screen flex flex-col">
    <header class="flex flex-row gap-2 items-center p-2 flex-none">
      <div class="flex-none">
        <A class="text-4xl font bold font-sans uppercase text-cyan-600" href="/">{appName}</A>
      </div>
      <nav class="flex-1 text-right justify-end">
        <Show when={user()}>
          <Show when={user().role == "admin"}>
          <A class="p-2 bg-amber-500 text-gray-50 font-bold rounded hover:brightness-50" href="/events">Događaji</A>
          </Show>
        <A class="p-2 bg-pink-500 text-gray-50 font-bold rounded hover:brightness-50" href="/signout">Odjava</A>
        </Show>
        <Show when={!user()}>
          <A class="p-2 bg-amber-500 text-gray-50 font-bold rounded hover:brightness-50" href="/signin">Prijava</A>
          <A class="p-2 bg-amber-500 text-gray-50 font-bold rounded hover:brightness-50" href="/signup">Rergistracija</A>

        </Show>
      </nav>
      </header>
    <main>{props.children}</main>
    <footer class="flex-none py-6 px-2 bg-cyan-700 text-white">Copyhright {appName}</footer>
    </div>

  );
}
