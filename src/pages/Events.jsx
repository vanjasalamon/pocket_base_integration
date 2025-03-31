import { createSignal, Show } from "solid-js";
import { pb } from "../services/pocketbase";
import { useAuth } from "../components/AuthProvider";
import AlertMessage from "../components/AlertMessage";

export default function Events(props){

    async function formSubmit(event) {
        const user = useAuth();
        setSuccess(false);
        setError(false);


        event.preventDefault();
        const formData = new FormData(event.target);
        
        const name = formData.get("name");
        const details = formData.get("details");
        const start = formData.get("start");
        const maxSeats = formData.get("maxSeats");

        try{
            const record = await pb.collection("events").create({
                name: name,
                details: details,
                start: new Date (start),
                maxSeats: maxSeats,
                author: user().id,
            })
            setSuccess(true);
            event.target.reset();

        }catch (error){
            setError(true);
        }
    }


    return(<>
    <div></div>


    <Show when={success()}>
        <AlertMessage message="Uspješno ste dodali događaj"/>
    </Show>
    <Show when={error()}>
        <AlertMessage type="error" message="Dogodila se greška"/>
    </Show>
    <form onSubmit={formSubmit} class="w-md">
                <div class="p-2 flex flex-col gap-1">
                    <label>Naziv</label>
                    <input class="border rounded p-2" type="text" name="name" required="true" minLength="3" maxLength="100"/>
                </div>


                <div class="p-2 flex flex-col gap-1">
                    <label>Opis</label>
                    <textarea class="border rounded p-2" name="details" required="true" minLength="3" maxLength="1000"/><textarea/>
                </div>

                <div class="p-2 flex flex-col gap-1">
                    <label>Početak</label>
                    <input class="border rounded p-2" type="datetime-local" name="start" required="true"/>
                </div>

                <div class="p-2 flex flex-col gap-1">
                    <label>Broj sjedala</label>
                    <input class="border rounded p-2" type="number" step="1" min="1" name="maxSeats" required="true"/>
                </div>

                <div class="p-2 flex flex-col gap-1">
                    <input type="submit" value="Pošalji" class="bg-slate-600 text-white p-2 rounded" />
                    <input type="reset" value="Poništi" class="bg-slate-300 text-white p-2 rounded" />
                </div>
                
            </form>
    
    </>
    )
}