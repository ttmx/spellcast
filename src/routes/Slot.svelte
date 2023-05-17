<script lang="ts">
    export let letter = "";
    export let input: HTMLInputElement | null;
    export let goNext: () => void = () => {};

    const isLetter = (str: string) => str.length === 1 && str.match(/[a-z]/i);
    const onInput = (e: KeyboardEvent) => {
        if (e.key === "Tab") return;
        e.preventDefault();
        if (!isLetter(e.key)) return;
        letter = e.key.toLowerCase();
        goNext();
    };
</script>

<div class="flex justify-center items-center border border-gray-400">
    <input
        bind:this={input}
        bind:value={letter}
        type="text"
        class="w-full h-full text-center"
        on:keydown={onInput}
    />
</div>
