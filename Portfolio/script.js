document.addEventListener('DOMContentLoaded', function () {
    const waveElement = document.getElementById('wave');
    waveElement.addEventListener('animationiteration', function () {
        waveElement.style.animation = 'none';
        setTimeout(() => {
            waveElement.style.animation = '';
        }, 0);
    });
});
