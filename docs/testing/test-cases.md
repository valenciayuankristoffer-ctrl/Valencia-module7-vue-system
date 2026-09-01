Module 8 – Manual Test Cases

TC-01 – Add a Valid Record

Requirement/Feature
Add Record

Objective:
Verify that a user can successfully add a valid student record.

Preconditions:
The application is running.

Test Data:
Valid student information.

Test Steps:

1. Open the application.
2. Click Add Student.
3. Enter valid student information.
4. Click Save.

Expected Result:
The new student appears in the table and a success message is displayed.

Actual Result:
The new student was added successfully and appeared in the table.

Status:
Pass

Evidence:
01-add-valid-record.png

---

TC-02 – Reject Missing Required Field

Requirement/Feature:
Form Validation

Objective:
Verify that the system prevents a record from being saved when a required field is empty.

Preconditions:
The application is running and the Add Student form is available.

Test Data:
Leave one required field empty while entering the other valid information.

Test Steps

1. Open the application.
2. Click Add Student.
3. Enter valid information in the other fields.
4. Leave one required field empty.
5. Click Save.

Expected Result:
The record is not saved and a validation message is displayed indicating that the required field must be completed.

Actual Result:
The system rejected the incomplete record and displayed a validation message.

Status:
Pass

Evidence:
02-missing-required-field.png

---

TC-03 – Reject Invalid or Boundary Value

Requirement/Feature:
Input Validation

Objective:
Verify that the system rejects invalid Student ID and Full Name values.

Preconditions:
The application is running and the Add Student form is available.

Test Data:
Student ID: Yuan
Full Name: 12345

Test Steps:
1. Open the application.
2. Click Add Student.
3. Enter an invalid Student ID or Full Name.
4. Enter valid information in the remaining fields.
5. Click Save.

Expected Result:
The system rejects the invalid input and displays an appropriate validation message. The record is not saved.

Actual Result:
The system rejected the invalid input and displayed the appropriate validation message. The record was not saved.

Status:
Pass

Evidence:
03-invalid-boundary-value.png

---

TC-04 – Display Multiple Records

Requirement/Feature:
Record Display

Objective:
Verify that the system can display multiple student records correctly.

Preconditions:
The application is running.

Test Data:
Three or more valid student records.

Test Steps:

1. Open the application.
2. Add the first valid student record.
3. Add the second valid student record.
4. Add the third valid student record.
5. View the student records table.

Expected Result:
All successfully added student records are displayed correctly in the table without replacing or removing the other records.

Actual Result:
All added student records were displayed correctly in the table.

Status:
Pass

Evidence:
04-multiple-records.png

---

TC-05 – Edit Existing Record

Requirement/Feature:
Edit Record

Objective:
Verify that a user can edit and save changes to an existing student record.

Preconditions:
The application is running and at least one student record exists.

Test Data:
An existing student record with updated information.

Test Steps:

1. Open the application.
2. Locate an existing student record.
3. Click Edit.
4. Change one or more student information fields.
5. Click Save.
6. Check the updated record.

Expected Result:
The selected student record is updated with the new information and the changes are displayed in the table.

Actual Result:
The selected student record was updated successfully with the new information.

Status:
Pass

Evidence:
05-edit-record.png

---

TC-06 – Cancel Record Deletion

Requirement/Feature:
Delete Confirmation

Objective:
Verify that a student record remains unchanged when the user cancels the deletion.

Preconditions:
The application is running and at least one student record exists.

Test Data:
An existing student record.

Test Steps:

1. Open the application.
2. Locate an existing student record.
3. Click Delete.
4. When the confirmation appears, click Cancel.
5. Check the student records table.

Expected Result:
The deletion is cancelled and the selected student record remains in the table.

Actual Result:
The deletion was cancelled and the student record remained in the table.

Status:
Pass

Evidence:
06-cancel-delete.png

---

TC-07 – Confirm Record Deletion

Requirement/Feature:
Delete Record

Objective:
Verify that a user can successfully delete an existing student record.

Preconditions:
The application is running and at least one student record exists.

Test Data:
An existing student record.

Test Steps:

1. Open the application.
2. Locate an existing student record.
3. Click Delete.
4. When the confirmation appears, click Confirm.
5. Check the student records table.

Expected Result:
The selected student record is removed from the table.

Actual Result:
The selected student record was successfully removed from the table.

Status:
Pass

Evidence:
07-confirm-delete.png

---

 TC-08 – Search for Existing Record

Requirement/Feature:
Search

Objective:
Verify that the search function can find an existing student record.

Preconditions:
The application is running and multiple student records exist.

Test Data:
The name or other searchable information of an existing student.

Test Steps:

1. Open the application.
2. Locate the search field.
3. Enter the name or keyword of an existing student.
4. Observe the displayed results.

Expected Result:
The system displays the matching student record or records.

Actual Result:
The matching student record was displayed in the search results.

Status:
Pass

Evidence:
08-search-existing.png

---

 TC-09 – Search for Missing Record

Requirement/Feature:
Search

Objective:
Verify that the system properly handles a search for a student record that does not exist.

Preconditions:
The application is running.

Test Data:**
A name or keyword that does not exist in the student records.

Test Steps:

1. Open the application.
2. Locate the search field.
3. Enter a keyword that does not match any student record.
4. Observe the displayed results.

Expected Result:
The system displays a no-results message or an empty result state.

Actual Result:
The system displayed the appropriate no-results state.

Status:
Pass

Evidence:
09-search-missing.png

---

 TC-10 – Verify localStorage After Refresh

Requirement/Feature:
Data Persistence

Objective:
Verify that student records remain available after refreshing the browser.

Preconditions:
The application is running and localStorage is enabled.

Test Data:
A valid student record.

Test Steps:

1. Open the application.
2. Add a valid student record.
3. Verify that the record appears in the table.
4. Refresh the browser.
5. Check the student records table again.

Expected Result:
The previously saved student record remains available after the browser is refreshed.

Actual Result:
The student record remained available after refreshing the browser.

Status:
Pass

Evidence:
10-localstorage-refresh.png

---

 Recommended Additional Test Cases

 TC-11 – Responsive Layout

Requirement/Feature:
Responsive Interface

Objective:
Verify that the application remains readable and usable on a narrow screen.

Preconditions:
The application is running.

Test Data:
Browser window resized to a narrow/mobile-like width.

Test Steps:

1. Open the application.
2. Resize the browser window to a narrow width.
3. Check the navigation, form, buttons, and student table.
4. Try interacting with the available controls.

Expected Result:
The content remains readable, controls remain usable, and the layout does not become unusable.

Actual Result:
The application remained readable and the controls remained usable at a narrow screen width.

Status:
Pass

Evidence:
11-responsive-layout.png

---

 TC-12 – Record Count or Feedback Message

Requirement/Feature:
Record Count / User Feedback

Objective:
Verify that the record count or feedback message updates correctly after an operation.

Preconditions:
The application is running.

Test Data:
A valid student record.

Test Steps:

1. Open the application.
2. Note the current record count.
3. Add a valid student record.
4. Check the record count or success feedback.
5. Delete the same record if appropriate.
6. Check the count or feedback again.

Expected Result:
The record count or feedback message updates correctly after the operation.

Actual Result:
The record count or feedback message updated correctly.

Status:
Pass

Evidence:
12-record-count-feedback.png









