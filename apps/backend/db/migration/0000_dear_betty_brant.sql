CREATE TABLE `Accounts` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` timestamp(3),
	`refresh_token_expires_at` timestamp(3),
	`scope` text,
	`password` text,
	`created_at` timestamp(3) NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	CONSTRAINT `Accounts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `JWKS` (
	`id` varchar(36) NOT NULL,
	`public_key` text NOT NULL,
	`private_key` text NOT NULL,
	`created_at` timestamp(3) NOT NULL,
	`expires_at` timestamp(3),
	CONSTRAINT `JWKS_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Sessions` (
	`id` varchar(36) NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`token` varchar(255) NOT NULL,
	`created_at` timestamp(3) NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(36) NOT NULL,
	`impersonated_by` text,
	CONSTRAINT `Sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `Sessions_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` boolean NOT NULL DEFAULT false,
	`image` text,
	`created_at` timestamp(3) NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	`role` text,
	`banned` boolean DEFAULT false,
	`ban_reason` text,
	`ban_expires` timestamp(3),
	CONSTRAINT `Users_id` PRIMARY KEY(`id`),
	CONSTRAINT `Users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `Verifications` (
	`id` varchar(36) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`expires_at` timestamp(3) NOT NULL,
	`created_at` timestamp(3) NOT NULL,
	`updated_at` timestamp(3) NOT NULL,
	CONSTRAINT `Verifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `MicroserviceKeys` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(16) NOT NULL,
	`hash` char(64) NOT NULL,
	`created_at` timestamp(3) NOT NULL DEFAULT (now()),
	CONSTRAINT `MicroserviceKeys_id` PRIMARY KEY(`id`),
	CONSTRAINT `MicroserviceKeys_name_unique` UNIQUE(`name`),
	CONSTRAINT `MicroserviceKeys_hash_unique` UNIQUE(`hash`)
);
--> statement-breakpoint
ALTER TABLE `Accounts` ADD CONSTRAINT `Accounts_user_id_Users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `Sessions` ADD CONSTRAINT `Sessions_user_id_Users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `Accounts_userId_idx` ON `Accounts` (`user_id`);--> statement-breakpoint
CREATE INDEX `Sessions_userId_idx` ON `Sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `Verifications_identifier_idx` ON `Verifications` (`identifier`);--> statement-breakpoint
CREATE INDEX `MicroserviceKeys_name_idx` ON `MicroserviceKeys` (`name`);