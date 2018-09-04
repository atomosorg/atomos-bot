const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const fs = require('fs');
const {
    spawn
} = require('child_process');

function execPromise(name, data) {
    data['cwd'] = process.cwd();
    return new Promise((yes, reject) => {
        let child = spawn(name, data);
        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)
        child.on('close', () => {
            yes()
        })
        child.on('error', (err) => {
            reject(err);
        })
    })
}

function createQuestionPromse(question) {
    return new Promise((yes, reject) => {
        rl.question(question, (answer) => {
            yes(answer)
        });
    })
}
async function main() {
    let theToken = await createQuestionPromse('What is your bot\'s token? ')
    console.log('All done. Setting up now!')
    await execPromise(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['install']).catch(ex => {
        console.log(ex)
    });
    await execPromise(/^win/.test(process.platform) ? 'tsc.cmd' : 'tsc', []).catch(ex => {
        console.log(ex)
    });
    fs.writeFileSync(require('path').join(process.cwd, 'cred.secret.json'), JSON.stringify({
        token: theToken
    }))
    process.exit(0);
}
main()