import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
    id: text("id").primaryKey().notNull(),
    username: text("username").notNull(),
    name: text("name"),
    summary: text("summary"),
    password: text("password").notNull(),
    token: text("token"),
    email: text("email"),
    icon_url: text("icon_url"),
    image_url: text("image_url"),
    created_at: integer("created_at").notNull(),
    updated_at: integer("updated_at").notNull(),
    publickey: text("publickey").notNull(),
    privatekey: text("privatekey").notNull(),
})

export const remote_users = sqliteTable("remote_users", {
    id: text("id").primaryKey().notNull(),
    username: text("username").notNull(),
    name: text("name"),
    summary: text("summary"),
    icon_url: text("icon_url"),
    image_url: text("image_url"),
    created_at: integer("created_at").notNull(),
    updated_at: integer("updated_at").notNull(),
})

export const posts = sqliteTable("posts", {
    id: text("id").primaryKey().notNull(),
    user_id: text("user_id").notNull(),
    content: text("content").notNull(),
    quote_id: text("quote_id"),
    reply_id: text("reply_id"),
    url: text("url").notNull(),
    files: text("files").notNull(),
    created_at: integer("created_at").notNull(),
})

export const emojis = sqliteTable("emojis", {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    url: text("url").notNull(),
})

export const follows = sqliteTable("follows", {
    id: text("id").primaryKey().notNull(),
    follower_id: text("follower_id").notNull(),
    followed_id: text("followed_id").notNull(),
    url: text("url").notNull(),
    created_at: integer("created_at").notNull(),
})

export const followers = sqliteTable("followers", {
    id: text("id").primaryKey().notNull(),
    user_id: text("user_id").notNull(),
    follower_id: text("follower_id").notNull(),
    url: text("url").notNull(),
    created_at: integer("created_at").notNull(),
})

export const likes = sqliteTable("likes", {
    id: text("id").primaryKey().notNull(),
    emoji_id: text("emoji_id").notNull(),
    user_id: text("user_id").notNull(),
    post_id: text("post_id").notNull(),
    url: text("url").notNull(),
    created_at: integer("created_at").notNull(),
})

export const files = sqliteTable("files", {
    id: text("id").primaryKey().notNull(),
    name: text("name").notNull(),
    user_id: text("user_id").notNull(),
    url: text("url").notNull(),
    created_at: integer("created_at").notNull(),
})

export const servers = sqliteTable("servers", {
    id: text("id").primaryKey().notNull(),
    name: text("name"),
    summary: text("summary"),
    icon_url: text("icon_url"),
    url: text("url").notNull(),
    created_at: integer("created_at").notNull(),
    updated_at: integer("updated_at").notNull(),
})
