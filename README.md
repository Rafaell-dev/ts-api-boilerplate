# TypeScript API Boilerplate

A robust boilerplate for RESTful APIs built with TypeScript, Express and Prisma ORM.

*Um boilerplate robusto para APIs RESTful construído com TypeScript, Express e Prisma ORM.*

## 🚀 Technologies / Tecnologias

This project uses the following technologies:

*Este projeto utiliza as seguintes tecnologias:*

- **[TypeScript](https://www.typescriptlang.org/)** - Main language / Linguagem principal
- **[Express](https://expressjs.com/)** - Minimalist web framework / Framework web minimalista
- **[Prisma](https://www.prisma.io/)** - Modern ORM for Node.js / ORM moderno para Node.js
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation / Validação de schema TypeScript-first
- **[JWT](https://jwt.io/)** - JSON Web Token authentication / Autenticação via JSON Web Tokens
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - Linting and formatting / Linting e formatação

## 📦 Installation / Instalação

1. Clone the repository / Clone o repositório:
```bash
git clone <repository-url>
cd ts-api-boilerplate
```

2. Install dependencies / Instale as dependências:
```bash
npm install
```

3. Set up environment variables / Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Set up the database / Configure o banco de dados:
```bash
npx prisma migrate dev
```

5. Run seed (optional) / Execute o seed (opcional):
```bash
npm run seed
```

## 🛠️ Available Scripts / Scripts Disponíveis

- **`npm run dev`** - Start development server with hot reload / Inicia o servidor em modo de desenvolvimento com hot reload
- **`npm run debug`** - Start server in debug mode with inspector / Inicia o servidor em modo debug com inspector
- **`npm run build`** - Compile TypeScript to JavaScript / Compila o TypeScript para JavaScript
- **`npm start`** - Start production server / Inicia o servidor de produção
- **`npm run seed`** - Run database seed / Executa o seed do banco de dados

## 🏗️ Project Structure / Estrutura do Projeto

```
src/
├── controllers/     # API controllers / Controladores da API
├── entities/        # Project entities / Entidades do projeto
├── routes/          # Route definitions / Definição das rotas
├── services/        # Business logic / Lógica de negócio
├── utils/           # Utility functions / Funções utilitárias
├── repositories/    # Data access layer / Acesso aos dados
└── server.ts        # Main server file / Arquivo principal do servidor

prisma/
├── schema.prisma    # Database schema / Schema do banco de dados
└── seed.ts          # Seed file / Arquivo de seed
```

## 🔧 Configuration / Configuração

### Environment Variables / Variáveis de Ambiente

Create a `.env` file in the root directory with the following variables:

*Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:*

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="development"
```

### Database / Banco de Dados

This boilerplate is configured to use PostgreSQL with Prisma ORM. To use a different database, adjust the `DATABASE_URL` and provider in the `prisma/schema.prisma` file.

*Este boilerplate está configurado para usar PostgreSQL com Prisma ORM. Para usar um banco diferente, ajuste a `DATABASE_URL` e o provider no arquivo `prisma/schema.prisma`.*

## 🔒 Authentication / Autenticação

The project includes pre-configured JWT authentication. Protected routes should include the authentication middleware.

*O projeto inclui autenticação JWT pré-configurada. As rotas protegidas devem incluir o middleware de autenticação.*

## 📝 Validation / Validação

- **Zod** - For modern validation with type inference / Para validação moderna com inferência de tipos

## 🧪 Development / Desenvolvimento

For development with hot reload / Para desenvolvimento com hot reload:

```bash
npm run dev
```

For debugging with Node.js inspector / Para debug com inspector do Node.js:

```bash
npm run debug
```

## 🚀 Production / Produção

1. Build the project / Compile o projeto:
```bash
npm run build
```

2. Start the server / Inicie o servidor:
```bash
npm start
```

## 📋 Features / Funcionalidades

- ✅ TypeScript configured / TypeScript configurado
- ✅ Express server
- ✅ Prisma ORM
- ✅ JWT Authentication / Autenticação JWT
- ✅ Data validation (Zod) / Validação de dados (Zod)
- ✅ ESLint + Prettier
- ✅ Hot reload for development / Hot reload para desenvolvimento
- ✅ Build and production scripts / Scripts de build e produção
- ✅ Database seed system / Sistema de seed para banco de dados

## 🤝 Contributing / Contribuindo

1. Fork the project / Faça um fork do projeto
2. Create a feature branch / Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes / Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch / Push para a branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request / Abra um Pull Request

## 👨‍💻 Author / Autor

**Rafael Araujo** - [araujor.contato@gmail.com](mailto:araujor.contato@gmail.com)

## 📄 License / Licença

This project is under the ISC license. See the [LICENSE](LICENSE) file for more details.

*Este projeto está sob a licença ISC. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.*
