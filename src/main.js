import { Start } from './scenes/Start.js';

// Функция для определения размеров игры
const getGameDimensions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;
    
    // Для портретной ориентации (мобильные)
    if (aspectRatio < 1) {
        return {
            width: 480,
            height: 854
        };
    } 
    // Для ландшафтной ориентации (планшеты и десктоп)
    else {
        return {
            width: 1280,
            height: 720
        };
    }
};

const dimensions = getGameDimensions();

const config = {
    type: Phaser.AUTO,
    title: 'Cock Road 2',
    description: 'Cock Road 2 is a game about a cock that is on a road and has to avoid cars.',
    parent: 'game-container',
    width: dimensions.width,
    height: dimensions.height,
    backgroundColor: '#716C69',
    pixelArt: false,
    scene: [
        Start
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    } 
}

const game = new Phaser.Game(config);

// Обработка изменения ориентации экрана
window.addEventListener('resize', () => {
    const newDimensions = getGameDimensions();
    game.scale.resize(newDimensions.width, newDimensions.height);
});