import React, {
  useRef,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IAudioCtx {
  ctx: AudioContext | null;
  audioRef: React.MutableRefObject<HTMLMediaElement | null>;
  osc: OscillatorNode | null;
  gain: GainNode| null;
  analyser: AnalyserNode | null;
  createContext: () => void;
}

const AudioCtx = createContext<IAudioCtx | undefined>(undefined);

export const AudionProvider: React.FC = (props) => {
  const audioRef = useRef<HTMLMediaElement | null>(null);

  const [ctx, setContext] = useState<AudioContext | null>(null);
  const [osc, setOSC] = useState<OscillatorNode | null>(null);
  const [gain, setGain] = useState<GainNode | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  function createContext() {
    const audioCtx = new AudioContext();
    setContext(audioCtx);
  }

  useEffect(() => {
    if(ctx) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const analyser = ctx.createAnalyser();
      setOSC(osc);
      setGain(gain);
      setAnalyser(analyser);
    }
  }, [ctx]);

  return <AudioCtx.Provider {...props} value={{
    ctx,
    audioRef,
    osc,
    gain,
    analyser,
    createContext,
  }} />;
};

export const useAudio = (): IAudioCtx => {
  const context = useContext(AudioCtx);
  if (context === undefined) {
    throw new TypeError('useAudio must be used within a AudioProvider');
  }
  return context;
};

export default AudioCtx;
