
# Auth

POST /login
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
 
POST /signup
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
----
 
