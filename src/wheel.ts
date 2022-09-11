const centerX = 250;
const centerY = 250;
const radius = 250;

class Wheel {
    parts: string[] = [];
    ctx: CanvasRenderingContext2D;
    len: number;
    pieAngle: number;
    divider: number;

    constructor(ctx: CanvasRenderingContext2D, parts: string[] = []) {
        this.ctx = ctx;
        this.parts = parts;
        this.len = this.parts.length;
        this.pieAngle = (2 * Math.PI) / this.len;
        this.divider = 360 / this.len;
    }

    getIndex = (rotation: number) =>
        Math.floor(
            Math.ceil((rotation + this.divider / 2) % 360) / this.divider
        );

    draw = () => {
        for (let i = 0; i < this.parts.length; i++) {
            this.ctx.save();
            // WHEEL PARTS
            this.ctx.beginPath();
            this.ctx.moveTo(250, 250);
            this.ctx.arc(
                250,
                250,
                radius,
                i * this.pieAngle,
                (i + 1) * this.pieAngle,
                false
            );
            this.ctx.lineWidth = 150;

            const hueValue = i * 15;
            this.ctx.fillStyle = "hsl(" + hueValue + ",70%, 60%)";
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = "#444";
            this.ctx.stroke();
            this.ctx.closePath();

            // TEXT
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(this.pieAngle * i + this.pieAngle / 2);
            this.ctx.fillStyle = "#fff";
            this.ctx.shadowColor = "black";
            this.ctx.shadowBlur = 3;
            this.ctx.font = "bold 20px roboto";
            this.ctx.fillText(this.parts[i], radius - 100, 10);

            this.ctx.restore();
        }
    };
}

export default Wheel;
