export class Start extends Phaser.Scene {
  constructor() {
    super("Start");
    this.bet = 100;
    this.lives = 3;
    this.currentBalance = 1000000;
    this.profit = 0;
  }
  init(data) {
    this.lives = data.lives ?? 3;
    this.currentBalance = data.currentBalance ?? 1000000;
    this.profit = data.profit ?? 0;
  }
  preload() {
    this.load.image("start", "assets/start.png");
    this.load.image("road-line", "assets/road-line.png");
    this.load.image("coin", "assets/coin.png");
    this.load.image("wheel", "assets/wheel.png");
    this.load.image("taxi", "assets/taxi.png");
    this.load.image("police", "assets/police.png");
    this.load.image("ice-truck", "assets/ice-truck.png");
    this.load.image("fire-truck", "assets/fire-truck.png");
    this.load.image("barrier", "assets/block.png");
    this.load.image("wheel-arrow", "assets/arrow.png");
    this.load.spritesheet("player", "assets/spritesheet.png", { frameWidth: 160, frameHeight: 168 });
    this.load.spritesheet("player-jump", "assets/spritesheet-jump.png", { frameWidth: 157, frameHeight: 175 });
    this.load.spritesheet("player-dead", "assets/dead-cock.png", { frameWidth: 161, frameHeight: 165 });
  }

  create() {
    // INSERT_YOUR_CODE
    // Idle Animation
    if (!this.anims.exists("playerIdle")) {
      this.anims.create({
        key: "playerIdle",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: -1 }),
        frameRate: 15,
        repeat: -1,
      });
    }

    // Jump Animation
    if (!this.anims.exists("playerJump")) {
      this.anims.create({
        key: "playerJump",
        frames: this.anims.generateFrameNumbers("player-jump", { start: 0, end: -1 }),
        frameRate: 15,
        repeat: 0,
      });
    }

    // Dead Animation
    if (!this.anims.exists("playerDead")) {
      this.anims.create({
        key: "playerDead",
        frames: this.anims.generateFrameNumbers("player-dead", { start: 0, end: -1 }), // замени на свой ключ спрайтшита
        duration: 3000, // общая длительность анимации 3 сек
        repeat: 0,
      });
    }

    // Player
    let playerSprite = this.add.sprite(49, 300, "player");
    playerSprite.setScale(0.8);
    playerSprite.setOrigin(0, 0);
    playerSprite.setDepth(5);
    playerSprite.play("playerIdle");

    // Border
    const border = this.add.graphics();
    border.fillStyle(0x716c69, 1);
    border.fillRect(this.scale.width - 16.5, 0, 16.5, this.scale.height);
    border.setDepth(0);

    // Start Boulevard
    const start = this.add.image(-139, -340, "start");
    start.setScale(0.8);
    start.setOrigin(0, 0);
    start.setDepth(3);

    // UI Background Down
    const UIBackground = this.add.graphics();
    UIBackground.fillStyle(0x313131, 1);
    UIBackground.fillRect(0, this.scale.height - 200, 500, 200);
    UIBackground.setDepth(10);

    // UI Elements Container
    const UIForeground = this.add.graphics();
    UIForeground.lineStyle(8, 0x545454, 1);
    UIForeground.strokeRoundedRect((this.scale.width - 450) / 2, this.scale.height - 178, 450, 160, 15);
    UIForeground.fillStyle(0x424242, 1);
    UIForeground.fillRoundedRect((this.scale.width - 450) / 2, this.scale.height - 178, 450, 160, 15);
    UIForeground.setDepth(10);

    // Money Value Pseudo-Input
    const dollarBox = this.add.graphics();
    dollarBox.fillStyle(0x545454, 1);
    dollarBox.fillRoundedRect((this.scale.width - 450) / 2 + 10, this.scale.height - 169, 430, 50, 10);
    dollarBox.setDepth(10);

    // Money Value Text
    let dollarValue = this.add.text(this.scale.width / 2, this.scale.height - 144, `${this.bet}`, { fontSize: "28px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    dollarValue.setOrigin(0.5, 0.5);
    dollarValue.setDepth(10);

    // Increase Money Value Button
    const dollarValueUpBox = this.add.graphics();
    dollarValueUpBox.fillStyle(0x656565, 1);
    dollarValueUpBox.fillRoundedRect((this.scale.width + 335) / 2, this.scale.height - 164, 40, 40, 10);
    dollarValueUpBox.setDepth(10);

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
    rightArrow.setDepth(10);

    // Make right arrow interactive
    rightArrow.setInteractive(
      // Fix: Use a rectangle for easier/bigger clickable area
      new Phaser.Geom.Rectangle((this.scale.width + 335) / 2, this.scale.height - 164, 40, 40),
      Phaser.Geom.Rectangle.Contains
    );

    // Add right arrow click event
    rightArrow.on("pointerdown", () => {
      this.bet += 100;
      dollarValue.setText(`${this.bet}`);
    });

    // Decrease Money Value Button
    const dollarValueDownBox = this.add.graphics();
    dollarValueDownBox.fillStyle(0x656565, 1);
    dollarValueDownBox.fillRoundedRect((this.scale.width - 415) / 2, this.scale.height - 164, 40, 40, 10);
    dollarValueDownBox.setDepth(10);

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
    leftArrow.setDepth(10);

    // Make left arrow interactive
    leftArrow.setInteractive(new Phaser.Geom.Rectangle((this.scale.width - 415) / 2, this.scale.height - 164, 40, 40), Phaser.Geom.Rectangle.Contains);

    // Add left arrow click event
    leftArrow.on("pointerdown", () => {
      this.bet -= 100;
      dollarValue.setText(`${this.bet}`);
      if (this.bet <= 0) {
        this.bet = 100;
        dollarValue.setText(`${this.bet}`);
      }
    });

    // UI Background Up
    const UIBackground2 = this.add.graphics();
    UIBackground2.fillStyle(0x313131, 1);
    UIBackground2.fillRect(0, this.scale.height - 854, 500, 60);
    UIBackground2.setDepth(10);

    // Lives Text
    const livesText = this.add.text(15, 15, "LIVES:", { fontSize: "27px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    livesText.setDepth(10);

    // Lives Count
    let livesCount = this.add.text(145, 15, `${this.lives}`, { fontSize: "27px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    livesCount.setDepth(10);

    // UI Foreground p
    const UIForeground2 = this.add.graphics();
    UIForeground2.lineStyle(3, 0x545454, 1);
    UIForeground2.strokeRoundedRect((this.scale.width - 15) / 2, this.scale.height - 842, 233, 35, 6);
    UIForeground2.fillStyle(0x424242, 1);
    UIForeground2.fillRoundedRect((this.scale.width - 15) / 2, this.scale.height - 842, 233, 35, 6);
    UIForeground2.setDepth(10);

    // Current Balance Text
    let currentDollars = this.add.text(260, 16, `${this.currentBalance} $`, { fontSize: "25px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    currentDollars.setDepth(10);

    // Coin
    const coin1 = this.add.image(280, 320, "coin");
    coin1.setScale(0.28);
    coin1.setOrigin(0, 0);
    coin1.setDepth(0);

    // Coin 2
    const coin2 = this.add.image(560, 320, "coin");
    coin2.setScale(0.28);
    coin2.setOrigin(0, 0);
    coin2.setDepth(2);

    // Coin 3
    const coin3 = this.add.image(520, 320, "coin");
    coin3.setScale(0.28);
    coin3.setOrigin(0, 0);
    coin3.setDepth(2);

    // Coin 4
    const coin4 = this.add.image(530, 320, "coin");
    coin4.setScale(0.28);
    coin4.setOrigin(0, 0);
    coin4.setDepth(2);

    // Coin 5
    const coin5 = this.add.image(520, 320, "coin");
    coin5.setScale(0.28);
    coin5.setOrigin(0, 0);
    coin5.setDepth(2);

    // Coin 6
    const coin6 = this.add.image(520, 320, "coin");
    coin6.setScale(0.28);
    coin6.setOrigin(0, 0);
    coin6.setDepth(2);

    // Coin Value
    const coinValue1 = this.add.text(307, 363, "0.1", { fontSize: "26px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    coinValue1.setOrigin(-0.25, 0);
    coinValue1.setDepth(2);

    // Coin Value 2
    const coinValue2 = this.add.text(525, 363, "0.3", { fontSize: "26px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    coinValue2.setOrigin(-0.25, 0);
    coinValue2.setDepth(2);

    // Coin Value 3
    const coinValue3 = this.add.text(539, 363, "1.6", { fontSize: "26px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    coinValue3.setOrigin(-0.25, 0);
    coinValue3.setDepth(2);

    // Coin Value 4
    const coinValue4 = this.add.text(539, 363, "2.0", { fontSize: "26px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    coinValue4.setOrigin(-0.25, 0);
    coinValue4.setDepth(2);

    // Coin Value 5
    const coinValue5 = this.add.image(580, 378, "wheel");
    coinValue5.setScale(0.099);
    coinValue5.setOrigin(0.5, 0.5);
    coinValue5.setDepth(2);

    // Coin Value 6
    const coinValue6 = this.add.text(539, 363, "2.5", { fontSize: "26px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    coinValue6.setOrigin(0, 0);
    coinValue6.setDepth(2);

    // Road Line 1
    const roadLine1 = this.add.image(this.scale.width - 63 / 2, 30, "road-line");
    roadLine1.setScale(0.55);
    roadLine1.setOrigin(0, 0);
    roadLine1.setDepth(-2);

    // Road Line 2
    const roadLine2 = this.add.image(this.scale.width - 55 / 2, 30, "road-line");
    roadLine2.setScale(0.55);
    roadLine2.setOrigin(0, 0);
    roadLine2.setDepth(-2);
    roadLine2.x = this.scale.width - 55 / 2 + 55;

    // Road Line 3
    const roadLine3 = this.add.image(this.scale.width - 55 / 2, 30, "road-line");
    roadLine3.setScale(0.55);
    roadLine3.setOrigin(0, 0);
    roadLine3.setDepth(-2);
    roadLine3.x = this.scale.width - 55 / 2 + 55;

    // Road Line 4
    const roadLine4 = this.add.image(this.scale.width - 55 / 2, 30, "road-line");
    roadLine4.setScale(0.55);
    roadLine4.setOrigin(0, 0);
    roadLine4.setDepth(-2);
    roadLine4.x = this.scale.width - 55 / 2 + 55;

    // Road Line 5
    const roadLine5 = this.add.image(this.scale.width - 55 / 2, 30, "road-line");
    roadLine5.setScale(0.55);
    roadLine5.setOrigin(0, 0);
    roadLine5.setDepth(-2);
    roadLine5.x = this.scale.width - 55 / 2 + 55;

    // Road Line 6
    const roadLine6 = this.add.image(this.scale.width - 55 / 2, 30, "road-line");
    roadLine6.setScale(0.55);
    roadLine6.setOrigin(0, 0);
    roadLine6.setDepth(-2);
    roadLine6.x = this.scale.width - 55 / 2 + 55;

    // Car 1
    const car1 = this.add.image(110, 0, "police");
    car1.setScale(0.4);
    car1.setOrigin(0.5, 1);
    car1.setDepth(2);

    // Car 2
    const car2 = this.add.image(110, 0, "ice-truck");
    car2.setScale(0.4);
    car2.setOrigin(0.5, 1);
    car2.setDepth(2);

    // Car 3
    const car3 = this.add.image(110, 0, "police");
    car3.setScale(0.4);
    car3.setOrigin(0.5, 1);
    car3.setDepth(2);

    // Car 4
    const car4 = this.add.image(110, 0, "fire-truck");
    car4.setScale(0.4);
    car4.setOrigin(0.5, 1);
    car4.setDepth(2);

    // Car 5
    const car5 = this.add.image(110, 0, "police");
    car5.setScale(0.4);
    car5.setOrigin(0.5, 1);
    car5.setDepth(2);

    // Car 6
    const car6 = this.add.image(110, 0, "taxi");
    car6.setScale(0.4);
    car6.setOrigin(0.5, 1);
    car6.setDepth(2);

    // Car Right (Almost useless)
    const carRight = this.add.image(340, 0, "taxi");
    carRight.setScale(0.4);
    carRight.setOrigin(0.5, 1);
    carRight.setDepth(2);

    // Barrier 1
    const barrier1 = this.add.image(110, 0, "barrier");
    barrier1.setScale(0.3);
    barrier1.setOrigin(0.5, 1);
    barrier1.setDepth(9);

    // Barrier 2
    const barrier2 = this.add.image(110, 0, "barrier");
    barrier2.setScale(0.3);
    barrier2.setOrigin(0.5, 1);
    barrier2.setDepth(9);

    // Barrier 3
    const barrier3 = this.add.image(110, 0, "barrier");
    barrier3.setScale(0.3);
    barrier3.setOrigin(0.5, 1);
    barrier3.setDepth(9);

    // Barrier 4
    const barrier4 = this.add.image(110, 0, "barrier");
    barrier4.setScale(0.3);
    barrier4.setOrigin(0.5, 1);
    barrier4.setDepth(9);

    // Barrier 5
    const barrier5 = this.add.image(110, 0, "barrier");
    barrier5.setScale(0.3);
    barrier5.setOrigin(0.5, 1);
    barrier5.setDepth(9);

    // Wheel
    const wheel = this.add.image(window.innerWidth / 2 + 30, window.innerHeight / 2 - 60, "wheel");
    wheel.setScale(window.innerWidth / 800);
    wheel.setOrigin(0.5, 0.5);
    wheel.setDepth(100);
    wheel.setVisible(false);

    // Wheel Arrow
    const wheelArrow = this.add.image(window.innerWidth / 2 + 30, 170, "wheel-arrow");
    wheelArrow.setScale(window.innerWidth / 650);
    wheelArrow.setOrigin(0.5, 0.5);
    wheelArrow.setDepth(100);
    wheelArrow.setVisible(false);

    // Spin Wheel Button Container
    const spinWheelButtonContainer = this.add.container(
      this.scale.width / 2, // Center X
      this.scale.height - 180 // Center Y
    );
    spinWheelButtonContainer.setDepth(100);
    spinWheelButtonContainer.setVisible(false);

    // Spin Wheel Button
    const spinWheelButton = this.add.graphics();
    spinWheelButton.fillStyle(0xdf0a0c, 1);
    // Center at (0,0) inside the container
    spinWheelButton.fillRoundedRect(-150, -40, 300, 80, 12);

    // Spin Wheel Button Text
    const spinWheelButtonText = this.add.text(0, 0, "SPIN WHEEL", {
      fontSize: "30px",
      fontFamily: "Dela Gothic One",
      color: "white",
    });
    spinWheelButtonText.setOrigin(0.5, 0.5);

    spinWheelButtonContainer.add([spinWheelButton, spinWheelButtonText]);

    // Tween to pulse (scale in-out)
    this.tweens.add({
      targets: spinWheelButtonContainer,
      scaleX: { from: 1, to: 1.08 },
      scaleY: { from: 1, to: 1.08 },
      yoyo: true,
      repeat: -1,
      duration: 550,
      ease: "Sine.easeInOut",
    });

    // Make spin wheel button interactive
    spinWheelButton.setInteractive(new Phaser.Geom.Rectangle(-150, -40, 300, 80), Phaser.Geom.Rectangle.Contains);

    // Modal window
    const modalWindow = this.add.graphics();
    modalWindow.fillStyle(0x424242, 1);
    modalWindow.fillRoundedRect(35, 230, 400, 300, 12);
    modalWindow.setDepth(300);
    modalWindow.setVisible(false);
    const modalWindowBorder = this.add.graphics();
    modalWindowBorder.lineStyle(4, 0x545454, 1); // 4px solid white
    modalWindowBorder.strokeRoundedRect(35, 230, 400, 300, 12);
    modalWindowBorder.setDepth(301);
    modalWindowBorder.setVisible(false);

    // Modal window congrats text
    const modalWindowCongratsText = this.add.text(230, 270, "CONGRATULATIONS!", { fontSize: "21px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    modalWindowCongratsText.setOrigin(0.5, 0.5);
    modalWindowCongratsText.setDepth(300);
    modalWindowCongratsText.setVisible(false);
    // Modal window bonus text1
    const modalWindowBonusText1 = this.add.text(230, 350, "YOU WON 750 EUR FREE!", { fontSize: "23px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    modalWindowBonusText1.setOrigin(0.5, 0.5);
    modalWindowBonusText1.setDepth(300);
    modalWindowBonusText1.setVisible(false);
    // Modal window bonus text2
    const modalWindowBonusText2 = this.add.text(230, 380, "+ 250 FREE SPINS!", { fontSize: "29px", fontFamily: "Dela Gothic One", color: "#ffffff" });
    modalWindowBonusText2.setOrigin(0.5, 0.5);
    modalWindowBonusText2.setDepth(300);
    modalWindowBonusText2.setVisible(false);
    // modal Button Container
    const modalButtonContainer = this.add.container(
      this.scale.width / 2, // Center X
      this.scale.height - 375 // Center Y
    );
    modalButtonContainer.setDepth(300);
    modalButtonContainer.setVisible(false);
    // modal Button
    const modalButton = this.add.graphics();
    modalButton.fillStyle(0xdf0a0c, 1);
    // Center at (0,0) inside the container
    modalButton.fillRoundedRect(-150, -40, 300, 65, 8);

    // modal Button Text
    const modalButtonText = this.add.text(0, -5, "GET FREE BONUS", {
      fontSize: "24px",
      fontFamily: "Dela Gothic One",
      color: "white",
    });
    modalButtonText.setOrigin(0.5, 0.5);

    modalButtonContainer.add([modalButton, modalButtonText]);

    this.tweens.add({
      targets: modalButtonContainer,
      scaleX: { from: 1, to: 1.08 },
      scaleY: { from: 1, to: 1.08 },
      yoyo: true,
      repeat: -1,
      duration: 550,
      ease: "Sine.easeInOut",
    });

    this.tweens.add({
      targets: carRight,
      y: carRight.y + window.innerHeight + window.innerHeight / 3,
      ease: "None.ease",
      repeat: -1,
      onRepeat: function (tween, target) {
        // Set new random duration (this controls how long the car moves)
        tween.duration = 600 + Math.floor(Math.random() * 200);
        // Random pause between repeats (this is independent from the car movement duration)
        const pauseDuration = 2000 + Math.random() * 3000;
        tween.pause();
        setTimeout(() => tween.resume(), pauseDuration);
        // Randomize texture at the end of the animation
        const textures = ["police", "ice-truck", "taxi", "fire-truck"];
        const randomTexture = textures[Math.floor(Math.random() * textures.length)];
        // If `target` is the car sprite
        if (target && typeof target.setTexture === "function") {
          target.setTexture(randomTexture);
        }
      },
      yoyo: false,
    });

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    // Cashout Button
    const cashoutButton = this.add.graphics();
    cashoutButton.fillStyle(0xfdcf4b, 1);
    cashoutButton.fillRoundedRect((this.scale.width - 420) / 2, this.scale.height - 104, 200, 75, 12);
    cashoutButton.setDepth(10);
    cashoutButton.setInteractive(new Phaser.Geom.Rectangle((this.scale.width - 420) / 2, this.scale.height - 104, 200, 75), Phaser.Geom.Rectangle.Contains);
    // Cashout Button Text
    const cashoutButtonText = this.add.text((this.scale.width - 220) / 2, this.scale.height - 80, "CASH UP", { fontSize: "30px", fontFamily: "Dela Gothic One", color: "white" });
    cashoutButtonText.setOrigin(0.5, 0.5);
    cashoutButtonText.setDepth(10);

    // Cashout Button Value Text
    const cashoutButtonValueText = this.add.text((this.scale.width - 220) / 2, this.scale.height - 48, `${this.profit} $`, { fontSize: "30px", fontFamily: "Dela Gothic One", color: "white" });
    cashoutButtonValueText.setOrigin(0.5, 0.5);
    cashoutButtonValueText.setDepth(10);

    // Start Button
    // Start Button Container for pulsing animation
    const startButtonContainer = this.add.container((this.scale.width + 220) / 2, this.scale.height - 66);
    startButtonContainer.setDepth(10);

    // Draw actual button
    const startButton = this.add.graphics();
    startButton.fillStyle(0x3dc55b, 1);
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

    // Make start button interactive
    startButton.setInteractive(new Phaser.Geom.Rectangle(-100, -37.5, 200, 75), Phaser.Geom.Rectangle.Contains);

    // Add start button click event
    startButton.on("pointerdown", () => {
      if (!this._startButtonClicked) {
        this._startButtonClicked = true;
        this.currentBalance -= this.bet;
        currentDollars.setText(`${this.currentBalance} $`);
      }
      playerSprite.play("playerJump");
      playerSprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        playerSprite.play("playerIdle");
      });

      this.tweens.add({
        targets: start,
        x: start.x - 250,
        duration: 170,
      });
      this.tweens.add({
        targets: roadLine1,
        x: roadLine1.x - 231,
        duration: 170,
      });
      this.tweens.add({
        targets: coin1,
        x: coin1.x - 223,
        duration: 170,
      });
      this.tweens.add({
        targets: coinValue1,
        x: coinValue1.x - 223,
        duration: 170,
      });
      this.tweens.add({
        targets: roadLine2,
        x: roadLine2.x - 55,
        duration: 170,
      });
      this.tweens.add({
        targets: coin2,
        x: coin2.x - 275,
        duration: 170,
      });
      this.tweens.add({
        targets: coinValue2,
        x: coinValue2.x - 223,
        duration: 170,
      });
      console.log(coinValue1.x);
      // Step 1
      if (coinValue1.x == 307) {
        this.profit = this.bet * 0.1;
        cashoutButtonValueText.setText(`${this.profit}`);
        this.tweens.add({
          targets: car1,
          y: car1.y + window.innerHeight / 4,
          duration: 1100,
          ease: "Cubic.easeOut",
          repeat: 0,
          yoyo: false,
        });
        this.tweens.add({
          targets: barrier1,
          y: barrier1.y + window.innerHeight / 4 + 70,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });
      }
      // Step 2
      if (coinValue1.x == 84) {
        this.tweens.add({
          targets: car1,
          x: car1.y - 500,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });

        this.tweens.add({
          targets: barrier2,
          y: barrier2.y + window.innerHeight / 4 + 70,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });

        console.log("coinValue1");

        this.tweens.add({
          targets: barrier1,
          x: barrier1.x - 223,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });

        this.tweens.add({
          targets: coin2,
          x: coin2.x - 230,
          duration: 170,
        });
        this.tweens.add({
          targets: coin3,
          x: coin3.x - 230,
          duration: 170,
        });
        this.tweens.add({
          targets: roadLine2,
          x: roadLine2.x - 225,
          duration: 170,
        });
        this.tweens.add({
          targets: roadLine3,
          x: roadLine3.x - 55,
          duration: 170,
        });
        this.tweens.add({
          targets: coinValue3,
          x: coinValue3.x - 223,
          duration: 170,
        });

        this.tweens.add({
          targets: car1,
          y: car1.y + window.innerHeight / 3,
          duration: 900,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });
        this.tweens.add({
          targets: car2,
          y: car2.y + window.innerHeight / 4,
          duration: 900,
          ease: "Cubic.easeOut",
          repeat: 0,
          yoyo: false,
        });

        this.profit = this.bet * 0.3;
        cashoutButtonValueText.setText(`${this.profit}`);
      }
      // Step 3
      if (coinValue1.x == -139) {
        if (`${this.lives}` == 2) {
          this.tweens.add({
            targets: car1,
            x: car1.x - 400,
            duration: 170,
            ease: "None.ease",
            repeat: 0,
            yoyo: false,
          });
          this.tweens.add({
            targets: barrier3,
            y: barrier3.y + window.innerHeight / 4 + 70,
            duration: 170,
            ease: "None.ease",
            repeat: 0,
            yoyo: false,
          });
        } else if (`${this.lives}` == 1) {
          this.tweens.add({
            targets: barrier3,
            y: barrier3.y + window.innerHeight / 4 + 70,
            duration: 170,
            ease: "None.ease",
            repeat: 0,
            yoyo: false,
          });
        }

        this.tweens.add({
          targets: barrier2,
          x: barrier2.x - 223,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });

        this.tweens.add({
          targets: car2,
          x: car2.x - 400,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });

        console.log("coinValue1");
        this.tweens.add({
          targets: coin2,
          x: coin2.x - 200,
          duration: 170,
        });
        this.tweens.add({
          targets: coin3,
          x: coin3.x - 240,
          duration: 170,
        });
        this.tweens.add({
          targets: roadLine2,
          x: roadLine2.x - 240,
          duration: 170,
        });
        this.tweens.add({
          targets: roadLine3,
          x: roadLine3.x - 225,
          duration: 170,
        });
        this.tweens.add({
          targets: coinValue3,
          x: coinValue3.x - 223,
          duration: 170,
        });
        this.tweens.add({
          targets: coinValue4,
          x: coinValue4.x - 229,
          duration: 170,
        });
        this.tweens.add({
          targets: coin4,
          x: coin4.x - 240,
          duration: 170,
        });
        this.tweens.add({
          targets: roadLine4,
          x: roadLine4.x - 55,
          duration: 170,
        });
        if (`${this.lives}` == 3) {
          this.tweens.add({
            targets: car3,
            y: car3.y + window.innerHeight + window.innerHeight / 3,
            duration: 600,
            ease: "None.ease",
            repeat: 0,
            yoyo: false,
          });
          this.input.enabled = false;
          this.time.delayedCall(3000, () => {
            this.input.enabled = true;
          });
          this.time.delayedCall(400, () => {
            playerSprite.play("playerDead");
          });
          this.time.delayedCall(3000, () => {
            this.scene.restart({ lives: this.lives - 1, currentBalance: this.currentBalance - this.profit, profit: 0 });
          });
        } else {
          this.tweens.add({
            targets: car4,
            y: car4.y + window.innerHeight / 4,
            duration: 1100,
            ease: "Cubic.easeOut",
            repeat: 0,
            yoyo: false,
          });
        }
        this.profit = this.bet * 1.6;
        cashoutButtonValueText.setText(`${this.profit}`);
      }
      // Step 4
      if (coinValue1.x == -362) {
        if (`${this.lives}` == 2) {
          this.tweens.add({
            targets: car5,
            y: car5.y + window.innerHeight + window.innerHeight / 3,
            duration: 600,
            ease: "None.ease",
            repeat: 0,
            yoyo: false,
          });
          this.input.enabled = false;
          this.time.delayedCall(3000, () => {
            this.input.enabled = true;
          });
          playerSprite.play("playerDead");
          this.time.delayedCall(3000, () => {
            this.scene.restart({ lives: this.lives - 1, currentBalance: this.currentBalance - this.profit, profit: 0 });
          });
        } else {
          this.tweens.add({
            targets: car5,
            y: car5.y + window.innerHeight / 4,
            duration: 1100,
            ease: "Cubic.easeOut",
            repeat: 0,
            yoyo: false,
          });
          this.tweens.add({
            targets: barrier4,
            y: barrier4.y + window.innerHeight / 4 + 70,
            duration: 170,
            ease: "None.ease",
            repeat: 0,
            yoyo: false,
          });
        }
        this.tweens.add({
          targets: barrier3,
          x: barrier3.x - 223,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });

        this.tweens.add({
          targets: car4,
          x: car4.x - 400,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });
        this.tweens.add({
          targets: coinValue3,
          x: coinValue3.x - 446,
          duration: 170,
        });
        this.tweens.add({
          targets: coinValue4,
          x: coinValue4.x - 229,
          duration: 170,
        });
        this.tweens.add({
          targets: roadLine3,
          x: roadLine3.x - 325,
          duration: 170,
        });
        this.tweens.add({
          targets: coin3,
          x: coin3.x - 240,
          duration: 170,
        });
        this.tweens.add({
          targets: coin4,
          x: coin4.x - 240,
          duration: 170,
        });
        this.tweens.add({
          targets: coin5,
          x: coin5.x - 240,
          duration: 170,
        });
        this.tweens.add({
          targets: coinValue5,
          x: coinValue5.x - 240,
          duration: 170,
        });
        this.tweens.add({
          targets: roadLine4,
          x: roadLine4.x - 240,
          duration: 170,
        });
        this.tweens.add({
          targets: roadLine5,
          x: roadLine5.x - 55,
          duration: 170,
        });

        this.profit = this.bet * 2.0;
        cashoutButtonValueText.setText(`${this.profit}`);
      }
      // Step 5
      if (coinValue1.x == -585) {
        // Smoothly fade in the wheel and arrow with a 1 second delay
        wheel.setAlpha(0).setVisible(true);
        wheelArrow.setAlpha(0).setVisible(true);
        spinWheelButtonContainer.setAlpha(0).setVisible(true);

        // Stop pulsing/bouncing the startButtonContainer
        this.tweens.killTweensOf(startButtonContainer);
        startButtonContainer.setScale(1, 1);

        this.tweens.add({
          targets: wheel,
          alpha: 1,
          duration: 500, // fade-in duration
          delay: 1000, // 1 second delay before starting fade-in
          ease: "Linear",
        });
        this.tweens.add({
          targets: wheelArrow,
          alpha: 1,
          duration: 500, // fade-in duration
          delay: 1000, // 1 second delay before starting fade-in
          ease: "Linear",
        });

        this.tweens.add({
          targets: spinWheelButtonContainer,
          alpha: 1,
          duration: 500, // fade-in duration
          delay: 1000, // 1 second delay before starting fade-in
          ease: "Linear",
        });
        spinWheelButton.on("pointerdown", () => {
          // Spin the wheel: pick a random angle & animate the wheel and arrow to spin and stop
          // Make the wheel spin fast at first, then slow down and stop for a dramatic effect
          const spins = 5;
          const baseAngle = Phaser.Math.Between(-57, -57); // you can change to randomize stopping sector
          const finalAngle = baseAngle + 360 * spins;

          // First part: fast spinning
          this.tweens.add({
            targets: wheel,
            angle: finalAngle - 360, // almost all spins in 1st phase
            duration: 1200,
            ease: "Cubic.easeIn",
            onComplete: () => {
              // Second part: slow down to stop
              this.tweens.add({
                targets: wheel,
                angle: finalAngle,
                duration: 1800,
                ease: "Cubic.easeOut",
              });
            },
          });
          this.tweens.add({
            targets: wheelArrow,
            angle: -40,
            duration: 2500,
            ease: "Cubic.easeOut",
            onComplete: () => {
              this.tweens.add({
                targets: wheelArrow,
                angle: 0,
                duration: 1500, // Smooth return to 0
                ease: "Cubic.easeInOut",
              });

              this.time.delayedCall(3000, () => {
                // Smoothly fade in all modal elements
                modalWindow.setVisible(true).setAlpha(0);
                modalWindowBorder.setVisible(true).setAlpha(0);
                modalWindowCongratsText.setVisible(true).setAlpha(0);
                modalWindowBonusText1.setVisible(true).setAlpha(0);
                modalWindowBonusText2.setVisible(true).setAlpha(0);
                modalButtonContainer.setVisible(true).setAlpha(0);

                const fadeTargets = [
                  modalWindow,
                  modalWindowBorder,
                  modalWindowCongratsText,
                  modalWindowBonusText1,
                  modalWindowBonusText2,
                  modalButtonContainer,
                ];
                this.tweens.add({
                  targets: fadeTargets,
                  alpha: 1,
                  duration: 600,
                  ease: "Cubic.easeInOut",
                });
              });
            },
          });
          this.tweens.killTweensOf(spinWheelButtonContainer);
          spinWheelButtonContainer.setScale(1, 1);
          spinWheelButton.disableInteractive();
          startButton.disableInteractive();
          cashoutButton.disableInteractive();
        });

        this.tweens.add({
          targets: car4,
          x: car4.x - 400,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });

        this.tweens.add({
          targets: barrier5,
          y: barrier5.y + window.innerHeight / 4 + 70,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });

        this.tweens.add({
          targets: barrier4,
          x: barrier4.x - 223,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });
        this.tweens.add({
          targets: car5,
          x: car5.x - 400,
          duration: 170,
          ease: "None.ease",
          repeat: 0,
          yoyo: false,
        });
        this.tweens.add({
          targets: car6,
          y: car6.y + window.innerHeight / 4,
          duration: 1100,
          ease: "Cubic.easeOut",
          repeat: 0,
          yoyo: false,
        });
        this.tweens.add({
          targets: coinValue5,
          x: coinValue5.x - 240,
          duration: 170,
        });
        this.tweens.add({
          targets: coin4,
          x: coinValue5.x - 525,
          duration: 170,
        });
        this.tweens.add({
          targets: coin5,
          x: coin5.x - 230,
          duration: 170,
        });
        this.tweens.add({
          targets: coin6,
          x: coin6.x - 230,
          duration: 170,
        });
        this.tweens.add({
          targets: roadLine4,
          x: roadLine4.x - 240,
          duration: 170,
        });
        this.tweens.add({
          targets: roadLine5,
          x: roadLine5.x - 235,
          duration: 170,
        });
        this.tweens.add({
          targets: roadLine6,
          x: roadLine6.x - 55,
          duration: 170,
        });
        this.tweens.add({
          targets: coinValue6,
          x: coinValue6.x - 214,
          duration: 170,
        });
      }
    });

    cashoutButton.on("pointerdown", () => {
      console.log("CASHOUT CLICKED", this.currentBalance, this.profit, this.lives);
      this.scene.restart({
        currentBalance: this.currentBalance + this.profit,
        lives: this.lives,
      });
    });
  }

  update() {}
}
