# API Documentation

## Auth

### POST /auth/login
----
  User login
* **URL Params**  
  None
* **Data Params**  
```JSON
 {
  "email": "string",
  "password": "string"
}
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 200  
  * Cookies containing `accessToken`
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "LOGIN SUCCESSFULL"
    }
}
```
* **Error Response:**  
  * **Code:** 403 
```JSON
{
    "data": null,
    "err": {
        "statusCode": 403,
        "message": "INVALID_CREDENTIALS"
    }
}
```
----
 
### POST /auth/signup
----
  Student sign up / registration
* **URL Params**  
  None
* **Data Params**  
```JSON
 {
  "name": "string",
  "email": "string",
  "password": "string"
}
```
* **Headers**  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 201  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 201,
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

---

## User

### GET /user/:id
----
  Get user details by ID
* **URL Params**  
  *Required:* `id=[uuid]`
* **Data Params**  
  None
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
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
    "err": {
        "statusCode": 404,
        "message": "USER NOT FOUND"
    }
}
```
----
 
### POST /user/
----
  Create user with role (Admin only)
* **URL Params**  
  None
* **Data Params**  
```JSON
 {
  "name": "string",
  "email": "string",
  "password": "string",
  "role_id": "string"
}
```
* **Headers**  
  Authorization: Bearer <token>  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
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

### PATCH /user/
----
  Update user details (Admin only)
* **URL Params**  
  None
* **Data Params**  
```JSON
 {
  "findDetails": { "id": "string" },
  "updateDetails": { "name": "string" }
}
```
* **Headers**  
  Authorization: Bearer <token>  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "User Updated"
    }
}
```
----

### DELETE /user/:id
----
  Delete user by ID (Admin only)
* **URL Params**  
  *Required:* `id=[uuid]`
* **Data Params**  
  None
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
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
 
### POST /user/all
----
  Search and filter users (Admin/Instructor/Student)
* **URL Params**  
  None
* **Data Params**  
```JSON
 {  
  "where": {  
    "name": "string"
  },  
  "limit": 10,  
  "offset": 0
}
```
* **Headers**  
  Authorization: Bearer <token>  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
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

---

## Course

### POST /course/
----
  Create a new course (Admin only)
* **URL Params**  
  None
* **Data Params**  
```JSON
{
  "name": "string",
  "description": "string",
  "instructor_id": "uuid"
}
```
* **Headers**  
  Authorization: Bearer <token>  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 201  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 201,
        "data": {
            "id": "cfa32806-59f9-4cd2-90a0-ec6cdf3899c5",
            "name": "Software Engineering 101",
            "description": "Introductory course",
            "instructor_id": "000f883f-58b7-4cc7-855a-d6e307e0a9db",
            "createdAt": "2026-06-26T07:35:19.348Z",
            "updatedAt": "2026-06-26T07:35:19.348Z"
        }
    }
}
```

### GET /course/
----
  List courses (Instructor sees their own; Admin sees all)
* **URL Params**  
  None
* **Data Params**  
  None
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": [
            {
                "id": "cfa32806-59f9-4cd2-90a0-ec6cdf3899c5",
                "name": "Software Engineering 101",
                "instructor_id": "000f883f-58b7-4cc7-855a-d6e307e0a9db",
                "description": "Introductory course"
            }
        ]
    }
}
```

### PATCH /course/:courseId
----
  Update course details (Instructor owner / Admin only)
* **URL Params**  
  *Required:* `courseId=[uuid]`
* **Data Params**  
```JSON
{
  "name": "string",
  "description": "string"
}
```
* **Headers**  
  Authorization: Bearer <token>  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "Course Updated"
    }
}
```

### DELETE /course/:courseId
----
  Delete a course (Instructor owner / Admin only)
* **URL Params**  
  *Required:* `courseId=[uuid]`
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "Course deleted"
    }
}
```

---

## Enrollment

### POST /enrollment/
----
  Enroll student in a course (Student only)
* **URL Params**  
  None
* **Data Params**  
```JSON
{
  "course_id": "uuid"
}
```
* **Headers**  
  Authorization: Bearer <token>  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 201  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 201,
        "data": {
            "id": "enrollment-uuid",
            "student_id": "student-uuid",
            "course_id": "course-uuid",
            "createdAt": "2026-06-26T07:35:20.000Z",
            "updatedAt": "2026-06-26T07:35:20.000Z"
        }
    }
}
```

### GET /enrollment/my
----
  Get list of enrollments for logged-in student (Student only)
* **URL Params**  
  None
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": [
            {
                "id": "enrollment-uuid",
                "student_id": "student-uuid",
                "course_id": "course-uuid"
            }
        ]
    }
}
```

### GET /enrollment/course/:courseId
----
  List enrollments for a course (Instructor owner / Admin only)
* **URL Params**  
  *Required:* `courseId=[uuid]`
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": [
            {
                "id": "enrollment-uuid",
                "student_id": "student-uuid",
                "course_id": "course-uuid"
            }
        ]
    }
}
```

### DELETE /enrollment/:courseId
----
  Disenroll / drop a course (Student only)
* **URL Params**  
  *Required:* `courseId=[uuid]`
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "Unerolled"
    }
}
```

---

## Course Material

### POST /coursematerial/
----
  Upload course material (Instructor owner only)
* **URL Params**  
  None
* **Data Params** (multipart/form-data)  
  * `course_id` (string UUID)
  * `name` (string)
  * `description` (string)
  * `file` (File Attachment)
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 201  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 201,
        "data": {
            "id": "material-uuid",
            "course_id": "course-uuid",
            "name": "Lecture Notes 1",
            "description": "First week notes",
            "url": "uploads/lecture1.pdf",
            "createdAt": "2026-06-26T07:35:21.000Z",
            "updatedAt": "2026-06-26T07:35:21.000Z"
        }
    }
}
```

### GET /coursematerial/course/:courseId
----
  Retrieve materials for an enrolled course (Student / Instructor owner)
* **URL Params**  
  *Required:* `courseId=[uuid]`
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": [
            {
                "id": "material-uuid",
                "course_id": "course-uuid",
                "name": "Lecture Notes 1",
                "url": "uploads/lecture1.pdf"
            }
        ]
    }
}
```

### DELETE /coursematerial/:materialId
----
  Delete course material (Instructor owner only)
* **URL Params**  
  *Required:* `materialId=[uuid]`
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 201  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 201,
        "data": "Deleted"
    }
}
```

---

## Assignment

### POST /assignment/
----
  Create course assignment (Instructor owner only)
* **URL Params**  
  None
* **Data Params**  
```JSON
{
  "name": "string",
  "description": "string",
  "course_id": "uuid",
  "deadline": "ISO-8601-date-string"
}
```
* **Headers**  
  Authorization: Bearer <token>  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 201  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 201,
        "data": {
            "id": "assignment-uuid",
            "name": "Homework 1",
            "description": "Write a simple program",
            "course_id": "course-uuid",
            "createdAt": "2026-06-26T07:35:22.000Z",
            "updatedAt": "2026-06-26T07:35:22.000Z"
        }
    }
}
```

### GET /assignment/course/:courseId
----
  List assignments for course (Student / Instructor owner)
* **URL Params**  
  *Required:* `courseId=[uuid]`
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": [
            {
                "id": "assignment-uuid",
                "name": "Homework 1",
                "description": "Write a simple program",
                "course_id": "course-uuid"
            }
        ]
    }
}
```

### PATCH /assignment/:assignmentId
----
  Update assignment details (Instructor owner only)
* **URL Params**  
  *Required:* `assignmentId=[uuid]`
* **Data Params**  
```JSON
{
  "name": "string",
  "description": "string"
}
```
* **Headers**  
  Authorization: Bearer <token>  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "Assignment Updated"
    }
}
```

### DELETE /assignment/:assignmentId
----
  Delete an assignment (Instructor owner only)
* **URL Params**  
  *Required:* `assignmentId=[uuid]`
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "Assignment Deleted"
    }
}
```

---

## Submission

### POST /submission/
----
  Submit assignment (Student only)
* **URL Params**  
  None
* **Data Params** (multipart/form-data)  
  * `assignment_id` (string UUID)
  * `file` (File Attachment)
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 201  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 201,
        "data": {
            "id": "submission-uuid",
            "assignment_id": "assignment-uuid",
            "student_id": "student-uuid",
            "url": "uploads/solution.js",
            "createdAt": "2026-06-26T07:35:23.000Z",
            "updatedAt": "2026-06-26T07:35:23.000Z"
        }
    }
}
```

### GET /submission/my
----
  List submissions for the logged-in student (Student only)
* **URL Params**  
  None
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": [
            {
                "id": "submission-uuid",
                "assignment_id": "assignment-uuid",
                "student_id": "student-uuid",
                "url": "uploads/solution.js",
                "grade": 95,
                "feedback": "Great job!"
            }
        ]
    }
}
```

### GET /submission/assignment/:assignmentId
----
  List submissions for an assignment (Instructor owner only)
* **URL Params**  
  *Required:* `assignmentId=[uuid]`
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": [
            {
                "id": "submission-uuid",
                "assignment_id": "assignment-uuid",
                "student_id": "student-uuid",
                "url": "uploads/solution.js",
                "grade": null,
                "feedback": null
            }
        ]
    }
}
```

### PATCH /submission/:submissionId/grade
----
  Grade a student submission (Instructor owner only)
* **URL Params**  
  *Required:* `submissionId=[uuid]`
* **Data Params**  
```JSON
{
  "grade": 95,
  "feedback": "Great job!"
}
```
* **Headers**  
  Authorization: Bearer <token>  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": "Graded"
    }
}
```

---

## Announcement

### POST /announcement/
----
  Publish course announcement (Instructor owner only)
* **URL Params**  
  None
* **Data Params**  
```JSON
{
  "course_id": "uuid",
  "title": "string",
  "description": "string"
}
```
* **Headers**  
  Authorization: Bearer <token>  
  Content-Type: application/json  
* **Success Response:**  
  * **Code:** 201  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 201,
        "data": {
            "id": "announcement-uuid",
            "course_id": "course-uuid",
            "title": "Exam Notice",
            "description": "Exam scheduled next Monday",
            "createdAt": "2026-06-26T07:35:24.000Z",
            "updatedAt": "2026-06-26T07:35:24.000Z"
        }
    }
}
```

### GET /announcement/course/:courseId
----
  Get announcements for an enrolled course (Student / Instructor owner)
* **URL Params**  
  *Required:* `courseId=[uuid]`
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 200  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 200,
        "data": [
            {
                "id": "announcement-uuid",
                "course_id": "course-uuid",
                "title": "Exam Notice",
                "description": "Exam scheduled next Monday"
            }
        ]
    }
}
```

### DELETE /announcement/:announcementId
----
  Delete an announcement (Instructor owner only)
* **URL Params**  
  *Required:* `announcementId=[uuid]`
* **Headers**  
  Authorization: Bearer <token>  
* **Success Response:**  
  * **Code:** 201  
  * **Content:**  
```JSON
{
    "data": {
        "statusCode": 201,
        "data": "Deleted"
    }
}
```

---
