# Schema
## Book
A class that represents a single Book
```
{
	id: {Number : required},
	title: {String : required},
	author: {String : required},
	published_at: {Date : required},
	updated_at: {Date : required},
	created_at: {Date : required}
}
```

# Endpoint
## /api/books
- **GET**

Get all books available on the database

**Response**
`Status Code:` `200`
```
{
	data: [Book]
}
```
if no book is available then GET will return an empty array

---

- **POST**
Create new book

**Header**
`Content-Type:` `application/json`

**Body**
```
{
	title: {String : required},
	author: {String : required},
	published_at: {Date : required}
}
```

**Response**
- *Success*

Book successfully created, returns the newly created book
`Status Code:` `201`
```
{
	message: "Book created successfully",
	data: Book
}
```
- *Invalid Body*

Happens when the request body doesn't meet the requirements above (e.g. missing property or invalid date format)
`Status Code:` `400` 
```
{
	message: "Invalid Body"
}
```

---


## /api/books/:id
- **General:**

*This constraint is applied to all method*
If supplied `:id` is not an integer then server will respond with:

`Status Code:` `400`
```
{
	message: "Invalid ID"
} 
```
\
For every request made, the server will check if the specified book id exist in the database. If yes then the request will be continued. Else, then the server will respond with:

`Status Code:` `404`
```
{
	message: "Book not found"
} 
```
---
- **GET**

Get a specific book by its ID

**Response**
`Status Code:` `200`
```
{
	data: Book
}
```

---
- **PUT**

Update a book's title then returns the updated version of the book. By updating, the `updated_at` attribute is changed to `Date.now()`

**Header**
`Content-Type:` `application/json`

**Body**
```
{
	title: {String : optional}
}
```
If title is not supplied or title is not a string then `Book.title` is set to  `" "` (without quotes)

**Response**
`Status Code:` `200`
```
{
	message: "Book updated successfully"
	data: Book
}
```
---
- **DELETE**

Delete a book
**Response**
`Status Code:` `200`
```
{
	message: "Book deleted successfully"
	data: Book
}
```