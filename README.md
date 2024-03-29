# API url can be changed in "RegistrationApp\src\app\environments\environment.ts" file

# Registration for a Web App

This project is a user registration wizard for a web app consisting of frontend, backend, and database. The registration process is divided into 4 steps:

1. Collecting data about the new user's company
2. Collecting data about the new user
3. Displaying a summary and approval of terms of service
4. Saving all data in the database

## Best Practices

To ensure fault tolerance, security, usability, and maintainability, the following best practices should be observed:

- Validate and ensure completeness of data before allowing the user to proceed to the next step.
- Allow the user to navigate back to the previous step at any time.
- Implement proper error handling and display meaningful error messages to the user.
- Implement secure password storage and transmission.
- Follow industry standards and guidelines for user interface design.
- Implement proper data validation and sanitization on the server-side.
- Implement database transactions to ensure data integrity.

## Company Data

- Name: Text (mandatory)
- Industry: Dropdown (mandatory, all elements in the list should come from the database)

## User Data

- Last Name: Text (mandatory)
- First Name: Text (mandatory)
- User Name / Login: Text (mandatory, has to be unique)
- Password: Text (mandatory)
- Password Repetition: Text (has to be identical to password)
- E-Mail: Text (optional)

## Summary

- Collected data for company and user
- Checkbox for approval of terms of service
- Checkbox for approval of privacy policy

## Database Persistence

- Collected data for company and user is persisted to the database
- Success or failure is displayed to the user

## Languages / Frameworks

- Frontend: Angular, Angular Material
- Backend: ASP.NET Core Web API, Entity Framework Core
- Database Server: Microsoft SQL Server