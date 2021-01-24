import { memo, FC } from 'react';
import { useAudio } from '../../ctx/AudioContext';

interface AudioProps {

}

const Audio: FC<AudioProps> = () => {
  const { audioRef } = useAudio();
  return (
    <audio
      ref={audioRef}
    />
  );
};

export default memo(Audio);
