base-template-api/
├── prisma/                              
│   ├── migrations/
│   ├── schema.prisma                     
│   └── seed.ts                   
├── src/
│   ├── application/                    
│   │   ├── use-cases/
│   │   │   ├── user/
│   │   │   │   ├── AuthenticateUserUsecase.ts
│   │   │   │   └── CreateUserUsecase.ts
│   │   └── Usecase.ts                  
│   ├── config/                         
│   │   ├── database.ts                 
│   │   └── env.ts                      
│   │   └── server.ts                   
│   ├── domain/                          
│   │   ├── entities/
│   │   │   ├── Role.ts
│   │   │   └── User.ts
│   │   └── repositories/
│   │       ├── RoleRepository.ts
│   │       └── UserRepository.ts
│   ├── infrastructure/                 
│   │   ├── database/
│   │   │   ├── PrismaRoleRepository.ts
│   │   │   └── PrismaUserRepository.ts
│   │   ├── third-party/                 
│   │   │   ├── AuthService.ts         
│   │   │   └── HashService.ts          
│   ├── presentation/                   
│   │   ├── controllers/
│   │   │   ├── AuthController.ts       
│   │   │   └── UserController.ts      
│   │   ├── middleware/
│   │   │   ├── AuthMiddleware.ts        
│   │   │   └── RoleMiddleware.ts       
│   │   └── routes/
│   │       ├── AuthRoutes.ts            
│   │       └── UserRoutes.ts           
├── tests/                               
│   ├── integration/                     
│   │   ├── application/
│   │   │   ├── PrismaRoleRepository.test.ts
│   │   │   ├── PrismaUserRepository.test.ts
│   │   ├── presentation/
│   │   │   ├── AuthController.test.ts
│   │   │   └── UserController.test.ts
│   ├── unit/                            
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   │   ├── AuthenticateUserUsecase.test.ts
│   │   │   │   └── CreateUserUsecase.test.ts
│   │   ├── domain/
│   │   │   ├── Role.test.ts
│   │   │   └── User.test.ts
├── .dockerignore
├── .env                                 
├── .gitignore
├── .prettierrc                         
├── compose.yaml
├── Dockerfile
├── jest.config.js                       
├── package.json                        
├── README.md
├── TODO.md                              
└── tsconfig.json                        
