Defect ID:
BUG-01

Summary:
Form accepts invalid data types: letters allowed in Student ID field and numbers allowed in Full Name field

Application version/commit:
[Your commit]

Environment:
Windows 11, 
microsoft edge,  
Vue.js 3 + Vite, 
Node.js 20

Preconditions:
1. Application is running on localhost:5173. 
2. At least one valid student record exists in the table (e.g., 62742024 / Gemma Mae Policarpio). 
3. User is on the main page with the Add Student form visible.

Steps to reproduce:
1. Enter YUAN in the Student ID input field. 
2. Enter 12345 in the Full Name input field. 
3. Enter BSCS-3B in the Course / Section input field. 4. Click the Add Student button.

Expected result:
The Full Name field is validated to contain letters and spaces only (no pure numbers). Since "12345" contains only numbers, the system displays the error message: "Full Name must contain letters only."

Actual result:
The system saves the record without any validation error. The table displays the invalid record with YUAN under Student ID and 12345 under Full Name, corrupting the data integrity of the student list.

Severity:
High

Priority:
High

Fix Description:
Updated StudentForm.vue to validate Student IDs as exactly 8 digits and Full Names as letters and spaces only.

Retest Result:
Pass

Evidence:
03-failed-test-or-defect.png

Status: Fixed

Fix Description:
Updated StudentForm.vue to validate Student IDs as exactly 8 digits and Full Names as letters and spaces only.

Retest Result: 
Pass

Retest Evidence: 
03-retest-fixed-validation.png






























