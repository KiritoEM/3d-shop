import confetti from "canvas-confetti";

export const animateSideCannons = (
    colors: string[] = ["#D70654", "#B8D576", "#eca184", "#f8deb1"],
) => {
    const end = Date.now() + 2.4 * 1000;

    const frame = () => {
        if (Date.now() > end) return;

        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.7 },
            colors: colors,
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.7 },
            colors: colors,
        });

        requestAnimationFrame(frame);
    };

    frame();
};