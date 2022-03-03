const btn = document.getElementById('jokeButton');
const audioElement = document.getElementById('audio');

// Disable/Enable Buton
function toggleButton() {
    btn.disabled = !btn.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke) {
    const jokeString = joke.trim().replace(/ /g, '%20');
    VoiceRSS.speech({
        key: 'API Key GOes Here',
        src: jokeString,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from joke API
async function getJokes() {
    let joke = '';

    const apiUrl ='https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else {
            joke = data.joke;
        }
        //Text-to-speech
        tellMe(joke);
        //Disable Button
        toggleButton();
    } catch (error) {
        console.log('whoops: ', error);
    }
}

// Event Listeners
btn.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
