async function main() {

  const fs = require('fs');
  const prettyMilliseconds = require('pretty-ms');
  const json = JSON.parse(fs.readFileSync('./response.json', 'utf8'));

  json.results.forEach((result) => {

    const
      alternatives = result.alternatives[0],
      transcript = alternatives.transcript;

    let startTime = alternatives.words[0].startTime.seconds;
    if (!startTime) {
      startTime = 0;
    } else {
      startTime = startTime * 1000;
    }

    const formatStartTime = prettyMilliseconds(startTime, {colonNotation: true});
    const talk = '[' + formatStartTime + '] \n' + transcript + '\n\n';

    fs.appendFileSync('talk.txt', talk);

  });
}

main().catch(console.error);
