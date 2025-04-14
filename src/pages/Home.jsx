import {createSignal ,onMount } from "solid-js"
import { useAuth } from "../components/AuthProvider";
import { pb } from "../services/pocketbase";
import Button from "../components/Button";
import AlertMessage from "../components/AlertMessage";

export default function Home(){
    const user = useAuth();

    const [items, setItems] = createSignal;
    const [error, setError] = createSignal(false);
    const [errorDs, setErrorDs] = createSignal(false); 
    


    onMount(async () => {

    });

    async function load() {
        setError(false);
        setErrorDs(false);
        try {
            const result = await pb.collection("events").getFullList({
                sort: "-created",
            });
            setItems(result);
        } catch (error) {
            console.log(error);
            if (error.data?.data?.code === "validation_not_unique") {
                setErrorDs(true);
            } else{
                setError(true);
            }


            setError(true);
        }
    }

    async function signup(item) {
        setError(false);
        try {
            const data1 = {
                user: user().id,
                event: item.id
            };
            await pb.collection("seats").create(data1);

            const data2 = {
                usedSeats: item.usedSeats + 1
            };

            const updated = await pb.collection("events").update(item.id, data2);

            setItems(old => old.map(el => {
                if (el.id === updated.id){
                    return { ...item, ...updated};
                }
                return el; /*Funkcija za update */

            }))

        } catch (error){
            console.log(error);
            setError(true);

        }

    }

    async function signout(item) {
        setError(false);

        try {
            const toDelete = await pb.collection("seats").getFirstListItem(`user="${user().id}" && event="${item.id}"`);

        } catch (error) {
            setError(true);
        }

    }


    return (
    <>
    <div>
        Naslovnica
    </div>

    <Show when={success()}>
        <AlertMessage message="Uspješno ste dodali događaj"/>
    </Show>
    <Show when={error()}>
        <AlertMessage type="error" message="Dogodila se greška"/>
    </Show>

    <Show when={errorDs()}>
        <AlertMessage type="error" message="Već ste prijavljeni na odabrani događaj."/>
    </Show>

    <div class="flex-1 p-2">
                    <For each={items()}>
                        {(item, index) => (
                            <div class="flex flex-row items-center gap-2 w-full p-4 rounded bg-amber-100 mb-2">
                                <div class="flex-1">
                                    <div class="text-2xl">{item.name}</div>
                                    <div class="line-clamp-3 text-xs">{item.details}</div>
                                </div>
                                <div class="flex flex-col">
                                    <div>{new Date(item.start).toLocaleDateString("hr")}</div>
                                    <div class="text-[0.5em]">Početak</div>
                                </div>
                                <div class="flex flex-col">
                                    <div>{item.usedSeats}/{item.maxSeats}</div>
                                    <div class="text-[0.5em]">Popunjenost</div>
                                </div>
                                <div class="flex flex-row gap-1">
                                    <Show when={user()}>
                                        <Show when={item.usedSeats < item.maxSeats}>
                                        <span onClick={async () => signup(item)}><Button label="Prijava" /></span>
                                        </Show>
                                    <span onClick={() => signout(item)}><Button label="Odjava" color="bg-red-400" /></span>
                                    </Show>
                                </div>
                            </div>
                        )}
                    </For>
                </div>
    </>
    )
}
