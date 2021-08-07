import type {
	Interaction,
	Message
} from "discord.js";

import {
	IDLE_MESSAGE,
	LOSING_MESSAGE,
	TIE_MESSAGE,
	WELCOME_MESSAGE,
	WINNING_MESSAGE
} from "#responses/ttt";
import { TicTacToe, Turn } from "#utils/games/TicTacToe";
import type Rizu from "#classes/Rizu";
import type RizuCommand from "#types/RizuCommand";

function fetchMessage(turn: Turn, game: TicTacToe): string {
	const winner = game.getWinner();
	if (game.hasWinner()) {
		if (winner == turn) return LOSING_MESSAGE;
		else return WINNING_MESSAGE;
	} else {
		return TIE_MESSAGE;
	}
}

export default class implements RizuCommand {
	name = "ttt";
	description = "start a tic-tac-toe game with Rizu";
	options = [
		{
			type: "STRING" as const,
			name: "play-as",
			description: "echoes the message back",
			required: true,
			choices: [
				{ name: "X", value: "X" },
				{ name: "O", value: "O" }
			]
		}
	];

	async run(client: Rizu, interaction: Interaction): Promise<void> {
		if (!interaction.isCommand()) return;

		let game = new TicTacToe();

		const query = interaction.options.getString("play-as")!;
		const turn = query == "X" ? Turn.X : Turn.O;
		if (turn == Turn.O) game = game.move(Math.floor(Math.random() * 9));

		const message = await interaction.reply({
			content: WELCOME_MESSAGE.replace("TURN", query),
			components: game.toActionRows(),
			fetchReply: true
		}) as Message;

		const collector = message.createMessageComponentCollector({
			componentType: "BUTTON",
			filter: i => i.user.id == interaction.user.id,
			idle: 9000
		});

		collector.on("collect", async i => {
			const move = Number(i.customId);
			game = game.move(move);

			if (game.isOver()) {
				await i.update({
					components: game.toActionRows(),
					content: fetchMessage(turn, game)
				});
				collector.stop();
				return;
			}

			game = game.move(game.getWorstMove(turn));

			if (game.isOver()) {
				await i.update({
					components: game.toActionRows(),
					content: fetchMessage(turn, game)
				});
				collector.stop();
				return;
			}

			await i.update({ components: game.toActionRows() });
		});

		collector.on("end", async (c: unknown, reason: string) => {
			if (reason != "idle") return;
			await interaction.editReply({ content: IDLE_MESSAGE });
		});
	}
}
