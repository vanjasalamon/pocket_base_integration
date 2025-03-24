import { createSignal } from "solid-js";
import { pb } from "../services/pocketbase";

export default function Signup() {
    const [error, setError] = createSignal(false);
    const [success, setSuccess] = createSignal(false);


    async function formSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const passwordConfirm = formData.get("passwordConfirm");

        if (password !== passwordConfirm) {
            setError(true);
            return;
        }

        try {
            await pb.collection("users").create({

            })
        } catch (error) {
            console.log("Error", error);
            setError(true);
        }
    }

    function formSubmit() { }

    return (
        <>
            <div class="text-3xl font-mono font-bold p-2">Prijava korisnika</div>
            <form onSubmit={formSubmit} class="w-md">
                <div class="p-2 flex flex-col gap-1">
                    <label>Ime</label>
                    <input class="border rounded p-2" type="text" name="name" required="true"/>
                </div>


                <div class="p-2 flex flex-col gap-1">
                    <label>E-mail</label>
                    <input class="border rounded p-2" type="email" name="email" required="true" />
                </div>

                <div class="p-2 flex flex-col gap-1">
                    <label>Potvrda zaporke</label>
                    <input class="border rounded p-2" type="password" name="passwordConfirm" required="true" min="6" />
                </div>

                <div class="p-2 flex flex-col gap-1">
                    <label>Zaporka</label>
                    <input class="border rounded p-2" type="password" name="password" required="true" min="6" />
                </div>

                <div class="p-2 flex flex-col gap-1">
                    <input type="submit" value="Pošalji" class="bg-slate-600 text-white p-2 rounded" />
                </div>
            </form>
            <Show when={success()}>
                <div class="m-2 p-4 rounded bg-emerald-500 w-md">
                    Uspješno ste se registrilali na aplikaciju.
                </div>
            </Show>


            <Show when={error()}>
                <div class="m-2 p-4 rounded bg-red">
                    Dogodila se greška prilikom stvaranja korisničkoga računa, provjerite svoje podatke.
                </div>
            </Show>
        </>);
}