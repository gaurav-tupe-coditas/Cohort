
# Auth

POST /auth/login
----
  User login, 
* **URL Params**  
  None
* **Data Params**  
```JSON
 {
  "email":string,
  "password":string
}
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
* Cookies containing accessToken and refereshToken
  **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "LOGIN SUCCESSFULL"
    }
}
```
* **Error Response:**  
  * **Code:** 404 
```JSON
{
    "data": null,
    "err": "INVALID_CREDENTIALS"
}
```
----
 
POST /auth/signup
----
  User login, 
* **URL Params**  
  None
* **Data Params**  
```JSON
 {
   "name":string,

    "email":string,

    "password":string
}
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
* Cookies containing accessToken and refereshToken
  **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "LOGIN SUCCESSFULL"
    }
}
```
* **Error Response:**  
  * **Code:** 400 
```JSON

  {
    "data": null,
    "err": {
        "statusCode": 400,
        "message": "BAD REQUEST",
        "issues": [
            {
                "origin": "string",
                "code": "invalid_format",
                "format": "email",
                "pattern": "/^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
                "path": [
                    "email"
                ],
                "message": "Email should be in proper format"
            }
        ]
    }
}

```
# User

GET /user/:id
----
  User login, 
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
	None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
* Cookies containing accessToken and refereshToken
  **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": {
            "id": "7d02efa4-f148-4ac1-9e87-67d3c095ed7d",
            "name": "Mohit Gupta",
            "email": "Mohit.gupta@coditas.com",
            "role_id": "019efdf6-175f-79d7-b4df-70b73fe051ec",
            "createdAt": "2026-06-25T09:16:47.770Z",
            "updatedAt": "2026-06-25T09:16:47.770Z"
        }
    }
}
```
* **Error Response:**  
  * **Code:** 404 
```JSON
{
    "data": null,
    "err": "INVALID_CREDENTIALS"
}
```
----
 
POST /user/
----
  User login, 
* **URL Params**  
  None
* **Data Params**  
```JSON
 {
   "name":string,

    "email":string,

    "password":string,
    
    "role_id":string
}
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
* Cookies containing accessToken and refereshToken
  **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "User Created"
    }
}
```
* **Error Response:**  
  * **Code:** 400 
```JSON
    {
    "data": null,
    "err": {
        "statusCode": 400,
        "message": "USER ALREADY EXISTS"
    }

}

```
----

DELETE /user/:id
----
  User login, 
* **URL Params**  
  *Required:* `id=[integer]`
* **Data Params**  
	None
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
* Cookies containing accessToken and refereshToken
  **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "User deleted"
    }
}
```
* **Error Response:**  
  * **Code:** 400 
```JSON
  {
    "data": null,
    "err": {
        "statusCode": 400,
        "message": "USER NOT FOUND"
    }
}

```
----
 
POST /user/all
----
  User login, 
* **URL Params**  
  None
* **Data Params**  
```JSON
 {  
where: {  
		id?: string ;  
		name?: string ;  
		email?: string ;  
		role_id?: string ;  
		password_version?: number ;  
};  
limit: number;  
offset: number;  
order?: "name" | "email" | "role_id"  ;  
group?: "name" | "email" | "role_id" ;  
}
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
* **Code:** 200  
* Cookies containing accessToken and refereshToken
  **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": [
            {
                "id": "543eff29-2c77-4b2a-8626-09bd24cf3382",
                "name": "Vinay Joshi",
                "email": "vinay@coditas.com",
                "role_id": "019efdf6-1761-78a4-bd70-3af80ea88bd7",
                "createdAt": "2026-06-25T10:37:49.916Z",
                "updatedAt": "2026-06-25T10:37:49.916Z"
            }
        ]
    }
}
```
* **Error Response:**  
  * **Code:** 400 
```JSON
{
    "data": {
        "statusCode": 200,
        "data": []
    }
}

```
----


 
