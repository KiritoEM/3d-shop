"use client"

import usePlaySound from '@/hooks/usePlaySound';
import { useLayoutEffect, useRef } from 'react';

const PlayBackgroundSound = (): JSX.Element => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isPlaying } = usePlaySound();

    useLayoutEffect(() => {
        if (!audioRef.current) return;

        const playAudio = async () => {
            try {
                if (isPlaying) {
                    await audioRef.current?.play();
                } else {
                    audioRef.current?.pause();
                    audioRef.current?.load();
                }
            } catch (error) {
                console.warn('Audio playback failed:', error);
            }
        };

        playAudio();
    }, [isPlaying]);

    return (
        <audio
            ref={audioRef}
            src="/sounds/principal-sound.mp3"
            loop
            preload="auto"
        />
    );
};

export default PlayBackgroundSound;