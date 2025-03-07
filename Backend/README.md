# User API Documentation

## Endpoints

### Register User
- **Endpoint:** `/api/v1/user/register`
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
        "message": "Details are temporarily stored, OTP sent successfully, check your email for OTP"
    }
    ```

### Login User
- **Endpoint:** `/api/v1/user/login`
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
- **Endpoint:** `/api/v1/user/logout`
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
- **Endpoint:** `/api/v1/user/getcurrentuser`
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
- **Endpoint:** `/api/v1/user/change-password`
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
- **Endpoint:** `/api/v1/user/update-details`
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

### Update Account Details
- **Endpoint:** `/api/v1/user/update-account`
- **Method:** `POST`
- **Description:** Updates the account details of the logged-in user.
- **Request Body:**
    ```json
    {
        "accountType": "Savings",
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
        "account": { ... },
        "message": "Account updated successfully."
    }
    ```

### Update User Photo
- **Endpoint:** `/api/v1/user/update-photo`
- **Method:** `POST`
- **Description:** Updates the photo of the logged-in user.
- **Request Body:** Form-data with a file field named [photo](http://_vscodecontentref_/2).
- **Response:**
    ```json
    {
        "user": { ... },
        "message": "Photo Updated"
    }
    ```

### Block User
- **Endpoint:** `/api/v1/user/block-user`
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

### Verify OTP
- **Endpoint:** `/api/v1/user/verifyOtp`
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
        "message": "User and account created successfully",
        "user": { ... },
        "account": { ... },
        "accessToken": "access_token",
        "refreshToken": "refresh_token"
    }
    ```

## Card API Documentation

### Issue Card
- **Endpoint:** `/api/v1/user/card/card-issue`
- **Method:** `POST`
- **Description:** Issues a new card for the user.
- **Request Body:**
    ```json
    {
        "accountNumber": "ACC1234567890",
        "email": "john.doe@example.com",
        "cardHolderName": "John Doe",
        "cardType": "Debit Card"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Card issued successfully. OTP sent for PIN generation."
    }
    ```

### Generate Card PIN
- **Endpoint:** `/api/v1/user/card/card-pin`
- **Method:** `POST`
- **Description:** Generates a PIN for the issued card.
- **Request Body:**
    ```json
    {
        "otp": "123456",
        "newPin": "1234"
    }
    ```
- **Response:**
    ```json
    {
        "message": "PIN generated successfully. Card activated."
    }
    ```

## Transaction API Documentation

### Debit Transaction
- **Endpoint:** `/api/v1/user/transaction/debit`
- **Method:** `POST`
- **Description:** Debits an amount from the user's account.
- **Request Body:**
    ```json
    {
        "fromAccount": "ACC1234567890",
        "amount": 1000,
        "description": "Payment for services"
    }
    ```
- **Response:**
    ```json
    {
        "transaction": { ... },
        "message": "Transaction successful"
    }
    ```

### Credit Transaction
- **Endpoint:** `/api/v1/user/transaction/credit`
- **Method:** `POST`
- **Description:** Credits an amount to the user's account.
- **Request Body:**
    ```json
    {
        "toAccount": "ACC1234567890",
        "amount": 1000,
        "description": "Salary"
    }
    ```
- **Response:**
    ```json
    {
        "transaction": { ... },
        "message": "Transaction successful"
    }
    ```

### Transfer Transaction
- **Endpoint:** `/api/v1/user/transaction/transfer`
- **Method:** `POST`
- **Description:** Transfers an amount from one account to another.
- **Request Body:**
    ```json
    {
        "fromAccount": "ACC1234567890",
        "toAccount": "ACC0987654321",
        "amount": 500,
        "description": "Transfer to savings"
    }
    ```
- **Response:**
    ```json
    {
        "transaction": { ... },
        "message": "Transaction successful"
    }
    ```

### Card Transaction
- **Endpoint:** `/api/v1/user/transaction/card-transaction`
- **Method:** `POST`
- **Description:** Performs a transaction using a card.
- **Request Body:**
    ```json
    {
        "cardNumber": "1234567812345678",
        "amount": 100,
        "description": "Grocery shopping",
        "type": "Debit",
        "pin": "1234"
    }
    ```
- **Response:**
    ```json
    {
        "transaction": { ... },
        "message": "Transaction successful"
    }
    ```