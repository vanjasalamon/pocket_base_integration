import { onMount } from "solid-js"
import { useParams } from "@solidjs/router";

export default function Signups() {

    onMount(async () => {
        console.log(params.id);
        try {
            const result = await pb.collection ("seats").getFullList({
                filter: `event="$`
            })

        } catch {

        }
    })

    return (<div>Prijave</div>)
}