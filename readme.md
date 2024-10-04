    .
    ├── app
        **En esta capa se encuentran los casos de uso**
    │   ├── exceptions
    │   │   ├── AlreadyExistsException.ts
    │   │   ├── NotNullException.ts
    │   │   └── ValidationException.ts
    │   ├── interfaces
    │   │   ├── IAuthService.ts
    │   │   ├── IPassWordService.ts
    │   │   ├── ITokenService.ts
    │   │   ├── IUserService.ts
    │   │   ├── repositories
    │   │   │   └── IUserRepository.ts
    │   │   └── routes
    │   │       └── authRoutes.ts
    │   └── services
    │       ├── AuthService.ts
    │       └── UserService.ts
    ├── controllers
    │   ├── AuthController.ts
    │   ├── IAuthController.ts
    │   ├── IUserController.ts
    │   └── UserController.ts
    ├── domain
    │   ├── entities
    │   │   ├── Password.ts
    │   │   └── User.ts
    │   └── exampleLayer.css
    ├── DTOs
    │   ├── CreateUserDTO.ts
    │   ├── ITokenPayload.ts
    │   └── RegisterUserDTO.ts
    ├── estructura.md
    ├── index.ts
    ├── infrastructure
    │   ├── config
    │   │   ├── database.ts
    │   │   └── dotenv.ts
    │   ├── exceptions
    │   │   └── BaseException.ts
    │   ├── middlewares

    │   │   ├── AuthMiddleware.ts
    │   │   ├── ErrorHandlerMiddleware.ts
    │   │   ├── exceptions
    │   │   │   ├── InvalidCredentialsException.ts
    │   │   │   ├── InvalidTokenException.ts
    │   │   │   ├── UnauthorizedException.ts
    │   │   │   └── UserNotFoundException.ts
    │   │   └── TypeORMErrorHandlerMiddleware.ts
    │   ├── repositories
    │   │   └── UserRepository.ts
    │   └── services
    │       ├── BcryptPasswordService.ts
    │       └── JwtService.ts
    └── utilities

    19 directories, 37 files

**Capa application: Casos de Uso y Lógica de Negocio**
En la capa app, efectivamente, están los casos de uso y la lógica de negocio. Aquí se define qué hace la aplicación, pero sin preocuparse por los detalles técnicos (cómo se conectan a la base de datos, cómo se generan tokens, etc.). Esta capa se encarga de:

_Casos de Uso:_ Representan las operaciones principales que la aplicación puede realizar, como crear un usuario, autenticarse, etc.

    Ejemplo: AuthService maneja el flujo de autenticación, como la verificación de credenciales y la emisión de tokens, pero no sabe ni le importa qué librería genera los tokens.

_Interfaces_: Contratos que definen las acciones que los servicios deben realizar, como IUserService, IAuthService, o IUserRepository. Estas interfaces permiten que la aplicación sea flexible y fácilmente testeable, ya que no dependen de implementaciones concretas.

_Excepciones_: Excepciones que están relacionadas con los casos de uso. No son técnicas, sino más bien relacionadas con la lógica del negocio (por ejemplo, "El usuario ya existe" o "Campo requerido").

Importante: La capa de app no tiene acceso directo a la base de datos, librerías de terceros o cualquier detalle de implementación técnica. Solo interactúa con las interfaces y delega las tareas a otras capas.

**Capa infrastructure: Implementación y Entrada/Salida (I/O)**
La capa infrastructure es la encargada de manejar la implementación técnica y las interacciones con el mundo externo, es decir, el I/O. Aquí se define cómo se hace lo que la aplicación necesita hacer, incluyendo:

_I/O (Entrada/Salida)_: Esta capa gestiona las interacciones con sistemas externos como:

_Base de datos:_ Repositorios como UserRepository que se conectan a la base de datos utilizando TypeORM o cualquier otro ORM.

*Servicios Externos: *Servicios como JWT (JwtService) que generan y verifican tokens, o bcrypt para la gestión de contraseñas.
Archivos, Redes o APIs Externas: Cualquier otro tipo de interacción que la aplicación necesite con sistemas externos.

_Servicios de Infraestructura:_ Son las implementaciones concretas que realizan tareas técnicas, como:

- Cifrado: BcryptPasswordService para manejar el hash de contraseñas.
- Autenticación: JwtService que maneja la generación y validación de tokens JWT.

_Middlewares_: Los middlewares forman parte de la infraestructura porque están estrechamente relacionados con el framework (en este caso, Express). Aquí manejamos la autenticación (AuthMiddleware), el manejo de errores (ErrorHandlerMiddleware), etc.

_Excepciones_ Técnicas: Excepciones relacionadas con errores técnicos (conexiones de base de datos, tokens inválidos, etc.).

**Capa Domain**

En el Domain Layer, además de las Entities, podrías tener los siguientes elementos:

- Entities: Representan los objetos fundamentales del negocio, como User, Order, Product, etc.

- Value Objects: Objetos inmutables que representan conceptos como Email, PhoneNumber, etc., con lógica propia. A diferencia de las entidades, los Value Objects no tienen identidad y se definen por su valor.

- Domain Services: Si tienes lógica de negocio que no pertenece a ninguna entidad específica, puedes usar Domain Services. Estos encapsulan lógica compleja que afecta a múltiples entidades.

- Aggregates: Conjuntos de entidades que se agrupan bajo un objeto raíz (con un único punto de referencia). Los Aggregates permiten mantener la consistencia en transacciones que afectan a varias entidades.

- Domain Events: Eventos que ocurren dentro del dominio y que las demás partes del sistema deben conocer (por ejemplo, "UserRegistered" o "OrderPlaced").

- Repositories (interfaces): Algunas personas colocan las interfaces de los repositorios en el Domain Layer si están directamente relacionados con la lógica de negocio (aunque en tu caso ya las estamos poniendo en la capa de Application).
