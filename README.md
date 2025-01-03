# User API Documentation

## Endpoints

### Register User
- **Endpoint:** `/register`
- **Method:** `POST`
- **Description:** Registers a new user and creates an associated account.
- **Request Body:**
    ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phoneNo": "1234567890",
        "dob": "1990-01-01",
        "gender": "Male",
        "aadhar_id": "1234-5678-9012",
        "street": "123 Main St",
        "city": "Anytown",
        "state": "Anystate",
        "zip": "123456",
        "country": "INDIA",
        "maritalStatus": "Single",
        "occupation": "Engineer",
        "nationality": "Indian",
        "userPassword": "password123",
        "accountType": "Savings",
        "accountPassword": "accountpassword123",
        "branchName": "Main Branch",
        "branchCode": "001",
        "ifscCode": "IFSC001",
        "nomineeName": "Jane Doe",
        "nomineeRelation": "Sister",
        "nomineeContact": "0987654321"
    }
    ```
- **Response:**
    ```json
    {
        "message": "User and account created successfully",
        "user": { ... },
        "account": { ... },
        "accessToken": "access_token",
        "refreshToken": "refresh_token"
    }
    ```

### Login User
- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Logs in a user.
- **Request Body:**
    ```json
    {
        "email": "john.doe@example.com",
        "aadhar_id": "1234-5678-9012",
        "userPassword": "password123"
    }
    ```
- **Response:**
    ```json
    {
        "message": "User logged in successfully.",
        "user": { ... },
        "account": { ... },
        "accessToken": "access_token",
        "refreshToken": "refresh_token"
    }
    ```

### Logout User
- **Endpoint:** `/logout`
- **Method:** `POST`
- **Description:** Logs out a user.
- **Response:**
    ```json
    {
        "user": {},
        "message": "User LoggedOut Successfully"
    }
    ```

### Get Current User
- **Endpoint:** `/getcurrentuser`
- **Method:** `GET`
- **Description:** Retrieves the current logged-in user's details.
- **Response:**
    ```json
    {
        "user": { ... },
        "account": { ... },
        "message": "User and account details retrieved successfully"
    }
    ```

### Change Password
- **Endpoint:** `/change-password`
- **Method:** `PUT`
- **Description:** Changes the password of the logged-in user.
- **Request Body:**
    ```json
    {
        "oldPassword": "oldpassword123",
        "newPassword": "newpassword123"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Password changed"
    }
    ```

### Update Personal Details
- **Endpoint:** `/update-details`
- **Method:** `PUT`
- **Description:** Updates the personal details of the logged-in user.
- **Request Body:**
    ```json
    {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phoneNo": "1234567890",
        "dob": "1990-01-01",
        "gender": "Male",
        "street": "123 Main St",
        "city": "Anytown",
        "state": "Anystate",
        "zip": "123456",
        "maritalStatus": "Single",
        "occupation": "Engineer"
    }
    ```
- **Response:**
    ```json
    {
        "user": { ... },
        "message": "User has been updated"
    }
    ```

### Update User Photo
- **Endpoint:** `/update-photo`
- **Method:** `POST`
- **Description:** Updates the photo of the logged-in user.
- **Request Body:** Form-data with a file field named `photo`.
- **Response:**
    ```json
    {
        "user": { ... },
        "message": "Photo Updated"
    }
    ```

### Block User
- **Endpoint:** `/block-user`
- **Method:** `POST`
- **Description:** Blocks a user after multiple failed login attempts.
- **Request Body:**
    ```json
    {
        "userPassword": "password123",
        "email": "john.doe@example.com",
        "aadhar_id": "1234-5678-9012"
    }
    ```
- **Response:**
    ```json
    {
        "message": "You have entered the wrong password 3 times. Your account has been blocked. Please contact customer support."
    }
    ```

### Send OTP
- **Endpoint:** `/getOtp`
- **Method:** `GET`
- **Description:** Sends an OTP to the user's email for verification.
- **Response:**
    ```json
    {
        "message": "OTP sent successfully, check your email for OTP"
    }
    ```

### Verify OTP
- **Endpoint:** `/verifyOtp`
- **Method:** `POST`
- **Description:** Verifies the OTP sent to the user's email.
- **Request Body:**
    ```json
    {
        "otp": "123456"
    }
    ```
- **Response:**
    ```json
    {
        "message": "OTP is correct"
    }
    ```