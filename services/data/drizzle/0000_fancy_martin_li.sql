CREATE TABLE `papers` (
	`id` text PRIMARY KEY NOT NULL,
	`doi` text,
	`title` text NOT NULL,
	`authors_json` text,
	`year` integer,
	`publication_venue` text,
	`raw_bibtex` text,
	`csl_json` text,
	`created_at` integer DEFAULT 1750688855206 NOT NULL,
	`updated_at` integer DEFAULT 1750688855206 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `papers_doi_unique` ON `papers` (`doi`);--> statement-breakpoint
CREATE TABLE `semantics` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`domain_tags_json` text,
	`aliases_json` text,
	`created_at` integer DEFAULT 1750688855206 NOT NULL,
	`updated_at` integer DEFAULT 1750688855206 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `semantics_name_unique` ON `semantics` (`name`);--> statement-breakpoint
CREATE TABLE `syntaxes` (
	`id` text PRIMARY KEY NOT NULL,
	`typst_string` text NOT NULL,
	`latex_string` text,
	`typst_canonical` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT 1750688855207 NOT NULL,
	`updated_at` integer DEFAULT 1750688855207 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `syntaxes_typst_string_unique` ON `syntaxes` (`typst_string`);--> statement-breakpoint
CREATE TABLE `usages` (
	`id` text PRIMARY KEY NOT NULL,
	`paper_id` text NOT NULL,
	`semantic_id` text NOT NULL,
	`syntax_id` text NOT NULL,
	`context_notes` text,
	`page_number` text,
	`is_primary_definition` integer DEFAULT false,
	`created_at` integer DEFAULT 1750688855207 NOT NULL,
	`updated_at` integer DEFAULT 1750688855207 NOT NULL,
	FOREIGN KEY (`paper_id`) REFERENCES `papers`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`semantic_id`) REFERENCES `semantics`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`syntax_id`) REFERENCES `syntaxes`(`id`) ON UPDATE no action ON DELETE cascade
);
