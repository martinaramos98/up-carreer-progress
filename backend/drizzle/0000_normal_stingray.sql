CREATE TABLE `courses` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`period` text NOT NULL,
	FOREIGN KEY (`period`) REFERENCES `period_courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `period_courses` (
	`id` text PRIMARY KEY NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE TABLE `carreer_courses` (
	`carreer` text NOT NULL,
	`courses` text NOT NULL,
	PRIMARY KEY(`carreer`, `courses`),
	FOREIGN KEY (`carreer`) REFERENCES `carrers`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`courses`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `carrers` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text
);
