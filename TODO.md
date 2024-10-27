# TODO List for Clean Architecture Project

## Initial Setup
- [x] Initialize Node.js project (`npm init`)
- [x] Install dependencies:
  - Express
  - TypeScript
  - Prisma ORM
  - PostgreSQL Client
  - Jest (for testing)
  - Docker
- [x] Configure TypeScript (`tsconfig.json`)
- [x] Setup Prettier

## Database
- [ ] Setup PostgreSQL using Docker
- [ ] Configure Prisma ORM:
  - Initialize Prisma (`npx prisma init`)
  - Create initial `schema.prisma` (users, roles)
  - Generate Prisma Client

## Application Structure
- [ ] Define Domain Entities (User, Role)
- [ ] Define Repositories Interface (UserRepository, RoleRepository)
- [ ] Implement Prisma Repositories

## Use Cases
- [ ] Create Use Case for Registering User
- [ ] Create Use Case for Authentication
- [ ] Implement Roles (user, admin)

## Controllers and Routes
- [ ] Implement User Controller
- [ ] Implement Auth Controller
- [ ] Setup Routes (Express Router)

## Tests
- [ ] Write Unit Tests for Use Cases (using Jest)
- [ ] Write Integration Tests for Controllers

## Docker
- [ ] Create Dockerfile for Node.js Application
- [ ] Setup `docker-compose.yaml` to include PostgreSQL
- [ ] Ensure environment variables are properly configured

## Extra
- [ ] Setup Git hooks for pre-commit linting and formatting
- [ ] Configure CI/CD Pipeline (optional)
