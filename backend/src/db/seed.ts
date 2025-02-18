import { drizzleSuperPool } from "./conn";
import { users, posts, comments, likes, followers } from "./schema";
import bcrypt from "bcryptjs";

async function seed() {
  try {
    // Clear existing data
    await drizzleSuperPool.delete(likes);
    await drizzleSuperPool.delete(comments);
    await drizzleSuperPool.delete(followers);
    await drizzleSuperPool.delete(posts);
    await drizzleSuperPool.delete(users);

    // Create users
    const hashedPassword = await bcrypt.hash("password123", 10);
    const createdUsers = await drizzleSuperPool.insert(users).values([
      {
        name: "Alice Johnson",
        email: "alice@example.com",
        password: hashedPassword,
        bio: "Software developer and coffee enthusiast",
      },
      {
        name: "Bob Smith",
        email: "bob@example.com",
        password: hashedPassword,
        bio: "Photography lover | Travel addict",
      },
      {
        name: "Carol Williams",
        email: "carol@example.com",
        password: hashedPassword,
        bio: "Digital artist and cat person",
      },
      {
        name: "David Brown",
        email: "david@example.com",
        password: hashedPassword,
        bio: "Foodie and amateur chef",
      },
      {
        name: "Eva Martinez",
        email: "eva@example.com",
        password: hashedPassword,
        bio: "Fitness instructor and wellness coach",
      },
    ]).returning();

    // Create posts
    const createdPosts = await drizzleSuperPool.insert(posts).values([
      {
        content: "Just launched my new portfolio website! Check it out 🚀",
        userId: createdUsers[0].id,
      },
      {
        content: "Beautiful sunset at the beach 🌅 #photography #nature",
        userId: createdUsers[1].id,
      },
      {
        content: "Working on a new digital art piece. Can't wait to share it!",
        userId: createdUsers[2].id,
      },
      {
        content: "Made this amazing pasta from scratch today 🍝 #cooking",
        userId: createdUsers[3].id,
      },
      {
        content: "Morning workout complete! Starting the day right 💪",
        userId: createdUsers[4].id,
      },
      {
        content: "Learning new programming concepts today. TypeScript is amazing!",
        userId: createdUsers[0].id,
      },
    ]).returning();

    // Create comments
    await drizzleSuperPool.insert(comments).values([
      {
        content: "This looks amazing! Great work!",
        postId: createdPosts[0].id,
        userId: createdUsers[1].id,
      },
      {
        content: "Stunning photo! What camera did you use?",
        postId: createdPosts[1].id,
        userId: createdUsers[2].id,
      },
      {
        content: "Can't wait to see the final result!",
        postId: createdPosts[2].id,
        userId: createdUsers[3].id,
      },
      {
        content: "Recipe please! 😋",
        postId: createdPosts[3].id,
        userId: createdUsers[4].id,
      },
    ]);

    // Create likes
    await drizzleSuperPool.insert(likes).values([
      { postId: createdPosts[0].id, userId: createdUsers[1].id },
      { postId: createdPosts[0].id, userId: createdUsers[2].id },
      { postId: createdPosts[1].id, userId: createdUsers[0].id },
      { postId: createdPosts[1].id, userId: createdUsers[3].id },
      { postId: createdPosts[2].id, userId: createdUsers[4].id },
      { postId: createdPosts[3].id, userId: createdUsers[0].id },
    ]);

    // Create followers
    await drizzleSuperPool.insert(followers).values([
      { followerId: createdUsers[1].id, followingId: createdUsers[0].id },
      { followerId: createdUsers[2].id, followingId: createdUsers[0].id },
      { followerId: createdUsers[0].id, followingId: createdUsers[1].id },
      { followerId: createdUsers[3].id, followingId: createdUsers[1].id },
      { followerId: createdUsers[4].id, followingId: createdUsers[2].id },
    ]);

    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    process.exit(0);
  }
}

seed(); 