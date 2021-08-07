import { MessageActionRow, MessageButton } from "discord.js";

export enum Turn {
	X,
	O
}

export class TicTacToe {
	X: number;
	O: number;
	turn: Turn;

	constructor(x = 0, o = 0) {
		this.X = x;
		this.O = o;

		let bits = x ^ o;
		let count = 0;
		while (bits > 0) {
			count++;
			bits = bits & (bits - 1);
		}

		this.turn = [Turn.X, Turn.O][count & 1];
	}

	evaluate(): number {
		const winner = this.getWinner();
		if (winner == Turn.X) return 1;
		if (winner == Turn.O) return -1;

		const moves = this.getPossibleMoves();
		if (moves.length == 0) return 0;

		const scores = moves.map(m => this.move(m).evaluate());

		return this.turn == Turn.X
			? Math.max(...scores)
			: Math.min(...scores);
	}

	getPossibleMoves(): number[] {
		let bits = this.X ^ this.O;
		const moves = [];
		for (let i = 0; i < 9; i++) {
			if ((bits & 1) == 0) moves.push(i);
			bits >>= 1;
		}
		return moves;
	}

	getWinner(): Turn | undefined {
		const TRIPLETS = [7, 56, 73, 84, 146, 273, 292, 448];
		if (TRIPLETS.some(t => (this.X & t) == t)) return Turn.X;
		if (TRIPLETS.some(t => (this.O & t) == t)) return Turn.O;
	}

	getWorstMove(turn: Turn): number {
		const moves = this.getPossibleMoves();
		const scores = moves.map(m => {
			return { move: m, score: this.move(m).evaluate() };
		});

		scores.sort((a, b) => {
			if (a.score == b.score) return Math.random() - 0.5;
			return a.score - b.score;
		});

		return turn == Turn.X
			? scores[scores.length - 1].move
			: scores[0].move;
	}

	hasWinner(): boolean {
		return this.getWinner() != undefined;
	}

	isOver(): boolean {
		return this.hasWinner() || this.getPossibleMoves().length == 0;
	}

	move(i: number): TicTacToe {
		if (this.turn == Turn.X) {
			return new TicTacToe(this.X ^ (1 << i), this.O);
		} else {
			return new TicTacToe(this.X, this.O ^ (1 << i));
		}
	}

	toActionRows(): MessageActionRow[] {
		let { X, O } = this;

		const rows = [...Array(3)].map(() => new MessageActionRow());
		for (let i = 0; i < 9; i++) {
			const button = new MessageButton()
				.setCustomId(i.toString())
				.setStyle("SECONDARY");

			if ((X & 1) == 1) {
				button.setLabel("X");
				button.setDisabled(true);
			} else if ((O & 1) == 1) {
				button.setLabel("O");
				button.setDisabled(true);
			} else {
				button.setLabel(" ");
			}

			X >>= 1;
			O >>= 1;
			rows[Math.floor(i / 3)].addComponents(button);
		}

		return rows;
	}
}
