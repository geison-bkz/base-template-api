base-template-api/
├── src/
│   ├── application/
│   │   ├── services/
│   │   │   ├── AuthService.ts
│   │   │   ├── UserService.ts
│   │   ├── use-cases/
│   │       ├── CreateUser.ts
│   │       ├── LoginUser.ts
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── User.ts
│   │   │   ├── Role.ts
│   │   ├── repositories/
│   │       ├── UserRepository.ts
│   │       ├── RoleRepository.ts
│   ├── infrastructure/
│   │   ├── prisma/
│   │       ├── PrismaUserRepository.ts
│   │       ├── PrismaRoleRepository.ts
│   │       ├── PrismaClient.ts
│   ├── presentation/
│   │   ├── controllers/
│   │   │   ├── UserController.ts
│   │   │   ├── AuthController.ts
│   │   ├── middleware/
│   │   │   ├── AuthMiddleware.ts
│   │   ├── routes/
│   │       ├── userRoutes.ts
│   │       ├── authRoutes.ts
│   │       ├── protectedRoutes.ts
│   ├── server.ts
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   ├── seed.ts
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── TODO.md
└── .env
