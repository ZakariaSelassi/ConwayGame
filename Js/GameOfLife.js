class GameOfLife {

    constructor() {
        this.cellSize = 5;
        this.deadcColor = `#181818`;
        this.liveColor = `#FF756B`;
        this.cellsColumn = Math.floor(canvas.width / this.cellSize);
        this.cellsRows = Math.floor(canvas.height / this.cellSize);
        this.firstArray = [];
        this.secondArray = [];

        // Initialise un tableau avec des zero pour chaque cells
        this.arrayInit = () => {
            for (let i = 0; i < this.cellsRows; i++) {
                this.firstArray[i] = [];
                for (let j = 0; j < this.cellsColumn; j++) {
                    this.firstArray[i][j] = 0;
                }
            }
            this.secondArray = this.firstArray;
        };
        // Randomiz 0 et 1 pour chaque cells
        this.arrayRand = () => {
            for (let i = 0; i < this.cellsRows; i++) {
                for (let j = 0; j < this.cellsColumn; j++) {
                    this.firstArray[i][j] = (Math.random() > 0.5) ? 1 : 0;
                }
            }
        };
        // Pour chaque cells on attribut une colors
        this.fillArray = () => {
            for (let i = 0; i < this.cellsRows; i++) {
                for (let j = 0; j < this.cellsColumn; j++) {
                    let color;
                    if (this.firstArray[i][j] == 1) {
                        color = this.liveColor;
                    } else {
                        color = this.deadcColor;
                    }
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cellSize, i * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        };

        this.setCellValue = (row, col) => {
            try {
                return this.firstArray[row][col];
            } catch {
                return 0;
            }
        };

        this.countNeighbours = (row, col) => {
            let totalNeighbours = 0;
            totalNeighbours += this.setCellValue(row - 1, col - 1);
            totalNeighbours += this.setCellValue(row - 1, col);
            totalNeighbours += this.setCellValue(row - 1, col + 1);
            totalNeighbours += this.setCellValue(row, col - 1);
            totalNeighbours += this.setCellValue(row, col + 1);
            totalNeighbours += this.setCellValue(row + 1, col - 1);
            totalNeighbours += this.setCellValue(row + 1, col);
            totalNeighbours += this.setCellValue(row + 1, col + 1);
            return totalNeighbours;
        };

        this.updateCell = (row, col) => {
            const total = this.countNeighbours(row, col);
            if (total > 4 || total < 3) {
                return 0;
            } else if (this.firstArray[row][col] === 0 && total === 3) {
                return 1;
            } else {
                return this.firstArray[row][col];
            }
        };

        this.updateLifeCycle = () => {
            for (let i = 0; i < this.cellsRows; i++) {
                for (let j = 0; j < this.cellsColumn; j++) {
                    let newStat = this.updateCell(i, j);
                    this.secondArray[i][j] = newStat;
                }
            }
            this.firstArray = this.secondArray;
        };

        this.gameSet = () => {
            this.arrayInit();
        };
        this.runGame = () => {
            this.updateLifeCycle();
            this.fillArray();
        };
    }
}