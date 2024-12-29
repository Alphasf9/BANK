## User Controller Documentation

### Overview
This document provides a detailed description of the User Controller API endpoints for a banking application. These endpoints handle user registration, authentication, profile management, and account updates.

---

### **Endpoints**

#### **1. Register User**
- **URL**: `/api/v1/register`
- **Method**: `POST`
- **Description**: Registers a new user and creates an associated bank account.
- **Request Body**: 
    ```json
    {
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phoneNo": "string",
        "dob": "string (YYYY-MM-DD)",
        "gender": "string",
        "aadhar_id": "string",
        "street": "string",
        "city": "string",
        "state": "string",
        "zip": "string",
        "country": "string",
        "maritalStatus": "string",
        "occupation": "string",
        "nationality": "string",
        "userPassword": "string",
        "accountType": "string",
        "accountPassword": "string",
        "branchName": "string",
        "branchCode": "string",
        "ifscCode": "string",
        "nomineeName": "string",
        "nomineeRelation": "string",
        "nomineeContact": "string"
    }
    ```
- **Responses**:
    - **201**: User and account created successfully.
    - **400**: Missing or invalid fields.
    - **500**: Internal server error.

**Example**:
```bash
curl -X POST http://localhost:3000/api/v1/register \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNo": "9876543210",
  "dob": "1990-01-01",
  "gender": "Male",
  "aadhar_id": "123456789012",
  "street": "123 Elm Street",
  "city": "Metropolis",
  "state": "NY",
  "zip": "54321",
  "country": "USA",
  "maritalStatus": "Single",
  "occupation": "Software Engineer",
  "nationality": "American",
  "userPassword": "securepassword",
  "accountType": "Savings",
  "accountPassword": "accountpassword",
  "branchName": "Main Branch",
  "branchCode": "001",
  "ifscCode": "IFSC001",
  "nomineeName": "Jane Doe",
  "nomineeRelation": "Spouse",
  "nomineeContact": "9876543211"
}'
```

---

#### **2. Login User**
- **URL**: `/api/v1/login`
- **Method**: `POST`
- **Description**: Logs in a user and generates access and refresh tokens.
- **Request Body**: 
    ```json
    {
        "email": "string",
        "aadhar_id": "string",
        "userPassword": "string"
    }
    ```
- **Responses**:
    - **200**: Login successful with tokens returned in cookies.
    - **400**: Missing or invalid fields.
    - **401**: Invalid credentials.
    - **403**: Account is blocked.
    - **404**: User not found.
    - **500**: Internal server error.

**Example**:
```bash
curl -X POST http://localhost:3000/api/v1/login \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "aadhar_id": "123456789012",
  "userPassword": "securepassword"
}'
```

---

#### **3. Logout User**
- **URL**: `/api/v1/logout`
- **Method**: `POST`
- **Description**: Logs out the current user by clearing access and refresh tokens.
- **Responses**:
    - **200**: User logged out successfully.
    - **500**: Internal server error.

**Example**:
```bash
curl -X POST http://localhost:3000/api/v1/logout
```

---

#### **4. Get Current User**
- **URL**: `/api/v1/user`
- **Method**: `GET`
- **Description**: Fetches details of the currently logged-in user and associated account.
- **Responses**:
    - **200**: User and account details retrieved successfully.
    - **404**: User or account not found.
    - **500**: Internal server error.

**Example**:
```bash
curl -X GET http://localhost:3000/api/v1/user \
-H "Authorization: Bearer <access_token>"
```

---

#### **5. Change Password**
- **URL**: `/api/v1/user/change-password`
- **Method**: `PUT`
- **Description**: Updates the user's password.
- **Request Body**: 
    ```json
    {
        "oldPassword": "string",
        "newPassword": "string"
    }
    ```
- **Responses**:
    - **200**: Password changed successfully.
    - **401**: Old password does not match.
    - **500**: Internal server error.

**Example**:
```bash
curl -X PUT http://localhost:3000/api/v1/user/change-password \
-H "Content-Type: application/json" \
-d '{
  "oldPassword": "securepassword",
  "newPassword": "newsecurepassword"
}'
```

---

#### **6. Update Personal Details**
- **URL**: `/api/v1/user/personal-details`
- **Method**: `PUT`
- **Description**: Updates the user's personal details.
- **Request Body**: 
    ```json
    {
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "phoneNo": "string",
        "dob": "string (YYYY-MM-DD)",
        "gender": "string",
        "street": "string",
        "city": "string",
        "state": "string",
        "zip": "string",
        "maritalStatus": "string",
        "occupation": "string"
    }
    ```
- **Responses**:
    - **200**: User details updated successfully.
    - **400**: Missing or invalid fields.
    - **404**: User not found.
    - **500**: Internal server error.

**Example**:
```bash
curl -X PUT http://localhost:3000/api/v1/user/personal-details \
-H "Content-Type: application/json" \
-d '{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "phoneNo": "9876543212",
  "dob": "1985-05-20",
  "gender": "Male",
  "street": "456 Pine Street",
  "city": "Gotham",
  "state": "CA",
  "zip": "98765",
  "maritalStatus": "Married",
  "occupation": "Architect"
}'
```

---

#### **7. Update Account Details**
- **URL**: `/api/v1/account`
- **Method**: `PUT`
- **Description**: Updates the user's account details.
- **Request Body**: 
    ```json
    {
        "accountType": "string",
        "branchName": "string",
        "branchCode": "string",
        "ifscCode": "string",
        "nomineeName": "string",
        "nomineeRelation": "string",
        "nomineeContact": "string"
    }
    ```
- **Responses**:
    - **200**: Account details updated successfully.
    - **400**: Missing or invalid fields.
    - **404**: Account not found.
    - **500**: Internal server error.

**Example**:
```bash
curl -X PUT http://localhost:3000/api/v1/account \
-H "Content-Type: application/json" \
-d '{
  "accountType": "Current",
  "branchName": "Downtown Branch",
  "branchCode": "002",
  "ifscCode": "IFSC002",
  "nomineeName": "Alice Doe",
  "nomineeRelation": "Sister",
  "nomineeContact": "9876543213"
}'
```

---

#### **8. Update User Photo**
- **URL**: `/api/v1/user/photo`
- **Method**: `PUT`
- **Description**: Updates the user's profile photo.
- **Request Body**: 
    - Form-data with key `file` containing the image.
- **Responses**:
    - **200**: Photo updated successfully.
    - **400**: Photo file missing.
    - **500**: Internal server error.

**Example**:
```bash
curl -X PUT http://localhost:3000/api/v1/user/photo \
-F "file=@/path/to/photo.jpg"
```

---

#### **9. Block User**
- **URL**: `/api/v1/user/block`
- **Method**: `POST`
- **Description**: Blocks a user after multiple failed login attempts.
- **Request Body**: 
    ```json
    {
        "email": "string",
        "aadhar_id": "string",
        "userPassword": "string"
    }
    ```
- **Responses**:
    - **200**: Password is correct, user is not blocked.
    - **403**: User account is blocked after multiple failed attempts.
    - **400**: Incorrect password.
    - **500**: Internal server error.

**Example**:
```bash
curl -X POST http://localhost:3000/api/v1/user/block \
-H "Content-Type: application/json" \
-d '{
  "email": "john.doe@example.com",
  "aadhar_id": "123456789012",
  "userPassword": "wrongpassword"
}'
```

---

#### **10. Send OTP**
- **URL**: `/api/v1/user/otp/send`
- **Method**: `POST`
- **Description**: Sends an OTP to the user's email for verification.
- **Responses**:
    - **200**: OTP sent successfully.
    - **500**: Internal server error.

**Example**:
```bash
curl -X POST http://localhost:3000/api/v1/user/otp/send
```

---

#### **11. Verify OTP**
- **URL**: `/api/v1/user/otp/verify`
- **Method**: `POST`
- **Description**: Verifies the OTP provided by the user.
- **Request Body**: 
    ```json
    {
        "otp": "string"
    }
    ```
- **Responses**:
    - **200**: OTP verified successfully.
    - **400**: Incorrect or missing OTP.
    - **401**: OTP expired or session does not exist.
    - **500**: Internal server error.

**Example**:
```bash
curl -X POST http://localhost:3000/api/v1/user/otp/verify \
-H "Content-Type: application/json" \
-d '{
  "otp": "123456"
}'
```
