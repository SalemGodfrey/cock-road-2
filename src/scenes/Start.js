export class Start extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  preload() {
    this.load.image("start", "assets/start.png");
    this.load.image("road-line", "assets/road-line.png");
    this.load.image("coin", "assets/coin.png");
    this.load.spine("cock", "assets/cock.json", ["assets/cock.atlas"]);
  }

  create() {
    // INSERT_YOUR_CODE
    // Start Boulevard
    const start = this.add.image(-139, -340, "start");
    start.setScale(0.8);
    start.setOrigin(0, 0);

    // UI Background Down
    const UIBackground = this.add.graphics();
    UIBackground.fillStyle(0x313131, 1);
    UIBackground.fillRect(0, this.scale.height - 200, 500, 200);

    // UI Elements Container
    const UIForeground = this.add.graphics();
    UIForeground.lineStyle(8, 0x545454, 1);
    UIForeground.strokeRoundedRect((this.scale.width - 450) / 2, this.scale.height - 178, 450, 160, 15);
    UIForeground.fillStyle(0x424242, 1);
    UIForeground.fillRoundedRect((this.scale.width - 450) / 2, this.scale.height - 178, 450, 160, 15);

    // Money Value Pseudo-Input
    const dollarBox = this.add.graphics();
    dollarBox.fillStyle(0x545454, 1);
    dollarBox.fillRoundedRect((this.scale.width - 450) / 2 + 10, this.scale.height - 169, 430, 50, 10);

    // Money Value Text
    let dollarValue = this.add.text(this.scale.width / 2, this.scale.height - 144, "100", { fontSize: "28px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    dollarValue.setOrigin(0.5, 0.5);

    // Increase Money Value Button
    const dollarValueUpBox = this.add.graphics();
    dollarValueUpBox.fillStyle(0x656565, 1);
    dollarValueUpBox.fillRoundedRect((this.scale.width + 335) / 2, this.scale.height - 164, 40, 40, 10);

    // Right Arrow
    const rightArrow = this.add.graphics();
    rightArrow.fillStyle(0xffffff, 1);
    const upX = (this.scale.width + 335) / 2 + 20; // center
    const upY = this.scale.height - 144; // center
    rightArrow.beginPath();
    rightArrow.moveTo(upX - 8, upY - 8);
    rightArrow.lineTo(upX + 8, upY);
    rightArrow.lineTo(upX - 8, upY + 8);
    rightArrow.closePath();
    rightArrow.fillPath();

    // Decrease Money Value Button
    const dollarValueDownBox = this.add.graphics();
    dollarValueDownBox.fillStyle(0x656565, 1);
    dollarValueDownBox.fillRoundedRect((this.scale.width - 415) / 2, this.scale.height - 164, 40, 40, 10);

    // Left Arrow
    const leftArrow = this.add.graphics();
    leftArrow.fillStyle(0xffffff, 1);
    const downX = (this.scale.width - 415) / 2 + 20; // center
    const downY = this.scale.height - 144; // center
    leftArrow.beginPath();
    leftArrow.moveTo(downX + 8, downY - 8);
    leftArrow.lineTo(downX - 8, downY);
    leftArrow.lineTo(downX + 8, downY + 8);
    leftArrow.closePath();
    leftArrow.fillPath();

    // Start Button
    // Start Button Container for pulsing animation
    const startButtonContainer = this.add.container(
      (this.scale.width + 220) / 2, // Center X of button+text
      this.scale.height - 66 // Center Y for both
    );

    // Draw actual button
    const startButton = this.add.graphics();
    startButton.fillStyle(0x3dc55b, 1);
    // Center at (0,0) inside the container, so draw rect at -w/2, -h/2
    startButton.fillRoundedRect(-100, -37.5, 200, 75, 12);

    // Start Button Text
    const startButtonText = this.add.text(0, 0, "GO", {
      fontSize: "30px",
      fontFamily: "Dela Gothic One",
      color: "#ffffff",
    });
    startButtonText.setOrigin(0.5, 0.5);

    startButtonContainer.add([startButton, startButtonText]);

    // Tween to pulse (scale in-out)
    this.tweens.add({
      targets: startButtonContainer,
      scaleX: { from: 1, to: 1.08 },
      scaleY: { from: 1, to: 1.08 },
      yoyo: true,
      repeat: -1,
      duration: 550,
      ease: "Sine.easeInOut",
    });

    // Cashout Button
    const cashoutButton = this.add.graphics();
    cashoutButton.fillStyle(0xa37e18, 1);
    cashoutButton.fillRoundedRect((this.scale.width - 420) / 2, this.scale.height - 104, 200, 75, 12);

    // Cashout Button Text
    const cashoutButtonText = this.add.text((this.scale.width - 220) / 2, this.scale.height - 65, "CASH UP", { fontSize: "30px", fontFamily: "Dela Gothic One", color: "#C7C7C7" });
    cashoutButtonText.setOrigin(0.5, 0.5);

    // UI Background Up
    const UIBackground2 = this.add.graphics();
    UIBackground2.fillStyle(0x313131, 1);
    UIBackground2.fillRect(0, this.scale.height - 854, 500, 60);

    // Lives Text
    const livesText = this.add.text(15, 15, "LIVES:", { fontSize: "27px", fontFamily: "Dela Gothic One", color: "#ffffff" });

    // Lives Count
    let livesCount = this.add.text(145, 15, "3", { fontSize: "27px", fontFamily: "Dela Gothic One", color: "#ffffff" });

    // UI Foreground p
    const UIForeground2 = this.add.graphics();
    UIForeground2.lineStyle(3, 0x545454, 1);
    UIForeground2.strokeRoundedRect((this.scale.width - 15) / 2, this.scale.height - 842, 233, 35, 6);
    UIForeground2.fillStyle(0x424242, 1);
    UIForeground2.fillRoundedRect((this.scale.width - 15) / 2, this.scale.height - 842, 233, 35, 6);

    // Current Balance Text
    let currentDollars = this.add.text(260, 16, "1000000 $", { fontSize: "25px", fontFamily: "Dela Gothic One", color: "#ffffff" });

    // RooadLine
    const roadLine = this.add.image(this.scale.width - 55 / 2, 30, "road-line");
    roadLine.setScale(0.55);
    roadLine.setOrigin(0, 0);
    roadLine.setDepth(-2);

    // Coin
    const coin = this.add.image(284, 320 , "coin");
    coin.setScale(0.28);
    coin.setOrigin(0, 0);
    coin.setDepth(2);

    // Cock Animation
    const cock = this.add.spine(250, 500, "cock", "idle", true);
    cock.setScale(0.8);
    cock.setDepth(1);
  }

  update() {}
}
