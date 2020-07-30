const readline = require("readline");

const rl = readline.createInterface ({
    input:process.stdin,
    output:process.stdout
});

// Straight out of the documentation

function think(time) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + time);
}

// It's funnier if the computer has to think about it
// I know this isn't good practice because it ties up the cli
// But it's supposed to because it's funny shut up

rl.question('What is your name? ', name => {
    console.log(`Hey ${name}, what's up?`);
    think(1000);
    console.log(`${name} is such a weird name.  Oshi- is this thing still on?`);
    think(1000);
    console.log(`Well, this is awkward.  Why don't we just start over?`)
    think(1500);
    rl.question('What is your name? ', name => {
        think(1000);
        console.log(`Wow, ${name} is a perfectly nice name.  What's up?`);
        rl.close();
    });
});

// I couldn't ask a second question, here, I had to wrap it up in the first one
// I thought it's because I used close but not closing it didn't do anything useful
// I might remember to ask about it in class