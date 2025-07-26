

# API Documentation 

> ✅ All protected routes require the following HTTP header:

```http
Authorization: Bearer <your_token_here>
```

---

## 👥 **User Authentication**

| Method | Endpoint             | Auth Required | Description           | Required Fields             |
| ------ | -------------------- | ------------- | --------------------- | --------------------------- |
| POST   | `/api/user/register` | ❌             | Register new user     | `name`, `email`, `password` |
| POST   | `/api/user/login`    | ❌             | Log in existing user  | `email`, `password`         |
| GET    | `/api/user/profile`  | ✅             | Get logged-in profile | —                           |

---

## 👤 **Client APIs**

| Method | Endpoint                | Auth Required | Description      | Required Fields                                                                                                  |
| ------ | ----------------------- | ------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/client`           | ✅             | Add new client   | `name`, `companyName`, `phone`, `email`, `address`, `serviceRequired`, `notes`, `leadstatus`, `updateOnWhatsApp` |
| GET    | `/api/client`           | ✅             | Get all clients  | —                                                                                                                |
| GET    | `/api/client/:clientId` | ✅             | Get client by ID | —                                                                                                                |
| PUT    | `/api/client/:clientId` | ✅             | Update client    | Any valid field from above                                                                                       |
| DELETE | `/api/client/:clientId` | ✅             | Delete client    | —                                                                                                                |

#### 🔠 Field Types for `POST /api/client`

| Field              | Type    | Required | Notes                    |
| ------------------ | ------- | -------- | ------------------------ |
| `name`             | string  | ✅        | Client person name       |
| `companyName`      | string  | ✅        | Company name             |
| `phone`            | string  | ✅        | Must be numeric string   |
| `email`            | string  | ✅        | Valid email format       |
| `address`          | string  | ✅        | —                        |
| `serviceRequired`  | string  | ✅        | e.g., "Web Development"  |
| `notes`            | string  | ✅        | Any remarks              |
| `leadstatus`       | string  | ✅        | e.g., "New", "Follow-Up" |
| `updateOnWhatsApp` | boolean | ✅        | true/false               |

### `POST /api/client` Example Payload

```json
{
  "name": "Jane Smith",
  "companyName": "Acme Corp",
  "phone": "9876543210",
  "email": "jane@acme.com",
  "address": "123 Main Street",
  "serviceRequired": "Web Development",
  "notes": "Interested in e-commerce",
  "leadstatus": "New",
  "updateOnWhatsApp": true
}
```

---

## 📁 **Project APIs**

| Method | Endpoint                  | Auth Required | Description       | Required Fields                                                 |
| ------ | ------------------------- | ------------- | ----------------- | --------------------------------------------------------------- |
| POST   | `/api/project`            | ✅             | Add new project   | `title`, `client`, `startDate`, `endDate`, `progress`, `status` |
| GET    | `/api/project`            | ✅             | Get all projects  | —                                                               |
| GET    | `/api/project/:projectId` | ✅             | Get project by ID | —                                                               |
| PUT    | `/api/project/:projectId` | ✅             | Update project    | Any valid field from above                                      |
| DELETE | `/api/project/:projectId` | ✅             | Delete project    | —                                                               |

#### 🔠 Field Types for `POST /api/project`

| Field       | Type            | Required | Notes                                        |
| ----------- | --------------- | -------- | -------------------------------------------- |
| `title`     | string          | ✅        | Project title                                |
| `client`    | string / object | ✅        | Can be client ID or object with `id`, `name` |
| `startDate` | date (ISO)      | ✅        | Format: `YYYY-MM-DD`                         |
| `endDate`   | date (ISO)      | ✅        | Format: `YYYY-MM-DD`                         |
| `progress`  | string          | ✅        | e.g., `"0%"`, `"50%"`, `"100%"`              |
| `status`    | string          | ✅        | e.g., `"Ongoing"`, `"Completed"`             |

### `POST /api/project` Example Payload

```json
{
  "title": "Website Revamp",
  "client": "clientId123",
  "startDate": "2025-07-25",
  "endDate": "2025-08-10",
  "progress": "0%",
  "status": "Ongoing"
}
```

---

## ✅ **Task APIs**

| Method | Endpoint            | Auth Required | Description    | Required Fields                                          |
| ------ | ------------------- | ------------- | -------------- | -------------------------------------------------------- |
| POST   | `/api/task`         | ✅             | Add new task   | `title`, `description`, `deadline`, `priority`, `status` |
| GET    | `/api/task`         | ✅             | Get all tasks  | —                                                        |
| GET    | `/api/task/:taskId` | ✅             | Get task by ID | —                                                        |
| PUT    | `/api/task/:taskId` | ✅             | Update task    | Any valid field from above                               |
| DELETE | `/api/task/:taskId` | ✅             | Delete task    | —                                                        |

#### 🔠 Field Types for `POST /api/task`

| Field         | Type       | Required | Notes                               |
| ------------- | ---------- | -------- | ----------------------------------- |
| `title`       | string     | ✅        | Task name/title                     |
| `description` | string     | ✅        | Detailed task content               |
| `deadline`    | date (ISO) | ✅        | Format: `YYYY-MM-DD`                |
| `priority`    | string     | ✅        | e.g., `"High"`, `"Medium"`, `"Low"` |
| `status`      | string     | ✅        | e.g., `"Pending"`, `"In Progress"`  |

### `POST /api/task` Example Payload

```json
{
  "title": "Fix UI Bug",
  "description": "Resolve the overflow issue",
  "deadline": "2025-08-01",
  "priority": "High",
  "status": "Pending"
}
```

--

## ✅ **RouterLinks APIs**

| Method | Endpoint              | Auth Required | Description          | Required Fields                                                                      |
| ------ | --------------------- | ------------- | -------------------- | ------------------------------------------------------------------------------------ |
| POST   | `/api/navigation/links`     | ✅             | Add a new RouterLink | `title`, `path`, `basePath`, `isActive`, `isProtected`, `iconKey`, `pageKey`, `show` |
| GET    | `/api/navigation/links`     | ✅             | Get all RouterLinks  | —                                                                                    |
| GET    | `/api/navigation/links/:id` | ✅             | Get RouterLink by ID | —                                                                                    |
| PUT    | `/api/navigation/links/:id` | ✅             | Update RouterLink    | Any valid field from above                                                           |
| DELETE | `/api/navigation/links/:id` | ✅             | Delete RouterLink    | —                                                                                    |

---

#### 🔠 Field Types for `POST /api/navigation/links`

| Field         | Type    | Required | Notes                                           |
| ------------- | ------- | -------- | ----------------------------------------------- |
| `title`       | string  | ✅        | Display title for the route                     |
| `path`        | string  | ✅        | Route path (e.g., `/dashboard`)                 |
| `basePath`    | string  | ✅        | Base path (e.g., `/admin`)                      |
| `isActive`    | boolean | ✅        | Whether the route is currently active           |
| `isProtected` | boolean | ✅        | Whether route requires authentication           |
| `iconKey`     | string  | ✅        | Key representing the icon (e.g., `"dashboard"`) |
| `pageKey`     | string  | ✅        | Unique page identifier                          |
| `show`        | boolean | ✅        | Whether to show in navigation                   |

---

### `POST /api/navigation/links` Example Payload

```json
{
  "title": "Dashboard",
  "path": "/dashboard",
  "basePath": "/admin",
  "isActive": true,
  "isProtected": true,
  "iconKey": "dashboard",
  "pageKey": "DASHBOARD_PAGE",
  "show": true
}
```
