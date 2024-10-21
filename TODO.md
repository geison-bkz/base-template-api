# Estrutura do Projeto

## src/
- [ ] application/
  - [ ] services/
    - [ ] UserService.ts
  - [ ] use-cases/
    - [ ] CreateUser.ts
    - [ ] LoginUser.ts

- [ ] domain/
  - [ ] entities/
    - [ ] User.ts
    - [ ] Role.ts
  - [ ] repositories/
    - [ ] UserRepository.ts
    - [ ] RoleRepository.ts

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
