# 📘 **CONTROLADOR SAJ – Sistema de Agendamento Jurídico**

Sistema desenvolvido para auxiliar o escritório **Somenzari Advocacia** no controle de agendamentos, cadastro de clientes e processos jurídicos.
O objetivo é centralizar a agenda dos **dois advogados** do escritório e evitar conflitos de horário entre atendimentos.

---

## 🚀 **Tecnologias Utilizadas**

* **Java 17**
* **Spring Boot 3**
* **Spring Data JPA (Hibernate)**
* **Spring Security + JWT**
* **PostgreSQL**
* **Maven**
* **Swagger/OpenAPI**
* **Git/GitHub**

---

## 📌 **Funcionalidades Principais**

### 👤 Usuários (Advogados)

* Login via JWT
* Somente dois advogados podem acessar o sistema
* CRUD básico para gerenciamento interno

### 🧑‍💼 Clientes

* Cadastro de clientes (nome, CPF/CNPJ, e-mail, telefone)
* Edição, listagem e remoção

### 📂 Processos Jurídicos

* Cadastro de processos vinculados a clientes
* Número do processo, descrição e status
* Cada processo pertence a um cliente

### 📅 Agendamentos

* Criação, edição, visualização e cancelamento
* Cada agendamento contém:

  * Data e hora
  * Duração
  * Advogado responsável
  * Cliente
  * Processo vinculado
* **Regra principal:** impedir conflitos de horário entre os agendamentos dos advogados

### 📆 Agenda dos Advogados

* Visualização da agenda por advogado
* Listagem dos compromissos em ordem cronológica

---

## 🧱 **Arquitetura do Projeto**

```
com.saj.controlador
 ├─ config
 ├─ security
 ├─ controllers
 ├─ services
 ├─ repositories
 ├─ entities
 ├─ dto
 ├─ exceptions
 └─ util
```

### Camadas:

* **Controllers:** endpoints REST
* **Services:** regras de negócio e validação
* **Repositories:** comunicação com o banco via Spring Data JPA
* **Entities:** mapeamento das tabelas
* **Security:** geração e validação de JWT
* **Exceptions:** tratamento de erros padronizado

---

## 🛢️ **Modelagem das Entidades**

### **User (Advogado)**

* `id`
* `username`
* `password`
* `fullName`

### **Client**

* `id`
* `name`
* `cpfCnpj`
* `email`
* `phone`

### **Process**

* `id`
* `number`
* `client` (FK)
* `description`
* `status`

### **Appointment**

* `id`
* `dateTime`
* `durationMinutes`
* `lawyer` (User FK)
* `client` (Client FK)
* `process` (Process FK)
* `description`

---

## 🔐 **Autenticação (JWT)**

O sistema utiliza autenticação stateless baseada em JSON Web Token.

Fluxo:

1. O advogado faz login em `/auth/login`
2. Recebe um token JWT válido
3. Todas as requisições autenticadas usam `Authorization: Bearer <token>`
4. Sem token → resposta **401 Unauthorized**

Não há papéis diferentes. Os dois advogados possuem o mesmo nível de acesso.

---

## 📚 **Swagger**

Após rodar o sistema, a documentação estará disponível em:

```
http://localhost:8081/swagger-ui.html
```

---

## 🛠️ **Como Executar o Projeto**

### **Opção 1: Com Docker (Recomendado)**

A forma mais simples de executar o projeto é utilizando Docker, que já configura automaticamente o banco de dados PostgreSQL.

#### **1. Clonar o repositório**

```bash
git clone https://github.com/SEU-USUARIO/controlador-saj.git
cd controlador-saj
```

#### **2. Subir os containers**

```bash
docker compose up -d --build
```

Isso irá:
- Criar e iniciar o banco PostgreSQL na porta 5432
- Compilar e iniciar a aplicação Spring Boot na porta 8081
- Criar automaticamente os usuários padrão para teste

#### **Usuários criados automaticamente**

| Usuário | Senha | Nome Completo |
|---------|-------|---------------|
| `admin` | `admin123` | Administrador |
| `advogado` | `advogado123` | Advogado Somenzari |

Para fazer login, use o endpoint `POST /api/auth/login`:

```bash
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

#### **3. Verificar os logs**

```bash
docker compose logs -f
```

#### **4. Parar os containers**

```bash
docker compose down
```

Para remover também os dados do banco:

```bash
docker compose down -v
```

---

### **Opção 2: Execução Local (Sem Docker)**

### **1. Clonar o repositório**

```bash
git clone https://github.com/SEU-USUARIO/controlador-saj.git
```

### **2. Configurar o PostgreSQL**

Crie o banco:

```sql
CREATE DATABASE saj_db;
```

### **3. Ajustar o arquivo `application.properties`**

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/saj_db
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### **4. Rodar o projeto**

```bash
mvn spring-boot:run
```

---

## ▶️ **Rotas Principais**

### **Autenticação**

```
POST /auth/login
```

### **Usuários**

```
GET    /users
POST   /users
PUT    /users/{id}
DELETE /users/{id}
```

### **Clientes**

```
GET    /clients
POST   /clients
PUT    /clients/{id}
DELETE /clients/{id}
```

### **Processos**

```
GET    /processes
POST   /processes
PUT    /processes/{id}
DELETE /processes/{id}
```

### **Agendamentos**

```
GET    /appointments
POST   /appointments
PUT    /appointments/{id}
DELETE /appointments/{id}
```

---

## 👨‍💻 **Autores**

Projeto desenvolvido pelos alunos de **ADS – Unimetrocamp**:

* Rafael Meira de Oliveira
* Matheus Correia de Oliveira
* Vinicius Pereira da Silva
* Matheus Vinicius Lacerda da Silva
* Arthur Somenzari Forte Leone
