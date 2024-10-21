# Estrutura do Projeto

## src/
- [ ] application/
  - [ ] services/
    - [ ] UserService.ts
  - [ ] use-cases/
    - [ ] CreateUser.ts
    - [ ] LoginUser.ts

- [x] domain/
  - [x] entities/
    - [x] User.ts
    - [x] Role.ts
  - [x] repositories/
    - [x] UserRepository.ts
    - [x] RoleRepository.ts

- [ ] infrastructure/
  - [ ] database/
    - [ ] prisma/
      - [ ] PrismaClient.ts
  - [ ] third-party/
    - [ ] AuthService.ts

- [ ] presentation/
  - [ ] controllers/
    - [ ] UserController.ts
  - [ ] middleware/
    - [ ] AuthMiddleware.ts
  - [ ] routes/
    - [ ] userRoutes.ts
