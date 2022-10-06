function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function sleep2(ms) {
    await new Promise(resolve => setTimeout(resolve, ms))
}

function* sleep3(ms) {
    yield new Promise(resolve => setTimeout(resolve, ms))
}

sleep(1000).then(() => {
    console.log('sleep 1s')
})
