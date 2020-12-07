import rawInput from "./input";

function partOne() {
    // const pre = document.getElementsByTagName('pre')[0];
    const input = rawInput;

    let trees = 0;
    let offset = 0;

    for (let line of input) {
        if (offset > line.length) {
            offset = Math.abs(offset % line.length);
            // continue;
        }
        console.table({ line, offset, char: line[offset] })
        if (line[offset] === '#') {
            trees++;
        }

        offset += 3;
    }

    return trees;
}

const trees = partOne();
console.log(trees);