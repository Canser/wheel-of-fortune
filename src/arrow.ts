import Wheel from "./wheel";

const ROTATION_SPEED = 10;

class Arrow {
    isRotating = false;
    ctx: CanvasRenderingContext2D;
    rotation = 0;
    rotationSpeed = ROTATION_SPEED;
    stoppingSpeed = Math.random();
    canvasWidth = 0;
    canvasHeight = 0;
    centerX = 0;
    centerY = 0;
    stoppedRotation = false;
    wheel: Wheel;

    constructor(ctx: CanvasRenderingContext2D, wheel: Wheel) {
        this.ctx = ctx;
        this.canvasWidth = ctx.canvas.clientWidth;
        this.canvasHeight = ctx.canvas.clientHeight;
        this.centerX = this.canvasWidth / 2;
        this.centerY = this.canvasHeight / 2;
        this.wheel = wheel;

		console.log(this.wheel.getIndex(this.rotation));
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.centerX, this.centerY);
        this.ctx.rotate((this.rotation * Math.PI) / 180);
        this.ctx.translate(-this.centerX, -this.centerY);
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX - 15, this.centerY);
        this.ctx.lineTo(this.centerX - 15, this.centerY + 100);
        this.ctx.strokeStyle = "red";
        this.ctx.lineTo(this.centerX - 30 - 15, this.centerY + 100);
        this.ctx.lineTo(this.centerX + 15 - 15, this.centerY + 150);
        this.ctx.lineTo(this.centerX + 60 - 15, this.centerY + 100);
        this.ctx.lineTo(this.centerX + 30 - 15, this.centerY + 100);
        this.ctx.lineTo(this.centerX + 30 - 15, this.centerY);
        this.ctx.lineTo(this.centerX, this.centerY);
        this.ctx.arc(this.centerX, this.centerY, 15, Math.PI, 0);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.beginPath();
        this.ctx.fillStyle = "black";
        this.ctx.arc(this.centerX, this.centerY, 30, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();

        if (this.isRotating) {
            this.rotation += this.rotationSpeed;

            this.ctx.fillStyle = "white";
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "center";
            this.ctx.font = '24px arial';

            this.ctx.fillText(
                this.wheel.parts[this.wheel.getIndex(this.rotation)],
                this.centerX,
                this.centerY
            );

            if (this.rotation >= 360) {
                this.rotation = 0;
            }
        }

        if (this.stoppedRotation && this.isRotating) {
            this.rotationSpeed -= 0.10;
            // this.rotationSpeed -= this.stoppingSpeed;

            if (this.rotationSpeed <= 0) {
                console.log("stopped at", this.rotation);
                this.rotationSpeed = 0;
                this.isRotating = false;
            }
        }
    }

    animate = () => {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.draw();
        requestAnimationFrame(this.animate);
    };

    setRotation(rotate: boolean) {
        this.isRotating = rotate;
    }

    stopRotation() {
        this.stoppedRotation = true;
    }

    reset() {
        this.rotationSpeed = ROTATION_SPEED;
        this.rotation = 0;
        this.isRotating = false;
        this.stoppedRotation = false;
    }
}

export default Arrow;
