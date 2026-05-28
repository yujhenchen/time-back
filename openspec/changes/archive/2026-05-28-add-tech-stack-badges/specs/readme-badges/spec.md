## ADDED Requirements

### Requirement: Tech stack badges in README header

The README SHALL display shields.io badges for each core technology in the project's tech stack, positioned in the header area below the existing project badges.

#### Scenario: Badge row exists

- **WHEN** the README is viewed on GitHub
- **THEN** a row of tech stack badges SHALL be visible in the header section

#### Scenario: Badges are shields.io flat-square

- **WHEN** each tech stack badge is inspected
- **THEN** it SHALL use the `flat-square` style from shields.io

### Requirement: Badge for each core technology

Each core technology SHALL have a corresponding badge. Core technologies include: Plasmo, React, TypeScript, Tailwind CSS, shadcn/ui, and Zod.

#### Scenario: Plasmo badge

- **WHEN** the badge row is inspected
- **THEN** a badge for "Plasmo" SHALL be present, linking to https://docs.plasmo.com

#### Scenario: React badge

- **WHEN** the badge row is inspected
- **THEN** a badge for "React" SHALL be present, linking to https://react.dev

#### Scenario: TypeScript badge

- **WHEN** the badge row is inspected
- **THEN** a badge for "TypeScript" SHALL be present, linking to https://www.typescriptlang.org

#### Scenario: Tailwind CSS badge

- **WHEN** the badge row is inspected
- **THEN** a badge for "Tailwind CSS" SHALL be present, linking to https://tailwindcss.com

#### Scenario: shadcn/ui badge

- **WHEN** the badge row is inspected
- **THEN** a badge for "shadcn/ui" SHALL be present, linking to https://ui.shadcn.com

#### Scenario: Zod badge

- **WHEN** the badge row is inspected
- **THEN** a badge for "Zod" SHALL be present, linking to https://zod.dev

### Requirement: Badges use branded colors

Each badge SHALL use the technology's official brand color for the background.

#### Scenario: React badge color

- **WHEN** the React badge is inspected
- **THEN** its background color SHALL be React's brand blue (#61DAFB text on dark bg or equivalent)

#### Scenario: Tailwind badge color

- **WHEN** the Tailwind CSS badge is inspected
- **THEN** its background color SHALL be Tailwind's brand cyan (#06B6D4)

### Requirement: Badges link to technology websites

Each badge SHALL be a clickable link pointing to the technology's official website or documentation.

#### Scenario: Badges are clickable

- **WHEN** a tech stack badge is clicked
- **THEN** it SHALL navigate to the corresponding technology's website
