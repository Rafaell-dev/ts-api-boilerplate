import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	const organization = await prisma.organization.create({
		data: {
			slug: "Anjotech",
			description: "A leading tech company.",
			created_at: new Date(),
		},
	});

	const passwordHash = await bcrypt.hash("123456", 10);

	await prisma.user.create({
		data: {
			name: "seraphim",
			email: "seraphim@anjotech.net",
			password: passwordHash,
			organization_id: organization.id,
		},
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
