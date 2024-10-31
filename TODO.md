# base-template-api

## Tarefas

### 1. Camada de Domínio
- [x] Entidades
  - [x] `User`
  - [x] `Role`
- [x] Repositórios
  - [x] `UserRepository`
  - [x] `RoleRepository`

### 2. Camada de Aplicação
- [x] Serviços
  - [x] `UserService`
  - [x] `AuthService`
- [x] Casos de Uso
  - [x] `CreateUser`
  - [x] `LoginUser`

### 3. Camada de Infraestrutura
- [ ] Implementação dos repositórios usando Prisma
  - [ ] `PrismaUserRepository`
  - [ ] `PrismaRoleRepository`
- [ ] Configuração do Prisma para PostgreSQL

### 4. Camada de Apresentação
- [ ] Controladores
  - [ ] `UserController`
  - [ ] `AuthController`
- [ ] Rotas
  - [ ] Definir rotas de usuário
  - [ ] Definir rotas de autenticação
- [ ] Middleware
  - [ ] `AuthMiddleware`

### 5. Configuração e Docker
- [ ] Configurar Docker para desenvolvimento e produção
- [ ] Criar `Dockerfile`
- [ ] Criar `docker-compose.yml`
