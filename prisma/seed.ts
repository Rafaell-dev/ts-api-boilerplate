import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	const passwordHash = await bcrypt.hash("123456", 10);

	await prisma.user.createMany({
		data: [
			{
				name: "Alice",
				email: "alice@example.com",
				password: passwordHash,
			},
			{
				name: "Bob",
				email: "bob@example.com",
				password: passwordHash,
			},
			{
				name: "Charlie",
				email: "charlie@example.com",
				password: passwordHash,
			},
		],
		skipDuplicates: true,
	});

	console.log("Seed completed.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => {
		prisma.$disconnect();
	});
