export class TNode {
    value: string;
    isEndOfWord: boolean;
    children: Map<string, TNode>;

    constructor(value: string) {
        this.value = value;
        this.isEndOfWord = false;
        this.children = new Map();
    }
}

function* getNeighbors(chars: string[][], x: number, y: number): Generator<[number, number]> {
    if (x > 0) yield [x - 1, y];
    if (y > 0) yield [x, y - 1];
    if (x < chars.length - 1) yield [x + 1, y];
    if (y < chars[0].length - 1) yield [x, y + 1];
}

export const points = new Map([
    ['a', 1], ['b', 4], ['c', 5], ['d', 3], ['e', 1], ['f', 5], ['g', 3], ['h', 4], ['i', 1], ['j', 7], ['k', 6], ['l', 3], ['m', 4],
    ['n', 2], ['o', 1], ['p', 4], ['q', 8], ['r', 2], ['s', 2], ['t', 2], ['u', 4], ['v', 5], ['w', 5], ['x', 7], ['y', 4], ['z', 8], ['', 0]
])

export type Word = { word: string, path: string[] };

export class Trie {
    root: TNode;

    constructor() {
        this.root = new TNode("");
    }

    insert(word: string) {
        let current = this.root;
        for (let character of word) {
            let node = current.children.get(character);
            if (!node) {
                node = new TNode(character);
                current.children.set(character, node);
            }
            current = node;
        }
        current.isEndOfWord = true;
    }

    insertWords(words: string[]) {
        for (let word of words) {
            this.insert(word);
        }
    }

    wordsIn(chars: string[][]): Word[] {
        const words: Word[] = [];
        for (let i = 0; i < chars.length; i++) {
            for (let j = 0; j < chars[i].length; j++) {
                words.push(...this.wordsAt(chars, i, j, this.root, [], ""))
            }
        }
        return words;
    }
    wordsAt(chars: string[][], x: number, y: number, currentNode: TNode, explored: string[], current: string): Word[] {
        const words: Word[] = [];
        for (let c of getNeighbors(chars, x, y)) {
            if (explored.includes(c[0] + ";" + c[1])) continue;
            const char = chars[c[0]][c[1]];
            const node = currentNode.children.get(char);
            if (!node) continue;
            const newExplored = [...explored, c[0] + ";" + c[1]];
            if (node.isEndOfWord) words.push({ word: current + node.value, path: newExplored });
            words.push(...this.wordsAt(chars, c[0], c[1], node, newExplored, current + node.value));
        }
        return words;
    }
}