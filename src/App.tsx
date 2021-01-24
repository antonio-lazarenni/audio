import React, { useEffect } from 'react';
import Audio from './components/Audio';
import { useAudio } from './ctx/AudioContext';

function App() {
  const { osc, gain, ctx , createContext} = useAudio();

  useEffect(() => {
    if (gain && ctx && osc) {
      osc?.connect(gain)?.connect(ctx.destination);
    }
  }, [ctx, gain, osc])

  useEffect(() => {
    if (gain && ctx && osc) {
      osc.frequency.value = 110.00;
      var imag= new Float32Array([0,0,1,0,1]);  // sine
      var real = new Float32Array(imag.length);  // cos
      var customWave = ctx.createPeriodicWave(real, imag);  // cos, sine
      osc.setPeriodicWave(customWave);
      osc.start();
    }
  })

  return (
    <>
      <button onClick={createContext}>Start</button>
      <button onClick={() => osc?.start()}>Play</button>
      <button onClick={() => osc?.stop()}>Stop</button>
      <Audio />
    </>
  );
}

export default App;
