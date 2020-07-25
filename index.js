// https://online-audio-converter.com/ja/ でwavの一番低品質に変換
// ・上記変換時にチャンネル数を1、サンプルレートは16000khzに設定
// 本スクリプト実行前に以下の環境変数を設定
// ・set -x GOOGLE_APPLICATION_CREDENTIALS hoge.json
async function main() {

  const speech = require('@google-cloud/speech');
  const fs = require('fs');

  const client = new speech.SpeechClient();

  // TODO::Google Cloud Storage のURIを設定
  const gcsUri = '';
  const languageCode = 'ja-JP';

  const config = {
    enableAutomaticPunctuation: true,
    enableWordTimeOffsets: true,
    languageCode: languageCode,
  };

  const audio = {
    uri: gcsUri,
  };

  const request = {
    config: config,
    audio: audio,
  };

  const [operation] = await client.longRunningRecognize(request);

  const [response] = await operation.promise();
  fs.appendFileSync('response.json', JSON.stringify(response, null, '    '));

}

main().catch(console.error);
