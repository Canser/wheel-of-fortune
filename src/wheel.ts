class Wheel {
    parts: string[] = [];
    ctx: CanvasRenderingContext2D;
    len: number;

    constructor(ctx: CanvasRenderingContext2D, parts: string[] = []) {
        this.ctx = ctx;
        this.parts = parts;
        this.len = this.parts.length;
    }

    getIndex = (rotation: number) => {
        return (
            Math.floor(this.len - (rotation / 2) * Math.PI * this.len) %
            this.len
        );
    };

    draw = () => {
        const pieAngle = (2 * Math.PI) / this.parts.length;
        const centerX = 250;
        const centerY = 250;
        const radius = 250;

        for (let i = 0; i < this.parts.length; i++) {
            this.ctx.save();
            // WHEEL PARTS
            this.ctx.beginPath();
            this.ctx.moveTo(250, 250);
            this.ctx.arc(
                250,
                250,
                radius,
                i * pieAngle,
                (i + 1) * pieAngle,
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
            this.ctx.rotate(pieAngle * i + pieAngle / 2);
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
