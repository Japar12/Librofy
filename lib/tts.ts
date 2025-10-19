export const speak = (
  text: string,
  lang: string = "en-US",
  voiceName?: string
) => {
  if (!window.speechSynthesis) {
    alert("Browser tidak mendukung text-to-speech");
    return;
  }

  const synth = window.speechSynthesis;
  synth.cancel(); // hentikan suara sebelumnya

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  utter.rate = 1.0;
  utter.pitch = 1.0;

  // pilih voice jika tersedia
  const voices = synth.getVoices();
  if (voiceName) {
    const v = voices.find((v) => v.name === voiceName);
    if (v) utter.voice = v;
  }

  synth.speak(utter);
};

export const stopSpeak = () => {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
};
