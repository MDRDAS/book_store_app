CREATE TABLE `Bookji_addresses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`line1` varchar(191),
	`line2` varchar(191),
	`city` varchar(191),
	`state` varchar(191),
	`postalCode` varchar(191),
	`country` varchar(191),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `Bookji_addresses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Bookji_books` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`storeId` int NOT NULL,
	`title` varchar(191) NOT NULL,
	`author` varchar(191) NOT NULL,
	`description` text,
	`cover` varchar(200),
	`price` decimal(10,2) NOT NULL DEFAULT '0',
	`inventory` int NOT NULL DEFAULT 0,
	`slug` text NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `Bookji_books_id` PRIMARY KEY(`id`),
	CONSTRAINT `Bookji_books_title_unique` UNIQUE(`title`)
);
--> statement-breakpoint
CREATE TABLE `Bookji_booksToCategories` (
	`bookId` int NOT NULL,
	`categoryId` int NOT NULL,
	CONSTRAINT `Bookji_booksToCategories_bookId_categoryId_pk` PRIMARY KEY(`bookId`,`categoryId`)
);
--> statement-breakpoint
CREATE TABLE `Bookji_cartItems` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`cart_id` int NOT NULL,
	`book_id` int NOT NULL,
	`store_id` int NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `Bookji_cartItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Bookji_carts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191),
	`paymentIntentId` varchar(191),
	`clientSecret` varchar(191),
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `Bookji_carts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Bookji_categories` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(191) NOT NULL,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `Bookji_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Bookji_email_preferences` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191),
	`email` varchar(191) NOT NULL,
	`token` varchar(191) NOT NULL,
	`newsletter` boolean NOT NULL DEFAULT false,
	`marketing` boolean NOT NULL DEFAULT false,
	`transactional` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `Bookji_email_preferences_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Bookji_orderItems` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`bookId` int NOT NULL,
	`quantity` int NOT NULL DEFAULT 1,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `Bookji_orderItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Bookji_orders` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`storeId` int NOT NULL,
	`userId` varchar(191) NOT NULL,
	`total` decimal(10,2) NOT NULL DEFAULT '0',
	`stripePaymentIntentId` varchar(191) NOT NULL,
	`${APP_NAME}_stripePaymentIntentStatus` varchar(191) NOT NULL,
	`name` varchar(191),
	`email` varchar(191),
	`addressId` int,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `Bookji_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Bookji_payments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`storeId` int NOT NULL,
	`stripe_account_id` varchar(191) NOT NULL,
	`stripe_account_created_at` int,
	`stripe_account_expires_at` int,
	`details_submitted` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `Bookji_payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Bookji_ratings` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`bookId` int NOT NULL,
	`rating` int NOT NULL,
	`comment` text,
	`createdAt` timestamp DEFAULT (now()),
	CONSTRAINT `Bookji_ratings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Bookji_stores` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`description` text,
	`logo` varchar(200),
	`thumbnail` varchar(200),
	`slug` text,
	`stripeAccountId` varchar(191),
	`active` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `Bookji_stores_id` PRIMARY KEY(`id`)
);
