import { SOUND_STATUS } from '@/helpers/constants';
import usePlaySound from '@/hooks/usePlaySound';
import React from 'react';
import Sound from "react-sound";

const PlaySound = (): JSX.Element => {
    const { isPlaying } = usePlaySound();
    return (
        <Sound
            url="/sounds/principal-sound.mp3"
            playStatus={
                isPlaying ? SOUND_STATUS.PLAYING : SOUND_STATUS.STOPPED
            }
            loop
            playFromPosition={300}
        />
    )
};

export default PlaySound;