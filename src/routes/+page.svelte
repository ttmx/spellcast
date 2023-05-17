<script lang="ts">
    import { Trie, points } from "../lib/trie";
    import type { Word } from "../lib/trie";
    import words from "../lib/wordlist.json";
    import Slot from "./Slot.svelte";
    const trie = new Trie();
    trie.insertWords(words);
    let grid: { letter: string; slot: HTMLInputElement | null }[][] =
        Array.from({ length: 5 }, (_, x) =>
            Array.from({ length: 5 }, (_, y) => ({ letter: "", slot: null }))
        );
    const simpleGrid = (): string[][] => {
        return grid.map((vx) => vx.map((vy) => vy.letter));
    };

    const scoreWord = (word: string) => {
        let score = 0;
        for (let i = 0; i < word.length; i++) {
            score += points.get(word[i]) as number;
        }
        return score;
    };
    const solve = () => {
        // sort by score per word(sum of letter scores)
        let res: (Word & { score: number })[] = trie
            .wordsIn(simpleGrid())
            .map((word) => ({ score: scoreWord(word.word), ...word }));
        let m = new Map<string, Word & { score: number }>(
            res.map((w) => [w.word, w])
        );
        res = Array.from(m.values());
        res.sort((a, b) => {
            return b.score - a.score;
        });
        console.log(res);
    };
</script>

<div class="w-screen h-full flex flex-col items-center justify-center">
    <h1 class="text-4xl font-bold text-center">Spellcast Solver</h1>

    <div class="grid grid-rows-5 grid-cols-5 w-96 h-96">
        {#each grid as vx, x}
            {#each vx as vy, y}
                <Slot
                    bind:letter={grid[x][y].letter}
                    bind:input={grid[x][y].slot}
                    goNext={() =>
                        grid[(x + +(y === 4)) % 5][(y + 1) % 5]?.slot?.focus()}
                />
            {/each}
        {/each}
    </div>
    <button
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        on:click={solve}>Submit</button
    >
</div>
