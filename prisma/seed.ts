import { hashPassword } from "@/lib/auth";
import { db } from "@lib/db";

async function main() {
  const user = await db.user.upsert({
    where: { username: "thenameiswiiwin" },
    update: {},
    create: {
      username: "thenameiswiiwin",
      firstName: "Huy",
      lastName: "Nguyen",
      // password: await hashPassword("password"),
      password: "password",
      posts: {
        create: new Array(5).fill(1).map((_, i) => ({
          name: `Project ${i}`,
          description: `Everything that describes Posts ${i}`,
          created: new Date(2023, 6, 5),
        })),
      },
    },
    include: {
      posts: true,
    },
  });

  console.log({ user });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
