**Auth Endpoints:**

| Method | Endpoint              | Description   |
| ------ | --------------------- | ------------- |
| POST   | /api/v1/auth/register | Register User |
| POST   | /api/v1/auth/login    | Sign-in User  |
| POST   | /api/v1/auth/logout   | Sign-out User |

**Email Endpoints:**

| Method | Endpoint                          | Description               |
| ------ | --------------------------------- | ------------------------- |
| GET    | /api/v1/email/verify-email        | Verify User's Email       |
| POST   | /api/v1/email/resend-verification | Resend Verification Email |

**User Endpoints:**

| Method | Endpoint                   | Description       |
| ------ | -------------------------- | ----------------- |
| GET    | /api/v1/user/get-all-users | Get All Users     |
| GET    | /api/v1/user/get-user      | Get User by ID    |
| PATCH  | /api/v1/user/update-user   | Update User by ID |
| DELETE | /api/v1/user/remove-user   | Delete User by ID |