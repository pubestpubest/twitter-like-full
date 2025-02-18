import { pgTable, serial, text, varchar, timestamp, integer,} from "drizzle-orm/pg-core";
import { relations as drizzleRelations } from "drizzle-orm";
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  bio: text("bio"),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userRelations = drizzleRelations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  likes: many(likes),
  followedBy: many(followers, { relationName: "following" }),
  following: many(followers, { relationName: "follower" }),
}));

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  content: text("content"),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postRelations = drizzleRelations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
  comments: many(comments),
  likes: many(likes),
  medias: many(medias),
}));

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content"),
  postId: integer("post_id").references(() => posts.id),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const commentRelations = drizzleRelations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));

export const likes = pgTable("likes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const likeRelations = drizzleRelations(likes, ({ one }) => ({
  post: one(posts, {
    fields: [likes.postId],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
}));

export const followers = pgTable("followers", {
  id: serial("id").primaryKey(),
  followerId: integer("follower_id").references(() => users.id),
  followingId: integer("following_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const followerRelations = drizzleRelations(followers, ({ one }) => ({
  follower: one(users, {
    fields: [followers.followerId],
    references: [users.id],
    relationName: "follower",
  }),
  following: one(users, {
    fields: [followers.followingId],
    references: [users.id],
    relationName: "following",
  }),
}));

export const medias = pgTable("medias", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id),
  url: text("url").notNull(),
  mime: text("mime", { enum: ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/quicktime'] }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const mediaRelations = drizzleRelations(medias, ({ one }) => ({
  post: one(posts, {
    fields: [medias.postId],
    references: [posts.id],
  }),
}));

